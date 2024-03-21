'use client';

import styled from 'styled-components';

import { VitalSection, OptionSection } from '@/components';

const styles = {
  page_container: styled.div`
    display: flex;
    flex-flow: wrap;
    padding: 0px 33px;
  `,

  card_name: styled.p`
    margin: 73px 0 73px 0;
    width: 100%;
    color: #000;

    font-family: 'Noto Sans KR';
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `,

  horizontal_line: styled.hr`
    width: 1000px;
    height: 0px;
    flex-shrink: 0;
    stroke-width: 1px;
    stroke: #d3d0d7;
    margin-bottom: 53px;
  `,
};

export function SettingPage() {
  return (
    <styles.page_container>
      <styles.card_name>내 카드 &gt; 김마루</styles.card_name>
      <VitalSection />
      <styles.horizontal_line />
      <OptionSection />
    </styles.page_container>
  );
}
