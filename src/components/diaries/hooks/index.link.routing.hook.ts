'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { ROUTES } from '@/commons/constants/url';

/**
 * 일기 카드 링크 라우팅 훅
 * 
 * 일기 카드 클릭 시 해당 일기의 상세 페이지로 이동하는 기능을 제공합니다.
 * url.ts에 정의된 ROUTES를 사용하여 경로를 동적으로 생성합니다.
 * 
 * @returns {object} 라우팅 관련 함수들
 */
export const useLinkRouting = () => {
  const router = useRouter();

  /**
   * 일기 카드 클릭 핸들러
   * @param diaryId - 이동할 일기의 ID
   */
  const handleCardClick = useCallback((diaryId: number) => {
    const detailUrl = ROUTES.DIARIES.DETAIL(diaryId);
    router.push(detailUrl);
  }, [router]);

  /**
   * 삭제 버튼 클릭 핸들러
   * 이벤트 전파를 막아 카드 클릭 이벤트가 발생하지 않도록 합니다.
   * @param event - 클릭 이벤트
   */
  const handleDeleteClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    // 삭제 로직은 여기에 추가될 수 있습니다.
  }, []);

  return {
    handleCardClick,
    handleDeleteClick,
  };
};
