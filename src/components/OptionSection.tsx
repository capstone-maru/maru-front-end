'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

const styles = {
  option_container: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 877px;
    padding: 0 10px 0 10px;
  `,
  option_description: styled.p`
    width: 100%;
    color: #9a95a3;
    font-family: 'Noto Sans KR';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `,
  option_list: styled.ul`
    width: 100%;
    margin: 63px 0 0 0;
  `,
  option_list_item: styled.li`
    display: flex;
    align-items: center;
    gap: 32px;
    margin-bottom: 42px;
  `,
  option_list_img: styled.img`
    width: 50px;
    height: 50px;
  `,
  option_list_check_item_container: styled.div`
    display: flex;
    width: 450px;
    align-items: flex-start;
    align-content: flex-start;
    gap: 8px;
    flex-wrap: wrap;
  `,

  search_box: styled.div`
    width: 500px;
    height: 50px;
    display: flex;
    padding: 8.182px 8px 6.364px 19px;
    justify-content: flex-end;
    align-items: center;
    gap: 210px;
    border: 2px solid var(--Gray-4, #dfdfdf);
    background: var(--White, #fff);
  `,
  map_input: styled.input`
    color: var(--Gray-3, #888);
    font-family: 'Noto Sans KR';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    height: 40px;
    border: none;
    &:focus {
      outline: none;
    }
  `,
  search_button: styled.button`
    width: 39px;
    height: 36px;
    border: none;
    background-color: #fff;
    background-image: url('/search_button.svg');
    background-repeat: no-repeat;
    background-position: right center;
    cursor: pointer;
  `,
};

interface CheckItemProps {
  isSelected: boolean;
}

const CheckItem = styled.div<CheckItemProps>`
  height: 45px;
  display: flex;
  padding: 8px 24px;
  margin: 0 8px 0 0;
  justify-content: center;
  align-items: center;

  border-radius: 26px;
  border: 2px solid #dfdfdf;
  background: #fff;
  cursor: pointer;

  color: #888;

  font-family: 'Noto Sans KR';
  font-size: 20px;
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
    <styles.option_container>
      <styles.option_description>선택</styles.option_description>
      <styles.option_list>
        <styles.option_list_item>
          <styles.option_list_img src="/option-img/Remove red eye.svg" />
          <styles.option_list_check_item_container>
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
          </styles.option_list_check_item_container>
        </styles.option_list_item>
        <styles.option_list_item>
          <styles.option_list_img src="/option-img/Lips.png" />
          <styles.option_list_check_item_container>
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
          </styles.option_list_check_item_container>
        </styles.option_list_item>
        <styles.option_list_item>
          <styles.option_list_img src="/option-img/Hearing.png" />
          <styles.option_list_check_item_container>
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
          </styles.option_list_check_item_container>
        </styles.option_list_item>
        <styles.option_list_item>
          <styles.option_list_img src="/option-img/Standing Man.png" />
          <styles.option_list_check_item_container>
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
          </styles.option_list_check_item_container>
        </styles.option_list_item>
        <styles.option_list_item>
          <styles.option_list_img src="/option-img/Inquiry.png" />
          <styles.option_list_check_item_container>
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
          </styles.option_list_check_item_container>
        </styles.option_list_item>
      </styles.option_list>
    </styles.option_container>
  );
}
