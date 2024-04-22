'use client';

import Location from '@public/option-img/location_on.svg';
import Meeting from '@public/option-img/meeting_room.svg';
import Person from '@public/option-img/person.svg';
import Visibility from '@public/option-img/visibility.svg';
import { type NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import { UserInputSection } from '@/components';
import {
  useProfileData,
  usePutUserCard,
  useUserCard,
} from '@/features/profile';

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
  `,

  cardName: styled.p`
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
  miniCard: styled.div`
    display: flex;
    width: 22.5rem;
    padding: 2rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    border-radius: 1.875rem;
    background: #f7f6f9;

    /* button */
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);
  `,
  miniCardName: styled.p`
    color: var(--Black, #35373a);
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
    align-items: center;
    gap: 2rem;
    align-self: stretch;
  `,
  miniCardPerson: styled(Person)`
    width: 1.5rem;
    height: 1.5rem;
    path {
      fill: var(--Main-1, #e15637);
    }
  `,
  miniCardLocation: styled(Location)`
    width: 1.5rem;
    height: 1.5rem;
    path {
      fill: var(--Main-1, #e15637);
    }
  `,
  miniCardMeeting: styled(Meeting)`
    width: 1.5rem;
    height: 1.5rem;
    path {
      fill: var(--Main-1, #e15637);
    }
  `,
  miniCardVisibility: styled(Visibility)`
    width: 1.5rem;
    height: 1.5rem;
    path {
      fill: var(--Main-1, #e15637);
    }
  `,
  miniCardText: styled.p`
    flex: 1 0 0;
    height: 1.5rem;
    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: var(--Main-1, #e15637);
  `,
  checkContainer: styled.div`
    display: flex;
    width: 50rem;
    padding: 2rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    border-radius: 1.875rem;
    background: var(--background, #f7f6f9);
  `,
  horizontalLine: styled.div`
    width: 43.75rem;
    height: 0.0625rem;
    background: var(--Gray-9, #d3d0d7);
  `,
};

interface SelectedState {
  smoking: string | undefined;
  room: string | undefined;
}

interface UserProps {
  name: string;
  gender: string;
  birthYear: string;
}

type SelectedOptions = Record<string, boolean>;

export function SettingPage({ cardId }: { cardId: number }) {
  const params = useSearchParams();
  const memberIdParams = params.get('memberId');
  const memberId = memberIdParams ?? '';
  const isMySelfStr = params.get('isMySelf');
  const isMySelf = isMySelfStr === 'true';
  const type = params.get('type') ?? '';

  const user = useProfileData(memberId);
  const [userData, setUserData] = useState<UserProps | null>(null);

  useEffect(() => {
    if (user.data !== undefined) {
      const userProfileData = user.data.data.authResponse;
      if (userProfileData !== undefined) {
        const { name, birthYear, gender } = userProfileData;
        setUserData({ name, gender, birthYear });
      }
    }
  }, [user.data]);

  const card = useUserCard(cardId);
  const [features, setFeatures] = useState<string[] | null>(null);

  useEffect(() => {
    if (isMySelf) {
      if (card !== undefined) {
        const featuresData = card.data?.data.myFeatures ?? null;
        setFeatures(featuresData);
      }
    }
  }, [card, isMySelf]);

  const [selectedState, setSelectedState] = useState<SelectedState>({
    smoking: undefined,
    room: undefined,
  });

  useEffect(() => {
    if (isMySelf) {
      if (features !== null) {
        setSelectedState({
          ...selectedState,
          smoking: features[0],
          room: features[1],
        });
      }
    }
  }, [features, isMySelf]);

  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
  const [initialMbti, setInitialMbti] = useState('');
  const [initialMajor, setInitialMajor] = useState('');
  const [initialBudget, setInitialBudget] = useState('');

  const majorArray = ['공학', '교육', '인문', '사회', '자연', '예체능', '의약'];

  useEffect(() => {
    if (isMySelf) {
      if (features !== null) {
        const initialOptions: SelectedOptions = {};
        features.slice(2).forEach(option => {
          if (
            !option.includes(',') &&
            !option.includes('±') &&
            !option.includes('E') &&
            !option.includes('I') &&
            !majorArray.includes(option)
          ) {
            initialOptions[option] = true;
          }

          if (option.includes('E') || option.includes('I'))
            setInitialMbti(option);
          if (majorArray.includes(option)) setInitialMajor(option);
          if (option.includes(',')) setInitialBudget(option);
        });
        setSelectedOptions(initialOptions);
      }
    }
  }, [features, isMySelf]);

  const [locationInput, setLocation] = useState<string | undefined>(
    card.data?.data.location,
  );

  useEffect(() => {
    if (card.data?.data.location !== undefined) {
      setLocation(card.data.data.location);
    }
  }, [card.data?.data.location]);

  const [mbti, setMbti] = useState<string | undefined>('');
  const [major, setMajor] = useState<string | undefined>('');
  const [budget, setBudget] = useState<string | undefined>('');
  const [mateAge, setMateAge] = useState<string | undefined>('');

  const handleFeatureChange = (
    optionName: keyof SelectedState,
    item: string | number,
  ) => {
    if (isMySelf) {
      setSelectedState(prevState => ({
        ...prevState,
        [optionName]: prevState[optionName] === item ? null : item,
      }));
    }
  };
  const handleOptionClick = (option: string) => {
    if (isMySelf) {
      setSelectedOptions(prevSelectedOptions => ({
        ...prevSelectedOptions,
        [option]: !prevSelectedOptions[option],
      }));
    }
  };

  const { mutate } = usePutUserCard(cardId);
  const router = useRouter();

  const saveData = () => {
    const array = Object.keys(selectedOptions).filter(
      key => selectedOptions[key] && key !== '전공' && key !== '엠비티아이',
    );

    const location = locationInput ?? '';
    const myFeatures = [
      selectedState.smoking,
      selectedState.room,
      mateAge !== '' ? mateAge : undefined,
      ...array,
      ...(mbti !== null && mbti !== undefined ? [mbti] : []),
      ...(major !== null && major !== undefined ? [major] : []),
      budget,
    ];

    mutate({ location, features: myFeatures });
  };

  const handleBeforeUnload = () => {
    saveData();
  };

  const isClickedFirst = useRef(false);

  const handlePopState = () => {
    saveData();
    history.back();
  };

  useEffect(() => {
    const originalPush = router.push.bind(router);
    const newPush = (
      href: string,
      options?: NavigateOptions | undefined,
    ): void => {
      saveData();
      originalPush(href, options);
    };
    router.push = newPush;
    window.onbeforeunload = handleBeforeUnload;
    return () => {
      router.push = originalPush;
      window.onbeforeunload = null;
    };
  }, [router, handleBeforeUnload]);

  useEffect(() => {
    if (!isClickedFirst.current) {
      history.pushState(null, '', '');
      isClickedFirst.current = true;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [handlePopState]);

  let ageString;
  if (type === 'myCard') {
    ageString = `${userData?.birthYear.slice(2)}년생`;
  } else {
    switch (mateAge) {
      case '±0':
        ageString = '동갑';
        break;
      case '±11':
        ageString = '상관없어요';
        break;
      default:
        ageString = `${mateAge}년생`;
    }
  }

  return (
    <styles.pageContainer>
      <styles.cardName>
        {type === 'myCard' ? `마이 카드` : '메이트 카드'}
      </styles.cardName>
      <styles.cardContainer>
        <styles.miniCard>
          <styles.miniCardName>
            {type === 'myCard' ? '내카드' : '메이트카드'}
          </styles.miniCardName>
          <styles.miniCardKeywordsContainer>
            <styles.miniCardList>
              <styles.miniCardPerson />
              <styles.miniCardText>
                {userData?.gender === 'MALE' ? '남성' : '여성'} · {ageString} ·{' '}
                {selectedState.smoking}
              </styles.miniCardText>
            </styles.miniCardList>
            <styles.miniCardList>
              <styles.miniCardLocation />
              <styles.miniCardText>{locationInput}</styles.miniCardText>
            </styles.miniCardList>
            <styles.miniCardList>
              <styles.miniCardMeeting />
              <styles.miniCardText>
                메이트와 {selectedState.room}
              </styles.miniCardText>
            </styles.miniCardList>
            <styles.miniCardList>
              <styles.miniCardVisibility />
              <styles.miniCardText>
                {selectedOptions['아침형'] ? '아침형' : null}
                {selectedOptions['올빼미형'] ? '올빼미형' : null}
              </styles.miniCardText>
            </styles.miniCardList>
          </styles.miniCardKeywordsContainer>
        </styles.miniCard>
        <UserInputSection
          gender={userData?.gender}
          birthYear={userData?.birthYear}
          location={card.data?.data.location}
          features={features}
          isMySelf={isMySelf}
          type={type}
          mbti={initialMbti}
          major={initialMajor}
          budget={initialBudget}
          onVitalChange={handleFeatureChange}
          onOptionChange={handleOptionClick}
          onLocationChange={setLocation}
          onMateAgeChange={setMateAge}
          onMbtiChange={setMbti}
          onMajorChange={setMajor}
          onBudgetChange={setBudget}
        />
      </styles.cardContainer>
    </styles.pageContainer>
  );
}
