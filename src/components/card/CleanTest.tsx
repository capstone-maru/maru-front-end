'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

const styles = {
  testSection: styled.ul`
    position: absolute;
    display: inline-flex;
    flex-direction: column;
    height: 31.25rem;
    padding: 2.6875rem 3.4375rem;
    border-radius: 20px;
    background: #fff;
    gap: 2rem;
    z-index: 5;

    /* button */
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);
  `,
  testListContainer: styled.li`
    display: flex;
    align-items: center;
    gap: 4.31rem;
  `,
  testDescription: styled.p`
    width: 6.9rem;
    color: #000;

    font-family: 'Noto Sans KR';
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `,
  testItemContainer: styled.div`
    display: flex;
    align-items: flex-end;
    gap: 0.5rem;
  `,
};

interface CheckItemProps {
  $isSelected: boolean;
}

const CheckItem = styled.div<CheckItemProps>`
  display: flex;
  padding: 0.5rem 1.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 26px;
  border: 2px solid #dfdfdf;
  background: #fff;
  cursor: pointer;

  color: #888;

  font-family: 'Noto Sans KR';
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  ${props =>
    props.$isSelected
      ? {
          color: 'var(--Main-1, #E15637)',
          border: '2px solid var(--Main-1, #E15637)',
        }
      : {
          backgroundColor: '#FFF',
          color: '#888',
        }};
`;

const room = ['매일', '주 2회 이상', '주 1회', '가끔'];
const bathRoom = ['매일', '주 2회 이상', '주 1회', '가끔'];
const washingDishes = ['식사 직후', '매일', '가끔'];
const laundry = ['매일', '주 2회 이상', '주 1회', '가끔'];
const wasteSorting = ['매일', '주 2회 이상', '주 1회', '가끔'];
const currentState = ['깔끔', '정리 필요', '대청소 필요', '카오스'];

export function CleanTest({
  onComplete,
}: {
  onComplete: (score: number) => void;
}) {
  const [selectedOptions, setSelectedOptions] = useState({
    room: 0,
    bathRoom: 0,
    washingDishes: 0,
    laundry: 0,
    wasteSorting: 0,
    currentState: 0,
  });

  const handleOptionClick = (option: string, idx: number) => {
    setSelectedOptions(prevSelectedOptions => ({
      ...prevSelectedOptions,
      [option]: idx,
    }));

    onComplete(calculateScore());
  };

  const calculateScore = () => {
    let score = -5;
    Object.values(selectedOptions).forEach(option => {
      score += option + 1;
    });
    return score;
  };

  return (
    <styles.testSection>
      <styles.testListContainer>
        <styles.testDescription>방 청소</styles.testDescription>
        <styles.testItemContainer>
          {room.map((option, idx) => (
            <CheckItem
              key={option}
              $isSelected={selectedOptions.room === idx}
              onClick={() => {
                handleOptionClick('room', idx);
              }}
            >
              {option}
            </CheckItem>
          ))}
        </styles.testItemContainer>
      </styles.testListContainer>
      <styles.testListContainer>
        <styles.testDescription>욕실 청소</styles.testDescription>
        <styles.testItemContainer>
          {bathRoom.map((option, idx) => (
            <CheckItem
              key={option}
              $isSelected={selectedOptions.bathRoom === idx}
              onClick={() => {
                handleOptionClick('bathRoom', idx);
              }}
            >
              {option}
            </CheckItem>
          ))}
        </styles.testItemContainer>
      </styles.testListContainer>
      <styles.testListContainer>
        <styles.testDescription>설거지</styles.testDescription>
        <styles.testItemContainer>
          {washingDishes.map((option, idx) => (
            <CheckItem
              key={option}
              $isSelected={selectedOptions.washingDishes === idx}
              onClick={() => {
                handleOptionClick('washingDishes', idx);
              }}
            >
              {option}
            </CheckItem>
          ))}
        </styles.testItemContainer>
      </styles.testListContainer>
      <styles.testListContainer>
        <styles.testDescription>세탁</styles.testDescription>
        <styles.testItemContainer>
          {laundry.map((option, idx) => (
            <CheckItem
              key={option}
              $isSelected={selectedOptions.laundry === idx}
              onClick={() => {
                handleOptionClick('laundry', idx);
              }}
            >
              {option}
            </CheckItem>
          ))}
        </styles.testItemContainer>
      </styles.testListContainer>
      <styles.testListContainer>
        <styles.testDescription>분리수거</styles.testDescription>
        <styles.testItemContainer>
          {wasteSorting.map((option, idx) => (
            <CheckItem
              key={option}
              $isSelected={selectedOptions.wasteSorting === idx}
              onClick={() => {
                handleOptionClick('wasteSorting', idx);
              }}
            >
              {option}
            </CheckItem>
          ))}
        </styles.testItemContainer>
      </styles.testListContainer>
      <styles.testListContainer>
        <styles.testDescription>현재 집 상태</styles.testDescription>
        <styles.testItemContainer>
          {currentState.map((option, idx) => (
            <CheckItem
              key={option}
              $isSelected={selectedOptions.currentState === idx}
              onClick={() => {
                handleOptionClick('currentState', idx);
              }}
            >
              {option}
            </CheckItem>
          ))}
        </styles.testItemContainer>
      </styles.testListContainer>
    </styles.testSection>
  );
}
