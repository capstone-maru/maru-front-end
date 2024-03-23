'use client';

import Link from 'next/link';
import { atom, useRecoilState } from 'recoil';
import styled from 'styled-components';

const styles = {
  pageContainer: styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 1.5rem;
  `,

  userProfileContainer: styled.div`
    display: inline-flex;
    align-items: flex-start;
    flex-shrink: 0;
    margin-top: 82px;
  `,
  userProfileWithoutSwitch: styled.div`
    display: inline-flex;
    align-items: center;
    gap: 2.625rem;
  `,
  userPicContainer: styled.div`
    display: flex;
    width: 8.3125rem;
    height: 8.3125rem;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    border: 1px solid #dcddea;

    background: #c4c4c4;
  `,
  userPic: styled.img`
    width: 100%;
    height: 100%;
    border-radius: inherit;
    object-fit: cover;
    border: 0;
  `,
  userInfoContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  `,
  userDetailedContainer: styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  `,
  userName: styled.div`
    color: #000;

    font-family: 'Noto Sans KR';
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `,
  userDetailedInfo: styled.p`
    color: #000;

    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `,

  switchContainer: styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: flex-end;
    margin: 20px 0 0 42px;
    gap: 0.375rem;
  `,
  switchWrapper: styled.label`
    position: relative;
    display: inline-block;
    width: 2.5rem;
    height: 1.5rem;
  `,
  switchInput: styled.input`
    opacity: 0;
    width: 0;
    height: 0;
  `,
  slider: styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #bebebe;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 1.5rem;
  `,
  sliderDot: styled.span`
    position: absolute;
    cursor: pointer;
    top: 0.25rem;
    left: 0.25rem;
    bottom: 0.25rem;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
  `,
  switchDescription: styled.p`
    color: var(--Gray-3, #888);
    font-family: 'Noto Sans KR';
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `,

  authContainer: styled.div`
    height: 2rem;
    width: 5.3125rem;
    border-radius: 1.625rem;
    background: #5c6eb4;
    margin: 16px 23px 0px 25px;
    cursor: pointer;

    display: inline-flex;
    padding: 0.25rem 0.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
  `,
  authDescription: styled.p`
    color: #fff;

    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.5rem;
  `,
  authCheckImg: styled.img`
    width: 1rem;
    height: 1rem;
  `,

  cardSection: styled.div`
    display: inline-flex;
    gap: 22.625rem;
    margin: 76px 0 153px 0;
  `,
  cardWrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 2.625rem;
    flex-shrink: 0;
  `,
  cardDescription: styled.p`
    color: #000;
    font-family: 'Noto Sans KR';
    font-size: 2rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `,
  cardContainer: styled.div`
    padding: 0 0 0 1.5rem;
    display: inline-flex;
    align-items: center;
    width: 15rem;
    height: 15rem;
    flex-shrink: 0;
    border-radius: 1.25rem;
    border: 1px solid var(--Gray, #8c95a8);
    background: var(--grey-100, #fff);
    position: relative;
  `,
  cardName: styled.p`
    color: var(--grey-900, #494949);
    font-family: 'Noto Sans KR';
    font-size: 1.375rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `,
  cardDefault: styled.div`
    color: #fff;
    text-align: center;
    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2.5625rem;

    width: 6.0625rem;
    height: 2.5625rem;
    flex-shrink: 0;
    border-radius: 1.25rem 0rem 0rem 1.25rem;
    background: var(--Main-1, #e15637);

    position: absolute;
    right: 0;
    bottom: 1.5rem;
  `,
};

interface UserProfileInfoProps {
  src: string;
  name: string;
  age: string;
  addr: string;
}

const isCheckedState = atom({
  key: 'isCheckedState',
  default: false,
});

function UserInfo({ src, name, age, addr }: UserProfileInfoProps) {
  const [isChecked, setIsChecked] = useRecoilState(isCheckedState);

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };

  return (
    <styles.userProfileContainer>
      <styles.userProfileWithoutSwitch>
        <styles.userPicContainer>
          <styles.userPic src={src} alt="User Profile Pic" />
        </styles.userPicContainer>
        <styles.userInfoContainer>
          <styles.userName>{name}</styles.userName>
          <styles.userDetailedContainer>
            <styles.userDetailedInfo>{age}</styles.userDetailedInfo>
            <styles.userDetailedInfo>{addr}</styles.userDetailedInfo>
          </styles.userDetailedContainer>
        </styles.userInfoContainer>
      </styles.userProfileWithoutSwitch>
      <ToggleSwitch isChecked={isChecked} onToggle={toggleSwitch} />
    </styles.userProfileContainer>
  );
}

interface ToggleSwitchProps {
  isChecked: boolean;
  onToggle: () => void;
}

function ToggleSwitch({ isChecked, onToggle }: ToggleSwitchProps) {
  return (
    <styles.switchContainer>
      <styles.switchWrapper>
        <styles.switchInput
          type="checkbox"
          checked={isChecked}
          onChange={onToggle}
        />
        <styles.slider
          style={{
            backgroundColor: isChecked ? '#E15637' : '#BEBEBE',
          }}
        >
          <styles.sliderDot
            style={{
              transform: isChecked ? 'translateX(16px)' : 'translateX(0)',
            }}
          />
        </styles.slider>
      </styles.switchWrapper>
      <styles.switchDescription>메이트 찾는 중</styles.switchDescription>
    </styles.switchContainer>
  );
}

function Auth() {
  return (
    <styles.authContainer>
      <styles.authCheckImg src="/check_circle_24px copy.svg" />
      <styles.authDescription>본인인증</styles.authDescription>
    </styles.authContainer>
  );
}

function Card() {
  return (
    <styles.cardSection>
      <styles.cardWrapper>
        <styles.cardDescription>내 카드</styles.cardDescription>
        <Link href="/setting">
          <styles.cardContainer>
            <styles.cardName>김마루</styles.cardName>
            <styles.cardDefault>기본</styles.cardDefault>
          </styles.cardContainer>
        </Link>
      </styles.cardWrapper>
      <styles.cardWrapper>
        <styles.cardDescription>메이트 카드</styles.cardDescription>
        <Link href="/setting">
          <styles.cardContainer>
            <styles.cardName>메이트</styles.cardName>
            <styles.cardDefault>기본</styles.cardDefault>
          </styles.cardContainer>
        </Link>
      </styles.cardWrapper>
    </styles.cardSection>
  );
}

export function ProfilePage({ src, name, age, addr }: UserProfileInfoProps) {
  return (
    <styles.pageContainer>
      <UserInfo src={src} name={name} age={age} addr={addr} />
      <Auth />
      <Card />
    </styles.pageContainer>
  );
}
