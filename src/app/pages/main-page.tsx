'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styled from 'styled-components';

import { UserCard } from '@/components/main-page';
import { useUserAction, useUserState } from '@/entities/user';
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
};

export function MainPage() {
  const router = useRouter();

  const { auth } = useAuthState();
  const { user } = useUserState();
  const { setUser } = useUserAction();

  const { data } = useQuery({
    queryKey: ['/api/auth/initial/info'],
    queryFn: getUserData,
    enabled: auth?.accessToken !== undefined,
  });

  useEffect(() => {
    if (data !== undefined) {
      const userData = data.data;

      setUser(userData);
      if (userData.initialized) {
        router.replace('/profile');
      }
    }
  }, [data, router, setUser]);

  return (
    <styles.container>
      <styles.mateRecommendationsContainer>
        <styles.mateRecommendationTitle>
          {user?.name}님의 추천 메이트
        </styles.mateRecommendationTitle>
        <styles.mateRecommendation>
          <Link href="/profile/memberId">
            <UserCard
              name="김마루"
              address="성북 길음동"
              birth={new Date(2000, 5, 27)}
            />
          </Link>
          <Link href="/profile/memberId">
            <UserCard
              name="김마루"
              address="성북 길음동"
              birth={new Date(2000, 5, 27)}
            />
          </Link>
          <Link href="/profile/memberId">
            <UserCard
              name="김마루"
              address="성북 길음동"
              birth={new Date(2000, 5, 27)}
            />
          </Link>
          <Link href="/profile/memberId">
            <UserCard
              name="김마루"
              address="성북 길음동"
              birth={new Date(2000, 5, 27)}
            />
          </Link>
          <Link href="/profile/memberId">
            <UserCard
              name="김마루"
              address="성북 길음동"
              birth={new Date(2000, 5, 27)}
            />
          </Link>
          <Link href="/profile/memberId">
            <UserCard
              name="김마루"
              address="성북 길음동"
              birth={new Date(2000, 5, 27)}
            />
          </Link>
        </styles.mateRecommendation>
      </styles.mateRecommendationsContainer>
    </styles.container>
  );
}
