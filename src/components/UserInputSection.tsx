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
  mbti: string | undefined;
  major: string | undefined;
  budget: string | undefined;
  features: string[] | null;
  isMySelf: boolean;
  type: string;
  onVitalChange: (
    optionName: keyof SelectedState,
    item: string | number,
  ) => void;
  onOptionChange: (option: string) => void;
  onLocationChange: React.Dispatch<React.SetStateAction<string | undefined>>;
  onMateAgeChange: React.Dispatch<React.SetStateAction<string | undefined>>;
  onMbtiChange: React.Dispatch<React.SetStateAction<string | undefined>>;
  onMajorChange: React.Dispatch<React.SetStateAction<string | undefined>>;
  onBudgetChange: React.Dispatch<React.SetStateAction<string | undefined>>;
  className?: string;
}

export function UserInputSection({
  gender,
  birthYear,
  location,
  mbti,
  major,
  budget,
  features,
  isMySelf,
  type,
  onVitalChange,
  onOptionChange,
  onLocationChange,
  onMateAgeChange,
  onMbtiChange,
  onMajorChange,
  onBudgetChange,
  className,
}: UserInputProps) {
  return (
    <styles.checkContainer className={className}>
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
