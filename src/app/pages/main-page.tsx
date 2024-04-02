'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { UserCard } from '@/components/main-page';
import { getUserData, useAuthActions, useAuthValue } from '@/features/auth';

const styles = {
  container: styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 4.44rem;
  `,
  map: styled.div`
    width: 100%;
    height: 59.6875rem;
  `,
  mateRecommendationsContainer: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2.6875rem;

    padding: 0 7.75rem;
    margin-bottom: 5rem;
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

  const auth = useAuthValue();
  const { setAuthUserData } = useAuthActions();

  const { data } = useQuery({
    queryKey: ['/api/auth/initial/info'],
    queryFn: getUserData,
    enabled: auth?.refreshToken !== null,
  });

  const [, setMap] = useState<naver.maps.Map | null>(null);

  useEffect(() => {
    const center = new naver.maps.LatLng(37.6090857, 126.9966865);
    setMap(
      new naver.maps.Map('map', {
        center,
        disableKineticPan: false,
        scrollWheel: false,
      }),
    );
  }, []);

  useEffect(() => {
    if (data !== undefined) {
      const userData = data.data;

      setAuthUserData(userData);
      if (userData.initialized) {
        // router.replace('/profile');
      }
    }
  }, [data, router, setAuthUserData]);

  return (
    <styles.container>
      <styles.map id="map" />
      <styles.mateRecommendationsContainer>
        <styles.mateRecommendationTitle>
          {auth?.user?.name}님의 추천 메이트
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
