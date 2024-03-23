'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

const styles = {
  optionContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 0.44rem;
  `,
  optionDescription: styled.p`
    color: #9a95a3;

    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `,
  optionList: styled.ul`
    width: 100%;
    margin-top: 63px;
  `,
  optionListItem: styled.li`
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 42px;
  `,
  optionListImg: styled.img`
    width: 3.125rem;
    height: 3.125rem;
  `,
  optionListCheckItemContainer: styled.div`
    display: flex;
    width: 26.5rem;
    align-items: flex-start;
    align-content: flex-start;
    gap: 0.5rem;
    flex-wrap: wrap;
  `,
};

interface CheckItemProps {
  isSelected: boolean;
}

const CheckItem = styled.div<CheckItemProps>`
  display: flex;
  padding: 0.5rem 1.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  border-radius: 1.625rem;
  border: 2px solid #dfdfdf;
  background: #fff;
  cursor: pointer;

  color: #888;

  font-family: 'Noto Sans KR';
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  ${props =>
    props.isSelected
      ? {
          backgroundColor: '#E15637',
          color: '#FFF',
          border: '2px solid #E15637,',
        }
      : {
          backgroundColor: '#FFF',
          color: '#888',
        }};
`;

export function OptionSection() {
  type SelectedOptions = Record<string, boolean>;

  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

  const handleOptionClick = (option: string) => {
    setSelectedOptions(prevSelectedOptions => ({
      ...prevSelectedOptions,
      [option]: !prevSelectedOptions[option],
    }));
  };

  return (
    <styles.optionContainer>
      <styles.optionDescription>선택</styles.optionDescription>
      <styles.optionList>
        <styles.optionListItem>
          <styles.optionListImg src="/option-img/Remove red eye.svg" />
          <styles.optionListCheckItemContainer>
            <CheckItem
              isSelected={selectedOptions['아침형']}
              onClick={() => {
                handleOptionClick('아침형');
              }}
            >
              아침형
            </CheckItem>
            <CheckItem
              isSelected={selectedOptions['새벽형']}
              onClick={() => {
                handleOptionClick('새벽형');
              }}
            >
              새벽형
            </CheckItem>
          </styles.optionListCheckItemContainer>
        </styles.optionListItem>
        <styles.optionListItem>
          <styles.optionListImg src="/option-img/Lips.png" />
          <styles.optionListCheckItemContainer>
            <CheckItem
              isSelected={selectedOptions['실내취식 싫어요']}
              onClick={() => {
                handleOptionClick('실내취식 싫어요');
              }}
            >
              실내취식 싫어요
            </CheckItem>
            <CheckItem
              isSelected={selectedOptions['야식 안먹어요']}
              onClick={() => {
                handleOptionClick('야식 안먹어요');
              }}
            >
              야식 안먹어요
            </CheckItem>
          </styles.optionListCheckItemContainer>
        </styles.optionListItem>
        <styles.optionListItem>
          <styles.optionListImg src="/option-img/Hearing.png" />
          <styles.optionListCheckItemContainer>
            <CheckItem
              isSelected={selectedOptions['잠버릇 있어요']}
              onClick={() => {
                handleOptionClick('잠버릇 있어요');
              }}
            >
              잠버릇 있어요
            </CheckItem>
            <CheckItem
              isSelected={selectedOptions['알람 잘 못 들어요']}
              onClick={() => {
                handleOptionClick('알람 잘 못 들어요');
              }}
            >
              알람 잘 못 들어요
            </CheckItem>
          </styles.optionListCheckItemContainer>
        </styles.optionListItem>
        <styles.optionListItem>
          <styles.optionListImg src="/option-img/Standing Man.png" />
          <styles.optionListCheckItemContainer>
            <CheckItem
              isSelected={selectedOptions['더위 많이 타요']}
              onClick={() => {
                handleOptionClick('더위 많이 타요');
              }}
            >
              더위 많이 타요
            </CheckItem>
            <CheckItem
              isSelected={selectedOptions['추위 많이 타요']}
              onClick={() => {
                handleOptionClick('추위 많이 타요');
              }}
            >
              추위 많이 타요
            </CheckItem>
          </styles.optionListCheckItemContainer>
        </styles.optionListItem>
        <styles.optionListItem>
          <styles.optionListImg src="/option-img/Inquiry.png" />
          <styles.optionListCheckItemContainer>
            <CheckItem
              isSelected={selectedOptions['깔끔형']}
              onClick={() => {
                handleOptionClick('깔끔형');
              }}
            >
              깔끔형
            </CheckItem>
            <CheckItem
              isSelected={selectedOptions['둔감형']}
              onClick={() => {
                handleOptionClick('둔감형');
              }}
            >
              둔감형
            </CheckItem>
            <CheckItem
              isSelected={selectedOptions['친구초대 괜찮아요']}
              onClick={() => {
                handleOptionClick('친구초대 괜찮아요');
              }}
            >
              친구초대 괜찮아요
            </CheckItem>
            <CheckItem
              isSelected={selectedOptions['취미 같이 즐겨요']}
              onClick={() => {
                handleOptionClick('취미 같이 즐겨요');
              }}
            >
              취미 같이 즐겨요
            </CheckItem>
          </styles.optionListCheckItemContainer>
        </styles.optionListItem>
      </styles.optionList>
    </styles.optionContainer>
  );
}
