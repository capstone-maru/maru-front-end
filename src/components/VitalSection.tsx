'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Slider } from './card/Slider';

const styles = {
  vitalContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    align-self: stretch;
  `,
  vitalDescription: styled.p`
    width: 2.6875rem;
    color: var(--Main-1, #e15637);
    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `,
  vitalListContainer: styled.ul`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    align-self: stretch;
  `,
  vitalList: styled.li`
    display: flex;
    align-items: center;
    gap: 2rem;
    align-self: stretch;
  `,
  vitalListItemDescription: styled.p`
    width: 5rem;
    color: var(--Main-2, #767d86);
    font-family: 'Noto Sans KR';
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    list-style-type: none;
  `,
  vitalCheckListContainer: styled.div`
    display: inline-flex;
    align-items: flex-start;
    gap: 0.5rem;
  `,

  birthYear: styled.select`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    width: 6.7rem;
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

    background-image: url('/drop-icon.svg');
    background-repeat: no-repeat;
    background-position: calc(100% - 0.6875rem) center;

    padding-right: 2.75rem;
  `,

  searchBox: styled.div`
    display: flex;
    padding: 0.875rem 3.0625rem 0.8125rem 1.1875rem;
    align-items: center;
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
  value: styled.span`
    color: #000;

    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `,
};

interface CheckItemProps {
  $isSelected: boolean;
}

const CheckItem = styled.div<CheckItemProps>`
  margin-right: 0.5rem;
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

const years = Array.from({ length: 100 }, (_, index) => 2024 - index);

interface SelectedState {
  smoking: string | undefined;
  room: string | undefined;
}

export function VitalSection({
  gender,
  birthYear,
  location,
  smoking,
  room,
  onFeatureChange,
  onLocationChange,
  onMateAgeChange,
  isMySelf,
  type,
}: {
  gender: string | undefined;
  birthYear: string | undefined;
  location: string | undefined;
  smoking: string | undefined;
  room: string | undefined;
  onFeatureChange: (
    optionName: keyof SelectedState,
    item: string | number,
  ) => void;
  onLocationChange: React.Dispatch<React.SetStateAction<string | undefined>>;
  onMateAgeChange: React.Dispatch<React.SetStateAction<string | undefined>>;
  isMySelf: boolean;
  type: string;
}) {
  const [selectedState, setSelectedState] = useState<SelectedState>({
    smoking: undefined,
    room: undefined,
  });
  useEffect(() => {
    setSelectedState({
      ...selectedState,
      smoking: smoking,
      room: room,
    });
  }, [smoking, room]);

  function handleOptionClick(
    optionName: keyof SelectedState,
    item: string | number,
  ) {
    setSelectedState(prevState => ({
      ...prevState,
      [optionName]: prevState[optionName] === item ? null : item,
    }));
    onFeatureChange(optionName, item);
  }

  const [locationInput, setLocation] = useState(location);
  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  useEffect(() => {
    onLocationChange(locationInput);
  }, [locationInput]);

  const [mateMinAge, setMateMinAge] = useState(0);
  const [mateMaxAge, setMateMaxAge] = useState(11);
  const handleAgeChange = (min: number, max: number) => {
    setMateMinAge(min);
    setMateMaxAge(max);
  };

  useEffect(() => {
    const ageString = `±${mateMinAge}~${mateMaxAge}세`;
    onMateAgeChange(ageString);
  }, [mateMinAge, mateMaxAge]);

  return (
    <styles.vitalContainer>
      <styles.vitalDescription>필수</styles.vitalDescription>
      <styles.vitalListContainer>
        <styles.vitalList>
          <styles.vitalListItemDescription>
            성별
          </styles.vitalListItemDescription>
          <styles.vitalCheckListContainer>
            <CheckItem
              $isSelected={gender === 'MALE'}
              style={{
                border: gender === 'MALE' ? 'none' : '',
                background: gender === 'MALE' ? 'var(--Gray-5, #828282)' : '',
                color: gender === 'MALE' ? '#fff' : '',
              }}
            >
              남성
            </CheckItem>
            <CheckItem
              $isSelected={gender === 'FEMALE'}
              style={{
                border: gender === 'FEMALE' ? 'none' : '',
                background: gender === 'FEMALE' ? 'var(--Gray-5, #828282)' : '',
                color: gender === 'FEMALE' ? '#fff' : '',
              }}
            >
              여성
            </CheckItem>
          </styles.vitalCheckListContainer>
        </styles.vitalList>
        <styles.vitalList>
          <styles.vitalListItemDescription>
            희망 지역
          </styles.vitalListItemDescription>
          {type === 'myCard' ? (
            <styles.searchBox>
              <styles.mapInput
                placeholder="ex) 한국동,한국역,한국대학교"
                readOnly={!isMySelf}
                value={locationInput ?? ''}
                onChange={handleLocationChange}
              />
            </styles.searchBox>
          ) : (
            <CheckItem
              $isSelected
              style={{
                border: gender === 'FEMALE' ? 'none' : '',
                background: gender === 'FEMALE' ? 'var(--Gray-5, #828282)' : '',
                color: gender === 'FEMALE' ? '#fff' : '',
              }}
            >
              {location}
            </CheckItem>
          )}
        </styles.vitalList>
        <styles.vitalList>
          <styles.vitalListItemDescription>
            흡연 여부
          </styles.vitalListItemDescription>
          <styles.vitalCheckListContainer>
            <CheckItem
              $isSelected={selectedState.smoking === '흡연'}
              onClick={() => {
                if (isMySelf) {
                  handleOptionClick('smoking', '흡연');
                }
              }}
            >
              흡연
            </CheckItem>
            <CheckItem
              $isSelected={selectedState.smoking === '비흡연'}
              onClick={() => {
                if (isMySelf) {
                  handleOptionClick('smoking', '비흡연');
                }
              }}
            >
              비흡연
            </CheckItem>
            <CheckItem
              $isSelected={selectedState.smoking === '상관없어요'}
              onClick={() => {
                if (isMySelf) {
                  handleOptionClick('smoking', '상관없어요');
                }
              }}
            >
              상관없어요
            </CheckItem>
          </styles.vitalCheckListContainer>
        </styles.vitalList>
        <styles.vitalList>
          <styles.vitalListItemDescription>
            메이트와
          </styles.vitalListItemDescription>
          <styles.vitalCheckListContainer>
            <CheckItem
              $isSelected={selectedState.room === '같은 방'}
              onClick={() => {
                if (isMySelf) {
                  handleOptionClick('room', '같은 방');
                }
              }}
            >
              같은 방
            </CheckItem>
            <CheckItem
              $isSelected={selectedState.room === '다른 방'}
              onClick={() => {
                if (isMySelf) {
                  handleOptionClick('room', '다른 방');
                }
              }}
            >
              다른 방
            </CheckItem>
            <CheckItem
              $isSelected={selectedState.room === '상관없어요'}
              onClick={() => {
                if (isMySelf) {
                  handleOptionClick('room', '상관없어요');
                }
              }}
            >
              상관없어요
            </CheckItem>
          </styles.vitalCheckListContainer>
        </styles.vitalList>
        <styles.vitalList>
          <styles.vitalListItemDescription>
            출생 연도
          </styles.vitalListItemDescription>
          {type === 'myCard' ? (
            <styles.birthYear
              value={birthYear}
              disabled={birthYear !== undefined || !isMySelf}
            >
              <option value="">년도</option>
              {years.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </styles.birthYear>
          ) : (
            <>
              <Slider min={0} max={11} step={1} onChange={handleAgeChange} />
              <styles.value>
                {`${mateMinAge === 0 ? '동갑' : `±${mateMinAge}세`}`} ~{' '}
                {`${mateMaxAge === 11 ? '무제한' : `±${mateMaxAge}세`}`}
              </styles.value>
            </>
          )}
        </styles.vitalList>
      </styles.vitalListContainer>
    </styles.vitalContainer>
  );
}
