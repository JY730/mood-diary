'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

/**
 * Dog CEO API 응답 타입
 */
export interface DogApiResponse {
  message: string[];
  status: string;
}

/**
 * 강아지 이미지 데이터 조회 함수
 * 
 * Dog CEO API를 호출하여 랜덤 강아지 이미지 6개를 요청합니다.
 * 
 * @returns {Promise<DogApiResponse>} 강아지 이미지 URL 배열을 포함한 응답
 */
const fetchDogImages = async (): Promise<DogApiResponse> => {
  const response = await fetch('https://dog.ceo/api/breeds/image/random/6');
  
  if (!response.ok) {
    throw new Error('Failed to fetch dog images');
  }
  
  return response.json();
};

/**
 * 무한스크롤 강아지 사진 목록 바인딩 훅
 * 
 * @tanstack/react-query의 useInfiniteQuery를 활용하여 
 * 강아지 이미지를 무한스크롤 방식으로 로드합니다.
 * Intersection Observer를 사용하여 마지막 2번째 이미지가 
 * 뷰포트에 진입하면 자동으로 다음 페이지를 로드합니다.
 * 
 * @returns {object} 강아지 이미지 목록 및 상태 관리 함수
 */
export const useInfiniteDogPictures = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastImageRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['dogPictures'],
    queryFn: fetchDogImages,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // 무한스크롤이므로 항상 다음 페이지가 있음
      return allPages.length + 1;
    },
  });

  // 모든 페이지의 이미지를 하나의 배열로 합치기
  const allImages = data?.pages.flatMap(page => page.message) ?? [];

  // Intersection Observer를 사용한 무한스크롤
  // 마지막 2번째 이미지에 도달하면 다음 페이지 로드
  const setLastImageRef = (element: HTMLDivElement | null, index: number) => {
    // 마지막에서 2번째 이미지인지 확인
    const isSecondToLast = index === allImages.length - 2;
    
    if (!isSecondToLast) return;

    // 이전 observer 정리
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // 요소가 없으면 종료
    if (!element) return;

    lastImageRef.current = element;

    // 새로운 observer 생성
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: '100px', // 100px 전에 미리 로드
      }
    );

    observerRef.current.observe(element);
  };

  // 클린업
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return {
    images: allImages,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    setLastImageRef,
  };
};

