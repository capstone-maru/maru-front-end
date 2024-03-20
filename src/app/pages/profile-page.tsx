'use client';

import Link from 'next/link';
import { atom, useRecoilState } from 'recoil';
import styled from 'styled-components';

const styles = {
  page_container: styled.div`
    display: flex;
    flex-flow: wrap;
    padding: 0px 33px;
  `,

  user_profile_container: styled.div`
    flex: none;
    display: flex;
    position: relative;
    width: 100%;
    align-items: center;
    margin-top: 82px;
    min-width: 0;
  `,
  user_pic_container: styled.div`
    margin-right: 42px;

    display: flex;
    width: 133px;
    height: 133px;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    border: 1px solid #dcddea;

    background: #c4c4c4;
  `,
  user_pic: styled.img`
    width: 100%;
    height: 100%;
    border-radius: inherit;
    object-fit: cover;
    border: 0;
  `,

  user_info: styled.div`
    flex: 1 1;
    min-width: 0;
    color: #494949;
  `,

  user_name: styled.div`
    color: #000;

    font-family: 'Noto Sans KR';
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 8px;
  `,

  user_detailed_info: styled.p`
    color: #000;

    font-family: 'Noto Sans KR';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `,

  switch_container: styled.div`
    flex: none;
    position: absolute;
    left: 280px;
    display: flex;
    height: 75px;
    margin: 0 500px 0 42px;
    min-width: 0;
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
    border-radius: 24px;
  `,

  slider_dot: styled.span`
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
  `,

  switch_description: styled.p`
    color: #888;
    font-family: 'Noto Sans KR';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-left: 7px;
  `,

  auth_container: styled.div`
    display: flex;
    position: relative;
    padding: 4px 8px;
    height: 32px;
    width: 85px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border-radius: 26px;
    background: #5c6eb4;
    margin: 16px 23px 0px 25px;
    cursor: pointer;
  `,

  auth_description: styled.p`
    color: #fff;

    font-family: Pretendard;
    font-size: 11px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 171.429% */
  `,

  card_section: styled.div`
    height: 341px;
    width: 100%;

    display: flex;
    flex-flow: wrap;
    margin: 62px 0 30px 0;
  `,

  card_description: styled.p`
    color: #000;

    width: 100%;
    font-family: 'Noto Sans KR';
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 55px;
  `,

  card_container: styled.div`
    width: 240px;
    height: 240px;
    padding: 0 0 0 24px;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    border-radius: 20px;
    border: 1px solid #8c95a8;
    margin-left: 55px;
    background: #fff;
  `,

  card_name: styled.p`
    color: #494949;
    font-family: 'Noto Sans KR';
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    width: 100%;
  `,

  card_default: styled.div`
    width: 97px;
    height: 41px;
    flex-shrink: 0;
    border-radius: 20px 0px 0px 20px;
    background: #e15637;
    color: #fff;

    text-align: center;
    font-family: 'Noto Sans KR';
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 41px;
    margin-top: 150px;
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
    <styles.user_profile_container>
      <styles.user_pic_container>
        <styles.user_pic src={src} alt="User Profile Pic" />
      </styles.user_pic_container>
      <styles.user_info>
        <styles.user_name>{name}</styles.user_name>
        <styles.user_detailed_info>{age}</styles.user_detailed_info>
        <styles.user_detailed_info>{addr}</styles.user_detailed_info>
      </styles.user_info>
      <ToggleSwitch isChecked={isChecked} onToggle={toggleSwitch} />
    </styles.user_profile_container>
  );
}

interface ToggleSwitchProps {
  isChecked: boolean;
  onToggle: () => void;
}

function ToggleSwitch({ isChecked, onToggle }: ToggleSwitchProps) {
  return (
    <styles.switch_container>
      <styles.switch_wrapper>
        <styles.switch_input
          type="checkbox"
          checked={isChecked}
          onChange={onToggle}
        />
        <styles.slider
          style={{
            backgroundColor: isChecked ? '#E15637' : '#BEBEBE',
          }}
        >
          <styles.slider_dot
            style={{
              transform: isChecked ? 'translateX(16px)' : 'translateX(0)',
            }}
          />
        </styles.slider>
      </styles.switch_wrapper>
      <styles.switch_description>메이트 찾는 중</styles.switch_description>
    </styles.switch_container>
  );
}

function Auth() {
  return (
    <styles.auth_container>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.99993 10.7999L3.19993 7.99994L2.2666 8.93328L5.99993 12.6666L13.9999 4.66661L13.0666 3.73328L5.99993 10.7999Z"
          fill="white"
        />
      </svg>
      <styles.auth_description>본인인증</styles.auth_description>
    </styles.auth_container>
  );
}

function Card() {
  return (
    <>
      <styles.card_section>
        <styles.card_description>내 카드</styles.card_description>
        <Link href="my/setting">
          <styles.card_container>
            <styles.card_name>김마루</styles.card_name>
            <styles.card_default>기본</styles.card_default>
          </styles.card_container>
        </Link>
      </styles.card_section>
      <styles.card_section>
        <styles.card_description>메이트 카드</styles.card_description>
        <Link href="my/setting">
          <styles.card_container>
            <styles.card_name>메이트</styles.card_name>
            <styles.card_default>기본</styles.card_default>
          </styles.card_container>
        </Link>
        <Link href="my/setting">
          <styles.card_container>
            <styles.card_name>메이트</styles.card_name>
          </styles.card_container>
        </Link>
      </styles.card_section>
    </>
  );
}

export function ProfilePage({ src, name, age, addr }: UserProfileInfoProps) {
  return (
    <styles.page_container>
      <UserInfo src={src} name={name} age={age} addr={addr} />
      <Auth />
      <Card />
    </styles.page_container>
  );
}
