'use client';

import { useState } from 'react';
import styled from 'styled-components';

const styles = {
  menuContainer: styled.div`
    position: absolute;
    top: 0;
    right: 0;
    display: inline-flex;
    flex-direction: column;
    width: 18rem;
    height: 100%;
    border-radius: 20px;
    background: #fff;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);
    z-index: 20;
  `,
  header: styled.div`
    width: 100%;
    height: 3.625rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.8rem;
    box-shadow: 0px -1px 0px 0px #e5e5ea inset;
  `,
  closeButton: styled.img`
    width: 1.2rem;
    height: 1.2rem;
    border: none;
    flex-shrink: 0;
    cursor: pointer;
  `,
  menuListContainer: styled.ul`
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 0.8rem 0.8rem;
    width: 100%;
    box-shadow: 0px -1px 0px 0px #e5e5ea inset;
  `,
  footer: styled.div`
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0.8rem;
  `,
  menuList: styled.li`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.8rem 0.8rem;
    gap: 0.8rem;
    border-bottom: #e5e5ea solid 1px;
    cursor: pointer;

    color: var(--Text-grayDark, #2c2c2e);
    font-family: 'Noto Sans KR';
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.125rem; /* 128.571% */
  `,
  userListContainer: styled.ul`
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 0 0.8rem;
    width: 100%;
    gap: 1rem;
  `,
  userList: styled.li`
    display: flex;
    gap: 0.4rem;
    align-items: center;
    list-style: none;
    color: var(--Text-gray, #666668);
    cursor: pointer;
  `,
  userImg: styled.div`
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;
    border-radius: 150px;
    border: 1.5px solid #fff;
    background: url('__avatar_url.png') lightgray 50% / cover no-repeat;
  `,
  searchInput: styled.input`
    flex: 1;
    font-size: 1.25rem;
    padding: 0.8rem;
    border: none;
    color: var(--Text-grayDark, #2c2c2e);
    font-family: 'Noto Sans KR';
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.125rem;

    &:focus {
      outline: none;
    }
  `,
  searchButton: styled.img`
    width: 1.2rem;
    height: 1.2rem;
    cursor: pointer;
  `,
};

export function ChatMenu({
  onMenuClicked,
}: {
  onMenuClicked: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isCloseClick, setIsCloseClick] = useState<boolean>(false);

  const handleCloseClick = () => {
    setIsCloseClick(prev => !prev);
    onMenuClicked(isCloseClick);
  };

  return (
    <styles.menuContainer>
      <styles.header>
        <styles.closeButton src="/Close.svg" onClick={handleCloseClick} />
      </styles.header>
      <styles.menuListContainer>
        <styles.menuList>
          하우스 메이트
          <styles.userListContainer>
            <styles.userList>
              <styles.userImg />
              김마루
            </styles.userList>
            <styles.userList>
              <styles.userImg />
              김마루
            </styles.userList>
            <styles.userList>
              <styles.userImg />
              김마루
            </styles.userList>
            <styles.userList>
              <styles.userImg />
              김마루
            </styles.userList>
          </styles.userListContainer>
        </styles.menuList>
        <styles.menuList>메이트 초대하기</styles.menuList>
        <styles.menuList>마이 마루</styles.menuList>
        <styles.menuList>채팅방 나가기</styles.menuList>
      </styles.menuListContainer>
      <styles.footer>
        <styles.searchInput />
        <styles.searchButton src="/icon-search.svg" />
      </styles.footer>
    </styles.menuContainer>
  );
}
