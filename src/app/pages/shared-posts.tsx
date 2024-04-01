'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { UserCard } from '@/components/main-page';
import {
  SharedPostsMenu,
  SharedPostsFilter,
  PostCard,
} from '@/components/shared-posts';
import { type SharedPostsType } from '@/entities/shared-posts-filter';
import { getUserData, useAuthActions, useAuthValue } from '@/features/auth';

const styles = {
  container: styled.div`
    padding-top: 4.12rem;
    width: 100%;

    display: flex;
    flex-direction: column;
  `,
  SharedPostsMenu: styled(SharedPostsMenu)`
    margin-bottom: 2rem;
  `,
  SharedPostsFilter: styled(SharedPostsFilter)`
    margin-bottom: 5.19rem;
  `,
  posts: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
  `,
  cards: styled.div`
    padding-left: 2.62rem;
    display: flex;
    flex-wrap: wrap;
    gap: 2rem 2.62rem;
  `,
};

export function SharedPostsPage() {
  const router = useRouter();

  const auth = useAuthValue();
  const [selected, setSelected] = useState<SharedPostsType>('hasRoom');
  const { setAuthUserData } = useAuthActions();

  const { data } = useQuery({
    queryKey: ['/api/auth/initial/info'],
    queryFn: getUserData,
    enabled: auth?.accessToken !== undefined,
  });

  useEffect(() => {
    if (data !== undefined) {
      const userData = data.data;

      setAuthUserData(userData);
      if (userData.initialized) {
        router.replace('/profile');
      }
    }
  }, [data, router, setAuthUserData]);

  useEffect(() => {
    if (auth?.user?.initialized === true) {
      router.replace('/profile');
    }
  }, [auth, router]);

  return (
    <styles.container>
      <styles.SharedPostsMenu selected={selected} handleSelect={setSelected} />
      <styles.SharedPostsFilter selected={selected} />
      {selected === 'hasRoom' ? (
        <styles.posts>
          <Link href="/shared/1">
            <PostCard />
          </Link>
          <Link href="/shared/1">
            <PostCard />
          </Link>
          <Link href="/shared/1">
            <PostCard />
          </Link>
          <Link href="/shared/1">
            <PostCard />
          </Link>
          <Link href="/shared/1">
            <PostCard />
          </Link>
          <Link href="/shared/1">
            <PostCard />
          </Link>
        </styles.posts>
      ) : (
        <styles.cards>
          <Link href="/profile/memberId">
            <UserCard name="" address="" birth={new Date(2000, 5, 27)} />
          </Link>
          <Link href="/profile/memberId">
            <UserCard name="" address="" birth={new Date(2000, 5, 27)} />
          </Link>
          <Link href="/profile/memberId">
            <UserCard name="" address="" birth={new Date(2000, 5, 27)} />
          </Link>
          <Link href="/profile/memberId">
            <UserCard name="" address="" birth={new Date(2000, 5, 27)} />
          </Link>
          <Link href="/profile/memberId">
            <UserCard name="" address="" birth={new Date(2000, 5, 27)} />
          </Link>
          <Link href="/profile/memberId">
            <UserCard name="" address="" birth={new Date(2000, 5, 27)} />
          </Link>
        </styles.cards>
      )}
    </styles.container>
  );
}
