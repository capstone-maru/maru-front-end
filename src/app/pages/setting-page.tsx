'use client';

import styled from 'styled-components';

import { VitalSection, OptionSection } from '@/components';

const styles = {
  pageContainer: styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 1.5rem;
    height: 85rem;
  `,

  cardName: styled.p`
    margin: 73px 0;
    color: #000;

    font-family: 'Noto Sans KR';
    font-size: 2rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `,

  horizontalLine: styled.hr`
    width: 100%;
    height: 0rem;
    flex-shrink: 0;
    stroke-width: 1px;
    stroke: #d3d0d7;
    margin: 53px 0;
  `,
};

export function SettingPage() {
  return (
    <styles.pageContainer>
      <styles.cardName>내 카드 &gt; 김마루</styles.cardName>
      <VitalSection />
      <styles.horizontalLine />
      <OptionSection />
    </styles.pageContainer>
  );
}
