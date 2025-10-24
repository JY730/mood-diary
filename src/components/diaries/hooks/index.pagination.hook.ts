'use client';

import { useState, useMemo, useCallback } from 'react';

/**
 * 페이지네이션 관련 타입 정의
 */
export interface PaginationState {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}

export interface PaginationActions {
  setCurrentPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  resetPagination: () => void;
}

export interface PaginationData<T> {
  currentPageData: T[];
  startIndex: number;
  endIndex: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface UsePaginationOptions {
  itemsPerPage?: number;
  initialPage?: number;
}

export interface UsePaginationReturn<T> extends PaginationState, PaginationActions {
  paginationData: PaginationData<T>;
  getCurrentPageData: (data: T[]) => T[];
  getRowData: (data: T[], rowIndex: number, itemsPerRow?: number) => T[];
}

/**
 * 페이지네이션 훅
 * @param data 페이지네이션할 데이터 배열
 * @param options 페이지네이션 옵션
 * @returns 페이지네이션 상태 및 액션들
 */
export function usePagination<T>(
  data: T[],
  options: UsePaginationOptions = {}
): UsePaginationReturn<T> {
  const {
    itemsPerPage = 12, // 기본값: 3행 x 4열 = 12개
    initialPage = 1
  } = options;

  const [currentPage, setCurrentPage] = useState(initialPage);
  
  // 총 페이지 수 계산
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const totalItems = data.length;

  // 현재 페이지 데이터 계산
  const getCurrentPageData = useCallback((sourceData: T[]): T[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sourceData.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage]);

  // 행별 데이터 계산 (3행 4열 레이아웃용)
  const getRowData = useCallback((
    sourceData: T[], 
    rowIndex: number, 
    itemsPerRow: number = 4
  ): T[] => {
    const currentPageData = getCurrentPageData(sourceData);
    const startIndex = rowIndex * itemsPerRow;
    const endIndex = startIndex + itemsPerRow;
    return currentPageData.slice(startIndex, endIndex);
  }, [getCurrentPageData]);

  // 현재 페이지 데이터
  const currentPageData = useMemo(() => getCurrentPageData(data), [getCurrentPageData, data]);

  // 페이지네이션 데이터
  const paginationData = useMemo((): PaginationData<T> => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);
    
    return {
      currentPageData,
      startIndex,
      endIndex,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1
    };
  }, [currentPageData, currentPage, itemsPerPage, totalPages, data.length]);

  // 페이지 변경 액션들
  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const goToFirstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const goToLastPage = useCallback(() => {
    setCurrentPage(totalPages);
  }, [totalPages]);

  const resetPagination = useCallback(() => {
    setCurrentPage(1);
  }, []);

  // 데이터가 변경되면 첫 페이지로 리셋
  const handleDataChange = useCallback(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (totalPages === 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  // 데이터 변경 감지 및 페이지 조정
  useMemo(() => {
    handleDataChange();
  }, [handleDataChange]);

  return {
    // 상태
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    
    // 액션들
    setCurrentPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
    resetPagination,
    
    // 데이터
    paginationData,
    getCurrentPageData,
    getRowData
  };
}

/**
 * 페이지네이션 유틸리티 함수들
 */
export const paginationUtils = {
  /**
   * 페이지 번호 배열 생성 (5개 단위)
   * @param currentPage 현재 페이지
   * @param totalPages 총 페이지 수
   * @param visiblePages 보여질 페이지 수 (기본값: 5)
   * @returns 페이지 번호 배열
   */
  getVisiblePages: (currentPage: number, totalPages: number, visiblePages: number = 5): number[] => {
    const pages: number[] = [];
    const halfVisible = Math.floor(visiblePages / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);
    
    // 끝 페이지가 총 페이지 수보다 작으면 시작 페이지 조정
    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  },

  /**
   * 페이지네이션 정보 문자열 생성
   * @param currentPage 현재 페이지
   * @param totalPages 총 페이지 수
   * @param totalItems 총 아이템 수
   * @returns 페이지네이션 정보 문자열
   */
  getPaginationInfo: (currentPage: number, totalPages: number, totalItems: number): string => {
    if (totalItems === 0) return '0개 중 0개 표시';
    
    const startItem = (currentPage - 1) * 12 + 1;
    const endItem = Math.min(currentPage * 12, totalItems);
    
    return `${totalItems}개 중 ${startItem}-${endItem}개 표시`;
  },

  /**
   * 페이지 유효성 검사
   * @param page 페이지 번호
   * @param totalPages 총 페이지 수
   * @returns 유효한 페이지인지 여부
   */
  isValidPage: (page: number, totalPages: number): boolean => {
    return page >= 1 && page <= totalPages && Number.isInteger(page);
  }
};

export default usePagination;
