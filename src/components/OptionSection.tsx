'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

const styles = {
  optionContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
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
    margin-top: 2.25rem;
  `,
  optionListItem: styled.li`
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 1.25rem;
  `,
  optionListImg: styled.img`
    width: 3.125rem;
    height: 3.125rem;
  `,
  optionListCheckItemContainer: styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    align-content: flex-start;
    gap: 0.5rem;
    flex-wrap: wrap;
    position: relative;
  `,
  personalContainer: styled.div`
    width: 22rem;
    display: flex;
    align-items: flex-start;
    align-content: flex-start;
    gap: 0.5rem;
    flex-wrap: wrap;
  `,
  cleanTestContainer: styled.div`
    position: absolute;
    left: 22.19rem;
    height: 2.44rem;
    display: flex;
    align-items: center;
    cursor: pointer;

    background-image: url('/option-img/Keyboard arrow down.svg');
    background-repeat: no-repeat;
    background-position: left center;
  `,
  cleanTestDescription: styled.p`
    color: #000;
    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    cursor: pointer;
    margin-left: 2rem;
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
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  ${props =>
    props.isSelected
      ? {
          color: 'var(--Main-1, #E15637)',
          border: '2px solid var(--Main-1, #E15637)',
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
          <styles.optionListImg src="/option-img/visibility.svg" />
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
              isSelected={selectedOptions['올빼미형']}
              onClick={() => {
                handleOptionClick('올빼미형');
              }}
            >
              올빼미형
            </CheckItem>
          </styles.optionListCheckItemContainer>
        </styles.optionListItem>
        <styles.optionListItem>
          <styles.optionListImg src="/option-img/restaurant.svg" />
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
            <CheckItem
              isSelected={selectedOptions['음주']}
              onClick={() => {
                handleOptionClick('음주');
              }}
            >
              음주
            </CheckItem>
          </styles.optionListCheckItemContainer>
        </styles.optionListItem>
        <styles.optionListItem>
          <styles.optionListImg src="/option-img/hearing.svg" />
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
            <CheckItem
              isSelected={selectedOptions['잠귀 밝아요']}
              onClick={() => {
                handleOptionClick('잠귀 밝아요');
              }}
            >
              잠귀 밝아요
            </CheckItem>
            <CheckItem
              isSelected={selectedOptions['게임 소음 허용']}
              onClick={() => {
                handleOptionClick('게임 소음 허용');
              }}
            >
              게임 소음 허용
            </CheckItem>
          </styles.optionListCheckItemContainer>
        </styles.optionListItem>
        <styles.optionListItem>
          <styles.optionListImg src="/option-img/device_thermostat.svg" />
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
          <styles.optionListImg src="/option-img/mop.svg" />
          <styles.optionListCheckItemContainer>
            <styles.cleanTestContainer>
              <styles.cleanTestDescription>
                테스트 하기
              </styles.cleanTestDescription>
            </styles.cleanTestContainer>
            <CheckItem
              isSelected={selectedOptions['상']}
              onClick={() => {
                handleOptionClick('상');
              }}
            >
              상
            </CheckItem>
            <CheckItem
              isSelected={selectedOptions['평범보통']}
              onClick={() => {
                handleOptionClick('평범보통');
              }}
            >
              평범보통
            </CheckItem>
            <CheckItem
              isSelected={selectedOptions['천하태평']}
              onClick={() => {
                handleOptionClick('천하태평');
              }}
            >
              천하태평
            </CheckItem>
          </styles.optionListCheckItemContainer>
        </styles.optionListItem>
        <styles.optionListItem>
          <styles.optionListImg src="/option-img/person.svg" />
          <styles.personalContainer>
            <CheckItem
              isSelected={selectedOptions['반려동물']}
              onClick={() => {
                handleOptionClick('반려동물');
              }}
            >
              반려동물
            </CheckItem>
            <CheckItem
              isSelected={selectedOptions['차량 보유']}
              onClick={() => {
                handleOptionClick('차량 보유');
              }}
            >
              차량 보유
            </CheckItem>
            <CheckItem
              isSelected={selectedOptions['집에서 활동']}
              onClick={() => {
                handleOptionClick('집에서 활동');
              }}
            >
              집에서 활동
            </CheckItem>
            <CheckItem
              isSelected={selectedOptions['밖에서 활동']}
              onClick={() => {
                handleOptionClick('밖에서 활동');
              }}
            >
              밖에서 활동
            </CheckItem>
            <CheckItem
              isSelected={selectedOptions['친구초대 허용']}
              onClick={() => {
                handleOptionClick('친구초대 허용');
              }}
            >
              친구초대 허용
            </CheckItem>
            <CheckItem
              isSelected={selectedOptions['취미 같이 즐겨요']}
              onClick={() => {
                handleOptionClick('취미 같이 즐겨요');
              }}
            >
              취미 같이 즐겨요
            </CheckItem>
            <CheckItem
              isSelected={selectedOptions['엠비티아이']}
              onClick={() => {
                handleOptionClick('엠비티아이');
              }}
            >
              MBTI
            </CheckItem>
            <CheckItem
              isSelected={selectedOptions['전공']}
              onClick={() => {
                handleOptionClick('전공');
              }}
            >
              전공
            </CheckItem>
          </styles.personalContainer>
        </styles.optionListItem>
        <styles.optionListItem>
          <styles.optionListImg src="/option-img/home_work.svg" />
          <styles.optionListCheckItemContainer>
            <CheckItem
              isSelected={selectedOptions['보증금']}
              onClick={() => {
                handleOptionClick('보증금');
              }}
            >
              보증금
            </CheckItem>
            <CheckItem
              isSelected={selectedOptions['월세']}
              onClick={() => {
                handleOptionClick('월세');
              }}
            >
              월세
            </CheckItem>
          </styles.optionListCheckItemContainer>
        </styles.optionListItem>
      </styles.optionList>
    </styles.optionContainer>
  );
}
