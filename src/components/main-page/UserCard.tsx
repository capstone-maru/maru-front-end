'use client';

import styled from 'styled-components';

import { getAge } from '@/shared';

const styles = {
  card: styled.div`
    width: 266px;
    height: 300px;
    flex-shrink: 0;

    border-radius: 20px;
    background: var(--Gray-1, #f7f6f9);

    padding: 12px 16px;
  `,
  profile: styled.div`
    display: flex;
    flex-direction: row;
    gap: 23px;
    height: 149px;
  `,
  profileImage: styled.img`
    display: flex;
    width: 133px;
    height: 133px;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    border: 1px solid #dcddea;
    background: #c4c4c4;
    object-fit: cover;
  `,
  profileInfo: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;

    color: #000;
    font-family: 'Noto Sans KR';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `,
  profileName: styled.p`
    color: #000;
    font-family: 'Noto Sans KR';
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 4px;
  `,
};

export function UserCard({
  name,
  address,
  birth,
}: {
  name: string;
  address: string;
  birth: Date;
}) {
  return (
    <styles.card>
      <styles.profile>
        <styles.profileImage src="https://s3-alpha-sig.figma.com/img/59a5/3c6f/ae49249b51c7d5d81ab89eeb0bf610f1?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bS1lS~7-WQsD9x5vHJBOiMnhhFjI~VgCwJH6Bzz~IxFWob-PV-XZweWFIhU6yJC3XHv5qZKZxnP9RWT~0ciIbQfofuhbODEUxnMHe6oq8Dl45khsD30dnXOK~FLBPpWhMumJO-zPpuWjiRwsZ35mfWLbgyT7dND41I9yXCyRASQx9v2iAGzDoVzTfvtkjRyGw6es6fSXRsFGMqthnzYmv7DZT~FCz2avi3-NqXruXQpkijQHNEQUM61ThFiNYEIv8vb1wZWf-USbbJpE8bdbUneblY2T0cWwMRBtKbCrJ0Y~P9lvFbzqBv7h9WOzNyJW~~KeG9vVrBmLRRo1BsNdng__" />
        <styles.profileInfo>
          <styles.profileName>{name}</styles.profileName>
          <p>{getAge(birth ?? new Date())}세</p>
          <p>{address}</p>
        </styles.profileInfo>
      </styles.profile>
    </styles.card>
  );
}
