'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { CleanTest } from './card/CleanTest';
import { MajorSelector } from './card/MajorSelector';
import { MbtiToggle } from './card/MbtiToggle';
import { Slider } from './card/Slider';

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
    gap: 4rem;
    width: 100%;
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
  '엠비티아이',
  '전공',
];

export function OptionSection({
  optionFeatures,
  onFeatureChange,
  onMbtiChange,
  onMajorChange,
  onBudgetChange,
  isMySelf,
  type,
}: {
  optionFeatures: string[] | null;
  onFeatureChange: (option: string) => void;
  onMbtiChange: React.Dispatch<React.SetStateAction<string>>;
  onMajorChange: React.Dispatch<React.SetStateAction<string>>;
  onBudgetChange: React.Dispatch<React.SetStateAction<string>>;
  isMySelf: boolean;
  type: string;
}) {
  type SelectedOptions = Record<string, boolean>;
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

  useEffect(() => {
    if (optionFeatures !== null) {
      const initialOptions: SelectedOptions = {};
      optionFeatures.forEach(option => {
        initialOptions[option] = true;
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
    setIsTestSelected(true);
    setIsMbtiSelected(false);
  };

  const [budgetMin, setBudgetMin] = useState(0);
  const [budgetMax, setBudgetMax] = useState(355);
  const handleBudgetChange = (min: number, max: number) => {
    setBudgetMin(min);
    setBudgetMax(max);
  };

  const [isTestSelected, setIsTestSelected] = useState(false);
  const [isMajorSelected, setIsMajorSelected] = useState(false);
  const [isMbtiSelected, setIsMbtiSelected] = useState(false);

  const [mbti, setMbti] = useState('');
  const [major, setMajor] = useState('');

  useEffect(() => {
    onMbtiChange(mbti);
  }, [mbti]);

  useEffect(() => {
    onMajorChange(major);
  }, [major]);

  useEffect(() => {
    const budgetString = `${budgetMin},${budgetMax}만원`;
    onBudgetChange(budgetString);
  }, [budgetMin, budgetMax]);

  const handleMajorSelect = () => {
    setIsMajorSelected(true);
    setIsTestSelected(false);
    setIsMbtiSelected(false);
  };

  const handleMbtiSelect = () => {
    setIsMajorSelected(false);
    setIsTestSelected(false);
    setIsMbtiSelected(true);
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
                <CheckItem $isSelected={score >= 0 && score < 5.34}>
                  상
                </CheckItem>
                <CheckItem $isSelected={score > 5.34 && score < 10.67}>
                  평범보통
                </CheckItem>
                <CheckItem $isSelected={score > 10.67}>천하태평</CheckItem>
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
                    if (option === '엠비티아이') {
                      handleMbtiSelect();
                    }
                    if (option === '전공') {
                      handleMajorSelect();
                    }
                  }}
                >
                  {option === '엠비티아이' ? <>MBTI</> : option}
                </CheckItem>
              ))}
              {selectedOptions['전공'] && isMajorSelected ? (
                <MajorSelector onChange={setMajor} />
              ) : null}
              {selectedOptions['엠비티아이'] && isMbtiSelected ? (
                <MbtiToggle onChange={setMbti} />
              ) : null}
            </styles.personalContainer>
          </styles.optionListItem>
          <styles.optionListItem>
            <styles.optionListImg src="/option-img/home_work.svg" />
            <styles.optionListCheckItemContainer>
              <styles.budgetContainer>
                <CheckItem $isSelected={false}>금액</CheckItem>
                <Slider
                  min={0}
                  max={355}
                  step={5}
                  onChange={handleBudgetChange}
                />
              </styles.budgetContainer>
              <styles.value>
                {`${budgetMin === 0 ? '0원' : `${budgetMin}만원`}`} ~{' '}
                {`${budgetMax === 355 ? '무제한' : `${budgetMax}만원`}`}
              </styles.value>
            </styles.optionListCheckItemContainer>
          </styles.optionListItem>
        </styles.optionList>
      </styles.optionContainer>
    </styles.container>
  );
}
