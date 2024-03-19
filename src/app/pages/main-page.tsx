'use client';

import styled from 'styled-components';

import { UserCard } from '@/components';

const styles = {
  container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 70px;
  `,
  mateRecommendationsContainer: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 43px;
  `,
  mateRecommendationTitle: styled.h1`
    color: #000;
    font-family: 'Noto Sans KR';
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-left: 24px;
  `,
  mateRecommendation: styled.div`
    display: flex;
    flex-direction: row;
    gap: 42px;
    padding: 0 44px;
    overflow-x: auto;

    -ms-overflow-style: none;
    scrollbar-width: none;
    scrollbar ::-webkit-scrollbar {
      display: none;
    }
  `,
};

export function MainPage() {
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
    </styles.container>
  );
}
