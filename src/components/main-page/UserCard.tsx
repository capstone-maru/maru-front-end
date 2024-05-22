'use client';

import styled from 'styled-components';

import { CircularProfileImage } from '@/components';
import { useIsMobile } from '@/shared/mobile';

const styles = {
  container: styled.div`
    width: 16.625rem;
    height: 18.75rem;
    flex-shrink: 0;
    border-radius: 20px;
    background: var(--Gray-1, #f7f6f9);

    padding: 1.88rem 1.25rem;

    @media (max-width: 768px) {
      width: 9.8125rem;
      height: 11.3125rem;
      padding: 1.5rem 0.75rem 1.0625rem 1rem;
    }
  `,
  profileInfo: styled.div`
    display: flex;
    align-items: center;
    gap: 1.44rem;

    @media (max-width: 768px) {
      gap: 0.8rem;
    }

    margin-bottom: 1.25rem;

    div {
      display: flex;
      flex-direction: column;

      h1 {
        color: #000;
        font-family: 'Noto Sans KR';
        font-size: 1.125rem;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        margin-bottom: 0.5rem;

        @media (max-width: 768px) {
          font-size: 0.75rem;
        }
      }

      p {
        color: #000;
        font-family: 'Noto Sans KR';
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        margin-bottom: 0.25rem;

        @media (max-width: 768px) {
          font-size: 0.625rem;
        }
      }
    }
  `,
  data: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    padding: 0 1.06rem;

    color: #000;
    font-family: 'Noto Sans KR';
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    .selected {
      color: #e15637;
    }

    @media (max-width: 768px) {
      font-size: 0.625rem;
    }
  `,
};

export function UserCard({
  name,
  location,
  percentage,
  profileImage,
  smoking,
  roomSharingOption,
  mateAge,
  hideScore,
}: {
  name: string;
  location: string;
  percentage: number;
  profileImage: string;
  smoking: string;
  roomSharingOption: string;
  mateAge?: number;
  hideScore?: boolean;
}) {
  const isMobile = useIsMobile();
  return (
    <styles.container>
      <styles.profileInfo>
        {isMobile ? (
          <CircularProfileImage
            diameter={65}
            percentage={percentage}
            url={'/profile_img_nonpercent.png'}
            hideScore={hideScore}
          />
        ) : (
          <CircularProfileImage
            diameter={110}
            percentage={percentage}
            url={'/profile_img_nonpercent.png'}
            hideScore={hideScore}
          />
        )}
        <div>
          <h1>{name}</h1>
          <p>{location}</p>
        </div>
      </styles.profileInfo>
      <styles.data>
        <p>흡연 여부: {smoking}</p>
        <p>룸메이트와: {roomSharingOption}</p>
        <p>메이트 나이: {mateAge == null ? '상관없어요' : `±${mateAge}`}</p>
      </styles.data>
    </styles.container>
  );
}
