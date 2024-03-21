'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

import { VitalSection, OptionSection } from '@/components';

const styles = {
  page_description: styled.p`
    margin: 48px 0 24px 0;
    width: 100%;
    color: var(--Black, #35373a);
    font-family: 'Noto Sans KR';
    font-size: 32px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `,

  page_container: styled.div`
    display: flex;
    flex-flow: wrap;
    padding: 0px 33px;
  `,

  card_name_section: styled.div`
    positon: relative;
    display: flex;
    flex-direction: column;
    width: 300px;
  `,
  card_name_container: styled.div<CardActiveProps>`
    display: flex;
    width: 300px;
    padding: 20px 150px 31px 25px;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    border-radius: 30px 0px 0px 30px;
    cursor: pointer;
    background: ${props =>
      props.active !== undefined && props.active !== null && props.active
        ? 'var(--background, #f7f6f9)'
        : 'var(--White, #fff)'};
    border-top: ${props =>
      props.active !== undefined && props.active !== null && props.active
        ? '2px solid var(--background, #f7f6f9)'
        : '2px solid var(--Light-gray, #dcddea)'};
    border-bottom: ${props =>
      props.active !== undefined && props.active !== null && props.active
        ? '2px solid var(--background, #f7f6f9)'
        : '2px solid var(--Light-gray, #dcddea)'};
    border-left: ${props =>
      props.active !== undefined && props.active !== null && props.active
        ? '2px solid var(--background, #f7f6f9)'
        : '2px solid var(--Light-gray, #dcddea)'};
  `,
  card_name: styled.p<CardActiveProps>`
    font-family: 'Noto Sans KR';
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: ${props =>
      props.active !== undefined && props.active !== null && props.active
        ? 'var(--Main-1, #e15637)'
        : 'var(--Gray-3, #888)'};
  `,
  card_gender: styled.div<CardActiveProps>`
    display: flex;
    padding: 8px 24px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 26px;

    color: #fff;

    font-family: 'Noto Sans KR';
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    background: ${props =>
      props.active !== undefined && props.active !== null && props.active
        ? 'var(--Main-1, #e15637)'
        : 'var(--Gray-3, #888)'};
  `,

  check_section: styled.div`
    width: 732px;
    height: 1123px;
    position: relative;
  `,
  card_check_container: styled.div<CardActiveProps>`
    width: 100%;
    height: 100%;
    display: ${props =>
      props.active !== undefined && props.active !== null && props.active
        ? 'flex'
        : 'none'};
    flex-shrink: 0;
    flex-direction: column;
    position: absolute;
    padding: 37px 63px 37px 69px;
    border-radius: 0px 30px 30px 30px;
    background: var(--background, #f7f6f9);
  `,

  horizontal_line: styled.hr`
    width: 600px;
    height: 0px;
    flex-shrink: 0;
    stroke-width: 1px;
    stroke: #d3d0d7;
    margin-bottom: 53px;
  `,

  mate_button: styled.button`
    display: flex;
    width: 274px;
    height: 45px;
    padding: 8px 24px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
    border: none;
    border-radius: 8px;
    background: var(--Main-1, #e15637);

    color: #fff;

    font-family: Pretendard;
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;

    margin: 118px 427px;
  `,
};

interface CardActiveProps {
  active?: boolean;
}

export function UserInputPage() {
  const [activeContainer, setActiveContainer] = useState<'my' | 'mate'>('my');

  const handleMyCardClick = () => {
    setActiveContainer('my');
  };

  const handleMateCardClick = () => {
    setActiveContainer('mate');
  };

  return (
    <>
      <styles.page_description>
        김마루 님과 희망 메이트에 대해 알려주세요
      </styles.page_description>
      <styles.page_container>
        <styles.card_name_section>
          <styles.card_name_container
            onClick={handleMyCardClick}
            active={activeContainer === 'my'}
          >
            <styles.card_name active={activeContainer === 'my'}>
              내카드
            </styles.card_name>
            <styles.card_gender active={activeContainer === 'my'}>
              여성
            </styles.card_gender>
          </styles.card_name_container>
          <styles.card_name_container
            onClick={handleMateCardClick}
            active={activeContainer === 'mate'}
          >
            <styles.card_name active={activeContainer === 'mate'}>
              메이트카드
            </styles.card_name>
            <styles.card_gender active={activeContainer === 'mate'}>
              여성
            </styles.card_gender>
          </styles.card_name_container>
        </styles.card_name_section>
        <styles.check_section>
          <styles.card_check_container active={activeContainer === 'my'}>
            <VitalSection />
            <styles.horizontal_line />
            <OptionSection />
          </styles.card_check_container>
          <styles.card_check_container active={activeContainer === 'mate'}>
            <VitalSection />
            <styles.horizontal_line />
            <OptionSection />
          </styles.card_check_container>
        </styles.check_section>
        <styles.mate_button>나의 메이트 확인하기</styles.mate_button>
      </styles.page_container>
    </>
  );
}
