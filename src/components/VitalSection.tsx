'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

const styles = {
  vitalContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 0.44rem;
  `,
  vitalDescription: styled.p`
    color: var(--Main-1, #e15637);
    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `,
  vitalListContainer: styled.div`
    width: 37.8125rem;
    height: 17.6875rem;
    flex-shrink: 0;
    display: flex;
    margin-top: 49px;
    gap: 1.63rem;
  `,
  vitalList: styled.ul`
    display: inline-flex;
    height: 17.6875rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 3rem;
    flex-shrink: 0;
    margin-left: 3px;
  `,
  vitalListItem: styled.li`
    color: #000;

    font-family: 'Noto Sans KR';
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    list-style-type: none;
  `,
  vitalCheckList: styled.ul`
    width: 31.25rem;
    height: 17rem;
    flex-shrink: 0;
  `,
  vitalCheckListItem: styled.li`
    display: flex;
    margin-bottom: 27px;
    list-style-type: none;
  `,

  birthYear: styled.select`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    width: 6.125rem;
    height: 3.125rem;
    display: inline-flex;
    padding: 0.75rem 1rem;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border: 2px solid var(--Gray-4, #dfdfdf);
    background: #fff;

    color: var(--Gray-3, #888);
    font-family: 'Noto Sans KR';
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    background-image: url('/Switch down.svg');
    background-repeat: no-repeat;
    background-position: calc(100% - 0.6875rem) center;

    padding-right: 2.75rem;
  `,

  searchBox: styled.div`
    width: 31.25rem;
    height: 3.125rem;
    display: inline-flex;
    padding: 0.51138rem 0.5rem 0.39775rem 1.1875rem;
    align-items: center;
    gap: 13.5rem;
    border: 2px solid var(--Gray-4, #dfdfdf);
    background: var(--White, #fff);
  `,
  mapInput: styled.input`
    color: var(--Gray-3, #888);
    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border: none;
    &:focus {
      outline: none;
    }
  `,
  searchButton: styled.button`
    width: 2.4375rem;
    height: 2.21594rem;
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
  margin-right: 8px;
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
    <styles.vitalContainer>
      <styles.vitalDescription>필수</styles.vitalDescription>
      <styles.vitalListContainer>
        <styles.vitalList>
          <styles.vitalListItem>성별</styles.vitalListItem>
          <styles.vitalListItem>출생 연도</styles.vitalListItem>
          <styles.vitalListItem>희망 지역</styles.vitalListItem>
          <styles.vitalListItem>흡연 여부</styles.vitalListItem>
        </styles.vitalList>
        <styles.vitalCheckList>
          <styles.vitalCheckListItem>
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
          </styles.vitalCheckListItem>
          <styles.vitalCheckListItem>
            <styles.birthYear
              value={selectedYear ?? ''}
              onChange={handleYearChange}
            >
              <option value="">년도</option>
              {years.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </styles.birthYear>
          </styles.vitalCheckListItem>
          <styles.vitalCheckListItem>
            <styles.searchBox>
              <styles.mapInput placeholder="ex) 한국동,한국역,한국대학교" />
              <styles.searchButton />
            </styles.searchBox>
          </styles.vitalCheckListItem>
          <styles.vitalCheckListItem>
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
          </styles.vitalCheckListItem>
        </styles.vitalCheckList>
      </styles.vitalListContainer>
    </styles.vitalContainer>
  );
}
