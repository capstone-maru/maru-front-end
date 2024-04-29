'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { CleanTest } from './CleanTest';
import { MajorSelector } from './MajorSelector';
import { MbtiToggle } from './MbtiToggle';
import { Slider } from './Slider';

const styles = {
  container: styled.div`
    width: 46rem;
    height: 43.875rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,
  optionContainer: styled.div`
    display: flex;
    width: 46rem;
    height: 41.4375rem;
    padding-bottom: 6rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    flex-shrink: 0;
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
    position: relative;
    width: 100%;
  `,
  optionListItem: styled.li`
    display: flex;
    align-items: center;
    gap: 4rem;
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
    position: relative;
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
  budgetContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
  `,
  value: styled.div`
    display: flex;
    width: 6.8rem;
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

const EatingOptions = ['실내취식 싫어요', '야식 안먹어요', '음주'];
const HearingOptions = [
  '잠버릇 있어요',
  '알람 잘 못 들어요',
  '잠귀 밝아요',
  '게임 소음 허용',
];
const WeatherOptions = ['더위 많이 타요', '추위 많이 타요'];
const PersonalOptions = [
  '반려동물',
  '차량 보유',
  '집에서 활동',
  '밖에서 활동',
  '친구초대 허용',
  '취미 같이 즐겨요',
];

export function OptionSection({
  mbti,
  major,
  budget,
  optionFeatures,
  onFeatureChange,
  onMbtiChange,
  onMajorChange,
  onBudgetChange,
  isMySelf,
  type,
}: {
  mbti: string | undefined;
  major: string | undefined;
  budget: string | undefined;
  optionFeatures: string[] | null;
  onFeatureChange: (option: string) => void;
  onMbtiChange: React.Dispatch<React.SetStateAction<string | undefined>>;
  onMajorChange: React.Dispatch<React.SetStateAction<string | undefined>>;
  onBudgetChange: React.Dispatch<React.SetStateAction<string | undefined>>;
  isMySelf: boolean;
  type: string;
}) {
  type SelectedOptions = Record<string, boolean>;
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

  const majorArray = ['공학', '교육', '인문', '사회', '자연', '예체능', '의약'];

  useEffect(() => {
    if (optionFeatures !== null) {
      const initialOptions: SelectedOptions = {};
      const optionsString = optionFeatures[3].split(':')[1];
      const budgetIdx = optionsString.indexOf('[');

      const options = optionsString.slice(0, budgetIdx).split(',');
      options.forEach(option => {
        if (
          !option.includes('E') &&
          !option.includes('I') &&
          !majorArray.includes(option)
        ) {
          initialOptions[option] = true;
        }
      });
      setSelectedOptions(initialOptions);
    }
  }, [optionFeatures]);

  const handleOptionClick = (option: string) => {
    setSelectedOptions(prevSelectedOptions => ({
      ...prevSelectedOptions,
      [option]: !prevSelectedOptions[option],
    }));
    onFeatureChange(option);
  };

  const [isTestVisible, setIsTestVisible] = useState(false);
  const [score, setScore] = useState(-1);

  const toggleTestVisibility = () => {
    setIsTestVisible(prev => !prev);
    setIsMajorSelected(false);
    setIsTestSelected(!isTestSelected);
    setIsMbtiSelected(false);
  };

  useEffect(() => {
    if (score < 5.34 && score > 0) {
      if (!selectedOptions['상']) handleOptionClick('상');
      if (selectedOptions['평범보통']) handleOptionClick('평범보통');
      if (selectedOptions['천하태평']) handleOptionClick('천하태평');
    }
    if (score > 5.34 && score < 10.67) {
      if (!selectedOptions['평범보통']) handleOptionClick('평범보통');
      if (selectedOptions['상']) handleOptionClick('상');
      if (selectedOptions['천하태평']) handleOptionClick('천하태평');
    }
    if (score > 10.67) {
      if (!selectedOptions['천하태평']) handleOptionClick('천하태평');
      if (selectedOptions['평범보통']) handleOptionClick('평범보통');
      if (selectedOptions['상']) handleOptionClick('상');
    }
  }, [score]);

  const [initialMin, setInitialMin] = useState(0);
  const [initialMax, setInitialMax] = useState(355);

  useEffect(() => {
    if (budget !== undefined) {
      const [min, max] = budget.split(',').map(Number);
      setInitialMin(min);
      setInitialMax(max);
    }
  }, [budget]);

  const [budgetMin, setBudgetMin] = useState(0);
  const [budgetMax, setBudgetMax] = useState(355);
  useEffect(() => {
    setBudgetMin(initialMin);
    setBudgetMax(initialMax);
  }, [initialMin, initialMax]);

  const handleBudgetChange = (min: number, max: number) => {
    setBudgetMin(min);
    setBudgetMax(max);
  };

  const [isTestSelected, setIsTestSelected] = useState(false);
  const [isMajorSelected, setIsMajorSelected] = useState(false);
  const [isMbtiSelected, setIsMbtiSelected] = useState(false);

  const [selectedMbti, setMbti] = useState('');
  useEffect(() => {
    if (mbti !== undefined) {
      setMbti(mbti);
    }
  }, [mbti]);

  const [selectedMajor, setMajor] = useState('');
  useEffect(() => {
    if (major !== undefined) {
      setMajor(major);
    }
  }, [major]);

  useEffect(() => {
    onMbtiChange(selectedMbti);
  }, [selectedMbti]);

  useEffect(() => {
    onMajorChange(selectedMajor);
  }, [selectedMajor]);

  useEffect(() => {
    const budgetString = `[${budgetMin},${budgetMax}]`;
    onBudgetChange(budgetString);
  }, [budgetMin, budgetMax]);

  const handleMajorSelect = () => {
    setIsMajorSelected(!isMajorSelected);
    setIsTestSelected(false);
    setIsMbtiSelected(false);
  };

  const handleMbtiSelect = () => {
    setIsMajorSelected(false);
    setIsTestSelected(false);
    setIsMbtiSelected(!isMbtiSelected);
  };

  return (
    <styles.container>
      <styles.optionDescription>선택</styles.optionDescription>
      <styles.optionContainer>
        <styles.optionList>
          <styles.optionListItem>
            <styles.optionListImg src="/option-img/visibility.svg" />
            <styles.optionListCheckItemContainer>
              <CheckItem
                $isSelected={selectedOptions['아침형']}
                onClick={() => {
                  if (isMySelf) {
                    handleOptionClick('아침형');
                    if (selectedOptions['올빼미형'])
                      handleOptionClick('올빼미형');
                  }
                }}
              >
                아침형
              </CheckItem>
              <CheckItem
                $isSelected={selectedOptions['올빼미형']}
                onClick={() => {
                  if (isMySelf) {
                    handleOptionClick('올빼미형');
                    if (selectedOptions['아침형']) handleOptionClick('아침형');
                  }
                }}
              >
                올빼미형
              </CheckItem>
            </styles.optionListCheckItemContainer>
          </styles.optionListItem>
          <styles.optionListItem>
            <styles.optionListImg src="/option-img/restaurant.svg" />
            <styles.optionListCheckItemContainer>
              {EatingOptions.map(option => (
                <CheckItem
                  key={option}
                  $isSelected={selectedOptions[option]}
                  onClick={() => {
                    if (isMySelf) {
                      handleOptionClick(option);
                    }
                  }}
                >
                  {option}
                </CheckItem>
              ))}
            </styles.optionListCheckItemContainer>
          </styles.optionListItem>
          <styles.optionListItem>
            <styles.optionListImg src="/option-img/hearing.svg" />
            <styles.optionListCheckItemContainer>
              {HearingOptions.map(option => (
                <CheckItem
                  key={option}
                  $isSelected={selectedOptions[option]}
                  onClick={() => {
                    if (isMySelf) {
                      handleOptionClick(option);
                    }
                  }}
                >
                  {option}
                </CheckItem>
              ))}
            </styles.optionListCheckItemContainer>
          </styles.optionListItem>
          <styles.optionListItem>
            <styles.optionListImg src="/option-img/device_thermostat.svg" />
            <styles.optionListCheckItemContainer>
              {WeatherOptions.map(option => (
                <CheckItem
                  key={option}
                  $isSelected={selectedOptions[option]}
                  onClick={() => {
                    if (isMySelf) {
                      handleOptionClick(option);
                    }
                  }}
                >
                  {option}
                </CheckItem>
              ))}
            </styles.optionListCheckItemContainer>
          </styles.optionListItem>
          <styles.optionListItem>
            <styles.optionListImg src="/option-img/mop.svg" />
            {type === 'myCard' ? (
              <styles.optionListCheckItemContainer>
                <styles.cleanTestContainer>
                  <styles.cleanTestDescription
                    onClick={() => {
                      toggleTestVisibility();
                    }}
                  >
                    {isTestVisible ? '결과 확인하기' : '테스트 하기'}
                  </styles.cleanTestDescription>
                </styles.cleanTestContainer>
                <CheckItem $isSelected={selectedOptions['상']}>상</CheckItem>
                <CheckItem $isSelected={selectedOptions['평범보통']}>
                  평범보통
                </CheckItem>
                <CheckItem $isSelected={selectedOptions['천하태평']}>
                  천하태평
                </CheckItem>
              </styles.optionListCheckItemContainer>
            ) : (
              <styles.optionListCheckItemContainer>
                <CheckItem
                  $isSelected={selectedOptions['상']}
                  onClick={() => {
                    if (isMySelf) {
                      handleOptionClick('상');
                      if (selectedOptions['평범보통'])
                        handleOptionClick('평범보통');
                      if (selectedOptions['천하태평'])
                        handleOptionClick('천하태평');
                    }
                  }}
                >
                  상
                </CheckItem>
                <CheckItem
                  $isSelected={selectedOptions['평범보통']}
                  onClick={() => {
                    if (isMySelf) {
                      handleOptionClick('평범보통');
                      if (selectedOptions['상']) handleOptionClick('상');
                      if (selectedOptions['천하태평'])
                        handleOptionClick('천하태평');
                    }
                  }}
                >
                  평범보통
                </CheckItem>
                <CheckItem
                  $isSelected={selectedOptions['천하태평']}
                  onClick={() => {
                    if (isMySelf) {
                      handleOptionClick('천하태평');
                      if (selectedOptions['상']) handleOptionClick('상');
                      if (selectedOptions['평범보통'])
                        handleOptionClick('평범보통');
                    }
                  }}
                >
                  천하태평
                </CheckItem>
              </styles.optionListCheckItemContainer>
            )}
          </styles.optionListItem>
          {isTestVisible && isTestSelected && (
            <CleanTest onComplete={setScore} />
          )}
          <styles.optionListItem>
            <styles.optionListImg src="/option-img/person.svg" />
            <styles.personalContainer>
              {PersonalOptions.map(option => (
                <CheckItem
                  key={option}
                  $isSelected={selectedOptions[option]}
                  onClick={() => {
                    if (isMySelf) {
                      handleOptionClick(option);
                    }
                  }}
                >
                  {option}
                </CheckItem>
              ))}
              <CheckItem
                $isSelected={selectedOptions['엠비티아이']}
                onClick={() => {
                  if (isMySelf) {
                    handleMbtiSelect();
                  }
                }}
              >
                MBTI
              </CheckItem>
              <CheckItem
                $isSelected={selectedOptions['전공']}
                onClick={() => {
                  if (isMySelf) {
                    handleMajorSelect();
                  }
                }}
              >
                전공
              </CheckItem>
              {isMajorSelected ? (
                <MajorSelector major={major} onChange={setMajor} />
              ) : null}
              {isMbtiSelected ? (
                <MbtiToggle mbti={mbti} onChange={setMbti} />
              ) : null}
            </styles.personalContainer>
          </styles.optionListItem>
          <styles.optionListItem>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.2rem',
              }}
            >
              <styles.optionListImg src="/option-img/home_work.svg" />
              <span
                style={{
                  color: '#888',
                  fontFamily: 'Noto Sans KR',
                  fontSize: '1rem',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  lineHeight: 'normal',
                }}
              >
                금액
              </span>
            </div>
            <styles.optionListCheckItemContainer>
              <styles.budgetContainer>
                <styles.value>{`${budgetMin === 0 ? '0원' : `${budgetMin ?? ''}만원`}`}</styles.value>
                <Slider
                  min={0}
                  max={355}
                  step={5}
                  initialMin={initialMin}
                  initialMax={initialMax}
                  onChange={handleBudgetChange}
                />
                <styles.value>
                  {`${budgetMax === 355 ? '무제한' : `${budgetMax ?? ''}만원`}`}
                </styles.value>
              </styles.budgetContainer>
            </styles.optionListCheckItemContainer>
          </styles.optionListItem>
        </styles.optionList>
      </styles.optionContainer>
    </styles.container>
  );
}
