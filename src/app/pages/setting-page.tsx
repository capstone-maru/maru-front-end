'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

const styles = {
  page_container: styled.div`
    display: flex;
    flex-flow: wrap;
    padding: 0px 33px;
  `,

  card_name: styled.p`
    margin-top: 73px;
    width: 100%;
    color: #000;

    font-family: 'Noto Sans KR';
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `,

  vital_container: styled.div`
    display: flex;
    flex-flow: wrap;
    width: 100%;
    padding: 73px 32px 0 7px;
  `,
  vital_description: styled.p`
    color: var(--Main-1, #e15637);
    font-family: 'Noto Sans KR';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    width: 100%;
  `,
  vital_list: styled.ul`
    width: 79px;
    height: 283px;
    margin: 49px 0 31px 3px;
  `,
  vital_list_item: styled.li`
    margin-bottom: 48px;
    width: 76px;
    color: #000;

    font-family: 'Noto Sans KR';
    font-size: 19px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    list-style-type: none;
  `,
  vital_check_list: styled.ul`
    width: 70%;
    height: 198px;
    margin: 49px 0 0 26px;
  `,
  vital_check_list_item: styled.li`
    display: flex;
    margin-bottom: 29px;
    list-style-type: none;
  `,

  birth_year: styled.select`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    width: 109px;
    height: 45px;
    display: inline-flex;
    padding: 8px 16px;
    justify-content: center;
    align-items: center;
    gap: 16px;
    border: 2px solid var(--Gray-4, #dfdfdf);
    background: #fff;

    color: var(--Gray-3, #888);
    font-family: 'Noto Sans KR';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    background-image: url('/Switch down.svg');
    background-repeat: no-repeat;
    background-position: calc(100% - 11px) center;

    padding-right: 44px;
  `,

  search_box: styled.div`
    width: 500px;
    height: 50px;
    display: flex;
    padding: 8.182px 8px 6.364px 19px;
    justify-content: flex-end;
    align-items: center;
    gap: 210px;
    border: 2px solid var(--Gray-4, #dfdfdf);
    background: var(--White, #fff);
  `,
  map_input: styled.input`
    color: var(--Gray-3, #888);
    font-family: 'Noto Sans KR';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    height: 40px;
    border: none;
    &:focus {
      outline: none;
    }
  `,
  search_button: styled.button`
    width: 39px;
    height: 36px;
    border: none;
    background-color: #fff;
    background-image: url('/search_button.svg');
    background-repeat: no-repeat;
    background-position: right center;
    cursor: pointer;
  `,

  horizontal_line: styled.hr`
    width: 1000px;
    height: 0px;
    flex-shrink: 0;
    stroke-width: 1px;
    stroke: #d3d0d7;
  `,

  option_container: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 877px;
    padding: 53px 0 0 7px;
  `,
  option_description: styled.p`
    width: 100%;
    color: #9a95a3;
    font-family: 'Noto Sans KR';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `,
  option_list: styled.ul`
    width: 100%;
    margin: 63px 0 0 0;
  `,
  option_list_item: styled.li`
    display: flex;
    align-items: center;
    gap: 32px;
    margin-bottom: 42px;
  `,
  option_list_img: styled.img`
    width: 50px;
    height: 50px;
  `,
  option_list_check_item_container: styled.div`
    display: flex;
    width: 450px;
    align-items: flex-start;
    align-content: flex-start;
    gap: 8px;
    flex-wrap: wrap;
  `,
};

interface CheckItemProps {
  isSelected: boolean;
}

const CheckItem = styled.div<CheckItemProps>`
  height: 45px;
  display: flex;
  padding: 8px 24px;
  margin: 0 8px 0 0;
  justify-content: center;
  align-items: center;

  border-radius: 26px;
  border: 2px solid #dfdfdf;
  background: #fff;
  cursor: pointer;

  color: #888;

  font-family: 'Noto Sans KR';
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  ${props =>
    props.isSelected
      ? {
          backgroundColor: '#E15637',
          color: '#FFF',
          border: '2px solid #E15637,',
        }
      : {
          backgroundColor: '#FFF',
          color: '#888',
        }};
`;

const years = Array.from({ length: 100 }, (_, index) => 2024 - index);

export function SettingPage() {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedSmoking, setSelectedSmoking] = useState<string | null>(null);

  type SelectedOptions = Record<string, boolean>;

  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

  function handleGenderClick(item: string) {
    setSelectedGender(prevSelectedItem =>
      prevSelectedItem === item ? null : item,
    );
  }

  function handleSmokingClick(item: string) {
    setSelectedSmoking(prevSelectedItem =>
      prevSelectedItem === item ? null : item,
    );
  }

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const yearValue = parseInt(event.target.value, 10);
    setSelectedYear(Number.isNaN(yearValue) ? null : yearValue);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOptions(prevSelectedOptions => ({
      ...prevSelectedOptions,
      [option]: !prevSelectedOptions[option],
    }));
  };

  return (
    <styles.page_container>
      <styles.card_name>내 카드 &gt; 김마루</styles.card_name>
      <styles.vital_container>
        <styles.vital_description>필수</styles.vital_description>
        <styles.vital_list>
          <styles.vital_list_item>성별</styles.vital_list_item>
          <styles.vital_list_item>출생 연도</styles.vital_list_item>
          <styles.vital_list_item>희망 지역</styles.vital_list_item>
          <styles.vital_list_item>흡연 여부</styles.vital_list_item>
        </styles.vital_list>
        <styles.vital_check_list>
          <styles.vital_check_list_item>
            <CheckItem
              isSelected={selectedGender === '남성'}
              onClick={() => {
                handleGenderClick('남성');
              }}
            >
              남성
            </CheckItem>
            <CheckItem
              isSelected={selectedGender === '여성'}
              onClick={() => {
                handleGenderClick('여성');
              }}
            >
              여성
            </CheckItem>
          </styles.vital_check_list_item>
          <styles.vital_check_list_item>
            <styles.birth_year
              value={selectedYear ?? ''}
              onChange={handleYearChange}
            >
              <option value="">년도</option>
              {years.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </styles.birth_year>
          </styles.vital_check_list_item>
          <styles.vital_check_list_item>
            <styles.search_box>
              <styles.map_input placeholder="ex) 한국동,한국역,한국대학교" />
              <styles.search_button />
            </styles.search_box>
          </styles.vital_check_list_item>
          <styles.vital_check_list_item>
            <CheckItem
              isSelected={selectedSmoking === '흡연'}
              onClick={() => {
                handleSmokingClick('흡연');
              }}
            >
              흡연
            </CheckItem>
            <CheckItem
              isSelected={selectedSmoking === '비흡연'}
              onClick={() => {
                handleSmokingClick('비흡연');
              }}
            >
              비흡연
            </CheckItem>
          </styles.vital_check_list_item>
        </styles.vital_check_list>
        <styles.horizontal_line />
      </styles.vital_container>
      <styles.option_container>
        <styles.option_description>선택</styles.option_description>
        <styles.option_list>
          <styles.option_list_item>
            <styles.option_list_img src="/option-img/Remove red eye.svg" />
            <styles.option_list_check_item_container>
              <CheckItem
                isSelected={selectedOptions['아침형']}
                onClick={() => {
                  handleOptionClick('아침형');
                }}
              >
                아침형
              </CheckItem>
              <CheckItem
                isSelected={selectedOptions['새벽형']}
                onClick={() => {
                  handleOptionClick('새벽형');
                }}
              >
                새벽형
              </CheckItem>
            </styles.option_list_check_item_container>
          </styles.option_list_item>
          <styles.option_list_item>
            <styles.option_list_img src="/option-img/Lips.png" />
            <styles.option_list_check_item_container>
              <CheckItem
                isSelected={selectedOptions['실내취식 싫어요']}
                onClick={() => {
                  handleOptionClick('실내취식 싫어요');
                }}
              >
                실내취식 싫어요
              </CheckItem>
              <CheckItem
                isSelected={selectedOptions['야식 안먹어요']}
                onClick={() => {
                  handleOptionClick('야식 안먹어요');
                }}
              >
                야식 안먹어요
              </CheckItem>
            </styles.option_list_check_item_container>
          </styles.option_list_item>
          <styles.option_list_item>
            <styles.option_list_img src="/option-img/Hearing.png" />
            <styles.option_list_check_item_container>
              <CheckItem
                isSelected={selectedOptions['잠버릇 있어요']}
                onClick={() => {
                  handleOptionClick('잠버릇 있어요');
                }}
              >
                잠버릇 있어요
              </CheckItem>
              <CheckItem
                isSelected={selectedOptions['알람 잘 못 들어요']}
                onClick={() => {
                  handleOptionClick('알람 잘 못 들어요');
                }}
              >
                알람 잘 못 들어요
              </CheckItem>
            </styles.option_list_check_item_container>
          </styles.option_list_item>
          <styles.option_list_item>
            <styles.option_list_img src="/option-img/Standing Man.png" />
            <styles.option_list_check_item_container>
              <CheckItem
                isSelected={selectedOptions['더위 많이 타요']}
                onClick={() => {
                  handleOptionClick('더위 많이 타요');
                }}
              >
                더위 많이 타요
              </CheckItem>
              <CheckItem
                isSelected={selectedOptions['추위 많이 타요']}
                onClick={() => {
                  handleOptionClick('추위 많이 타요');
                }}
              >
                추위 많이 타요
              </CheckItem>
            </styles.option_list_check_item_container>
          </styles.option_list_item>
          <styles.option_list_item>
            <styles.option_list_img src="/option-img/Inquiry.png" />
            <styles.option_list_check_item_container>
              <CheckItem
                isSelected={selectedOptions['깔끔형']}
                onClick={() => {
                  handleOptionClick('깔끔형');
                }}
              >
                깔끔형
              </CheckItem>
              <CheckItem
                isSelected={selectedOptions['둔감형']}
                onClick={() => {
                  handleOptionClick('둔감형');
                }}
              >
                둔감형
              </CheckItem>
              <CheckItem
                isSelected={selectedOptions['친구초대 괜찮아요']}
                onClick={() => {
                  handleOptionClick('친구초대 괜찮아요');
                }}
              >
                친구초대 괜찮아요
              </CheckItem>
              <CheckItem
                isSelected={selectedOptions['취미 같이 즐겨요']}
                onClick={() => {
                  handleOptionClick('취미 같이 즐겨요');
                }}
              >
                취미 같이 즐겨요
              </CheckItem>
            </styles.option_list_check_item_container>
          </styles.option_list_item>
        </styles.option_list>
      </styles.option_container>
    </styles.page_container>
  );
}
