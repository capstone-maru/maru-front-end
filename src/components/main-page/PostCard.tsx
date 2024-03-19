'use client';

import styled from 'styled-components';

import { type SharedPost } from '@/entities/shared-post';
import { type User } from '@/entities/user';

const styles = {
  container: styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
  `,
  wrapper: styled.div`
    width: 100%;
    height: fit-content;

    display: flex;
    margin-bottom: 38px;
  `,
  thumbnail: styled.img`
    width: 258px;
    height: 200px;
    flex-shrink: 0;
    border-width: 0;
    border-radius: 16px;
    background: #f7f6f9;
  `,
  information: styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    gap: 21px;
    margin-top: 14px;
    margin-left: 22px;

    h1 {
      color: #000;
      font-family: Inter;
      font-size: 24px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

    p {
      color: #000;
      font-family: Inter;
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  `,
  writerInformation: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    img {
      display: flex;
      width: 100px;
      height: 100px;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;

      border-radius: 100px;
      border: 1px solid #dcddea;
      background: #c4c4c4;
    }

    p {
      color: #000;
      font-family: 'Noto Sans KR';
      font-size: 24px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  `,
  divider: styled.hr`
    width: 100%;
    height: 1px;
    border: 1px solid #d3d0d7;
    border-right-width: 0px;
    border-bottom-width: 0px;
    border-left-width: 0px;
  `,
};

function Thumbnail({ alt, url }: { alt?: string; url?: string }) {
  return <styles.thumbnail alt={alt ?? url} src={url} />;
}

interface Prop {
  url?: string;
  post: SharedPost;
  writer: User;
}

export function PostCard({ url, post, writer }: Prop) {
  return (
    <styles.container>
      <styles.wrapper>
        <Thumbnail url={url} />
        <styles.information>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </styles.information>
        <styles.writerInformation>
          <img alt="" />
          <p>{writer.name}</p>
        </styles.writerInformation>
      </styles.wrapper>
      <styles.divider />
    </styles.container>
  );
}
