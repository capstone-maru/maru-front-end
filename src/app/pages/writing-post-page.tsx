'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { AddButton, CancelButton } from '@/components';
import { getImageURL, putImage } from '@/features/image';
import { useCreateSharedPost } from '@/features/shared';

const styles = {
  pageContainer: styled.div`
    background: var(--background, #f7f6f9);

    position: relative;
    width: 100%;
    min-height: 100%;
    height: fit-content;

    display: flex;
    justify-content: center;
    align-items: stretch;
    overflow: auto;
  `,
  postContainer: styled.div`
    width: 75rem;
    height: 100%;
    max-height: fit-content;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 2rem;
    margin: 3rem 7.5rem;
    padding: 3.69rem 4.19rem 0 4.19rem;
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

    display: flex;
    flex-direction: column;
    gap: 1.125rem;
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
    width: 5.5rem;
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
    width: 2rem;
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

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      margin: 0;
      -webkit-appearance: none;
    }

    &[type='number'] {
      appearance: textfield;
      -moz-appearance: textfield;
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
      props.$isSelected
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
      props.$isSelected
        ? {
            backgroundImage: `url('/button-icon/Check box.svg')`,
          }
        : {
            backgroundImage: `url('/button-icon/Check box outline blank.svg')`,
          }};
  `,
  titleInputBox: styled.input<{ $empty: boolean }>`
    width: 41.125rem;
    padding: 0.5rem 1rem;

    border: none;
    border-radius: 0.5rem;
    background: var(--Gray-6, #efefef);

    color: ${({ $empty }) => ($empty ? '#9a95a3' : '#000')};

    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    &:focus {
      outline: none;
    }
  `,
  detailedInputBox: styled.input<{ $empty: boolean }>`
    width: 41.125rem;
    height: 5.4375rem;
    padding: 0.5rem 1rem 3.5rem 1rem;

    border: none;
    border-radius: 0.5rem;
    background: var(--Gray-6, #efefef);

    color: ${({ $empty }) => ($empty ? '#9a95a3' : '#000')};

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
    width: 5.5rem;
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
  row: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
  createButton: styled.button`
    all: unset;

    cursor: pointer;

    display: flex;
    width: 7.125rem;
    height: fit-content;
    padding: 0.5rem 1.5rem;
    justify-content: center;
    align-items: center;

    border-radius: 8px;
    background: var(--Black, #35373a);

    color: #fff;
    font-family: Pretendard;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.5rem;
  `,
  images: styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 0.5rem;

    overflow-x: auto;
  `,
  cancelButton: styled.button`
    all: unset;
    position: relative;
    cursor: pointer;

    top: 0.69rem;
    left: 85%;
  `,
};

const DealOptions = ['월세', '전세'];
const RoomOptions = ['원룸', '빌라/투룸이상', '아파트', '오피스텔'];
const LivingRoomOptions = ['유', '무'];
const RoomCountOptions = ['1개', '2개', '3개 이상'];
const RestRoomCountOptions = ['1개', '2개', '3개 이상'];
const FloorOptions = ['지상', '반지하', '옥탑'];
const AdditionalOptions = [
  '주차가능',
  '에어컨',
  '냉장고',
  '세탁기',
  '베란다/테라스',
];

interface ButtonActiveProps {
  $isSelected: boolean;
}

interface SelectedOptions {
  budget?: string;
  roomType?: string;
  livingRoom?: string;
  roomCount?: string;
  restRoomCount?: string;
}

type SelectedExtraOptions = Record<string, boolean>;

interface ImageFile {
  url: string;
  file: File;
  extension: string;
}

export function WritingPostPage() {
  const router = useRouter();

  const [images, setImages] = useState<ImageFile[]>([]);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedExtraOptions, setSelectedExtraOptions] =
    useState<SelectedExtraOptions>({});
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [expectedMonthlyFee, setExpectedMonthlyFee] = useState<number>(0);
  const [houseSize, setHouseSize] = useState<number>(0);
  const [roomSize, setRoomSize] = useState<number>(0);
  const [floor, setFloor] = useState<number>(0);

  const { mutate } = useCreateSharedPost();

  const handleExtraOptionClick = (option: string) => {
    setSelectedExtraOptions(prevSelectedOptions => ({
      ...prevSelectedOptions,
      [option]: !prevSelectedOptions[option],
    }));
  };

  const handleOptionClick = (
    optionName: keyof SelectedOptions,
    item: string,
  ) => {
    setSelectedOptions(prevState => ({
      ...prevState,
      [optionName]: prevState[optionName] === item ? null : item,
    }));
  };

  const handleImageInputClick = () => {
    imageInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files != null) {
      const imagesArray = Array.from(files).map(file => ({
        file,
        url: URL.createObjectURL(file),
        extension: `.${file.type.split('/')[1]}`,
      }));
      setImages(prevImages => [...prevImages, ...imagesArray]);
    }
  };

  const handleRemoveImage = (removeImage: ImageFile) => {
    setImages(prev => prev.filter(image => image.url !== removeImage.url));
  };

  const convertToNumber = (value: string) => {
    const updatedValue = value.replace(/^0+/, '');

    if (updatedValue.length === 0) return 0;

    const numberUpdateValue = Number(updatedValue);
    if (!Number.isNaN(numberUpdateValue)) return numberUpdateValue;
    return null;
  };

  const handleExpectedMonthlyFeeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    const updateValue = convertToNumber(value);
    if (updateValue != null) {
      setExpectedMonthlyFee(updateValue);
    }
  };

  const handleHouseSizeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    const updateValue = convertToNumber(value);
    if (updateValue != null) {
      setHouseSize(updateValue);
    }
  };

  const handleRoomSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const updateValue = convertToNumber(value);
    if (updateValue != null) {
      setRoomSize(updateValue);
    }
  };

  const handleFloorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const updateValue = convertToNumber(value);
    if (updateValue != null) {
      setFloor(updateValue);
    }
  };

  const handleCreatePost = (event: React.MouseEvent<HTMLButtonElement>) => {
    (async () => {
      if (images.length > 0) {
        try {
          const getResults = await Promise.allSettled(
            images.map(async ({ extension, file }) => {
              const result = await getImageURL(extension);
              return {
                ...result.data.data,
                file,
              };
            }),
          );

          const urls = getResults.reduce<
            Array<{ file: File; fileName: string; url: string }>
          >((prev, result) => {
            if (result.status === 'rejected') return prev;
            return prev.concat(result.value);
          }, []);

          const putResults = await Promise.allSettled(
            urls.map(async url => {
              await putImage(url.url, url.file);
              return { fileName: url.fileName };
            }),
          );

          const uploadedImages = putResults.reduce<
            Array<{ fileName: string; isThumbNail: boolean; order: number }>
          >((prev, result) => {
            if (result.status === 'rejected') return prev;
            return prev.concat({
              fileName: result.value.fileName,
              isThumbNail: prev.length === 0,
              order: prev.length + 1,
            });
          }, []);

          mutate(
            {
              imageFilesData: uploadedImages,
              postData: { content, title },
              transactionData: {
                rentalType: '0',
                price: 100000,
                monthlyFee: 10000,
                managementFee: 1000,
              },
              roomDetailData: {
                roomType: '0',
                size: 5,
                numberOfRoom: 1,
                recruitmentCapacity: 2,
              },
              locationData: {
                city: 'SEOUL',
                oldAddress: 'test old address',
                roadAddress: 'test road address',
                stationName: 'mokdong',
                stationTime: 10,
                busStopTime: 3,
                schoolName: 'kookmin',
                schoolTime: 20,
                convenienceStoreTime: 2,
              },
            },
            {
              onSuccess: () => {
                toast('글 작성을 완료했습니다.', { position: 'bottom-right' });
                router.back();
              },
              onError: () => {
                toast('글 작성 도중 오류가 발생했습니다.', {
                  position: 'bottom-right',
                });
              },
            },
          );
        } catch (error) {
          console.error(error);
        }
      }
    })().catch((error: Error) => {
      console.error(error);
    });
  };

  useEffect(
    () => () => {
      images.forEach(image => {
        URL.revokeObjectURL(image.url);
      });
    },
    [images],
  );

  return (
    <styles.pageContainer>
      <styles.postContainer>
        <styles.vitalContainer>
          <styles.row>
            <styles.containerDescription>기본 정보</styles.containerDescription>
            <styles.createButton onClick={handleCreatePost}>
              작성하기
            </styles.createButton>
          </styles.row>
          <styles.listContainer>
            <styles.listItem>
              <styles.listItemDescription>사진</styles.listItemDescription>
              <styles.addImgButton onClick={handleImageInputClick}>
                + 사진 추가
                <input
                  ref={imageInputRef}
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </styles.addImgButton>
              <styles.listItemDescription>
                최소 2장 이상 업로드
              </styles.listItemDescription>
            </styles.listItem>
            {images.length > 0 && (
              <styles.listItem>
                <styles.listItemDescription />
                <styles.images>
                  {images.map((image, index) => (
                    <div
                      key={image.url}
                      style={{
                        position: 'relative',
                        width: '14.4375rem',
                        height: '9.875rem',
                        border: '1px solid #19191920',
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={image.url}
                        alt={`Uploaded ${index}`}
                        layout="fill"
                        objectFit="cover"
                      />
                      <styles.cancelButton>
                        <CancelButton
                          onClick={() => {
                            handleRemoveImage(image);
                          }}
                          fill="black"
                        />
                      </styles.cancelButton>
                    </div>
                  ))}
                </styles.images>
              </styles.listItem>
            )}
            <styles.listItem>
              <styles.listItemDescription>인원</styles.listItemDescription>
              <styles.inputContainer>
                <styles.userInput />
                <styles.inputPlaceholder>명</styles.inputPlaceholder>
              </styles.inputContainer>
            </styles.listItem>
            <styles.listItem>
              <styles.listItemDescription>메이트</styles.listItemDescription>
              <AddButton onClick={() => {}} />
            </styles.listItem>
          </styles.listContainer>
        </styles.vitalContainer>
        <styles.budgetContainer>
          <styles.containerDescription>거래 정보</styles.containerDescription>
          <styles.listContainer>
            <styles.listItem>
              <styles.listItemDescription>거래방식</styles.listItemDescription>
              {DealOptions.map(option => (
                <styles.checkButtonContainer key={option}>
                  <styles.customRadioButton
                    $isSelected={selectedOptions.budget === option}
                    onClick={() => {
                      handleOptionClick('budget', option);
                    }}
                  />
                  <styles.checkButtonDescription>
                    {option}
                  </styles.checkButtonDescription>
                </styles.checkButtonContainer>
              ))}
            </styles.listItem>
            <styles.listItem>
              <styles.listItemDescription>
                희망 메이트 월 분담금
              </styles.listItemDescription>
              <styles.inputContainer>
                <styles.userInput
                  value={expectedMonthlyFee}
                  onChange={handleExpectedMonthlyFeeChange}
                />
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
              {RoomOptions.map(option => (
                <styles.checkButtonContainer key={option}>
                  <styles.customRadioButton
                    $isSelected={selectedOptions.roomType === option}
                    onClick={() => {
                      handleOptionClick('roomType', option);
                    }}
                  />
                  <styles.checkButtonDescription>
                    {option}
                  </styles.checkButtonDescription>
                </styles.checkButtonContainer>
              ))}
            </styles.listItem>
            <styles.listItem>
              <styles.listItemDescription>거실</styles.listItemDescription>
              {LivingRoomOptions.map(option => (
                <styles.checkButtonContainer key={option}>
                  <styles.customRadioButton
                    $isSelected={selectedOptions.livingRoom === option}
                    onClick={() => {
                      handleOptionClick('livingRoom', option);
                    }}
                  />
                  <styles.checkButtonDescription>
                    {option}
                  </styles.checkButtonDescription>
                </styles.checkButtonContainer>
              ))}
            </styles.listItem>
            <styles.listItem>
              <styles.listItemDescription>방 개수</styles.listItemDescription>
              {RoomCountOptions.map(option => (
                <styles.checkButtonContainer key={option}>
                  <styles.customRadioButton
                    $isSelected={selectedOptions.roomCount === option}
                    onClick={() => {
                      handleOptionClick('roomCount', option);
                    }}
                  />
                  <styles.checkButtonDescription>
                    {option}
                  </styles.checkButtonDescription>
                </styles.checkButtonContainer>
              ))}
            </styles.listItem>
            <styles.listItem>
              <styles.listItemDescription>
                화장실 개수
              </styles.listItemDescription>
              {RestRoomCountOptions.map(option => (
                <styles.checkButtonContainer key={option}>
                  <styles.customRadioButton
                    $isSelected={selectedOptions.restRoomCount === option}
                    onClick={() => {
                      handleOptionClick('restRoomCount', option);
                    }}
                  />
                  <styles.checkButtonDescription>
                    {option}
                  </styles.checkButtonDescription>
                </styles.checkButtonContainer>
              ))}
            </styles.listItem>
            <styles.listItem>
              <styles.listItemDescription>
                전체 면적 / 방 면적
              </styles.listItemDescription>
              <styles.inputContainer>
                <styles.userInput
                  value={houseSize}
                  onChange={handleHouseSizeChange}
                />
                <styles.inputPlaceholder>평</styles.inputPlaceholder>
              </styles.inputContainer>
              <styles.slash>/</styles.slash>
              <styles.inputContainer>
                <styles.userInput
                  value={roomSize}
                  onChange={handleRoomSizeChange}
                />
                <styles.inputPlaceholder>평</styles.inputPlaceholder>
              </styles.inputContainer>
            </styles.listItem>
            <styles.listItem>
              <styles.listItemDescription>층수</styles.listItemDescription>
              {FloorOptions.map(option => (
                <styles.checkButtonContainer
                  key={option}
                  style={{ margin: option === '옥탑' ? '0' : '' }}
                >
                  <styles.customRadioButton
                    $isSelected={selectedOptions.restRoomCount === option}
                    onClick={() => {
                      handleOptionClick('restRoomCount', option);
                    }}
                  />
                  <styles.checkButtonDescription>
                    {option}
                  </styles.checkButtonDescription>
                </styles.checkButtonContainer>
              ))}
              <styles.slash>/</styles.slash>
              <styles.inputContainer>
                <styles.userInput value={floor} onChange={handleFloorChange} />
                <styles.inputPlaceholder>층</styles.inputPlaceholder>
              </styles.inputContainer>
            </styles.listItem>
            <styles.listItem>
              <styles.listItemDescription>추가 옵션</styles.listItemDescription>
              {AdditionalOptions.map(option => (
                <styles.checkButtonContainer key={option}>
                  <styles.customCheckBox
                    $isSelected={selectedExtraOptions[option]}
                    onClick={() => {
                      handleExtraOptionClick(option);
                    }}
                  />
                  <styles.checkButtonDescription>
                    {option}
                  </styles.checkButtonDescription>
                </styles.checkButtonContainer>
              ))}
            </styles.listItem>
          </styles.listContainer>
        </styles.roomContainer>
        <styles.detailedContainer>
          <styles.containerDescription>제목</styles.containerDescription>
          <styles.titleInputBox
            $empty={title.length === 0}
            value={title}
            onChange={event => {
              setTitle(event.target.value);
            }}
            placeholder="입력"
            type="text"
          />
        </styles.detailedContainer>
        <styles.detailedContainer>
          <styles.containerDescription>상세 정보</styles.containerDescription>
          <styles.detailedInputBox
            $empty={content.length === 0}
            value={content}
            onChange={event => {
              setContent(event.target.value);
            }}
            placeholder="입력"
            type="text"
          />
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
              <styles.slash style={{ marginLeft: '6.8rem' }}>도보</styles.slash>
              <styles.inputContainer>
                <styles.userInput />
                <styles.inputPlaceholder>분</styles.inputPlaceholder>
              </styles.inputContainer>
            </styles.listItem>
            <styles.listItem>
              <styles.listItemDescription>학교</styles.listItemDescription>
              <styles.inputContainer>
                <styles.userInput />
                <styles.inputPlaceholder>학교</styles.inputPlaceholder>
              </styles.inputContainer>
              <styles.slash>도보</styles.slash>
              <styles.inputContainer>
                <styles.userInput />
                <styles.inputPlaceholder>분</styles.inputPlaceholder>
              </styles.inputContainer>
            </styles.listItem>
            <styles.listItem>
              <styles.listItemDescription>편의점</styles.listItemDescription>
              <styles.slash style={{ marginLeft: '6.8rem' }}>도보</styles.slash>
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
