'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import { Bookmark, CircularProfileImage } from '@/components';
import { CardToggleButton, ImageGrid } from '@/components/shared-post-page';
import { useAuthValue, useUserData } from '@/features/auth';
import { useCreateChatRoom } from '@/features/chat';
import { fromAddrToCoord } from '@/features/geocoding';
import {
  useFollowUser,
  useFollowingListData,
  useUnfollowUser,
} from '@/features/profile';
import {
  useDeleteSharedPost,
  useDormitorySharedPost,
  useScrapSharedPost,
  useSharedPost,
} from '@/features/shared';
import { useToast } from '@/features/toast';
import { getAge } from '@/shared';

const styles = {
  container: styled.div`
    width: 100%;

    display: flex;
    padding-block: 2rem;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    background: var(--background, #f7f6f9);
  `,
  contentContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 1rem;

    max-width: min-content;
  `,
  postContainer: styled.div`
    display: flex;
    padding: 2rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;

    border-radius: 16px;
    background: #fff;
  `,
  mateContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1rem;
  `,
  ImageGrid: styled(ImageGrid)`
    width: 667px;
  `,
  postInfoContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;

    width: 100%;

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      align-self: stretch;

      h1 {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;

        overflow: hidden;
        color: #000;
        text-overflow: ellipsis;
        font-family: 'Noto Sans KR';
        font-size: 1.5rem;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      }
    }
  `,
  postInfoContent: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;

    color: var(--Black, #35373a);
    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    & > span {
      width: 100%;
    }

    div {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
    }
  `,
  postContentContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1rem;
    align-self: stretch;

    h2 {
      align-self: stretch;

      color: #000;
      font-family: 'Noto Sans KR';
      font-size: 1.25rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }

    p {
      align-self: stretch;

      color: var(--Black, #35373a);
      font-family: 'Noto Sans KR';
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  `,
  divider: styled.div`
    width: 41.6875rem;
    height: 0.0625rem;
    background: #d3d0d7;
  `,
  dealInfoContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    align-self: stretch;

    h2 {
      color: #000;
      font-family: 'Noto Sans KR';
      font-size: 1.25rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      align-self: stretch;

      color: var(--Black, #35373a);
      font-family: 'Noto Sans KR';
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  `,
  roomInfoContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    align-self: stretch;

    h2 {
      color: #000;
      font-family: 'Noto Sans KR';
      font-size: 1.25rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      align-self: stretch;

      color: var(--Black, #35373a);
      font-family: 'Noto Sans KR';
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  `,
  locationInfoContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1rem;
    align-self: stretch;

    h2 {
      align-self: stretch;

      color: #000;
      font-family: 'Noto Sans KR';
      font-size: 1.25rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }

    p {
      align-self: stretch;
      color: var(--Black, #35373a);
      font-family: 'Noto Sans KR';
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    #map {
      height: 21.125rem;
      align-self: stretch;
    }
  `,
  mates: styled.div`
    display: flex;
    width: 23rem;
    padding: 1rem;
    align-items: flex-start;

    border-radius: 16px;
    background: #fff;
  `,
  mate: styled.img<{ $selected?: boolean; $zIndex?: number }>`
    cursor: pointer;

    display: flex;
    width: 5.25rem;
    height: 5.25rem;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    border-radius: 50%;
    border: 1px solid
      ${({ $selected }) =>
        $selected != null && $selected ? '#e15637' : '#DCDDEA'};
    background: #c4c4c4;

    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);

    z-index: ${({ $zIndex }) => $zIndex};

    &:not(:first-child) {
      margin-left: -1rem;
    }
  `,
  selectedMateContainer: styled.div`
    display: flex;
    padding: 2rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    align-self: stretch;

    border-radius: 16px;
    background: #fff;
  `,
  profile: styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;
    align-self: stretch;
  `,
  profileInfo: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    align-self: stretch;

    .name {
      color: #000;
      font-family: 'Noto Sans KR';
      font-size: 1.5rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

    div {
      color: #000;
      font-family: 'Noto Sans KR';
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  `,
  buttons: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    align-self: stretch;

    div {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      align-self: stretch;
    }
  `,
  chattingButton: styled.button`
    all: unset;
    cursor: pointer;

    display: flex;
    padding: 0.5rem 1.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
    align-self: stretch;

    border-radius: 8px;
    background: var(--Black, #35373a);

    color: #fff;
    font-family: Pretendard;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.5rem;
  `,
  showProfileButton: styled.button`
    all: unset;
    cursor: pointer;

    display: flex;
    padding: 0.5rem 1.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
    flex: 1 0 0;

    border-radius: 8px;
    border: 1px solid var(--Gray-3, #888);
    background: var(--White, #fff);

    color: var(--Gray-3, #888);
    font-family: Pretendard;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.5rem;
  `,
  rowForDeleteAndModify: styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;

    align-self: end;
  `,
  postModifyButton: styled.button`
    all: unset;
    cursor: pointer;

    display: flex;
    width: fit-content;
    height: fit-content;
    padding: 0.5rem 1.5rem;
    justify-content: center;
    align-items: center;

    border-radius: 8px;
    border: 1px solid var(--Gray-3, #888);
    background: var(--White, #fff);

    color: var(--Gray-3, #888);
    font-family: Pretendard;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.5rem;
  `,
  postDeleteButton: styled.div`
    all: unset;
    cursor: pointer;

    display: flex;
    width: fit-content;
    height: fit-content;
    padding: 0.5rem 1.5rem;
    justify-content: center;
    align-items: center;

    border-radius: 0.5rem;
    background: #e15637;

    color: #fff;
    text-align: right;
    font-family: Pretendard;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.5rem;
  `,
  mateCardContainer: styled.div`
    display: flex;
    padding: 1rem;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1rem;
    align-self: stretch;

    border-radius: 1rem;
    background: #fff;

    color: #000;
    font-family: 'Noto Sans KR';
    font-size: 1rem;
    font-style: normal;
    line-height: normal;

    .content {
      display: flex;
      width: 100%;
      flex-direction: column;
      padding-inline: calc(24px + 0.75rem);
      gap: 1rem;

      font-size: 0.9rem;

      div {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        h3 {
          font-size: 1rem;
          font-weight: bold;
        }
      }
    }
  `,
};

export function SharedPostPage({
  postId,
  type,
}: {
  postId: number;
  type: 'hasRoom' | 'dormitory';
}) {
  const auth = useAuthValue();

  const [, setMap] = useState<naver.maps.Map | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const { createToast } = useToast();

  const { mutate: deleteSharedPost } = useDeleteSharedPost();

  const { isLoading: isSharedPostLoading, data: sharedPost } = useSharedPost({
    postId,
    enabled: type === 'hasRoom' && auth?.accessToken != null,
  });

  const { isLoading: isDormitorySharedPostLoading, data: dormitorySharedPost } =
    useDormitorySharedPost({
      postId,
      enabled: type === 'dormitory' && auth?.accessToken != null,
    });

  const [selected, setSelected] = useState<
    | {
        memberId: string;
        profileImage: string;
      }
    | undefined
  >(
    sharedPost != null
      ? {
          memberId: sharedPost.data.publisherAccount.memberId,
          profileImage: sharedPost.data.publisherAccount.profileImageFileName,
        }
      : undefined,
  );

  const { data: userData } = useUserData(auth?.accessToken != null);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    if (userData != null) {
      setUserId(userData.memberId);
    }
  }, [userData]);

  const { mutate: scrapPost } = useScrapSharedPost();

  const followList = useFollowingListData();
  const [isFollowed, setIsFollowed] = useState(
    followList.data?.data.followingList[
      sharedPost?.data.publisherAccount.memberId ?? ''
    ] != null,
  );

  const { mutate: follow } = useFollowUser(
    sharedPost?.data.publisherAccount.memberId ?? '',
  );
  const { mutate: unfollow } = useUnfollowUser(
    sharedPost?.data.publisherAccount.memberId ?? '',
  );

  useEffect(() => {
    if (selected != null || sharedPost == null) return;

    setSelected({
      memberId: sharedPost.data.publisherAccount.memberId,
      profileImage: sharedPost.data.publisherAccount.profileImageFileName,
    });
  }, [selected, sharedPost]);

  useEffect(() => {
    if (sharedPost?.data.address.roadAddress != null) {
      fromAddrToCoord({ query: sharedPost?.data.address.roadAddress }).then(
        res => {
          const address = res.data.addresses.shift();
          if (address != null && mapRef.current != null) {
            const center = new naver.maps.LatLng(+address.y, +address.x);
            setMap(
              new naver.maps.Map(mapRef.current, {
                center,
                disableKineticPan: false,
                scrollWheel: false,
              }),
            );
          }
        },
      );
    }
  }, [sharedPost]);

  const [roomName, setRoomName] = useState<string>('');

  useEffect(() => {
    if (sharedPost !== undefined) {
      setRoomName(sharedPost.data.publisherAccount.nickname);
    }
  }, [sharedPost]);

  const members = [userId];
  const { mutate: chattingMutate } = useCreateChatRoom(roomName, members);

  const isLoading = useMemo(
    () =>
      type === 'hasRoom' ? isSharedPostLoading : isDormitorySharedPostLoading,
    [type, isSharedPostLoading, isDormitorySharedPostLoading],
  );

  const post = useMemo(
    () => (type === 'hasRoom' ? sharedPost : dormitorySharedPost),
    [type, sharedPost, dormitorySharedPost],
  );

  const [showMateCard, setShowMateCard] = useState(false);

  let mateAge: string;
  if (post?.data.roomMateFeatures.mateAge == null) mateAge = '상관없어요';
  else if (post?.data.roomMateFeatures.mateAge === '0') mateAge = '동갑';
  else mateAge = `±${post.data.roomMateFeatures.mateAge}`;

  if (isLoading || post == null) return <></>;

  return (
    <styles.container>
      <styles.contentContainer>
        <styles.postContainer>
          <styles.ImageGrid
            images={post.data.roomImages.map(({ fileName }) => fileName)}
          />
          <styles.postInfoContainer>
            <div>
              <h1>{post.data.title}</h1>
              <Bookmark
                hasBorder={false}
                marked={post.data.isScrapped}
                onToggle={() => {
                  scrapPost(postId);
                }}
                color="black"
              />
            </div>
            <styles.postInfoContent>
              {'roomInfo' in post.data && (
                <>
                  <span>모집 {post.data.roomInfo.recruitmentCapacity}명</span>
                  <span>
                    {post.data.roomInfo.roomType} · 방{' '}
                    {post.data.roomInfo.numberOfRoom} · 화장실{' '}
                    {post.data.roomInfo.numberOfBathRoom}
                  </span>
                </>
              )}
              <div>
                {'roomInfo' in post.data && (
                  <span>
                    희망 월 분담금 {post.data.roomInfo.expectedPayment}만원
                  </span>
                )}
                <span>
                  저장 {post.data.scrapCount} · 조회 {post.data.viewCount}
                </span>
              </div>
            </styles.postInfoContent>
          </styles.postInfoContainer>
          <styles.postContentContainer>
            <h2>상세 정보</h2>
            <p>{post.data.content}</p>
          </styles.postContentContainer>
          <styles.divider />
          {'roomInfo' in post.data && (
            <>
              <styles.dealInfoContainer>
                <h2>거래 정보</h2>
                <div>
                  <span>거래 방식</span>
                  <span>{post.data.roomInfo.rentalType}</span>
                </div>
                <div>
                  <span>희망 월 분담금</span>
                  <span>{post.data.roomInfo.expectedPayment}만원</span>
                </div>
              </styles.dealInfoContainer>
              <styles.roomInfoContainer>
                <h2>방 정보</h2>
                <div>
                  <span>방 종류</span>
                  <span>{post.data.roomInfo.roomType}</span>
                </div>
                <div>
                  <span>거실 보유</span>
                  <span>{post.data.roomInfo.hasLivingRoom ? '유' : '무'}</span>
                </div>
                <div>
                  <span>방 개수</span>
                  <span>{post.data.roomInfo.numberOfRoom}개</span>
                </div>
                <div>
                  <span>화장실 개수</span>
                  <span>{post.data.roomInfo.numberOfBathRoom}개</span>
                </div>
                <div>
                  <span>평수</span>
                  <span>{post.data.roomInfo.size}평</span>
                </div>
              </styles.roomInfoContainer>
            </>
          )}
          <styles.locationInfoContainer>
            <h2>위치 정보</h2>
            <p>{post.data.address.roadAddress}</p>
            <div ref={mapRef} id="map" />
          </styles.locationInfoContainer>
          {post.data.publisherAccount.memberId === auth?.user?.memberId && (
            <styles.rowForDeleteAndModify>
              <styles.postModifyButton
                onClick={() => {
                  router.push(
                    `/shared/writing/${type === 'hasRoom' ? 'room' : 'dormitory'}/${post.data.id}`,
                  );
                }}
              >
                수정하기
              </styles.postModifyButton>
              <styles.postDeleteButton
                onClick={() => {
                  deleteSharedPost(postId, {
                    onSuccess: () => {
                      createToast({
                        message: '정상적으로 삭제되었습니다.',
                        option: {
                          duration: 3000,
                        },
                      });
                      router.back();
                    },
                    onError: () => {
                      createToast({
                        message: '삭제하는데 실패하였습니다.',
                        option: {
                          duration: 3000,
                        },
                      });
                    },
                  });
                }}
              >
                삭제하기
              </styles.postDeleteButton>
            </styles.rowForDeleteAndModify>
          )}
        </styles.postContainer>
        <styles.mateContainer>
          <styles.mates>
            {post.data.participants.map(
              ({ memberId, profileImageFileName }, index) => (
                <styles.mate
                  key={memberId}
                  $selected={memberId === selected?.memberId}
                  $zIndex={index}
                  src={profileImageFileName}
                  onClick={() => {
                    setSelected({
                      memberId,
                      profileImage: profileImageFileName,
                    });
                  }}
                />
              ),
            )}
          </styles.mates>
          <styles.selectedMateContainer>
            <styles.profile>
              <CircularProfileImage
                diameter={110}
                percentage={50}
                url={post.data.publisherAccount.profileImageFileName}
              />
              <styles.profileInfo>
                <p className="name">{post.data.publisherAccount.nickname}</p>
                <div>
                  <p>
                    {post.data.publisherAccount.birthYear != null
                      ? `${getAge(+post.data.publisherAccount.birthYear)}세`
                      : new Date().getFullYear()}
                  </p>
                </div>
              </styles.profileInfo>
            </styles.profile>
            <styles.buttons>
              <styles.chattingButton
                onClick={() => {
                  chattingMutate();
                }}
              >
                채팅하기
              </styles.chattingButton>
              <div>
                <styles.showProfileButton>프로필 보기</styles.showProfileButton>
                <Bookmark
                  marked={isFollowed}
                  onToggle={() => {
                    if (isFollowed) unfollow();
                    else follow();
                    setIsFollowed(prev => !prev);
                  }}
                  hasBorder
                  color="#888"
                />
              </div>
            </styles.buttons>
          </styles.selectedMateContainer>
          <styles.mateCardContainer>
            <CardToggleButton
              label="메이트카드"
              isOpen={showMateCard}
              onClick={() => {
                setShowMateCard(prev => !prev);
              }}
            />
            {showMateCard && (
              <div className="content">
                <div>
                  <h3>흡연 여부</h3>
                  <p>{post.data.roomMateFeatures.smoking}</p>
                </div>
                <div>
                  <h3>메이트와 방 공유 여부</h3>
                  <p>{post.data.roomMateFeatures.roomSharingOption}</p>
                </div>
                <div>
                  <h3>나이</h3>
                  <p>{mateAge}</p>
                </div>
                <div>
                  <h3>선택 옵션</h3>
                  <p>
                    {(
                      JSON.parse(post.data.roomMateFeatures.options) as string[]
                    ).join(', ')}
                  </p>
                </div>
              </div>
            )}
          </styles.mateCardContainer>
        </styles.mateContainer>
      </styles.contentContainer>
    </styles.container>
  );
}
