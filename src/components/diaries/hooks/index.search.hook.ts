'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { EmotionType } from '@/commons/constants/enum';

// 일기 데이터 타입 정의
export interface DiaryData {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
}

// 검색 결과 타입 정의
export interface SearchResult {
  searchQuery: string;
  filteredDiaries: DiaryData[];
}

// 디바운싱 훅
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// 검색 훅
export const useSearch = (diaries: DiaryData[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // 디바운싱 적용 (300ms 지연)
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // 검색 로직
  const searchDiaries = useCallback((query: string, diaryList: DiaryData[]) => {
    if (!query.trim()) {
      return [];
    }

    const filtered = diaryList.filter(diary => 
      diary.title.toLowerCase().includes(query.toLowerCase())
    );

    return filtered;
  }, []);

  // 검색 결과 계산
  const searchResult = useMemo((): SearchResult => {
    if (!debouncedSearchQuery.trim()) {
      return {
        searchQuery: '',
        filteredDiaries: []
      };
    }

    const filtered = searchDiaries(debouncedSearchQuery, diaries);
    
    return {
      searchQuery: debouncedSearchQuery,
      filteredDiaries: filtered
    };
  }, [debouncedSearchQuery, diaries, searchDiaries]);

  // 검색 실행
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // 검색 초기화
  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  // 실시간 검색 (디바운싱 적용)
  const handleRealTimeSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // 검색 중 상태 계산 (디바운싱 중인지 확인)
  const isSearching = searchQuery !== debouncedSearchQuery;

  return {
    searchResult,
    isSearching,
    handleSearch,
    handleRealTimeSearch,
    clearSearch,
    searchQuery: debouncedSearchQuery
  };
};