'use client';

import styled, { keyframes } from 'styled-components';

import { useToast } from '@/features/toast';

const toastAppeared = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-2rem);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const toastDisappeared = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-2rem);
  }
`;

const styles = {
  providerContainer: styled.div`
    position: fixed;
    left: 2rem;
    bottom: 1rem;

    display: flex;
    width: fit-content;
    height: fit-content;
    flex-direction: column;
    gap: 0.5rem;
  `,
  toastContainer: styled.div<{ $isVisible: boolean }>`
    width: fit-content;
    height: fit-content;

    color: white;
    background-color: #e15637;

    padding: 1rem;
    border-radius: 8px;

    animation: ${({ $isVisible }) =>
        $isVisible ? toastAppeared : toastDisappeared}
      200ms ease-in-out;
    z-index: 2147483647;
  `,
  toastMessageContainer: styled.div`
    min-width: 5rem;
    width: fit-content;

    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-weight: bold;
  `,
};

export function ToastProvider() {
  const { toast } = useToast();

  return (
    <styles.providerContainer>
      {toast.map(toastObject => (
        <styles.toastContainer
          key={toastObject.id}
          $isVisible={toastObject.isVisible}
        >
          <styles.toastMessageContainer>
            {toastObject.message}
          </styles.toastMessageContainer>
        </styles.toastContainer>
      ))}
    </styles.providerContainer>
  );
}
