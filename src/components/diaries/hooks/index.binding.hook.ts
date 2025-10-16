'use client';

import { useMemo, useEffect, useState } from 'react';
import { EmotionType } from '@/commons/constants/enum';

/**
 * 일기 데이터 타입
 */
export interface DiaryData {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
}

/**
 * 일기 목록 데이터 바인딩 훅
 * 
 * 로컬스토리지에서 일기 목록 데이터를 조회하여 반환합니다.
 * useState와 useEffect를 활용하여 클라이언트 사이드에서만 데이터를 로드하고,
 * useMemo를 활용하여 최소한의 리렌더링으로 데이터를 바인딩합니다.
 * 
 * @returns {object} 일기 목록 데이터
 */
export const useDiariesBinding = () => {
  const [diaries, setDiaries] = useState<DiaryData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // SSR 환경 체크
    if (typeof window === 'undefined') {
      return;
    }

    // 로컬스토리지에서 일기 목록 조회
    const diariesStr = localStorage.getItem('diaries');
    
    if (!diariesStr) {
      setDiaries([]);
      setIsLoaded(true);
      return;
    }

    try {
      const parsedDiaries: DiaryData[] = JSON.parse(diariesStr);
      
      // 최신순으로 정렬 (createdAt 기준 내림차순)
      const sortedDiaries = parsedDiaries.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      
      setDiaries(sortedDiaries);
    } catch (error) {
      console.error('일기 목록 데이터 파싱 오류:', error);
      setDiaries([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // 날짜 포맷팅 함수
  const formatDate = useMemo(() => {
    return (dateString: string): string => {
      try {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}. ${month}. ${day}`;
      } catch (error) {
        console.error('날짜 포맷팅 오류:', error);
        return '';
      }
    };
  }, []);

  return {
    diaries,
    isLoaded,
    formatDate,
  };
};

