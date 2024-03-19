'use client';

import { useState } from 'react';
import styled from 'styled-components';

import {
  ApricotDropDownList,
  ToggleSwitch,
  UserCard,
  WhiteDropDownList,
} from '@/components';

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
    margin: 0 44px;
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
    margin-top: 138px;
  `,
  userFilter: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    color: #000;
    font-family: 'Noto Sans KR';
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    gap: 16px;

    margin-bottom: 38px;
  `,
  postFilter: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 89px;
  `,
  dropDownList: styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
  `,
  toggle: styled.div`
    display: flex;
    align-items: center;
    gap: 7px;
  `,
  toggleLabel: styled.p`
    color: var(--Gray-3, #888);
    font-family: 'Noto Sans KR';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `,
};

export function MainPage() {
  const [hasRoom, setHasRoom] = useState(false);

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
            items={['김마루', '최정민', '정연수']}
            onSelect={item => {
              console.log(item);
            }}
          />
          님이
          <ApricotDropDownList
            items={['김마루', '최정민', '정연수']}
            onSelect={item => {
              console.log(item);
            }}
          />
          구해요
        </styles.userFilter>
        <styles.postFilter>
          <styles.dropDownList>
            <WhiteDropDownList title="방 종류" items={['원룸', '기숙사']} />
            <WhiteDropDownList title="거래 유형" items={['원룸', '기숙사']} />
            <WhiteDropDownList title="비용" items={['원룸', '기숙사']} />
            <WhiteDropDownList title="기타" items={['원룸', '기숙사']} />
          </styles.dropDownList>
          <styles.toggle>
            <ToggleSwitch
              isChecked={hasRoom}
              onToggle={() => {
                setHasRoom(prev => !prev);
              }}
            />
            <styles.toggleLabel>방 있는 메이트</styles.toggleLabel>
          </styles.toggle>
        </styles.postFilter>
      </styles.postRecommendationsContainer>
    </styles.container>
  );
}
