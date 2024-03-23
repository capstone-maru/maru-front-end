'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

import { VitalSection, OptionSection } from '@/components';

const styles = {
  pageDescription: styled.p`
    margin: 48px 0;
    width: 100%;
    color: var(--Black, #35373a);
    font-family: 'Noto Sans KR';
    font-size: 2rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `,

  pageContainer: styled.div`
    display: flex;
    flex-flow: wrap;
    padding: 0 1.5rem;
  `,

  cardNameSection: styled.div`
    display: flex;
    flex-direction: column;
    width: 18.75rem;
  `,
  cardNameContainer: styled.div<CardActiveProps>`
    display: flex;
    width: 100%;
    padding: 1.25rem 9.375rem 1.9375rem 1.5625rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.9375rem;
    border-radius: 1.875rem 0px 0px 1.875rem;
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
  cardName: styled.p<CardActiveProps>`
    font-family: 'Noto Sans KR';
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: ${props =>
      props.active !== undefined && props.active !== null && props.active
        ? 'var(--Main-1, #e15637)'
        : 'var(--Gray-3, #888)'};
  `,
  cardGender: styled.div<CardActiveProps>`
    display: flex;
    padding: 0.5rem 1.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border-radius: 1.625rem;

    color: #fff;

    font-family: 'Noto Sans KR';
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    background: ${props =>
      props.active !== undefined && props.active !== null && props.active
        ? 'var(--Main-1, #e15637)'
        : 'var(--Gray-3, #888)'};
  `,

  checkSection: styled.div`
    width: calc(100% - 18.75rem);
    height: 70.1875rem;
    position: relative;
  `,
  cardCheckContainer: styled.div<CardActiveProps>`
    width: 100%;
    height: 100%;
    display: ${props =>
      props.active !== undefined && props.active !== null && props.active
        ? 'flex'
        : 'none'};
    flex-shrink: 0;
    flex-direction: column;
    position: absolute;
    padding: 2.3125rem 3.9375rem;
    border-radius: 0rem 1.875rem 1.875rem 1.875rem;
    background: var(--background, #f7f6f9);
  `,

  horizontalLine: styled.hr`
    width: 100%;
    flex-shrink: 0;
    stroke-width: 1px;
    stroke: #d3d0d7;
    margin: 3.3125rem 0;
  `,

  mateButton: styled.button`
    display: flex;
    width: 17.125rem;
    height: 2.8125rem;
    padding: 1.25rem 1.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
    flex-shrink: 0;
    border: none;
    border-radius: 0.5rem;
    background: var(--Main-1, #e15637);

    color: #fff;

    font-family: Pretendard;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.5rem;

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
      <styles.pageDescription>
        김마루 님과 희망 메이트에 대해 알려주세요
      </styles.pageDescription>
      <styles.pageContainer>
        <styles.cardNameSection>
          <styles.cardNameContainer
            onClick={handleMyCardClick}
            active={activeContainer === 'my'}
          >
            <styles.cardName active={activeContainer === 'my'}>
              내카드
            </styles.cardName>
            <styles.cardGender active={activeContainer === 'my'}>
              여성
            </styles.cardGender>
          </styles.cardNameContainer>
          <styles.cardNameContainer
            onClick={handleMateCardClick}
            active={activeContainer === 'mate'}
          >
            <styles.cardName active={activeContainer === 'mate'}>
              메이트카드
            </styles.cardName>
            <styles.cardGender active={activeContainer === 'mate'}>
              여성
            </styles.cardGender>
          </styles.cardNameContainer>
        </styles.cardNameSection>
        <styles.checkSection>
          <styles.cardCheckContainer active={activeContainer === 'my'}>
            <VitalSection />
            <styles.horizontalLine />
            <OptionSection />
          </styles.cardCheckContainer>
          <styles.cardCheckContainer active={activeContainer === 'mate'}>
            <VitalSection />
            <styles.horizontalLine />
            <OptionSection />
          </styles.cardCheckContainer>
        </styles.checkSection>
        <styles.mateButton>나의 메이트 확인하기</styles.mateButton>
      </styles.pageContainer>
    </>
  );
}
