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
    width: 90rem;
    height: 90rem;
    padding: 2rem 10rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    background: #fff;
  `,
  pageDescription: styled.p`
    align-self: stretch;
    color: var(--Black, #35373a);
    font-family: 'Noto Sans KR';
    font-size: 2rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `,
  cardContainer: styled.div`
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  `,
  miniCardContainer: styled.div`
    display: flex;
    width: 22.5rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.625rem;
  `,
  cardNameSection: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    align-self: stretch;
  `,
  miniCard: styled.div<CardActiveProps>`
    display: flex;
    padding: 2rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    align-self: stretch;
    border-radius: 1.875rem;
    background: #f7f6f9;

    /* button */
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);
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
    align-items: flex-start;
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
    display: flex;
    width: 50rem;
    padding: 2rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    border-radius: 1.875rem;
    background: var(--background, #f7f6f9);
    position: relative;
  `,
  checkContainer: styled.div<CardActiveProps>`
    display: flex;
    width: 50rem;
    padding: 2rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    border-radius: 1.875rem;
    background: var(--background, #f7f6f9);
    position: relative;

    display: ${props =>
      props.$active !== undefined && props.$active !== null && props.$active
        ? ''
        : 'none'};
  `,
  horizontalLine: styled.div`
    width: 43.75rem;
    height: 0.0625rem;
    background: var(--Gray-9, #d3d0d7);
  `,
  mateButtonContainer: styled.div`
    display: flex;
    padding: 0.75rem 1.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
    border-radius: 0.5rem;
    background: var(--Main-1, #e15637);
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

  const [locationInput, setLocation] = useState<string | undefined>('');
  const [mbti, setMbti] = useState('');
  const [major, setMajor] = useState('');
  const [budget, setBudget] = useState('');
  const [mateMbti, setMateMbti] = useState('');
  const [mateMajor, setMateMajor] = useState('');
  const [mateBudget, setMateBudget] = useState('');
  const [mateAge, setMateAge] = useState<string | undefined>('');

  const handleButtonClick = () => {
    const myOptions = Object.keys(selectedOptions).filter(
      key => key !== '전공' && key !== '엠비티아이' && selectedOptions[key],
    );
    const mateOptions = Object.keys(selectedMateOptions).filter(
      key => key !== '전공' && key !== '엠비티아이' && selectedMateOptions[key],
    );

    const location = locationInput ?? '';
    const myFeatures = [
      selectedState.smoking,
      selectedState.room,
      ...myOptions,
      mbti,
      major,
      budget,
    ];

    const mateFeatures = [
      selectedMateState.smoking,
      selectedMateState.room,
      mateAge,
      ...mateOptions,
      mateMbti,
      mateMajor,
      mateBudget,
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
        <styles.miniCardContainer>
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
                    {user?.gender === 'MALE' ? '남성' : '여성'} ·{' '}
                    {user?.birthYear?.slice(2)}년생 · {selectedState.smoking}
                  </styles.miniCardText>
                </styles.miniCardList>
                <styles.miniCardList>
                  <styles.miniCardLocation $active={activeContainer === 'my'} />
                  <styles.miniCardText $active={activeContainer === 'my'}>
                    {locationInput}
                  </styles.miniCardText>
                </styles.miniCardList>
                <styles.miniCardList>
                  <styles.miniCardMeeting $active={activeContainer === 'my'} />
                  <styles.miniCardText $active={activeContainer === 'my'}>
                    메이트와 {selectedState.room}
                  </styles.miniCardText>
                </styles.miniCardList>
                <styles.miniCardList>
                  <styles.miniCardVisibility
                    $active={activeContainer === 'my'}
                  />
                  <styles.miniCardText $active={activeContainer === 'my'}>
                    {selectedOptions['아침형'] ? '아침형' : null}
                    {selectedOptions['올빼미형'] ? '올빼미형' : null}
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
                    {user?.gender === 'MALE' ? '남성' : '여성'} ·{' '}
                    {user?.birthYear?.slice(2)}년생 ·{' '}
                    {selectedMateState.smoking}
                  </styles.miniCardText>
                </styles.miniCardList>
                <styles.miniCardList>
                  <styles.miniCardLocation
                    $active={activeContainer === 'mate'}
                  />
                  <styles.miniCardText $active={activeContainer === 'mate'}>
                    {locationInput}
                  </styles.miniCardText>
                </styles.miniCardList>
                <styles.miniCardList>
                  <styles.miniCardMeeting
                    $active={activeContainer === 'mate'}
                  />
                  <styles.miniCardText $active={activeContainer === 'mate'}>
                    메이트와 {selectedMateState.room}
                  </styles.miniCardText>
                </styles.miniCardList>
                <styles.miniCardList>
                  <styles.miniCardVisibility
                    $active={activeContainer === 'mate'}
                  />
                  <styles.miniCardText $active={activeContainer === 'mate'}>
                    {selectedMateOptions['아침형'] ? '아침형' : null}
                    {selectedMateOptions['올빼미형'] ? '올빼미형' : null}
                  </styles.miniCardText>
                </styles.miniCardList>
              </styles.miniCardKeywordsContainer>
            </styles.miniCard>
          </styles.cardNameSection>
        </styles.miniCardContainer>
        <styles.checkContainer $active={activeContainer === 'my'}>
          <VitalSection
            gender={user?.gender}
            birthYear={user?.birthYear}
            location={undefined}
            smoking={undefined}
            room={undefined}
            onFeatureChange={handleFeatureChange}
            onLocationChange={setLocation}
            onMateAgeChange={() => {}}
            isMySelf
            type="myCard"
          />
          <styles.horizontalLine />
          <OptionSection
            optionFeatures={null}
            onFeatureChange={handleOptionClick}
            onMbtiChange={setMbti}
            onMajorChange={setMajor}
            onBudgetChange={setBudget}
            isMySelf
            type="myCard"
          />
        </styles.checkContainer>
        <styles.checkContainer $active={activeContainer === 'mate'}>
          <VitalSection
            gender={user?.gender}
            birthYear={undefined}
            location={locationInput ?? undefined}
            smoking={undefined}
            room={undefined}
            onFeatureChange={handleMateFeatureChange}
            onLocationChange={setLocation}
            onMateAgeChange={setMateAge}
            isMySelf
            type="mateCard"
          />
          <styles.horizontalLine />
          <OptionSection
            optionFeatures={null}
            onFeatureChange={handleMateOptionClick}
            onMbtiChange={setMateMbti}
            onMajorChange={setMateMajor}
            onBudgetChange={setMateBudget}
            isMySelf
            type="mateCard"
          />
        </styles.checkContainer>
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
