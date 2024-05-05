'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { UserInputSection } from '@/components';
import {
  LocationSearchBox,
  MateSearchBox,
} from '@/components/writing-post-page';
import { useAuthValue } from '@/features/auth';
import { getImageURL, putImage } from '@/features/image';
import {
  useCreateSharedPost,
  useCreateSharedPostProps,
  usePostMateCardInputSection,
  type ImageFile,
} from '@/features/shared';
import { useToast } from '@/features/toast';
import {
  type RentalType,
  RoomTypeValue,
  RentalTypeValue,
  type RoomType,
  FloorTypeValue,
  type FloorType,
} from '@/shared/types';

const styles = {
  pageContainer: styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem 10rem;
    width: 100%;

    max-height: fit-content;

    background: var(--background, #f7f6f9);
  `,
  postContainer: styled.div`
    display: flex;
    padding: 2rem;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 2rem;
    align-self: stretch;

    border-radius: 16px;
    background: #fff;
  `,
  essentialInfoContainer: styled.div`
    display: flex;
    flex: 1 0 0;
    width: 100%;
    flex-direction: column;
    gap: 1rem;
  `,
  essentialRow: styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    gap: 1rem;

    .column {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      flex: 1 0 0;
    }
  `,
  mateCardContainer: styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 1rem;

    button {
      all: unset;
      cursor: pointer;

      display: flex;
      width: fit-content;
      padding: 0.5rem 1rem;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;

      border-radius: 0.5rem;
      background: #ededed;

      color: #000;
      font-family: 'Noto Sans KR';
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    button[class~='edit'] {
      display: flex;
      width: fit-content;
      padding: 0.5rem 1rem;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;

      border-radius: 0.5rem;
      background: #e15637;

      color: #eee;
      font-family: 'Noto Sans KR';
      font-size: 1rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  `,
  row: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
  `,
  option: styled.h2`
    color: var(--Black, #35373a);
    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    align-self: stretch;
  `,
  captionRow: styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 1rem;
    align-self: stretch;

    .caption {
      color: var(--Black, #35373a);
      font-family: 'Noto Sans KR';
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  `,
  dealInfoContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1rem;
    align-self: stretch;
  `,
  roomInfoContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1rem;
    align-self: stretch;
  `,
  caption: styled.span`
    color: rgba(53, 55, 58, 0.5);
    font-family: 'Noto Sans KR';
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,
  optionRow: styled.div`
    display: flex;
    align-items: flex-start;
    gap: 2rem;
    align-self: stretch;
  `,
  optionCategory: styled.h1`
    align-self: stretch;

    color: #000;
    font-family: 'Noto Sans KR';
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
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
  titleInput: styled.input`
    all: unset;

    display: flex;
    padding: 1rem;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    align-self: stretch;
    border-radius: 8px;
    background: #ededed;
  `,
  contentInput: styled.textarea`
    all: unset;

    display: flex;
    height: 100%;
    padding: 1rem;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    align-self: stretch;
    border-radius: 8px;
    background: #ededed;
  `,
  optionButtonContainer: styled.div`
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;

    span {
      color: #000;
      font-family: 'Noto Sans KR';
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
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
  images: styled.div`
    display: flex;
    align-items: center;
    align-self: stretch;
    gap: 1rem;

    overflow-x: auto;
  `,
  image: styled.img`
    width: 14.4375rem;
    height: 9.875rem;
    background: #ededed;

    object-fit: cover;
    object-position: center;

    cursor: pointer;
  `,
  imageAddButton: styled.button`
    all: unset;

    border: 0.5px solid #80808080;
    cursor: pointer;

    width: 14.4375rem;
    height: 9.875rem;
    background: #ededed;
    background-image: url(https://s3-alpha-sig.figma.com/img/7307/09fa/b5d93c9ac77c2570ffbee89fe8a76c98?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Xr~6xrrHnQFb6NwdPlxTuJ2wd7kTnRZ-9kpTlGxYQL-bU7ZVcN8IMQ4k6yEAj~x3y2roX-poLo4XP4x6-adpxlciddzg0ZUuWg0B3VrMgMwbl~sTasgqAe~0SL9E4kkEx7OilanZoC5fJlVBglfb8kE1nZBaG5wEp3FCbLZhzZTnl~29Loisbo1pwteh~2ABpLSVttEztULov1lzws4qcrHY5QpGb8KM4PxBTBTfQDMa8an5QmG~uUlt-bYgVEFMuA2vsKHc-aY8HoiF7v03UDHSGNOVrX1Ajt7ARWqJtOiM~epvCYTkVJPmkNe6WcCgRm37xGKbH2LEzn9aEZJyFA__);
    background-position: center;
    background-repeat: no-repeat;
  `,
  inputContainer: styled.div`
    display: flex;
    width: fit-content;
    padding: 0.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid var(--Black, #35373a);
  `,
  input: styled.input<{ $width: number }>`
    all: unset;
    width: ${({ $width }) => `${$width}rem`};
    flex: 1 0 0;
    color: var(--Gray-5, #828282);
    text-align: right;
  `,
  inputPlaceholder: styled.span`
    color: var(--Gray-5, #828282);
    text-align: right;
    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,
  mates: styled.div`
    display: flex;
    align-items: center;
    align-self: stretch;
    gap: 1rem;

    overflow-x: auto;
  `,
  mate: styled.img`
    width: 5.0625rem;
    height: 5.125rem;
    border-radius: 50%;
    border: 1px solid #dcddea;
    background: #fff;
  `,
  mateAddButton: styled.input`
    all: unset;
    cursor: pointer;

    width: 5.0625rem;
    height: 5.125rem;

    border-radius: 50%;
    border: 1px solid #dcddea;
    background: #fff;
    background-image: url('/icon-plus.png');
    background-position: center;
    background-repeat: no-repeat;
  `,
  address: styled.span`
    color: #e15637;
    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,
  addressFindButtonContainer: styled.button`
    all: unset;
    cursor: pointer;

    display: flex;
    padding: 0.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    border-radius: 8px;
    background: #ededed;

    span {
      color: #000;
      font-family: 'Noto Sans KR';
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  `,
  addressFindButtonIcon: styled.img`
    width: 2rem;
    height: 2rem;
  `,
};

const DealOptions = { 월세: 'MONTHLY', 전세: 'JEONSE' };
const RoomOptions = {
  원룸: 'ONE_ROOM',
  '빌라/투룸이상': 'TWO_ROOM_VILLA',
  아파트: 'APT',
  오피스텔: 'OFFICE_TEL',
};
const LivingRoomOptions = ['유', '무'];
const RoomCountOptions = { '1개': 1, '2개': 2, '3개 이상': 3 };
const RestRoomCountOptions = { '1개': 1, '2개': 2, '3개 이상': 3 };
const FloorOptions = {
  지상: 'GROUND',
  반지하: 'SEMI_BASEMENT',
  옥탑: 'PENTHOUSE',
};
const AdditionalOptions = {
  canPark: '주차가능',
  hasAirConditioner: '에어컨',
  hasRefrigerator: '냉장고',
  hasWasher: '세탁기',
  hasTerrace: '베란다/테라스',
};

interface ButtonActiveProps {
  $isSelected: boolean;
}

export function WritingPostPage() {
  const router = useRouter();

  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [showMateSearchBox, setShowMateSearchBox] = useState<boolean>(false);
  const [showMateCardForm, setShowMateCardForm] = useState<boolean>(false);
  const [showLocationSearchBox, setShowLocationSearchBox] =
    useState<boolean>(false);

  const {
    title,
    content,
    images,
    mateLimit,
    houseSize,
    address,
    selectedOptions,
    selectedExtraOptions,
    expectedMonthlyFee,
    setTitle,
    setContent,
    setImages,
    setMateLimit,
    setHouseSize,
    setAddress,
    setExpectedMonthlyFee,
    handleOptionClick,
    handleExtraOptionClick,
    isOptionSelected,
    isExtraOptionSelected,
  } = useCreateSharedPostProps();

  const {
    gender,
    birthYear,
    mbti,
    major,
    budget,
    derivedFeatures,
    setBirthYear,
    setMbti,
    setMajor,
    setBudget,
    handleEssentialFeatureChange,
    handleOptionalFeatureChange,
  } = usePostMateCardInputSection();

  const { mutate } = useCreateSharedPost();
  const { createToast } = useToast();

  const auth = useAuthValue();

  const handleTitleInputChanged = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTitle(event.target.value);
  };

  const handleContentInputChanged = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setContent(event.target.value);
  };

  const handleImageInputClicked = () => {
    imageInputRef.current?.click();
  };

  const handleFileChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleNumberInput = (
    value: string,
    setter: (value: number) => void,
  ) => {
    const converted = convertToNumber(value);
    if (converted == null) return;
    setter(converted);
  };

  const handleCreatePost = (event: React.MouseEvent<HTMLButtonElement>) => {
    createToast({ message: '생성 버튼 클릭', option: { duration: 1000 } });
    // if (!isPostCreatable || !isMateCardCreatable) return;

    const rentalType = selectedOptions.budget;
    const { roomType } = selectedOptions;
    const { floorType } = selectedOptions;

    if (
      rentalType == null ||
      roomType == null ||
      floorType == null ||
      address == null ||
      selectedOptions.roomCount == null ||
      !(selectedOptions.roomCount in RoomCountOptions) ||
      selectedOptions.restRoomCount == null ||
      !(selectedOptions.restRoomCount in RestRoomCountOptions)
    )
      return;

    const numberOfRoomOption = selectedOptions.roomCount as
      | '1개'
      | '2개'
      | '3개 이상';
    const numberOfRoom = RoomCountOptions[numberOfRoomOption];

    const numberOfBathRoomOption = selectedOptions.restRoomCount as
      | '1개'
      | '2개'
      | '3개 이상';
    const numberOfBathRoom = RestRoomCountOptions[numberOfBathRoomOption];

    const rentalTypeValue = RentalTypeValue[rentalType as RentalType];
    const roomTypeValue = RoomTypeValue[roomType as RoomType];
    const floorTypeValue = FloorTypeValue[floorType as FloorType];

    (async () => {
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
            postData: { title, content },
            transactionData: {
              rentalType: rentalTypeValue,
              expectedPayment: expectedMonthlyFee,
            },
            roomDetailData: {
              roomType: roomTypeValue,
              floorType: floorTypeValue,
              size: houseSize,
              numberOfRoom,
              numberOfBathRoom,
              hasLivingRoom: selectedOptions.livingRoom === '유',
              recruitmentCapacity: mateLimit,
              extraOption: {
                canPark: selectedExtraOptions.canPark ?? false,
                hasAirConditioner:
                  selectedExtraOptions.hasAirConditioner ?? false,
                hasRefrigerator: selectedExtraOptions.hasRefrigerator ?? false,
                hasWasher: selectedExtraOptions.hasWasher ?? false,
                hasTerrace: selectedExtraOptions.hasTerrace ?? false,
              },
            },
            locationData: {
              oldAddress: address?.jibunAddress,
              roadAddress: address?.roadAddress,
            },
            roomMateCardData: {
              location: address?.roadAddress,
              features: derivedFeatures,
            },
            participationMemberIds:
              auth?.user != null ? [auth.user.memberId] : [],
          },
          {
            onSuccess: () => {
              createToast({
                message: '게시글이 정상적으로 업로드되었습니다.',
                option: {
                  duration: 3000,
                },
              });
              router.back();
            },
            onError: () => {
              createToast({
                message: '게시글 업로드에 실패했습니다.',
                option: {
                  duration: 3000,
                },
              });
            },
          },
        );
      } catch (error) {
        createToast({
          message: '게시글 업로드에 실패했습니다.',
          option: {
            duration: 3000,
          },
        });
      }
    })();
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
        <styles.essentialInfoContainer>
          <styles.row>
            <styles.optionCategory>기본 정보</styles.optionCategory>
            <styles.createButton onClick={handleCreatePost}>
              작성하기
            </styles.createButton>
          </styles.row>
          <styles.optionCategory>제목</styles.optionCategory>
          <styles.titleInput
            value={title}
            onChange={handleTitleInputChanged}
            placeholder="제목을 입력해주세요"
          />
          <styles.optionCategory>위치 정보</styles.optionCategory>
          <styles.captionRow>
            <styles.addressFindButtonContainer
              onClick={() => {
                setShowLocationSearchBox(true);
              }}
            >
              <styles.addressFindButtonIcon src="/icon-search32.svg" />
              <span>위치 찾기</span>
            </styles.addressFindButtonContainer>
            <span className="caption" style={{ alignSelf: 'center' }}>
              상세 주소:
            </span>
            <styles.address style={{ alignSelf: 'center' }}>
              {address?.roadAddress ?? '주소를 입력해주세요.'}
            </styles.address>
          </styles.captionRow>
          {showLocationSearchBox && (
            <LocationSearchBox
              onSelect={selectedAddress => {
                setAddress(selectedAddress);
                setShowLocationSearchBox(false);
              }}
              setHidden={() => {
                setShowLocationSearchBox(false);
              }}
            />
          )}
          <styles.essentialRow>
            <div className="column">
              <styles.option>상세 정보</styles.option>
              <styles.contentInput
                value={content}
                onChange={handleContentInputChanged}
                placeholder="내용을 입력해주세요"
              />
            </div>
            <div className="column">
              <styles.captionRow>
                <styles.option>사진</styles.option>
                <styles.caption>최소 2장 이상 업로드</styles.caption>
              </styles.captionRow>
              <styles.images>
                {images.map(image => (
                  <styles.image
                    key={image.url}
                    src={image.url}
                    onClick={() => {
                      handleRemoveImage(image);
                    }}
                  />
                ))}
                <styles.imageAddButton onClick={handleImageInputClicked}>
                  <input
                    ref={imageInputRef}
                    type="file"
                    multiple
                    onChange={handleFileChanged}
                    style={{ display: 'none' }}
                  />
                </styles.imageAddButton>
              </styles.images>
            </div>
          </styles.essentialRow>
          <styles.essentialRow>
            <div className="column">
              <styles.option>모집 할 인원</styles.option>
              <styles.inputContainer>
                <styles.input
                  value={mateLimit}
                  onChange={event => {
                    handleNumberInput(event.target.value, value => {
                      setMateLimit(value);
                    });
                  }}
                  $width={3}
                />
                <styles.inputPlaceholder>명</styles.inputPlaceholder>
              </styles.inputContainer>
            </div>
            <div className="column">
              <styles.option>메이트</styles.option>
              <styles.mates>
                <styles.mateAddButton
                  onClick={() => {
                    setShowMateSearchBox(true);
                  }}
                />
                {showMateSearchBox && (
                  <MateSearchBox
                    setHidden={() => {
                      setShowMateSearchBox(false);
                    }}
                  />
                )}
              </styles.mates>
            </div>
          </styles.essentialRow>
          <styles.mateCardContainer>
            <styles.option>메이트 카드</styles.option>
            <button
              type="button"
              onClick={() => {
                if (address != null) {
                  setShowMateCardForm(prev => !prev);
                } else {
                  createToast({
                    message: '주소를 먼저 입력해주세요',
                    option: { duration: 3000 },
                  });
                }
              }}
            >
              메이트 카드 작성하기
            </button>
            {showMateCardForm && (
              <UserInputSection
                gender={gender}
                birthYear={birthYear}
                location={address?.roadAddress ?? '주소를 입력해주세요.'}
                mbti={mbti}
                major={major}
                budget={budget}
                features={undefined}
                isMySelf
                type="mateCard"
                onVitalChange={(optionName, option) => {
                  if (
                    optionName === 'room' ||
                    optionName === 'smoking' ||
                    optionName === 'mateAge'
                  ) {
                    handleEssentialFeatureChange(optionName, option);
                  }
                }}
                onOptionChange={handleOptionalFeatureChange}
                onLocationChange={() => {}}
                onMateAgeChange={setBirthYear}
                onMbtiChange={setMbti}
                onMajorChange={setMajor}
                onBudgetChange={setBudget}
              />
            )}
          </styles.mateCardContainer>
        </styles.essentialInfoContainer>
        <styles.dealInfoContainer>
          <styles.optionCategory>거래 정보</styles.optionCategory>
          <styles.option>거래 방식</styles.option>
          <styles.optionRow>
            {Object.entries(DealOptions).map(([option, value]) => (
              <styles.optionButtonContainer key={option}>
                <styles.customRadioButton
                  $isSelected={isOptionSelected('budget', value)}
                  onClick={() => {
                    handleOptionClick('budget', value);
                  }}
                />
                <span>{option}</span>
              </styles.optionButtonContainer>
            ))}
          </styles.optionRow>
          <styles.option>희망 메이트 월 분담금</styles.option>
          <styles.inputContainer>
            <styles.input
              value={expectedMonthlyFee}
              onChange={event => {
                handleNumberInput(event.target.value, value => {
                  setExpectedMonthlyFee(value);
                });
              }}
              $width={3}
            />
            <styles.inputPlaceholder>만원</styles.inputPlaceholder>
          </styles.inputContainer>
        </styles.dealInfoContainer>
        <styles.roomInfoContainer>
          <styles.optionCategory>방 정보</styles.optionCategory>
          <styles.option>층</styles.option>
          <styles.optionRow>
            {Object.entries(FloorOptions).map(([option, value]) => (
              <styles.optionButtonContainer key={option}>
                <styles.customRadioButton
                  $isSelected={isOptionSelected('floorType', value)}
                  onClick={() => {
                    handleOptionClick('floorType', value);
                  }}
                />
                <span>{option}</span>
              </styles.optionButtonContainer>
            ))}
          </styles.optionRow>
          <styles.option>추가 옵션</styles.option>
          <styles.optionRow>
            {Object.entries(AdditionalOptions).map(([option, value]) => (
              <styles.optionButtonContainer key={option}>
                <styles.customCheckBox
                  $isSelected={isExtraOptionSelected(value)}
                  onClick={() => {
                    handleExtraOptionClick(value);
                  }}
                />
                <span>{value}</span>
              </styles.optionButtonContainer>
            ))}
          </styles.optionRow>
          <styles.option>방 종류</styles.option>
          <styles.optionRow>
            {Object.entries(RoomOptions).map(([option, value]) => (
              <styles.optionButtonContainer key={option}>
                <styles.customRadioButton
                  $isSelected={isOptionSelected('roomType', value)}
                  onClick={() => {
                    handleOptionClick('roomType', value);
                  }}
                />
                <span>{option}</span>
              </styles.optionButtonContainer>
            ))}
          </styles.optionRow>
          <styles.option>거실</styles.option>
          <styles.optionRow>
            {LivingRoomOptions.map(option => (
              <styles.optionButtonContainer key={option}>
                <styles.customRadioButton
                  $isSelected={isOptionSelected('livingRoom', option)}
                  onClick={() => {
                    handleOptionClick('livingRoom', option);
                  }}
                />
                <span>{option}</span>
              </styles.optionButtonContainer>
            ))}
          </styles.optionRow>
          <styles.option>방 개수</styles.option>
          <styles.optionRow>
            {Object.keys(RoomCountOptions).map(option => (
              <styles.optionButtonContainer key={option}>
                <styles.customRadioButton
                  $isSelected={isOptionSelected('roomCount', option)}
                  onClick={() => {
                    handleOptionClick('roomCount', option);
                  }}
                />
                <span>{option}</span>
              </styles.optionButtonContainer>
            ))}
          </styles.optionRow>
          <styles.option>화장실 개수</styles.option>
          <styles.optionRow>
            {Object.keys(RestRoomCountOptions).map(option => (
              <styles.optionButtonContainer key={option}>
                <styles.customRadioButton
                  $isSelected={isOptionSelected('restRoomCount', option)}
                  onClick={() => {
                    handleOptionClick('restRoomCount', option);
                  }}
                />
                <span>{option}</span>
              </styles.optionButtonContainer>
            ))}
          </styles.optionRow>
          <styles.option>전체 면적</styles.option>
          <styles.inputContainer>
            <styles.input
              value={houseSize}
              onChange={event => {
                handleNumberInput(event.target.value, value => {
                  setHouseSize(value);
                });
              }}
              $width={2}
            />
            <styles.inputPlaceholder>평</styles.inputPlaceholder>
          </styles.inputContainer>
        </styles.roomInfoContainer>
      </styles.postContainer>
    </styles.pageContainer>
  );
}
