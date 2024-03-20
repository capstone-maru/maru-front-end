'use client';

import styled from 'styled-components';

const styles = {
  switch_container: styled.div`
    display: flex;
  `,
  switch_wrapper: styled.label`
    position: relative;
    display: inline-block;
    width: 40px;
    height: 24px;
  `,
  switch_input: styled.input`
    opacity: 0;
    width: 0;
    height: 0;
  `,
  slider: styled.span<{ $isChecked: boolean }>`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ $isChecked }) =>
      $isChecked ? '#E15637' : '#BEBEBE'};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 24px;
  `,
  slider_dot: styled.span<{ $isChecked: boolean }>`
    position: absolute;
    cursor: pointer;
    top: 4px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    transform: ${({ $isChecked }) =>
      $isChecked ? 'translateX(16px)' : 'translateX(0)'};
  `,
};

interface Props {
  isChecked: boolean;
  onToggle: () => void;
}

export function ToggleSwitch({ isChecked, onToggle }: Props) {
  return (
    <styles.switch_container>
      <styles.switch_wrapper>
        <styles.switch_input
          type="checkbox"
          checked={isChecked}
          onChange={onToggle}
        />
        <styles.slider $isChecked={isChecked}>
          <styles.slider_dot $isChecked={isChecked} />
        </styles.slider>
      </styles.switch_wrapper>
    </styles.switch_container>
  );
}
