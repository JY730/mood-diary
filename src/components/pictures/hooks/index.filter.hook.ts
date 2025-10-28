'use client';

import { useState, useCallback } from 'react';

/**
 * 필터 타입 정의
 */
export type FilterType = 'default' | 'horizontal' | 'vertical';

/**
 * 필터 옵션 인터페이스
 */
export interface FilterOption {
  value: FilterType;
  label: string;
}

/**
 * 이미지 크기 설정 인터페이스
 */
export interface ImageSize {
  width: number;
  height: number;
}

/**
 * 필터 옵션 상수
 */
const filterOptions: FilterOption[] = [
  { value: 'default', label: '기본' },
  { value: 'horizontal', label: '가로형' },
  { value: 'vertical', label: '세로형' },
];

/**
 * 데스크톱 필터별 이미지 크기 매핑 (767px 초과)
 */
const desktopFilterSizeMap: Record<FilterType, ImageSize> = {
  default: { width: 640, height: 640 },
  horizontal: { width: 640, height: 480 },
  vertical: { width: 480, height: 640 },
};

/**
 * 모바일 필터별 이미지 크기 매핑 (767px 이하)
 */
const mobileFilterSizeMap: Record<FilterType, ImageSize> = {
  default: { width: 280, height: 280 },
  horizontal: { width: 280, height: 210 },
  vertical: { width: 280, height: 372 },
};

/**
 * 강아지 사진 필터 훅
 * 
 * 필터 선택에 따라 이미지 크기를 동적으로 변경하는 기능을 제공합니다.
 * 기본(640x640), 가로형(640x480), 세로형(480x640) 크기 옵션을 지원합니다.
 * 
 * @returns {object} 필터 상태 및 관리 함수들
 * @returns {FilterType} selectedFilter - 현재 선택된 필터 타입
 * @returns {FilterOption[]} filterOptions - 사용 가능한 필터 옵션 목록
 * @returns {function} handleFilterChange - 필터 변경 핸들러
 * @returns {function} getCurrentImageSize - 현재 필터의 이미지 크기 반환 함수
 * @returns {function} getCurrentFilterClass - 현재 필터의 CSS 클래스명 반환 함수
 */
export const usePictureFilter = () => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('default');

  /**
   * 필터 변경 핸들러
   * 
   * @param filter - 선택된 필터 타입
   */
  const handleFilterChange = useCallback((filter: string) => {
    setSelectedFilter(filter as FilterType);
  }, []);

  /**
   * 현재 선택된 필터에 해당하는 이미지 크기 반환
   * 브레이크포인트에 따라 데스크톱/모바일 크기를 반환합니다.
   * 
   * @param isMobile - 모바일 여부 (기본값: false)
   * @returns {ImageSize} 현재 필터의 이미지 크기
   */
  const getCurrentImageSize = useCallback((isMobile: boolean = false): ImageSize => {
    return isMobile ? mobileFilterSizeMap[selectedFilter] : desktopFilterSizeMap[selectedFilter];
  }, [selectedFilter]);

  /**
   * 현재 선택된 필터에 해당하는 CSS 클래스명 반환
   * 
   * @returns {string} 필터에 해당하는 CSS 클래스명
   */
  const getCurrentFilterClass = useCallback((): string => {
    return `filter-${selectedFilter}`;
  }, [selectedFilter]);

  return {
    selectedFilter,
    filterOptions,
    handleFilterChange,
    getCurrentImageSize,
    getCurrentFilterClass,
  };
};
