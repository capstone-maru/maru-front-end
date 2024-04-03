'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { VitalSection, OptionSection } from '@/components';
import { getUserData, useAuthState } from '@/features/auth';
import { useProfileData, usePutUserProfileData } from '@/features/profile';

const styles = {
  pageContainer: styled.div`
    display: flex;
    flex-direction: column;
    height: 85rem;
  `,

  cardName: styled.p`
    margin: 4.5625rem 0;
    color: #000;

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
  miniCard: styled.div`
    width: 23.0625rem;
    height: 17.5rem;
    flex-shrink: 0;
    border-radius: 30px;
    background: #f7f6f9;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);
    padding: 1.62rem 1.44rem;
    display: flex;
    flex-direction: column;
  `,
  miniCardName: styled.p`
    color: var(--Black, #35373a);
    font-family: 'Noto Sans KR';
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 1.69rem;
  `,
  miniCardKeywordsContainer: styled.div`
    width: 17.5625rem;
    height: 5.6875rem;
    position: relative;
  `,
  miniCardKeyword: styled.div`
    display: inline-flex;
    padding: 0.5rem 1.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border-radius: 26px;
    border: 2px solid var(--Main-1, #e15637);
    background: #fff;

    color: var(--Main-1, #e15637);
    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    position: absolute;
  `,
  checkContainer: styled.div`
    width: 51.0625rem;
    height: 95.8125rem;
    flex-shrink: 0;
    border-radius: 30px;
    background: var(--background, #f7f6f9);
    padding: 3.56rem 0 0 1.56rem;
    margin-bottom: 7.5rem;
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
    cursor: pointer;
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

interface UserProps {
  name: string;
  birthYear: string;
  gender: string;
  myFeatures: string[];
}

interface SelectedState {
  smoking: string | undefined;
  room: string | undefined;
}

const miniCardKeywordStyle = {
  border: 'none',
  background: 'var(--Gray-5, #828282)',
  color: '#fff',
};

function MyCard() {
  const [auth] = useAuthState();
  const { data } = useQuery({
    queryKey: ['/api/auth/initial/info'],
    queryFn: getUserData,
    enabled: auth?.accessToken !== undefined,
  });
  const [id, setId] = useState<string>('');
  const [userData, setUserData] = useState<UserProps | null>(null);

  useEffect(() => {
    if (data !== undefined) {
      const { memberId } = data.data;
      setId(memberId);
    }
  }, [data]);

  const user = useProfileData(id);

  useEffect(() => {
    if (user.data !== undefined) {
      const userProfileData = user.data.data;

      const { name, gender, birthYear } = userProfileData.authResponse;
      const { myFeatures } = userProfileData.memberCard;
      setUserData({ name, gender, birthYear, myFeatures });
    }
  }, [user.data]);

  const [selectedState, setSelectedState] = useState<SelectedState>({
    smoking: undefined,
    room: undefined,
  });
  useEffect(() => {
    setSelectedState({
      ...selectedState,
      smoking: userData?.myFeatures[0],
      room: userData?.myFeatures[1],
    });
  }, [userData?.myFeatures]);

  type SelectedOptions = Record<string, boolean>;
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
  useEffect(() => {
    if (userData?.myFeatures !== null) {
      const initialOptions: SelectedOptions = {};
      userData?.myFeatures.forEach(option => {
        initialOptions[option] = true;
      });
      setSelectedOptions(initialOptions);
    }
  }, [userData?.myFeatures]);

  const handleFeatureChange = (
    optionName: keyof SelectedState,
    item: string | number,
  ) => {
    setSelectedState(prevState => ({
      ...prevState,
      [optionName]: prevState[optionName] === item ? null : item,
    }));
  };
  const handleOptionClick = (option: string) => {
    setSelectedOptions(prevSelectedOptions => ({
      ...prevSelectedOptions,
      [option]: !prevSelectedOptions[option],
    }));
  };

  const { mutate } = usePutUserProfileData();

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const array = Object.keys(selectedOptions).filter(
        key => selectedOptions[key],
      );

      const address = '성북 길음동';
      const myFeatures = [selectedState.smoking, selectedState.room, ...array];

      mutate({ address: address, myFeatures: myFeatures });
      return undefined;
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [selectedState, selectedOptions]);

  let genderText = null;
  if (userData?.gender === 'MALE') {
    genderText = '남성';
  } else if (userData?.gender === 'FEMALE') {
    genderText = '여성';
  }

  return (
    <styles.pageContainer>
      <styles.cardName>내 카드 &gt; {userData?.name}</styles.cardName>
      <styles.cardContainer>
        <styles.miniCard>
          <styles.miniCardName>내카드</styles.miniCardName>
          <styles.miniCardKeywordsContainer>
            <styles.miniCardKeyword style={miniCardKeywordStyle}>
              {genderText}
            </styles.miniCardKeyword>
            {userData?.myFeatures[0] != null ? (
              <styles.miniCardKeyword style={{ right: '0' }}>
                {userData?.myFeatures[0]}
              </styles.miniCardKeyword>
            ) : null}
          </styles.miniCardKeywordsContainer>
        </styles.miniCard>
        <styles.checkContainer>
          <VitalSection
            gender={userData?.gender}
            birthYear={userData?.birthYear}
            smoking={userData?.myFeatures[0]}
            room={userData?.myFeatures[1]}
            onFeatureChange={handleFeatureChange}
          />
          <styles.lineContainer>
            <styles.horizontalLine />
          </styles.lineContainer>
          <OptionSection
            optionFeatures={userData?.myFeatures}
            onFeatureChange={handleOptionClick}
          />
        </styles.checkContainer>
      </styles.cardContainer>
    </styles.pageContainer>
  );
}

function MateCard({ index }: { index: string | null }) {
  // type SelectedOptions = Record<string, boolean>;
  // const [selectedState, setSelectedState] = useState<SelectedState>({
  //   smoking: null,
  //   room: null,
  // });
  // const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

  const handleFeatureChange = (
    optionName: keyof SelectedState,
    item: string | number,
  ) => {
    // setSelectedState(prevState => ({
    //   ...prevState,
    //   [optionName]: prevState[optionName] === item ? null : item,
    // }));
  };
  const handleOptionClick = (option: string) => {
    // setSelectedOptions(prevSelectedOptions => ({
    //   ...prevSelectedOptions,
    //   [option]: !prevSelectedOptions[option],
    // }));
  };
  return (
    <styles.pageContainer>
      <styles.cardName>메이트 카드 &gt; 메이트{index}</styles.cardName>
      <styles.cardContainer>
        <styles.miniCard>
          <styles.miniCardName>메이트카드</styles.miniCardName>
          <styles.miniCardKeywordsContainer>
            <styles.miniCardKeyword>여성</styles.miniCardKeyword>
            <styles.miniCardKeyword style={{ right: '0' }}>
              비흡연
            </styles.miniCardKeyword>
            <styles.miniCardKeyword style={{ bottom: '0' }}>
              아침형
            </styles.miniCardKeyword>
          </styles.miniCardKeywordsContainer>
        </styles.miniCard>
        <styles.checkContainer>
          <VitalSection
            gender={undefined}
            birthYear={undefined}
            smoking={undefined}
            room={undefined}
            onFeatureChange={handleFeatureChange}
          />
          <styles.lineContainer>
            <styles.horizontalLine />
          </styles.lineContainer>
          <OptionSection
            optionFeatures={undefined}
            onFeatureChange={handleOptionClick}
          />
        </styles.checkContainer>
      </styles.cardContainer>
    </styles.pageContainer>
  );
}

export function SettingPage({
  type,
  index,
}: {
  type: string;
  index: string | null;
}) {
  return <>{type === '내' ? <MyCard /> : <MateCard index={index} />}</>;
}
