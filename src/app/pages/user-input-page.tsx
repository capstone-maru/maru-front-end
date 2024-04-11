'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Location from '../../../public/option-img/location_on.svg';
import Meeting from '../../../public/option-img/meeting_room.svg';
import Person from '../../../public/option-img/person.svg';
import Visibility from '../../../public/option-img/visibility.svg';

import { VitalSection, OptionSection } from '@/components';
import { useAuthValue, useUserData } from '@/features/auth';
import { usePutUserCard } from '@/features/profile';

const styles = {
  pageContainer: styled.div`
    display: flex;
    flex-direction: column;
  `,
  pageDescription: styled.p`
    margin: 48px 0;
    width: 100%;
    color: var(--Black, #35373a);
    font-family: 'Noto Sans KR';
    font-size: 2rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `,
  cardContainer: styled.div`
    display: flex;
    gap: 0.88rem;
  `,
  cardNameSection: styled.div`
    display: flex;
    width: 23.0625rem;
    height: 36.125rem;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1.125rem;
    flex-shrink: 0;
  `,
  miniCard: styled.div<CardActiveProps>`
    width: 23.0625rem;
    height: 17.5rem;
    flex-shrink: 0;
    border-radius: 30px;
    padding: 1.62rem 1.44rem;
    display: flex;
    flex-direction: column;
    background: ${props =>
      props.$active !== undefined && props.$active !== null && props.$active
        ? 'var(--background, #f7f6f9)'
        : 'var(--White, #fff)'};
    box-shadow: ${props =>
      props.$active !== undefined && props.$active !== null && props.$active
        ? '0px 4px 20px 0px rgba(0, 0, 0, 0.2)'
        : 'none'};
    border: ${props =>
      props.$active !== undefined && props.$active !== null && props.$active
        ? 'none'
        : '2px solid var(--Light-gray, #DCDDEA)'};
  `,
  miniCardName: styled.p<CardActiveProps>`
    color: ${props =>
      props.$active !== undefined && props.$active !== null && props.$active
        ? 'var(--Black, #35373A)'
        : 'var(--Gray-3, #888)'};
    font-family: 'Noto Sans KR';
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 1.69rem;
  `,
  miniCardKeywordsContainer: styled.ul`
    display: flex;
    width: 18.375rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  `,
  miniCardList: styled.li`
    display: flex;
    align-items: center;
    gap: 2rem;
    align-self: stretch;
  `,
  miniCardPerson: styled(Person)<CardActiveProps>`
    width: 1.5rem;
    height: 1.5rem;
    path {
      fill: ${props =>
        props.$active !== undefined && props.$active !== null && props.$active
          ? 'var(--Main-1, #e15637)'
          : 'var(--Main-2, #767D86)'};
    }
  `,
  miniCardLocation: styled(Location)<CardActiveProps>`
    width: 1.5rem;
    height: 1.5rem;
    path {
      fill: ${props =>
        props.$active !== undefined && props.$active !== null && props.$active
          ? 'var(--Main-1, #e15637)'
          : 'var(--Main-2, #767D86)'};
    }
  `,
  miniCardMeeting: styled(Meeting)<CardActiveProps>`
    width: 1.5rem;
    height: 1.5rem;
    path {
      fill: ${props =>
        props.$active !== undefined && props.$active !== null && props.$active
          ? 'var(--Main-1, #e15637)'
          : 'var(--Main-2, #767D86)'};
    }
  `,
  miniCardVisibility: styled(Visibility)<CardActiveProps>`
    width: 1.5rem;
    height: 1.5rem;
    path {
      fill: ${props =>
        props.$active !== undefined && props.$active !== null && props.$active
          ? 'var(--Main-1, #e15637)'
          : 'var(--Main-2, #767D86)'};
    }
  `,
  miniCardText: styled.p<CardActiveProps>`
    flex: 1 0 0;
    height: 1.5rem;
    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    color: ${props =>
      props.$active !== undefined && props.$active !== null && props.$active
        ? 'var(--Main-1, #e15637)'
        : 'var(--Main-2, #767D86)'};
  `,
  checkSection: styled.div`
    width: calc(100% - 23.0625rem);
    height: 95.8125rem;
    position: relative;
  `,
  checkContainer: styled.div<CardActiveProps>`
    width: 51.0625rem;
    height: 95.8125rem;
    flex-shrink: 0;
    border-radius: 30px;
    background: var(--background, #f7f6f9);
    padding: 3.56rem 0 0 1.56rem;
    margin-bottom: 7.5rem;
    position: absolute;

    display: ${props =>
      props.$active !== undefined && props.$active !== null && props.$active
        ? ''
        : 'none'};
  `,

  lineContainer: styled.div`
    margin: 2.69rem 0;
    padding: 0 4.37rem 0 1.38rem;
  `,
  horizontalLine: styled.hr`
    width: 100%;
    height: 0rem;
    flex-shrink: 0;
    stroke-width: 1px;
    stroke: #d3d0d7;
  `,
  mateButtonContainer: styled.div`
    display: inline-flex;
    width: 13.5625rem;
    padding: 0.75rem 1.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
    border-radius: 8px;
    background: var(--Main-1, #e15637);
    margin: 4.06rem 31rem 9.06rem 31rem;
  `,
  mateButtonDescription: styled.p`
    color: #fff;

    font-family: Pretendard;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.5rem;
  `,
  mateButtonIcon: styled.img`
    width: 1rem;
    height: 1rem;
  `,
};

interface CardActiveProps {
  $active?: boolean;
}

interface UserProps {
  memberId: string | undefined;
  name: string | undefined;
  gender: string | undefined;
  birthYear: string | undefined;
  myCardId: number | undefined;
  mateCardId: number | undefined;
}

interface SelectedState {
  smoking: string | undefined;
  room: string | undefined;
}
type SelectedOptions = Record<string, boolean>;

const useSelectedState = (): [
  SelectedState,
  SelectedOptions,
  (optionName: keyof SelectedState, item: string | number) => void,
  (option: string) => void,
] => {
  const [selectedState, setSelectedState] = useState<SelectedState>({
    smoking: undefined,
    room: undefined,
  });
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

  const handleFeatureChange = (
    optionName: keyof SelectedState,
    item: string | number,
  ) => {
    setSelectedState(prevState => ({
      ...prevState,
      [optionName]: prevState[optionName] === item ? undefined : item,
    }));
  };

  const handleOptionClick = (option: string) => {
    setSelectedOptions(prevSelectedOptions => ({
      ...prevSelectedOptions,
      [option]: !prevSelectedOptions[option],
    }));
  };

  return [
    selectedState,
    selectedOptions,
    handleFeatureChange,
    handleOptionClick,
  ];
};

export function UserInputPage() {
  const auth = useAuthValue();
  const { data } = useUserData(auth?.accessToken !== undefined);
  const [user, setUserData] = useState<UserProps | null>(null);

  useEffect(() => {
    if (data !== undefined) {
      const { name, gender, birthYear, memberId, myCardId, mateCardId } = data;
      setUserData({ name, gender, birthYear, memberId, myCardId, mateCardId });
    }
  }, [data]);

  const [
    selectedState,
    selectedOptions,
    handleFeatureChange,
    handleOptionClick,
  ] = useSelectedState();
  const [
    selectedMateState,
    selectedMateOptions,
    handleMateFeatureChange,
    handleMateOptionClick,
  ] = useSelectedState();

  const myCardId = user?.myCardId ?? 0;
  const mateCardId = user?.mateCardId ?? 0;

  const { mutate: mutateMyCard } = usePutUserCard(myCardId);
  const { mutate: mutateMateCard } = usePutUserCard(mateCardId);

  const handleButtonClick = () => {
    const myOptions = Object.keys(selectedOptions).filter(
      key => selectedOptions[key],
    );
    const mateOptions = Object.keys(selectedMateOptions).filter(
      key => selectedMateOptions[key],
    );

    const location = '성북 길음동';
    const myFeatures = [
      selectedState.smoking,
      selectedState.room,
      ...myOptions,
    ];

    const mateFeatures = [
      selectedMateState.smoking,
      selectedMateState.room,
      ...mateOptions,
    ];

    try {
      mutateMyCard({
        location: location,
        features: myFeatures,
      });
      mutateMateCard({
        location: location,
        features: mateFeatures,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const [activeContainer, setActiveContainer] = useState<'my' | 'mate'>('my');

  const handleMyCardClick = () => {
    setActiveContainer('my');
  };

  const handleMateCardClick = () => {
    setActiveContainer('mate');
  };

  return (
    <styles.pageContainer>
      <styles.pageDescription>
        {user?.name} 님과 희망 메이트에 대해서 알려주세요
      </styles.pageDescription>
      <styles.cardContainer>
        <styles.cardNameSection>
          <styles.miniCard
            onClick={handleMyCardClick}
            $active={activeContainer === 'my'}
          >
            <styles.miniCardName $active={activeContainer === 'my'}>
              내카드
            </styles.miniCardName>
            <styles.miniCardKeywordsContainer>
              <styles.miniCardList>
                <styles.miniCardPerson $active={activeContainer === 'my'} />
                <styles.miniCardText $active={activeContainer === 'my'}>
                  여성 · 00년생 · 비흡연
                </styles.miniCardText>
              </styles.miniCardList>
              <styles.miniCardList>
                <styles.miniCardLocation $active={activeContainer === 'my'} />
                <styles.miniCardText $active={activeContainer === 'my'}>
                  서울특별시 성북구 정릉동
                </styles.miniCardText>
              </styles.miniCardList>
              <styles.miniCardList>
                <styles.miniCardMeeting $active={activeContainer === 'my'} />
                <styles.miniCardText $active={activeContainer === 'my'}>
                  메이트와 다른 방
                </styles.miniCardText>
              </styles.miniCardList>
              <styles.miniCardList>
                <styles.miniCardVisibility $active={activeContainer === 'my'} />
                <styles.miniCardText $active={activeContainer === 'my'}>
                  아침형
                </styles.miniCardText>
              </styles.miniCardList>
            </styles.miniCardKeywordsContainer>
          </styles.miniCard>
          <styles.miniCard
            onClick={handleMateCardClick}
            $active={activeContainer === 'mate'}
          >
            <styles.miniCardName $active={activeContainer === 'mate'}>
              메이트카드
            </styles.miniCardName>
            <styles.miniCardKeywordsContainer>
              <styles.miniCardList>
                <styles.miniCardPerson $active={activeContainer === 'mate'} />
                <styles.miniCardText $active={activeContainer === 'mate'}>
                  여성 · 00년생 · 비흡연
                </styles.miniCardText>
              </styles.miniCardList>
              <styles.miniCardList>
                <styles.miniCardLocation $active={activeContainer === 'mate'} />
                <styles.miniCardText $active={activeContainer === 'mate'}>
                  서울특별시 성북구 정릉동
                </styles.miniCardText>
              </styles.miniCardList>
              <styles.miniCardList>
                <styles.miniCardMeeting $active={activeContainer === 'mate'} />
                <styles.miniCardText $active={activeContainer === 'mate'}>
                  메이트와 다른 방
                </styles.miniCardText>
              </styles.miniCardList>
              <styles.miniCardList>
                <styles.miniCardVisibility
                  $active={activeContainer === 'mate'}
                />
                <styles.miniCardText $active={activeContainer === 'mate'}>
                  아침형
                </styles.miniCardText>
              </styles.miniCardList>
            </styles.miniCardKeywordsContainer>
          </styles.miniCard>
        </styles.cardNameSection>
        <styles.checkSection>
          <styles.checkContainer $active={activeContainer === 'my'}>
            <VitalSection
              gender={user?.gender}
              birthYear={user?.birthYear}
              smoking={undefined}
              room={undefined}
              onFeatureChange={handleFeatureChange}
              isMySelf
            />
            <styles.lineContainer>
              <styles.horizontalLine />
            </styles.lineContainer>
            <OptionSection
              optionFeatures={null}
              onFeatureChange={handleOptionClick}
              isMySelf
            />
          </styles.checkContainer>
          <styles.checkContainer $active={activeContainer === 'mate'}>
            <VitalSection
              gender={user?.gender}
              birthYear={undefined}
              smoking={undefined}
              room={undefined}
              onFeatureChange={handleMateFeatureChange}
              isMySelf
            />
            <styles.lineContainer>
              <styles.horizontalLine />
            </styles.lineContainer>
            <OptionSection
              optionFeatures={null}
              onFeatureChange={handleMateOptionClick}
              isMySelf
            />
          </styles.checkContainer>
        </styles.checkSection>
      </styles.cardContainer>
      <Link href="/">
        <styles.mateButtonContainer onClick={handleButtonClick}>
          <styles.mateButtonDescription>
            나의 메이트 확인하기
          </styles.mateButtonDescription>
          <styles.mateButtonIcon src="/chevron-right.svg" />
        </styles.mateButtonContainer>
      </Link>
    </styles.pageContainer>
  );
}
