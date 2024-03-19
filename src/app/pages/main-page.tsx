'use client';

import styled from 'styled-components';

import {
  ApricotDropDownList,
  ToggleSwitch,
  UserCard,
  WhiteDropDownList,
} from '@/components';
import { useMainPageFilter } from '@/entities/main-page-filter';

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
    justify-content: space-between;
    /* gap: 89px; */
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
    cursor: pointer;
  `,
};

const dummyUserCards = ['김마루', '최정민', '정연수'];
const dummyFilters = ['원룸', '기숙사'];

export function MainPage() {
  const [filter, setFilter] = useMainPageFilter();

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
      </styles.postRecommendationsContainer>
    </styles.container>
  );
}
