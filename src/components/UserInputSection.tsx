'use client';

import styled from 'styled-components';

import { OptionSection } from './card/OptionSection';
import { VitalSection } from './card/VitalSection';

const styles = {
  checkContainer: styled.div`
    display: flex;
    width: 50rem;
    padding: 2rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    border-radius: 1.875rem;
    background: var(--background, #f7f6f9);
  `,
  horizontalLine: styled.div`
    width: 43.75rem;
    height: 0.0625rem;
    background: var(--Gray-9, #d3d0d7);
  `,
};

interface SelectedState {
  smoking: string | undefined;
  room: string | undefined;
}

interface UserInputProps {
  gender: string | undefined;
  birthYear: string | undefined;
  location: string | undefined;
  features: string[] | null;
  isMySelf: boolean; // 본인 여부
  type: string; // 카드 타입
  mbti: string | undefined;
  major: string | undefined;
  budget: string | undefined;
  onVitalChange: (
    // 흡연 여부, 방 공유 여부
    optionName: keyof SelectedState,
    item: string | number,
  ) => void;
  onOptionChange: (option: string) => void; // 선택 사항 선택 여부
  onLocationChange: React.Dispatch<React.SetStateAction<string | undefined>>; // 희망 지역
  onMateAgeChange: React.Dispatch<React.SetStateAction<string | undefined>>; // 메이트 나이 '±age'
  onMbtiChange: React.Dispatch<React.SetStateAction<string | undefined>>; // mbti
  onMajorChange: React.Dispatch<React.SetStateAction<string | undefined>>; // major
  onBudgetChange: React.Dispatch<React.SetStateAction<string | undefined>>; // 금액 'min,max'
}

export function UserInputSection({
  gender,
  birthYear,
  location,
  features,
  isMySelf,
  type,
  mbti,
  major,
  budget,
  onVitalChange,
  onOptionChange,
  onLocationChange,
  onMateAgeChange,
  onMbtiChange,
  onMajorChange,
  onBudgetChange,
}: UserInputProps) {
  return (
    <styles.checkContainer>
      <VitalSection
        gender={gender}
        birthYear={birthYear}
        location={location}
        vitalFeatures={features}
        onFeatureChange={onVitalChange}
        onLocationChange={onLocationChange}
        onMateAgeChange={onMateAgeChange}
        isMySelf={isMySelf}
        type={type}
      />
      <styles.horizontalLine />
      <OptionSection
        mbti={mbti}
        major={major}
        budget={budget}
        optionFeatures={features}
        onFeatureChange={onOptionChange}
        onMbtiChange={onMbtiChange}
        onMajorChange={onMajorChange}
        onBudgetChange={onBudgetChange}
        isMySelf={isMySelf}
        type={type}
      />
    </styles.checkContainer>
  );
}
