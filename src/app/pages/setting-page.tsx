'use client';

import styled from 'styled-components';

import Location from '../../../public/option-img/location_on.svg';
import Meeting from '../../../public/option-img/meeting_room.svg';
import Person from '../../../public/option-img/person.svg';
import Visibility from '../../../public/option-img/visibility.svg';

import { VitalSection, OptionSection } from '@/components';
import { SelfIntroduction } from '@/components/card';

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
};

interface SettingPageProps {
  type: string;
  name: string;
}

export function SettingPage({ type, name }: SettingPageProps) {
  return (
    <styles.pageContainer>
      <styles.cardName>
        {type} 카드 &gt; {name}
      </styles.cardName>
      <styles.cardContainer>
        <styles.miniCard>
          <styles.miniCardName>{type}카드</styles.miniCardName>
          <styles.miniCardKeywordsContainer>
            <styles.miniCardList>
              <styles.miniCardPerson />
              <styles.miniCardText>여성 · 00년생 · 비흡연</styles.miniCardText>
            </styles.miniCardList>
            <styles.miniCardList>
              <styles.miniCardLocation />
              <styles.miniCardText>
                서울특별시 성북구 정릉동
              </styles.miniCardText>
            </styles.miniCardList>
            <styles.miniCardList>
              <styles.miniCardMeeting />
              <styles.miniCardText>메이트와 다른 방</styles.miniCardText>
            </styles.miniCardList>
            <styles.miniCardList>
              <styles.miniCardVisibility />
              <styles.miniCardText>아침형</styles.miniCardText>
            </styles.miniCardList>
          </styles.miniCardKeywordsContainer>
        </styles.miniCard>
        <styles.checkContainer>
          <VitalSection />
          <styles.lineContainer>
            <styles.horizontalLine />
          </styles.lineContainer>
          <OptionSection />
          <SelfIntroduction />
        </styles.checkContainer>
      </styles.cardContainer>
    </styles.pageContainer>
  );
}
