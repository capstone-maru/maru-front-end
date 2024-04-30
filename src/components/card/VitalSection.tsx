'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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
    display: flex;
    padding: 0.5rem 1.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border-radius: 10px;
    border: 2px solid #dfdfdf;
    background: #fff;

    color: #888;

    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `,

  sliderContainer: styled.div`
    width: 22rem;
    height: 1.875rem;
    position: relative;
  `,
  sliderTrack: styled.div`
    width: 100%;
    height: 0.3125rem;
    border-radius: 20px;
    background: #d9d9d9;
    position: absolute;
    top: calc(50% - 2px);
  `,
  sliderFillTrack: styled.div<FillProps>`
    width: ${props => props.$fill};
    height: 0.3125rem;
    border-radius: 2px;
    background: var(--Main-1, #e15637);
    position: absolute;
    top: calc(50% - 2px);
  `,
  slider: styled.input`
    position: absolute;
    width: 100%;
    height: 0.3125rem;
    border-radius: 1.25rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: transparent;
    top: calc(50% - 2px);

    &:focus {
      outline: none;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      pointer-events: all;
      width: 1.875rem;
      height: 1.875rem;
      background-color: #fff;
      border-radius: 50%;
      box-shadow: 0 0 0 1px #c6c6c6;
      cursor: pointer;
      position: relative;
      z-index: 1;
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
    }
  `,
};

interface CheckItemProps {
  $isSelected: boolean;
}

interface FillProps {
  $fill: string;
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
  vitalFeatures,
  onFeatureChange,
  onLocationChange,
  onMateAgeChange,
  isMySelf,
  type,
}: {
  gender: string | undefined;
  birthYear: string | undefined;
  location: string | undefined;
  vitalFeatures: string[] | null;
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
      smoking: vitalFeatures?.[0].split(':')[1],
      room: vitalFeatures?.[1].split(':')[1],
    });
  }, [vitalFeatures]);

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

  const [initialLocation, setInitialLocation] = useState('');
  useEffect(() => {
    if (location !== undefined && type === 'myCard') {
      setInitialLocation(location);
    }
  }, [location]);

  const [locationInput, setLocation] = useState('');
  useEffect(() => {
    setLocation(initialLocation);
  }, [initialLocation]);

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };
  useEffect(() => {
    onLocationChange(locationInput);
  }, [locationInput]);

  const [initialAge, setInitialAge] = useState(0);
  useEffect(() => {
    if (vitalFeatures !== null)
      setInitialAge(Number(vitalFeatures?.[2].split(':')[1].slice(1)));
  }, [vitalFeatures?.[2]]);

  const [ageValue, setAgeValue] = useState<number>(0);
  useEffect(() => {
    if (initialAge !== undefined) setAgeValue(initialAge);
  }, [initialAge]);

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgeValue(Number(e.target.value));
  };
  useEffect(() => {
    const ageString = `±${ageValue}`;
    onMateAgeChange(ageString);
  }, [ageValue]);

  let ageValueString;
  switch (ageValue) {
    case 0:
      ageValueString = '동갑';
      break;
    case 11:
      ageValueString = '상관없어요';
      break;
    default:
      ageValueString = `±${ageValue}년생`;
  }

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
                border: 'none',
                background: 'var(--Gray-5, #828282)',
                color: '#fff',
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
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
              }}
            >
              <styles.sliderContainer>
                <styles.sliderTrack />
                <styles.sliderFillTrack $fill={`${(ageValue / 11) * 100}%`} />
                <styles.slider
                  type="range"
                  min={0}
                  max={11}
                  step={1}
                  value={ageValue}
                  onChange={handleAgeChange}
                />
              </styles.sliderContainer>
              <styles.value>{ageValueString}</styles.value>
            </div>
          )}
        </styles.vitalList>
      </styles.vitalListContainer>
    </styles.vitalContainer>
  );
}
