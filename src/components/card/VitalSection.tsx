'use client';

import React, { useCallback, useEffect, useState } from 'react';
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

const years = Array.from(
  { length: 100 },
  (_, index) => new Date().getFullYear() - index,
);

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
  gender?: string;
  birthYear?: string;
  location?: string;
  vitalFeatures?: {
    smoking?: string;
    roomSharingOption?: string;
    mateAge?: number;
    options?: Set<string>;
  };
  onFeatureChange: (
    key: 'smoking' | 'roomSharingOption' | 'mateAge',
    value: string,
  ) => void;
  onLocationChange: React.Dispatch<React.SetStateAction<string | undefined>>;
  onMateAgeChange: React.Dispatch<React.SetStateAction<number | undefined>>;
  isMySelf: boolean;
  type: string;
}) {
  const [features, setFeatures] = useState<{
    smoking?: string;
    roomSharingOption?: string;
    mateAge?: number;
  }>();

  useEffect(() => {
    if (vitalFeatures != null) {
      const data = {
        smoking: vitalFeatures.smoking ?? '상관없어요',
        roomSharingOption: vitalFeatures.roomSharingOption ?? '상관없어요',
        mateAge: vitalFeatures.mateAge ?? 0,
      };

      setFeatures(data);
    }
  }, []);

  const handleEssentialFeatureChange = useCallback(
    (key: 'smoking' | 'roomSharingOption' | 'mateAge', value: string) => {
      setFeatures(prev => {
        if (prev?.[key] === value) {
          return { ...prev, [key]: undefined };
        }
        return { ...prev, [key]: value };
      });
      onFeatureChange(key, value);
    },
    [onFeatureChange],
  );

  const [initialLocation, setInitialLocation] = useState('');
  useEffect(() => {
    if (location !== undefined && type === 'myCard') {
      setInitialLocation(location);
    }
  }, [location, type]);

  const [locationInput, setLocation] = useState('');
  useEffect(() => {
    setLocation(initialLocation);
  }, [initialLocation]);

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  useEffect(() => {
    onLocationChange(locationInput);
  }, [onLocationChange, locationInput]);

  const [initialAge, setInitialAge] = useState<number>(0);
  const [ageValue, setAgeValue] = useState<number>(0);

  useEffect(() => {
    if (vitalFeatures?.mateAge != null) setInitialAge(vitalFeatures.mateAge);
  }, [vitalFeatures?.mateAge]);

  useEffect(() => {
    if (initialAge != null) setAgeValue(initialAge);
  }, [initialAge]);

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!Number.isNaN(e.target.value)) {
      const n = Number(e.target.value);
      setAgeValue(n);
      onMateAgeChange(n === 11 ? undefined : n);
    }
  };

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
              $isSelected={features?.smoking === '흡연'}
              onClick={() => {
                if (isMySelf) {
                  handleEssentialFeatureChange('smoking', '흡연');
                }
              }}
            >
              흡연
            </CheckItem>
            <CheckItem
              $isSelected={features?.smoking === '비흡연'}
              onClick={() => {
                if (isMySelf) {
                  handleEssentialFeatureChange('smoking', '비흡연');
                }
              }}
            >
              비흡연
            </CheckItem>
            <CheckItem
              $isSelected={features?.smoking === '상관없어요'}
              onClick={() => {
                if (isMySelf) {
                  handleEssentialFeatureChange('smoking', '상관없어요');
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
              $isSelected={features?.roomSharingOption === '같은 방'}
              onClick={() => {
                if (isMySelf) {
                  handleEssentialFeatureChange('roomSharingOption', '같은 방');
                }
              }}
            >
              같은 방
            </CheckItem>
            <CheckItem
              $isSelected={features?.roomSharingOption === '다른 방'}
              onClick={() => {
                if (isMySelf) {
                  handleEssentialFeatureChange('roomSharingOption', '다른 방');
                }
              }}
            >
              다른 방
            </CheckItem>
            <CheckItem
              $isSelected={features?.roomSharingOption === '상관없어요'}
              onClick={() => {
                if (isMySelf) {
                  handleEssentialFeatureChange(
                    'roomSharingOption',
                    '상관없어요',
                  );
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
