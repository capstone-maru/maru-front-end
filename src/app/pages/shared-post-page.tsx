'use client';

import styled from 'styled-components';

import { Bookmark, CircularProgressBar } from '@/components';
import { ImageGrid } from '@/components/detail-page';
import { type SharedPost } from '@/entities/shared-post';
import { type User } from '@/entities/user';

const styles = {
  container: styled.div`
    background: var(--background, #f7f6f9);

    position: relative;
    left: -240px;
    width: 100dvw;
    min-height: 100%;
    height: fit-content;

    display: flex;
    justify-content: center;
    align-items: stretch;
    padding: 48px 0;
    gap: 15px;

    overflow: auto;
  `,
  houseInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    width: 50%;
    min-height: 80dvh;
    height: 100%;
    border-radius: 16px;
    background: #fff;
    padding: 24px;
  `,
  hostInfo: styled.div`
    display: flex;
    flex-direction: column;

    width: 25%;
    min-height: 50dvh;
    height: 50%;
    border-radius: 16px;
    background: #fff;

    padding: 35px 55px;
  `,
  titleRow: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 18px;
  `,
  title: styled.h1`
    color: #000;
    font-family: 'Noto Sans KR';
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `,
  roomBriefDescription: styled.p`
    color: #000;
    font-family: 'Noto Sans KR';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,
  content: styled.p`
    color: var(--Black, #35373a);
    font-family: 'Noto Sans KR';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 11px;
  `,
  divider: styled.div`
    width: 100%;
    height: 1px;
    border: 1px solid #d3d0d7;
    border-right-width: 0px;
    border-bottom-width: 0px;
    border-left-width: 0px;
  `,
  dealInfo: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  `,
  dealTitle: styled.h2`
    color: #000;
    font-family: 'Noto Sans KR';
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `,
  dealContent: styled.div`
    display: flex;
    flex-direction: column;
    gap: 42px;
    margin: 25px 28px 0 30px;
  `,
  dealItemContainer: styled.div`
    display: flex;
    justify-content: space-between;

    color: var(--Black, #35373a);
    font-family: 'Noto Sans KR';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,
  roomInfo: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    margin-top: 84px;
  `,
  roomInfoTitle: styled.h2`
    color: #000;
    font-family: 'Noto Sans KR';
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `,
};

const dummyImages = [
  'https://s3-alpha-sig.figma.com/img/efd0/12b5/6a0078a4aa75b0e9a9fb53a6d9a7c560?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=B4Aqn-hPJ0ihHPDfRzMOJKsIyqx03layytoxWWfcKWjb5Y99kfmk79oYrVGeBG1r9Upf2S4T9qEoYombOIKwE5BQ-uHa5bHjqSrrGN-Ki4V9uwv-FoINnD1-yK8DFE75XlMlQAWIw7c19End47NjTtAF7aZwN~votmj7HtmRK5~ftLRDqNL~SuLN0-LoMGpuDPhN2DMbafK1KOZeP5ur-dZKNfLQlg7KoOk8DcfS6p1IkoLY56tYQgrDmNG9YzXPSRsjrXAO1BDvYQRw0xdepU9cc63~lYlFbQu0j15PcUKGt9BjkjLwxB5sibmX6qG4Ct4tu161kpw3~urASb84eg__',
  'https://s3-alpha-sig.figma.com/img/ff85/788d/96b4a3ec1b31b6baf36b11c772529753?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cjUTegC0Ory6cMHPNzEqOS8K3anjn8DBCi~2j6hiEcZS1exKyuo3g0jfke26Y~HVjFa0YhUjW8tjxjd7KBmgLWHxow2U8YwP6bNJBHeNgKMwpDHk2aF1vUPO-nfDEM7ZCfZCSsWcUz~eNS5XP5XwFvd7aP8g~62hJnvdtkdMpP3qiCS70w~QUAdwBtb57TjBD3EWelFbKg2JcWTVlIxYd7qtj~uuP8-0HXrgmdssska9T3tCF0aT6REa4QFa7dYggiKL3rk8aLyjJ46RbOm9l~mqbIs9PqQakObhU~621G1PeAX9ZtkgzryhtNWG6EKyGTzhEvm4~-~AWriZFAVebw__',
  'https://s3-alpha-sig.figma.com/img/0de8/113e/7a56e61d0a97703ddef68f41508a60f9?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SMYm-FhubQ80cjTUJD3g2DJc17u7aOu8~vo7FDtQpmPh4yrJen0RmaxnLXKRLoz1NhcLEG~x65veb7hZcZBgjf5m~ayGDhEwKE4P7gKWPYh3uPT8vW1aGQsAi0JB~fw7qA7nlaVCpPANPIaQLo9LgiRvCEuTRaxxFgwSBXcHxFbGhZCDmUzKvSJgk6Z5TE6jDqOj2nDSDRGu2U0keA5nJu8nvyD4HwJGRDLfNyVDFMa19HDaT2Ma34wVhOSClS-7jUhr4UYwjgLVostmHaFH9OcTtgRWw~UHXSsW30Yrjao2YsDVbskurQ81cjr7SusT-RRXJUQoL1sT91utNz4oBw__',
  'https://s3-alpha-sig.figma.com/img/2d52/bfda/0a900d41e2a6d77dd731fac06577540c?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=l0b7Up505QbH4ZH5Z0vATZlKNVq70rhtoZVCeabC7RT6kc9q-WQ5gGl4S2~s0JDCaB4lhVuvQMm3m0FxzvjTTmcW0il7~U1ozz2sdgOaxMpX35~0C0lS1nkVlnH6Karq4XQLCOVU1So~bjORg2CkS3mlXNbReSsNKgb-V594MzT25yZmaQ6Gnv3tS7f0pLH-QHRBvwqZRASrJ1ud8K2b1J-JD5KwUneP-gGi8-BKX36Is6VHdkAD1RwJnasfDee540UUCJzrxQAC4ODGFB8cnD0Mv4UsF4vtOncskz77EjclHb-FawpF2lLBYwsZDnSv21dGeF328LeNNS64a-wSCQ__',
  'https://s3-alpha-sig.figma.com/img/2006/8205/5f945443386acf4bfb5a6853b361442f?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=W8SbDFzsK1gVBUcE~OxQdVW5EI7fRPGiBeGf7loAp73pnO4gVffx7xuTeMQB7CiTd~2mlRDws4vB-5-eQEzrqk4W2lCwAC27tyEMJ-Oh55Pzo0KGDQhQgcbGZ~FRlj9vvgvVK-4cZiK3UrBWgrYN8eSXb~3sp7HQBDY~U0YBCZh9W6bcqlkjZUhV1YIRjdDy~d-b81FvYAI-GIU5JiU5SC0-IGNU5X3l33mcgbADRaC4mdV~uKSCGpOGtDEXOdwTtAODlW2aY28-JAM84hOl6YFXmjjVJlHk13YPcnb~KWo-bX0DOYBnY3Ad3rf0BdgkYjL2ejUS6DE2l613agQKcA__',
  'https://img.freepik.com/free-photo/japandi-living-room-interior-design_53876-145502.jpg',
];

interface Props {
  post: SharedPost;
  writer: User;
}

function DealItem({ label, data }: { label: string; data: string }) {
  return (
    <styles.dealItemContainer>
      <p>{label}</p>
      <p>{data}</p>
    </styles.dealItemContainer>
  );
}

export function SharedPostPage({ post, writer }: Props) {
  return (
    <styles.container>
      <styles.houseInfo>
        <ImageGrid images={dummyImages} />
        <styles.titleRow>
          <styles.title>{post.title}</styles.title>
          <Bookmark
            marked={false}
            onToggle={() => {
              console.log('Bookmark Clicked');
            }}
          />
        </styles.titleRow>
        <styles.roomBriefDescription>
          방 간단한 설명
        </styles.roomBriefDescription>
        <styles.content>{post.content}</styles.content>
        <styles.divider />
        <styles.dealInfo>
          <styles.dealTitle>거래 정보</styles.dealTitle>
          <styles.dealContent>
            <DealItem label="거래방식" data="월세 2,000만원/20만원" />
            <DealItem label="관리비" data="4만 5천원" />
            <DealItem label="융자금" data="융자금 없음" />
            <DealItem label="입주가능일" data="2024. 03. 13. 이후" />
          </styles.dealContent>
        </styles.dealInfo>
        <styles.roomInfo>
          <styles.roomInfoTitle>방 정보</styles.roomInfoTitle>
        </styles.roomInfo>
      </styles.houseInfo>
      <styles.hostInfo>
        <CircularProgressBar percentage={50} sqSize={110} strokeWidth={10} />
      </styles.hostInfo>
    </styles.container>
  );
}
