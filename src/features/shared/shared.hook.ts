import { useMutation, useQuery } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';

import {
  createSharedPost,
  deleteDormitorySharedPost,
  deleteSharedPost,
  getDormitorySharedPost,
  getDormitorySharedPosts,
  getSharedPost,
  getSharedPosts,
  scrapDormitoryPost,
  scrapPost,
  updateSharedPost,
} from './shared.api';
import { sharedPostPropState } from './shared.atom';
import { type GetSharedPostDTO } from './shared.dto';
import {
  type GetSharedPostsProps,
  type SelectedExtraOptions,
  type SelectedOptions,
  type SharedPostProps,
} from './shared.type';
import { fromAddrToCoord } from '../geocoding';

import { useAuthValue } from '@/features/auth';
import { useDebounce } from '@/shared/debounce';
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

export const useSharedPostProps = () => {
  const [state, setState] = useRecoilState(sharedPostPropState);
  const reset = useResetRecoilState(sharedPostPropState);

  const setStateWithPost = ({ data }: GetSharedPostDTO) => {
    fromAddrToCoord({ query: data.address.roadAddress })
      .then(res => {
        const address = res.data.addresses.shift();
        if (address != null) setState(prev => ({ ...prev, address }));
      })
      .catch(err => {
        console.error(err);
      });

    let roomCount = '1개';
    if (data.roomInfo.numberOfRoom === 2) roomCount = '2개';
    else if (data.roomInfo.numberOfRoom === 3) roomCount = '3개 이상';

    let restRoomCount = '1개';
    if (data.roomInfo.numberOfBathRoom === 2) restRoomCount = '2개';
    else if (data.roomInfo.numberOfBathRoom === 3) restRoomCount = '3개';

    setState({
      postId: data.id,
      title: data.title,
      content: data.content,
      images: data.roomImages.map(({ fileName }) => ({
        url: fileName,
        uploaded: true,
      })),
      mateLimit: data.roomInfo.recruitmentCapacity,
      expectedMonthlyFee: data.roomInfo.expectedPayment,
      houseSize: data.roomInfo.size,
      selectedOptions: {
        roomType: data.roomInfo.roomType,
        roomCount,
        budget: data.roomInfo.rentalType,
        floorType: data.roomInfo.floorType,
        livingRoom: data.roomInfo.hasLivingRoom ? '유' : '무',
        restRoomCount,
      },
      selectedExtraOptions: {
        canPark: data.roomInfo.extraOption.canPark,
        hasAirConditioner: data.roomInfo.extraOption.hasAirConditioner,
        hasRefrigerator: data.roomInfo.extraOption.hasRefrigerator,
        hasWasher: data.roomInfo.extraOption.hasWasher,
        hasTerrace: data.roomInfo.extraOption.hasTerrace,
      },
    });
  };

  const handleOptionClick = (
    optionName: keyof SelectedOptions,
    item: string,
  ) => {
    setState(prev => ({
      ...prev,
      selectedOptions: {
        ...prev.selectedOptions,
        [optionName]: prev.selectedOptions[optionName] === item ? null : item,
      },
    }));
  };

  const handleExtraOptionClick = (option: keyof SelectedExtraOptions) => {
    setState(prev => {
      const value = prev.selectedExtraOptions[option] ?? false;
      return {
        ...prev,
        selectedExtraOptions: {
          ...prev.selectedExtraOptions,
          [option]: !value,
        },
      };
    });
  };

  const isOptionSelected = (optionName: keyof SelectedOptions, item: string) =>
    state.selectedOptions[optionName] === item;

  const isExtraOptionSelected = (item: keyof SelectedExtraOptions) =>
    state.selectedExtraOptions[item] === true;

  return {
    ...state,
    setSharedPostProps: setState,
    setStateWithPost,
    reset,
    handleOptionClick,
    handleExtraOptionClick,
    isOptionSelected,
    isExtraOptionSelected,
  };
};

export const usePostMateCardInputSection = () => {
  const [gender, setGender] = useState<string | undefined>(undefined);
  const [birthYear, setBirthYear] = useState<number | undefined>(undefined);
  const [location, setLocation] = useState<string | undefined>(undefined);
  const [mbti, setMbti] = useState<string | undefined>(undefined);
  const [major, setMajor] = useState<string | undefined>(undefined);
  const [budget, setBudget] = useState<string | undefined>(undefined);

  const [features, setFeatures] = useState<{
    smoking?: string;
    roomSharingOption?: string;
    mateAge?: number;
    options: Set<string>;
  }>({ options: new Set() });

  const handleEssentialFeatureChange = useCallback(
    (
      key: 'smoking' | 'roomSharingOption' | 'mateAge',
      value: string | number | undefined,
    ) => {
      setFeatures(prev => {
        if (prev[key] === value) {
          const newFeatures = { ...prev };
          newFeatures[key] = undefined;
          return newFeatures;
        }
        return { ...prev, [key]: value };
      });
    },
    [],
  );

  const handleOptionalFeatureChange = useCallback((option: string) => {
    setFeatures(prev => {
      const { options } = prev;
      const newOptions = new Set(options);

      if (options.has(option)) newOptions.delete(option);
      else newOptions.add(option);

      return { ...prev, options: newOptions };
    });
  }, []);

  const derivedFeatures = useMemo(() => {
    const options: string[] = [];
    features.options.forEach(option => options.push(option));

    return {
      smoking: features?.smoking ?? '상관없어요',
      roomSharingOption: features?.roomSharingOption ?? '상관없어요',
      mateAge: birthYear,
      options: JSON.stringify(options),
    };
  }, [features, birthYear]);

  const auth = useAuthValue();
  useEffect(() => {
    if (auth?.user != null) {
      setGender(auth.user.gender);
    }
  }, [auth?.user]);

  const isMateCardCreatable = useMemo(
    () =>
      gender != null && birthYear != null && location != null && budget != null,
    [gender, birthYear, location, budget],
  );

  return useMemo(
    () => ({
      gender,
      setGender,
      birthYear,
      setBirthYear,
      location,
      setLocation,
      mbti,
      setMbti,
      major,
      setMajor,
      budget,
      setBudget,
      derivedFeatures,
      handleEssentialFeatureChange,
      handleOptionalFeatureChange,
      isMateCardCreatable,
    }),
    [
      gender,
      setGender,
      birthYear,
      setBirthYear,
      location,
      setLocation,
      mbti,
      setMbti,
      major,
      setMajor,
      budget,
      setBudget,
      derivedFeatures,
      handleEssentialFeatureChange,
      handleOptionalFeatureChange,
      isMateCardCreatable,
    ],
  );
};

export const useCreateSharedPost = () =>
  useMutation<AxiosResponse<SuccessBaseDTO>, FailureDTO, SharedPostProps>({
    mutationFn: createSharedPost,
  });

export const useUpdateSharedPost = () =>
  useMutation<
    AxiosResponse<SuccessBaseDTO>,
    FailureDTO,
    { postId: number; postData: SharedPostProps }
  >({
    mutationFn: updateSharedPost,
  });

export const useSharedPosts = ({
  filter,
  search,
  page,
  enabled,
}: GetSharedPostsProps & { enabled: boolean }) => {
  const debounceFilter = useDebounce(filter, 1000);

  return useQuery({
    queryKey: ['/api/shared/posts/studio', { debounceFilter, search, page }],
    queryFn: async () =>
      await getSharedPosts({ filter: debounceFilter, search, page }).then(
        response => response.data,
      ),
    staleTime: 60000,
    enabled,
  });
};

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

export const useDormitorySharedPosts = ({
  filter,
  search,
  page,
  enabled,
}: GetSharedPostsProps & { enabled: boolean }) =>
  useQuery({
    queryKey: ['/api/shared/posts/dormitory', { filter, search, page }],
    queryFn: async () =>
      await getDormitorySharedPosts({ filter, search, page }).then(
        response => response.data,
      ),
    staleTime: 60000,
    enabled,
  });

export const useDormitorySharedPost = ({
  postId,
  enabled,
}: {
  postId: number;
  enabled: boolean;
}) =>
  useQuery({
    queryKey: [`/api/shared/posts/dormitory/${postId}`],
    queryFn: async () =>
      await getDormitorySharedPost(postId).then(response => response.data),
    enabled,
  });

export const useDeleteDormitorySharedPost = ({
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
      await deleteDormitorySharedPost(postId).then(response => response.data),
    onSuccess,
    onError,
  });

export const useScrapDormitorySharedPost = () =>
  useMutation<AxiosResponse<SuccessBaseDTO>, FailureDTO, number>({
    mutationFn: scrapDormitoryPost,
  });
