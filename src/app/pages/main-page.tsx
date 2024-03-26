'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ToggleSwitch } from '@/components';
import {
  ApricotDropDownList,
  PostCard,
  UserCard,
  WhiteDropDownList,
} from '@/components/main-page';
import { useMainPageFilter } from '@/entities/main-page-filter';
import { type User } from '@/entities/user';
import { getUserData, useAuthState } from '@/features/auth';

const styles = {
  container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 4.375rem;
  `,
  mateRecommendationsContainer: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2.6875rem;
  `,
  mateRecommendationTitle: styled.h1`
    color: #000;
    font-family: 'Noto Sans KR';
    font-size: 2rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-left: 1.5rem;
  `,
  mateRecommendation: styled.div`
    display: flex;
    flex-direction: row;
    gap: 2.625rem;
    margin: 0 2.75rem;
    overflow-x: auto;

    -ms-overflow-style: none;
    scrollbar-width: none;
    scrollbar ::-webkit-scrollbar {
      display: none;
    }
  `,
  postRecommendationsContainer: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 8.625rem;
  `,
  userFilter: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    color: #000;
    font-family: 'Noto Sans KR';
    font-size: 2rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    gap: 1rem;

    margin-bottom: 2.375rem;
  `,
  postFilter: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* gap: 89px; */
  `,
  dropDownList: styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
  `,
  toggle: styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `,
  toggleLabel: styled.p`
    color: var(--Gray-3, #888);
    font-family: 'Noto Sans KR';
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    cursor: pointer;
  `,
  postList: styled.div`
    margin-top: 5.375rem;

    display: flex;
    flex-direction: column;

    align-items: center;

    gap: 3rem;
  `,
};

const dummyUserCards = ['김마루', '최정민', '정연수'];
const dummyFilters = ['원룸', '기숙사'];

export function MainPage() {
  const [auth] = useAuthState();
  const { isError, isLoading, fetchStatus, data } = useQuery({
    queryKey: ['/api/auth/info'],
    queryFn: getUserData,
    enabled: auth?.accessToken !== undefined,
  });
  const [filter, setFilter] = useMainPageFilter();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    if (data !== undefined) {
      const { user } = data.data;
      setUserData(user);
      console.group();
      console.debug(`setUserData called.`);
      console.debug(`data: ${JSON.stringify(userData)}`);
      console.groupEnd();
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      console.debug('failed to fetch user data.');
    }
  }, [isError]);

  useEffect(() => {
    if (fetchStatus === 'fetching') {
      console.debug(`query, fetchStatus: ${fetchStatus}`);
    } else if (fetchStatus === 'idle') {
      console.debug(`query, fetchStatus: ${fetchStatus}`);
    } else if (fetchStatus === 'paused') {
      console.debug(`query, fetchStatus: ${fetchStatus}`);
    }
  }, [fetchStatus]);

  if (isLoading) <>Loading. Now</>;

  return (
    <styles.container>
      <styles.mateRecommendationsContainer>
        <styles.mateRecommendationTitle>
          님의 추천 메이트
        </styles.mateRecommendationTitle>
        <styles.mateRecommendation>
          <UserCard
            name="김마루"
            address="성북 길음동"
            birth={new Date(2000, 5, 27)}
          />
          <UserCard
            name="김마루"
            address="성북 길음동"
            birth={new Date(2000, 5, 27)}
          />{' '}
          <UserCard
            name="김마루"
            address="성북 길음동"
            birth={new Date(2000, 5, 27)}
          />{' '}
          <UserCard
            name="김마루"
            address="성북 길음동"
            birth={new Date(2000, 5, 27)}
          />{' '}
          <UserCard
            name="김마루"
            address="성북 길음동"
            birth={new Date(2000, 5, 27)}
          />{' '}
          <UserCard
            name="김마루"
            address="성북 길음동"
            birth={new Date(2000, 5, 27)}
          />
        </styles.mateRecommendation>
      </styles.mateRecommendationsContainer>
      <styles.postRecommendationsContainer>
        <styles.userFilter>
          <ApricotDropDownList
            items={dummyUserCards}
            selected={filter.userCard ?? dummyUserCards[0]}
            onSelect={userCard => {
              setFilter({ userCard });
            }}
          />
          님이
          <ApricotDropDownList
            items={dummyUserCards}
            selected={filter.recommendationCard ?? dummyUserCards[0]}
            onSelect={recommendationCard => {
              setFilter({ recommendationCard });
            }}
          />
          구해요
        </styles.userFilter>
        <styles.postFilter>
          <styles.dropDownList>
            <WhiteDropDownList
              title="방 종류"
              items={dummyFilters}
              selected={filter.roomType ?? '방 종류'}
              onSelect={roomType => {
                setFilter({ roomType });
              }}
            />
            <WhiteDropDownList
              title="거래 유형"
              items={dummyFilters}
              selected={filter.dealType ?? '거래 유형'}
              onSelect={dealType => {
                setFilter({ dealType });
              }}
            />
            <WhiteDropDownList
              title="비용"
              items={dummyFilters}
              selected={filter.budgetAmount ?? '비용'}
              onSelect={budgetAmount => {
                setFilter({ budgetAmount });
              }}
            />
            <WhiteDropDownList
              title="기타"
              items={dummyFilters}
              selected={filter.etc ?? '기타'}
              onSelect={etc => {
                setFilter({ etc });
              }}
            />
          </styles.dropDownList>
          <styles.toggle
            onClick={() => {
              setFilter(prev => ({ ...prev, hasRoom: !prev.hasRoom }));
            }}
          >
            <ToggleSwitch
              isChecked={filter.hasRoom}
              onToggle={() => {
                setFilter(prev => ({ ...prev, hasRoom: !prev.hasRoom }));
              }}
            />
            <styles.toggleLabel>방 있는 메이트</styles.toggleLabel>
          </styles.toggle>
        </styles.postFilter>
        <styles.postList>
          <PostCard
            post={{
              title: '혼자 살긴 너무 큰 방 같이 살 룸메이트 구해요!',
              content: '혼자 살긴 너무 큰 방 같이 살 룸메이트 구해요!',
            }}
            writer={{
              name: '정연수',
            }}
          />
          <PostCard
            post={{
              title: '혼자 살긴 너무 큰 방 같이 살 룸메이트 구해요!',
              content: '혼자 살긴 너무 큰 방 같이 살 룸메이트 구해요!',
            }}
            writer={{
              name: '정연수',
            }}
          />{' '}
          <PostCard
            post={{
              title: '혼자 살긴 너무 큰 방 같이 살 룸메이트 구해요!',
              content: '혼자 살긴 너무 큰 방 같이 살 룸메이트 구해요!',
            }}
            writer={{
              name: '정연수',
            }}
          />{' '}
          <PostCard
            post={{
              title: '혼자 살긴 너무 큰 방 같이 살 룸메이트 구해요!',
              content: '혼자 살긴 너무 큰 방 같이 살 룸메이트 구해요!',
            }}
            writer={{
              name: '정연수',
            }}
          />
        </styles.postList>
      </styles.postRecommendationsContainer>
    </styles.container>
  );
}
