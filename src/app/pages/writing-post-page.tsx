'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

const styles = {
  pageContainer: styled.div`
    background: var(--background, #f7f6f9);

    position: relative;
    left: -11rem;
    width: 100dvw;
    min-height: 100%;
    height: fit-content;

    display: flex;
    justify-content: center;
    align-items: stretch;
    overflow: auto;
  `,
  postContainer: styled.div`
    width: 75rem;
    height: 114.125rem;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 2rem;
    margin: 3rem 7.5rem;
    padding: 3.69rem 0 0 4.19rem;
  `,
  containerDescription: styled.p`
    color: #000;

    font-family: 'Noto Sans KR';
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 2.13rem;
  `,
  listContainer: styled.ul`
    width: 100%;
  `,
  listItem: styled.li`
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
  `,
  listItemDescription: styled.p`
    width: 12.125rem;
    margin-right: 13.94rem;
    color: var(--Black, #35373a);
    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,
  addImgButton: styled.div`
    display: flex;
    width: 7.4375rem;
    padding: 0.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid var(--Black, #35373a);

    color: var(--Gray-5, #828282);
    text-align: center;
    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    margin-right: 6.19rem;
    cursor: pointer;
  `,
  inputContainer: styled.div`
    display: flex;
    padding: 0.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid var(--Black, #35373a);
  `,
  inputPlaceholder: styled.p`
    color: var(--Gray-5, #828282);
    text-align: right;
    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,
  userInput: styled.input`
    width: 2.5rem;
    color: var(--Gray-5, #828282);
    text-align: right;
    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border: none;
    &:focus {
      outline: none;
    }
  `,
  slash: styled.p`
    color: #000;

    text-align: right;
    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 0 1.31rem;
  `,
  checkButtonContainer: styled.div`
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    margin-right: 1.62rem;
  `,
  checkButtonDescription: styled.p`
    color: #000;

    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,
  customRadioButton: styled.div<ButtonActiveProps>`
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    background-size: cover;
    ${props =>
      props.isSelected
        ? {
            backgroundImage: `url('/button-icon/Radio button checked.svg')`,
          }
        : {
            backgroundImage: `url('/button-icon/Radio button unchecked.svg')`,
          }};
  `,
  customCheckBox: styled.div<ButtonActiveProps>`
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    background-size: cover;
    ${props =>
      props.isSelected
        ? {
            backgroundImage: `url('/button-icon/Check box.svg')`,
          }
        : {
            backgroundImage: `url('/button-icon/Check box outline blank.svg')`,
          }};
  `,
  detailedInputBox: styled.input`
    width: 41.125rem;
    height: 5.4375rem;
    padding: 0.5rem 1rem 3.5rem 1rem;

    border: none;
    border-radius: 0.5rem;
    background: var(--Gray-6, #efefef);

    color: #9a95a3;

    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    &:focus {
      outline: none;
    }
  `,
  searchButton: styled.div`
    display: flex;
    width: 5.0675rem;
    padding: 0.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid var(--Black, #35373a);
    cursor: pointer;

    color: var(--Gray-5, #828282);
    text-align: right;
    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,
  vitalContainer: styled.div`
    display: inline-flex;
    flex-direction: column;
  `,
  budgetContainer: styled.div`
    display: inline-flex;
    flex-direction: column;
    margin-top: 5.62rem;
  `,
  roomContainer: styled.div`
    display: inline-flex;
    flex-direction: column;
    margin-top: 4.38rem;
  `,
  detailedContainer: styled.div`
    display: inline-flex;
    flex-direction: column;
    margin-top: 6.44rem;
  `,
  locationContainer: styled.div`
    display: inline-flex;
    flex-direction: column;
    margin-top: 6rem;
  `,
};

interface ButtonActiveProps {
  isSelected: boolean;
}

export function WritingPostPage() {
  const [selectedBudget1, setSelectedBudget1] = useState<string | null>(null);
  const [selectedRoom1, setSelectedRoom1] = useState<string | null>(null);
  const [selectedRoom2, setSelectedRoom2] = useState<string | null>(null);
  const [selectedRoom3, setSelectedRoom3] = useState<string | null>(null);
  type SelectedOptions = Record<string, boolean>;

  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

  const handleOptionClick = (option: string) => {
    setSelectedOptions(prevSelectedOptions => ({
      ...prevSelectedOptions,
      [option]: !prevSelectedOptions[option],
    }));
  };

  function handleBudget1Click(item: string) {
    setSelectedBudget1(prevSelectedItem =>
      prevSelectedItem === item ? null : item,
    );
  }
  function handleRoom1Click(item: string) {
    setSelectedRoom1(prevSelectedItem =>
      prevSelectedItem === item ? null : item,
    );
  }
  function handleRoom2Click(item: string) {
    setSelectedRoom2(prevSelectedItem =>
      prevSelectedItem === item ? null : item,
    );
  }
  function handleRoom3Click(item: string) {
    setSelectedRoom3(prevSelectedItem =>
      prevSelectedItem === item ? null : item,
    );
  }
  return (
    <styles.pageContainer>
      <styles.postContainer>
        <styles.vitalContainer>
          <styles.containerDescription>기본 정보</styles.containerDescription>
          <styles.listContainer>
            <styles.listItem>
              <styles.listItemDescription>사진</styles.listItemDescription>
              <styles.addImgButton>+ 사진 추가</styles.addImgButton>
              <styles.listItemDescription>
                최소 2장 이상 업로드
              </styles.listItemDescription>
            </styles.listItem>
            <styles.listItem>
              <styles.listItemDescription>인원</styles.listItemDescription>
              <styles.inputContainer>
                <styles.userInput />
                <styles.inputPlaceholder>명</styles.inputPlaceholder>
              </styles.inputContainer>
            </styles.listItem>
          </styles.listContainer>
        </styles.vitalContainer>
        <styles.budgetContainer>
          <styles.containerDescription>거래 정보</styles.containerDescription>
          <styles.listContainer>
            <styles.listItem>
              <styles.listItemDescription>거래방식</styles.listItemDescription>
              <styles.checkButtonContainer>
                <styles.customRadioButton
                  isSelected={selectedBudget1 === '월세'}
                  onClick={() => {
                    handleBudget1Click('월세');
                  }}
                />
                <styles.checkButtonDescription>
                  월세
                </styles.checkButtonDescription>
              </styles.checkButtonContainer>
              <styles.checkButtonContainer>
                <styles.customRadioButton
                  isSelected={selectedBudget1 === '전세'}
                  onClick={() => {
                    handleBudget1Click('전세');
                  }}
                />
                <styles.checkButtonDescription>
                  전세
                </styles.checkButtonDescription>
              </styles.checkButtonContainer>
            </styles.listItem>
            <styles.listItem>
              <styles.listItemDescription>
                전체 보증금 / 메이트 보증금
              </styles.listItemDescription>
              <styles.inputContainer>
                <styles.userInput />
                <styles.inputPlaceholder>만원</styles.inputPlaceholder>
              </styles.inputContainer>
              <styles.slash>/</styles.slash>
              <styles.inputContainer>
                <styles.userInput />
                <styles.inputPlaceholder>만원</styles.inputPlaceholder>
              </styles.inputContainer>
            </styles.listItem>
            <styles.listItem>
              <styles.listItemDescription>
                전체 월세 / 메이트 월세
              </styles.listItemDescription>
              <styles.inputContainer>
                <styles.userInput />
                <styles.inputPlaceholder>만원</styles.inputPlaceholder>
              </styles.inputContainer>
              <styles.slash>/</styles.slash>
              <styles.inputContainer>
                <styles.userInput />
                <styles.inputPlaceholder>만원</styles.inputPlaceholder>
              </styles.inputContainer>
            </styles.listItem>
            <styles.listItem>
              <styles.listItemDescription>
                전체 관리비 / 메이트 관리비
              </styles.listItemDescription>
              <styles.inputContainer>
                <styles.userInput />
                <styles.inputPlaceholder>만원</styles.inputPlaceholder>
              </styles.inputContainer>
              <styles.slash>/</styles.slash>
              <styles.inputContainer>
                <styles.userInput />
                <styles.inputPlaceholder>만원</styles.inputPlaceholder>
              </styles.inputContainer>
            </styles.listItem>
          </styles.listContainer>
        </styles.budgetContainer>
        <styles.roomContainer>
          <styles.containerDescription>방 정보</styles.containerDescription>
          <styles.listContainer>
            <styles.listItem>
              <styles.listItemDescription>방 종류</styles.listItemDescription>
              <styles.checkButtonContainer>
                <styles.customRadioButton
                  isSelected={selectedRoom1 === '원룸'}
                  onClick={() => {
                    handleRoom1Click('원룸');
                  }}
                />
                <styles.checkButtonDescription>
                  원룸
                </styles.checkButtonDescription>
              </styles.checkButtonContainer>
              <styles.checkButtonContainer>
                <styles.customRadioButton
                  isSelected={selectedRoom1 === '빌라/투룸이상'}
                  onClick={() => {
                    handleRoom1Click('빌라/투룸이상');
                  }}
                />
                <styles.checkButtonDescription>
                  빌라/투룸이상
                </styles.checkButtonDescription>
              </styles.checkButtonContainer>
              <styles.checkButtonContainer>
                <styles.customRadioButton
                  isSelected={selectedRoom1 === '아파트'}
                  onClick={() => {
                    handleRoom1Click('아파트');
                  }}
                />
                <styles.checkButtonDescription>
                  아파트
                </styles.checkButtonDescription>
              </styles.checkButtonContainer>
              <styles.checkButtonContainer>
                <styles.customRadioButton
                  isSelected={selectedRoom1 === '오피스텔'}
                  onClick={() => {
                    handleRoom1Click('오피스텔');
                  }}
                />
                <styles.checkButtonDescription>
                  오피스텔
                </styles.checkButtonDescription>
              </styles.checkButtonContainer>
            </styles.listItem>
            <styles.listItem>
              <styles.listItemDescription>구조</styles.listItemDescription>
              <styles.checkButtonContainer>
                <styles.customRadioButton
                  isSelected={selectedRoom2 === '방 1'}
                  onClick={() => {
                    handleRoom2Click('방 1');
                  }}
                />
                <styles.checkButtonDescription>
                  방 1
                </styles.checkButtonDescription>
              </styles.checkButtonContainer>
              <styles.checkButtonContainer>
                <styles.customRadioButton
                  isSelected={selectedRoom2 === '방 1·거실 1'}
                  onClick={() => {
                    handleRoom2Click('방 1·거실 1');
                  }}
                />
                <styles.checkButtonDescription>
                  방 1·거실 1
                </styles.checkButtonDescription>
              </styles.checkButtonContainer>
              <styles.checkButtonContainer>
                <styles.customRadioButton
                  isSelected={selectedRoom2 === '방 2'}
                  onClick={() => {
                    handleRoom2Click('방 2');
                  }}
                />
                <styles.checkButtonDescription>
                  방 2
                </styles.checkButtonDescription>
              </styles.checkButtonContainer>
              <styles.checkButtonContainer>
                <styles.customRadioButton
                  isSelected={selectedRoom2 === '방 3'}
                  onClick={() => {
                    handleRoom2Click('방 3');
                  }}
                />
                <styles.checkButtonDescription>
                  방 3
                </styles.checkButtonDescription>
              </styles.checkButtonContainer>
              <styles.checkButtonContainer>
                <styles.customRadioButton
                  isSelected={selectedRoom2 === '복층형'}
                  onClick={() => {
                    handleRoom2Click('복층형');
                  }}
                />
                <styles.checkButtonDescription>
                  복층형
                </styles.checkButtonDescription>
              </styles.checkButtonContainer>
            </styles.listItem>
            <styles.listItem>
              <styles.listItemDescription>
                전체 면적 / 방 면적
              </styles.listItemDescription>
              <styles.inputContainer>
                <styles.userInput />
                <styles.inputPlaceholder>평</styles.inputPlaceholder>
              </styles.inputContainer>
              <styles.slash>/</styles.slash>
              <styles.inputContainer>
                <styles.userInput />
                <styles.inputPlaceholder>평</styles.inputPlaceholder>
              </styles.inputContainer>
            </styles.listItem>
            <styles.listItem>
              <styles.listItemDescription>층수</styles.listItemDescription>
              <styles.checkButtonContainer>
                <styles.customRadioButton
                  isSelected={selectedRoom3 === '지상'}
                  onClick={() => {
                    handleRoom3Click('지상');
                  }}
                />
                <styles.checkButtonDescription>
                  지상
                </styles.checkButtonDescription>
              </styles.checkButtonContainer>
              <styles.checkButtonContainer>
                <styles.customRadioButton
                  isSelected={selectedRoom3 === '반지하'}
                  onClick={() => {
                    handleRoom3Click('반지하');
                  }}
                />
                <styles.checkButtonDescription>
                  반지하
                </styles.checkButtonDescription>
              </styles.checkButtonContainer>
              <styles.checkButtonContainer style={{ marginRight: '0' }}>
                <styles.customRadioButton
                  isSelected={selectedRoom3 === '옥탑'}
                  onClick={() => {
                    handleRoom3Click('옥탑');
                  }}
                />
                <styles.checkButtonDescription>
                  옥탑
                </styles.checkButtonDescription>
              </styles.checkButtonContainer>
              <styles.slash>/</styles.slash>
              <styles.inputContainer>
                <styles.userInput />
                <styles.inputPlaceholder>층</styles.inputPlaceholder>
              </styles.inputContainer>
            </styles.listItem>
            <styles.listItem>
              <styles.listItemDescription>추가 옵션</styles.listItemDescription>
              <styles.checkButtonContainer>
                <styles.customCheckBox
                  isSelected={selectedOptions['주차가능']}
                  onClick={() => {
                    handleOptionClick('주차가능');
                  }}
                />
                <styles.checkButtonDescription>
                  주차가능
                </styles.checkButtonDescription>
              </styles.checkButtonContainer>
              <styles.checkButtonContainer>
                <styles.customCheckBox
                  isSelected={selectedOptions['에어컨']}
                  onClick={() => {
                    handleOptionClick('에어컨');
                  }}
                />
                <styles.checkButtonDescription>
                  에어컨
                </styles.checkButtonDescription>
              </styles.checkButtonContainer>
              <styles.checkButtonContainer>
                <styles.customCheckBox
                  isSelected={selectedOptions['냉장고']}
                  onClick={() => {
                    handleOptionClick('냉장고');
                  }}
                />
                <styles.checkButtonDescription>
                  냉장고
                </styles.checkButtonDescription>
              </styles.checkButtonContainer>
              <styles.checkButtonContainer>
                <styles.customCheckBox
                  isSelected={selectedOptions['세탁기']}
                  onClick={() => {
                    handleOptionClick('세탁기');
                  }}
                />
                <styles.checkButtonDescription>
                  세탁기
                </styles.checkButtonDescription>
              </styles.checkButtonContainer>
              <styles.checkButtonContainer>
                <styles.customCheckBox
                  isSelected={selectedOptions['베란다/테라스']}
                  onClick={() => {
                    handleOptionClick('베란다/테라스');
                  }}
                />
                <styles.checkButtonDescription>
                  베란다/테라스
                </styles.checkButtonDescription>
              </styles.checkButtonContainer>
            </styles.listItem>
          </styles.listContainer>
        </styles.roomContainer>
        <styles.detailedContainer>
          <styles.containerDescription>상세 정보</styles.containerDescription>
          <styles.detailedInputBox placeholder="입력" type="text" />
        </styles.detailedContainer>
        <styles.locationContainer>
          <styles.containerDescription>위치 정보</styles.containerDescription>
          <styles.listContainer>
            <styles.listItem>
              <styles.listItemDescription>상세 주소</styles.listItemDescription>
              <styles.searchButton>검색</styles.searchButton>
            </styles.listItem>
            <styles.listItem>
              <styles.listItemDescription>지하철역</styles.listItemDescription>
              <styles.inputContainer>
                <styles.userInput />
                <styles.inputPlaceholder>역</styles.inputPlaceholder>
              </styles.inputContainer>
              <styles.slash>도보</styles.slash>
              <styles.inputContainer>
                <styles.userInput />
                <styles.inputPlaceholder>분</styles.inputPlaceholder>
              </styles.inputContainer>
            </styles.listItem>
            <styles.listItem>
              <styles.listItemDescription>
                버스정류장
              </styles.listItemDescription>
              <styles.slash style={{ marginLeft: '6.35rem' }}>
                도보
              </styles.slash>
              <styles.inputContainer>
                <styles.userInput />
                <styles.inputPlaceholder>분</styles.inputPlaceholder>
              </styles.inputContainer>
            </styles.listItem>
            <styles.listItem>
              <styles.listItemDescription>학교</styles.listItemDescription>
              <styles.inputContainer>
                <styles.userInput />
                <styles.inputPlaceholder>역</styles.inputPlaceholder>
              </styles.inputContainer>
              <styles.slash>도보</styles.slash>
              <styles.inputContainer>
                <styles.userInput />
                <styles.inputPlaceholder>분</styles.inputPlaceholder>
              </styles.inputContainer>
            </styles.listItem>
            <styles.listItem>
              <styles.listItemDescription>편의점</styles.listItemDescription>
              <styles.slash style={{ marginLeft: '6.35rem' }}>
                도보
              </styles.slash>
              <styles.inputContainer>
                <styles.userInput />
                <styles.inputPlaceholder>분</styles.inputPlaceholder>
              </styles.inputContainer>
            </styles.listItem>
          </styles.listContainer>
        </styles.locationContainer>
      </styles.postContainer>
    </styles.pageContainer>
  );
}
