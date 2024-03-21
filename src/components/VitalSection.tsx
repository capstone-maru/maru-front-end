'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

const styles = {
  vital_container: styled.div`
    display: flex;
    flex-flow: wrap;
    width: 100%;
    padding: 0 10px 0 10px;
  `,
  vital_description: styled.p`
    color: var(--Main-1, #e15637);
    font-family: 'Noto Sans KR';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    width: 100%;
  `,
  vital_list: styled.ul`
    width: 79px;
    height: 283px;
    margin: 49px 0 31px 3px;
  `,
  vital_list_item: styled.li`
    margin-bottom: 48px;
    width: 76px;
    color: #000;

    font-family: 'Noto Sans KR';
    font-size: 19px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    list-style-type: none;
  `,
  vital_check_list: styled.ul`
    width: 70%;
    height: 198px;
    margin: 49px 0 0 26px;
  `,
  vital_check_list_item: styled.li`
    display: flex;
    margin-bottom: 29px;
    list-style-type: none;
  `,

  birth_year: styled.select`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    width: 109px;
    height: 45px;
    display: inline-flex;
    padding: 8px 16px;
    justify-content: center;
    align-items: center;
    gap: 16px;
    border: 2px solid var(--Gray-4, #dfdfdf);
    background: #fff;

    color: var(--Gray-3, #888);
    font-family: 'Noto Sans KR';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    background-image: url('/Switch down.svg');
    background-repeat: no-repeat;
    background-position: calc(100% - 11px) center;

    padding-right: 44px;
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

const years = Array.from({ length: 100 }, (_, index) => 2024 - index);

export function VitalSection() {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedSmoking, setSelectedSmoking] = useState<string | null>(null);

  function handleGenderClick(item: string) {
    setSelectedGender(prevSelectedItem =>
      prevSelectedItem === item ? null : item,
    );
  }

  function handleSmokingClick(item: string) {
    setSelectedSmoking(prevSelectedItem =>
      prevSelectedItem === item ? null : item,
    );
  }

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const yearValue = parseInt(event.target.value, 10);
    setSelectedYear(Number.isNaN(yearValue) ? null : yearValue);
  };
  return (
    <styles.vital_container>
      <styles.vital_description>필수</styles.vital_description>
      <styles.vital_list>
        <styles.vital_list_item>성별</styles.vital_list_item>
        <styles.vital_list_item>출생 연도</styles.vital_list_item>
        <styles.vital_list_item>희망 지역</styles.vital_list_item>
        <styles.vital_list_item>흡연 여부</styles.vital_list_item>
      </styles.vital_list>
      <styles.vital_check_list>
        <styles.vital_check_list_item>
          <CheckItem
            isSelected={selectedGender === '남성'}
            onClick={() => {
              handleGenderClick('남성');
            }}
          >
            남성
          </CheckItem>
          <CheckItem
            isSelected={selectedGender === '여성'}
            onClick={() => {
              handleGenderClick('여성');
            }}
          >
            여성
          </CheckItem>
        </styles.vital_check_list_item>
        <styles.vital_check_list_item>
          <styles.birth_year
            value={selectedYear ?? ''}
            onChange={handleYearChange}
          >
            <option value="">년도</option>
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </styles.birth_year>
        </styles.vital_check_list_item>
        <styles.vital_check_list_item>
          <styles.search_box>
            <styles.map_input placeholder="ex) 한국동,한국역,한국대학교" />
            <styles.search_button />
          </styles.search_box>
        </styles.vital_check_list_item>
        <styles.vital_check_list_item>
          <CheckItem
            isSelected={selectedSmoking === '흡연'}
            onClick={() => {
              handleSmokingClick('흡연');
            }}
          >
            흡연
          </CheckItem>
          <CheckItem
            isSelected={selectedSmoking === '비흡연'}
            onClick={() => {
              handleSmokingClick('비흡연');
            }}
          >
            비흡연
          </CheckItem>
        </styles.vital_check_list_item>
      </styles.vital_check_list>
    </styles.vital_container>
  );
}
