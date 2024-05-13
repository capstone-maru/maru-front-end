'use client';

import styled from 'styled-components';

import { HorizontalDivider } from '..';

import {
  type DormitorySharedPostListItem,
  type SharedPostListItem,
} from '@/entities/shared-post';

const styles = {
  container: styled.div`
    width: 100%;
    height: 15rem;

    display: flex;
    gap: 1.56rem;
  `,
  thumbnail: styled.img`
    width: 16.125rem;
    height: 12.5rem;

    flex-shrink: 0;
    border-radius: 16px;

    object-fit: cover;
  `,
  content: styled.div`
    flex-grow: 1;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    div {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      h1 {
        color: #000;
        font-family: 'Noto Sans KR';
        font-size: 1.25rem;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      }

      h2 {
        color: var(--Gray-5, #828282);
        font-family: 'Noto Sans KR';
        font-size: 1.125rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }

      p {
        color: var(--Black, #35373a);
        font-family: 'Noto Sans KR';
        font-size: 1rem;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
    }
  `,
  writer: styled.div`
    position: relative;

    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    img {
      border-radius: 50%;
      border: 1px solid #dcddea;
      background: #c4c4c4;

      width: 6.25rem;
      height: 6.25rem;
      flex-shrink: 0;
      border-radius: 50%;

      object-fit: cover;
    }

    p {
      color: #000;
      font-family: 'Noto Sans KR';
      font-size: 1.5rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  `,
  percentage: styled.div`
    position: absolute;
    left: 70%;
    top: 25%;

    display: inline-flex;
    padding: 0.75rem 0.375rem;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    border-radius: 50%;
    background: #fff;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.04);

    p {
      color: #e15637;
      font-family: Pretendard;
      font-size: 1rem;
      font-style: normal;
      font-weight: 600;
      line-height: 1.5rem;
    }
  `,
};

export function PostCard({
  post,
  onClick,
}: {
  post: SharedPostListItem | DormitorySharedPostListItem;
  onClick: () => void;
}) {
  const recruitmentCapacity =
    'roomInfo' in post
      ? post.roomInfo.expectedPayment
      : post.recruitmentCapacity;

  return (
    <div>
      <styles.container onClick={onClick}>
        <styles.thumbnail alt="" src={post.thumbnail.fileName} />
        <styles.content>
          <div>
            <h1>{post.title}</h1>
            <h2>{post.address.roadAddress}</h2>
          </div>
          <div>
            <p>모집 {recruitmentCapacity}명</p>
            {'roomInfo' in post && (
              <>
                <p>
                  {post.roomInfo.roomType} · 방 {post.roomInfo.numberOfRoom} ·
                  화장실 {post.roomInfo.numberOfBathRoom}
                </p>
                <p>희망 월 분담금 {post.roomInfo.expectedPayment}만원</p>
              </>
            )}
          </div>
        </styles.content>
        <styles.writer>
          <img alt="" src={post.publisherAccount.profileImageFileName} />
          <styles.percentage>
            <p>50%</p>
          </styles.percentage>
          <p>{post.publisherAccount.nickname}</p>
        </styles.writer>
      </styles.container>
      <HorizontalDivider />
    </div>
  );
}
