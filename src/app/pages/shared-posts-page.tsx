'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { CircularButton } from '@/components';
import { UserCard } from '@/components/main-page';
import {
  PostCard,
  SharedPostFilters,
  SharedPostsMenu,
} from '@/components/shared-posts';
import {
  useSharedPostsFilter,
  type SharedPostsType,
} from '@/entities/shared-posts-filter';
import { useAuthValue } from '@/features/auth';
import { useRecommendMates } from '@/features/profile';
import {
  useDormitorySharedPosts,
  usePaging,
  useSharedPosts,
} from '@/features/shared';

const styles = {
  container: styled.div`
    padding-block: 4.12rem;
    padding-inline: 10rem;
    width: 100%;
    max-width: 1440px;
    height: fit-content;

    display: flex;
    flex-direction: column;
  `,
  SharedPostsMenu: styled(SharedPostsMenu)`
    margin-bottom: 2rem;
  `,
  createButtonRow: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4.12rem;
  `,
  createButton: styled.button`
    all: unset;
    cursor: pointer;

    display: flex;
    width: 7.125rem;
    padding: 0.5rem 1.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;

    border-radius: 8px;
    background: var(--Black, #35373a);

    color: #fff;
    font-family: Pretendard;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.5rem;
  `,
  posts: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
  `,
  CircularButton: styled(CircularButton)`
    scale: 0.9;
  `,
  pagingRow: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-block: 7rem;
  `,
  paging: styled.div`
    display: flex;
    gap: 3rem;

    button {
      all: unset;
      cursor: pointer;

      color: #b2b2b2;
      font-family: 'Spoqa Han Sans Neo';
      font-size: 1.25rem;
      font-style: normal;
      font-weight: 400;
      line-height: 120%;

      &[class~='current'] {
        color: var(--Black, #35373a);
        font-family: 'Spoqa Han Sans Neo';
        font-size: 1.25rem;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;
        text-decoration-line: underline;
      }
    }
  `,
  cards: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    gap: 2rem;
    align-self: stretch;
    flex-wrap: wrap;
  `,
  noRecommendation: styled.div`
    font-family: 'Noto Sans KR';
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 500;

    display: flex;
    width: 100%;
    justify-content: center;
  `,
};

export function SharedPostsPage() {
  const router = useRouter();

  const auth = useAuthValue();
  const [selected, setSelected] = useState<SharedPostsType>('hasRoom');
  const [totalPageCount, setTotalPageCount] = useState(0);

  const { filter, derivedFilter, reset: resetFilter } = useSharedPostsFilter();

  const {
    page,
    sliceSize,
    currentSlice,
    isFirstPage,
    isLastPage,
    handleSetPage,
    handleNextPage,
    handlePrevPage,
  } = usePaging({
    totalPages: totalPageCount,
    sliceSize: 10,
  });

  const { isLoading: isSharedPostsLoading, data: sharedPosts } = useSharedPosts(
    {
      filter: derivedFilter,
      cardOption: filter.cardType ?? 'my',
      enabled: auth?.accessToken != null && selected === 'hasRoom',
      page: page - 1,
    },
  );

  const {
    isLoading: isDormitorySharedPostsLoading,
    data: dormitorySharedPosts,
  } = useDormitorySharedPosts({
    filter: derivedFilter,
    cardOption: filter.cardType ?? 'my',
    enabled: auth?.accessToken != null && selected === 'dormitory',
    page: page - 1,
  });

  const posts = useMemo(
    () => (selected === 'hasRoom' ? sharedPosts : dormitorySharedPosts),
    [selected, sharedPosts, dormitorySharedPosts],
  );

  const { isLoading: isMatesLoading, data: recommendationMates } =
    useRecommendMates({
      enabled: auth?.accessToken != null && selected === 'homeless',
      cardOption: filter.cardType ?? 'my',
    });

  useEffect(() => {
    resetFilter();
    return () => {
      resetFilter();
    };
  }, [selected, resetFilter]);

  useEffect(() => {
    if (selected === 'hasRoom' && sharedPosts != null) {
      setTotalPageCount(sharedPosts.data.totalPages);
    } else if (selected === 'dormitory' && dormitorySharedPosts != null) {
      setTotalPageCount(dormitorySharedPosts.data.totalPages);
    }
  }, [selected, dormitorySharedPosts, sharedPosts]);

  const renderPosts = () => {
    if (isSharedPostsLoading || isDormitorySharedPostsLoading) {
      return (
        <styles.noRecommendation>잠시만 기다려주세요..</styles.noRecommendation>
      );
    }

    if (posts?.data == null || posts.data.content.length === 0) {
      return (
        <styles.noRecommendation>
          <p>추천되는 게시글이 없습니다.</p>
        </styles.noRecommendation>
      );
    }

    return posts?.data.content.map(post => (
      <PostCard
        key={post.id}
        post={post}
        onClick={() => {
          router.push(
            `/shared/${selected === 'hasRoom' ? 'room' : 'dormitory'}/${post.id}`,
          );
        }}
      />
    ));
  };

  const renderMates = () => {
    if (isMatesLoading) {
      return (
        <styles.noRecommendation>잠시만 기다려주세요..</styles.noRecommendation>
      );
    }

    if (
      recommendationMates?.data == null ||
      recommendationMates.data.length === 0
    ) {
      return (
        <styles.noRecommendation>
          <p>추천되는 메이트가 없습니다.</p>
        </styles.noRecommendation>
      );
    }

    return recommendationMates.data.map(
      ({ memberId, score, nickname, location, profileImageUrl }) => (
        <Link href={`/profile/${memberId}`} key={memberId}>
          <UserCard
            name={nickname}
            percentage={score}
            location={location}
            profileImage={profileImageUrl}
          />
        </Link>
      ),
    );
  };

  return (
    <styles.container>
      <styles.SharedPostsMenu selected={selected} handleSelect={setSelected} />
      <styles.createButtonRow>
        <SharedPostFilters selected={selected} />
        {(selected === 'hasRoom' || selected === 'dormitory') && (
          <styles.createButton
            onClick={() => {
              router.push(
                `/shared/writing/${selected === 'hasRoom' ? 'room' : 'dormitory'}`,
              );
            }}
          >
            작성하기
          </styles.createButton>
        )}
      </styles.createButtonRow>
      {selected === 'hasRoom' || selected === 'dormitory' ? (
        <>
          <styles.posts>{renderPosts()}</styles.posts>
          {posts != null && posts.data.content.length !== 0 && (
            <styles.pagingRow>
              <styles.CircularButton
                direction="left"
                disabled={isFirstPage}
                onClick={() => {
                  handlePrevPage();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
              <styles.paging>
                {Array.from({
                  length: Math.min(
                    totalPageCount - currentSlice * sliceSize,
                    sliceSize,
                  ),
                }).map((_, index) => (
                  <button
                    type="button"
                    onClick={() => {
                      handleSetPage(index + 1 + currentSlice * sliceSize);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    key={`${currentSlice}-${index}`}
                    className={
                      page === index + 1 + currentSlice * sliceSize
                        ? 'current'
                        : ''
                    }
                  >
                    {index + 1 + currentSlice * sliceSize}
                  </button>
                ))}
              </styles.paging>
              <styles.CircularButton
                direction="right"
                disabled={isLastPage}
                onClick={() => {
                  handleNextPage();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </styles.pagingRow>
          )}
        </>
      ) : (
        <styles.cards>{renderMates()}</styles.cards>
      )}
    </styles.container>
  );
}
