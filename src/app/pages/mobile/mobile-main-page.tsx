'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { CircularButton } from '@/components';
import { UserCard } from '@/components/main-page';
import { useAuthActions, useAuthValue, useUserData } from '@/features/auth';
import { getGeolocation } from '@/features/geocoding';
import { useDummyUsers } from '@/features/shared';

const styles = {
  container: styled.div`
    display: flex;
    width: 100vw;
    height: 47.8125rem;
    padding-bottom: 2rem;
    flex-direction: column;
    align-items: center;
  `,
  map: styled.div`
    width: 100%;
    height: 50dvh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p {
      color: #000;
      font-family: 'Noto Sans KR';
      font-size: 1.25rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }

    p[class~='caption'] {
      color: #19191980;
      font-family: 'Noto Sans KR';
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  `,
  mateRecommendationContainer: styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    margin-bottom: 2.5rem;
  `,
  mateRecommendationTitle: styled.div`
    display: flex;
    padding: 2rem 1.5rem;
    justify-content: flex-start;
    align-items: center;
    align-self: stretch;

    h1 {
      color: #000;

      font-family: 'Noto Sans KR';
      font-size: 1.1875rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  `,
  mateRecommendationRow: styled.div`
    display: flex;
    width: 100%;
    padding: 0rem 1.5rem;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  `,
  mateRecommendation: styled.div`
    display: flex;
    width: 75%;
    padding: 0.5rem 0rem;
    align-items: center;
    gap: 0.25rem;
    flex-shrink: 0;
    overflow-x: auto;

    -ms-overflow-style: none;
    scrollbar-width: none;
    scrollbar ::-webkit-scrollbar {
      display: none;
    }
  `,
};

export function MobileMainPage() {
  const router = useRouter();

  const auth = useAuthValue();
  const { setAuthUserData } = useAuthActions();

  const { data: userData } = useUserData(auth?.accessToken !== undefined);

  // const { data: recommendationMates } = useRecommendationMate({
  //   memberId: auth?.user?.memberId ?? 'undefined',
  //   cardType: 'mate',
  //   enabled: auth?.accessToken != null,
  // });

  const [map, setMap] = useState<naver.maps.Map | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScrollRight = () => {
    if (scrollRef.current !== null) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleScrollLeft = () => {
    if (scrollRef.current !== null) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    getGeolocation({
      onSuccess: position => {
        const center = new naver.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude,
        );

        setMap(
          new naver.maps.Map('map', {
            center,
            disableKineticPan: false,
            scrollWheel: false,
          }),
        );
      },
      onError: error => {
        console.error(error);
      },
    });
  }, []);

  useEffect(() => {
    if (userData !== undefined) {
      setAuthUserData(userData);
      if (userData.initialized) {
        // router.replace('/profile');
      }
    }
  }, [userData, router, setAuthUserData]);

  const users = useDummyUsers();
  return (
    <styles.container>
      <styles.map id="map">
        {map == null && (
          <>
            <p>지도를 불러오는 중입니다.</p>
            <p className="caption">(위치 권한이 필요합니다)</p>
          </>
        )}
      </styles.map>
      <styles.mateRecommendationContainer>
        <styles.mateRecommendationTitle>
          <h1>{auth?.user?.name}님의 추천 메이트</h1>
        </styles.mateRecommendationTitle>
        <styles.mateRecommendationRow>
          <CircularButton
            direction="left"
            disabled={false}
            onClick={handleScrollLeft}
          />
          <styles.mateRecommendation ref={scrollRef}>
            {/* {recommendationMates?.map(({ name, similarity, userId }) => (
        <Link key={userId} href={`/profile/${userId}`}>
          <UserCard
            name={name}
            percentage={Math.floor(similarity * 100)}
          />
        </Link>
      ))} */}
            {users?.map(
              ({
                userId,
                data: {
                  authResponse: { name },
                },
              }) => (
                <Link key={userId} href={`/profile/${userId}`}>
                  <UserCard name={name} percentage={50} />
                </Link>
              ),
            )}
          </styles.mateRecommendation>
          <CircularButton
            direction="right"
            disabled={false}
            onClick={handleScrollRight}
          />
        </styles.mateRecommendationRow>
      </styles.mateRecommendationContainer>
    </styles.container>
  );
}
