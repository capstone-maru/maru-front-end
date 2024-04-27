import { useMutation, useQuery } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';
import { useCallback, useMemo, useState } from 'react';

import {
  createSharedPost,
  deleteSharedPost,
  getSharedPost,
  getSharedPosts,
  scrapPost,
} from './shared.api';
import {
  type ImageFile,
  type CreateSharedPostProps,
  type GetSharedPostsProps,
  type SelectedExtraOptions,
  type SelectedOptions,
} from './shared.type';

import { type NaverAddress } from '@/features/geocoding';
import { type FailureDTO, type SuccessBaseDTO } from '@/shared/types';

export const usePaging = ({
  totalPages,
  sliceSize,
}: {
  totalPages: number;
  sliceSize: number;
}) => {
  const [page, setPage] = useState(1);

  const currentSlice = useMemo(
    () => Math.floor((page - 1) / sliceSize),
    [page, sliceSize],
  );
  const sliceCount = useMemo(
    () => Math.floor(totalPages / sliceSize),
    [totalPages, sliceSize],
  );

  const isFirstPage = useMemo(() => page === 1, [page]);
  const isLastPage = useMemo(() => page === totalPages, [page, totalPages]);

  const handleSetPage = useCallback(
    (newPage: number) => {
      if (page < 0 || page > totalPages) return;
      setPage(newPage);
    },
    [page, totalPages],
  );

  const handleNextPage = useCallback(() => {
    if (isLastPage) return;
    setPage(prev => prev + 1);
  }, [isLastPage, setPage]);

  const handlePrevPage = useCallback(() => {
    if (isFirstPage) return;
    setPage(prev => prev - 1);
  }, [isFirstPage, setPage]);

  return useMemo(
    () => ({
      page,
      totalPages,
      sliceSize,
      currentSlice,
      sliceCount,
      isFirstPage,
      isLastPage,
      handleSetPage,
      handleNextPage,
      handlePrevPage,
    }),
    [
      page,
      totalPages,
      sliceSize,
      currentSlice,
      sliceCount,
      isFirstPage,
      isLastPage,
      handleSetPage,
      handleNextPage,
      handlePrevPage,
    ],
  );
};

export const useCreateSharedPostProps = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [images, setImages] = useState<ImageFile[]>([]);
  const [address, setAddress] = useState<NaverAddress | null>(null);

  const [mateLimit, setMateLimit] = useState(0);
  const [expectedMonthlyFee, setExpectedMonthlyFee] = useState<number>(0);

  const [houseSize, setHouseSize] = useState<number>(0);
  const [selectedExtraOptions, setSelectedExtraOptions] =
    useState<SelectedExtraOptions>({});
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

  const handleExtraOptionClick = useCallback((option: string) => {
    setSelectedExtraOptions(prevSelectedOptions => ({
      ...prevSelectedOptions,
      [option]: !prevSelectedOptions[option],
    }));
  }, []);

  const handleOptionClick = useCallback(
    (optionName: keyof SelectedOptions, item: string) => {
      setSelectedOptions(prevState => ({
        ...prevState,
        [optionName]: prevState[optionName] === item ? null : item,
      }));
    },
    [],
  );

  const isOptionSelected = useCallback(
    (optionName: keyof SelectedOptions, item: string) =>
      selectedOptions[optionName] === item,
    [selectedOptions],
  );

  const isExtraOptionSelected = useCallback(
    (item: string) => selectedExtraOptions[item],
    [selectedExtraOptions],
  );

  return useMemo(
    () => ({
      title,
      setTitle,
      content,
      setContent,
      images,
      setImages,
      address,
      setAddress,
      mateLimit,
      setMateLimit,
      expectedMonthlyFee,
      setExpectedMonthlyFee,
      houseSize,
      setHouseSize,
      selectedExtraOptions,
      setSelectedExtraOptions,
      selectedOptions,
      setSelectedOptions,
      handleOptionClick,
      handleExtraOptionClick,
      isOptionSelected,
      isExtraOptionSelected,
    }),
    [
      title,
      setTitle,
      content,
      setContent,
      images,
      setImages,
      address,
      setAddress,
      mateLimit,
      setMateLimit,
      expectedMonthlyFee,
      setExpectedMonthlyFee,
      houseSize,
      setHouseSize,
      selectedExtraOptions,
      setSelectedExtraOptions,
      selectedOptions,
      setSelectedOptions,
      handleOptionClick,
      handleExtraOptionClick,
      isOptionSelected,
      isExtraOptionSelected,
    ],
  );
};

export const useCreateSharedPost = () =>
  useMutation<AxiosResponse<SuccessBaseDTO>, FailureDTO, CreateSharedPostProps>(
    {
      mutationFn: createSharedPost,
    },
  );

export const useSharedPosts = ({
  filter,
  search,
  page,
  enabled,
}: GetSharedPostsProps & { enabled: boolean }) =>
  useQuery({
    queryKey: ['/api/shared/posts/studio', { filter, search, page }],
    queryFn: async () =>
      await getSharedPosts({ filter, search, page }).then(
        response => response.data,
      ),
    staleTime: 60000,
    enabled,
  });

export const useSharedPost = ({
  postId,
  enabled,
}: {
  postId: number;
  enabled: boolean;
}) =>
  useQuery({
    queryKey: [`/api/shared/posts/studio/${postId}`],
    queryFn: async () =>
      await getSharedPost(postId).then(response => response.data),
    enabled,
  });

export const useDeleteSharedPost = ({
  postId,
  onSuccess,
  onError,
}: {
  postId: number;
  onSuccess: (data: SuccessBaseDTO) => void;
  onError: (error: Error) => void;
}) =>
  useMutation({
    mutationFn: async () =>
      await deleteSharedPost(postId).then(response => response.data),
    onSuccess,
    onError,
  });

export const useScrapSharedPost = () =>
  useMutation<AxiosResponse<SuccessBaseDTO>, FailureDTO, number>({
    mutationFn: scrapPost,
  });
