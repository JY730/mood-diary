'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { EmotionType } from '@/commons/constants/enum';

/**
 * 일기 상세 데이터 타입
 */
export interface DiaryDetailData {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
}

/**
 * 일기 상세 데이터 바인딩 훅
 * 
 * URL의 [id] 파라미터를 추출하여 로컬스토리지에서 해당 일기 데이터를 조회합니다.
 * useMemo를 활용하여 최소한의 리렌더링으로 데이터를 바인딩합니다.
 * 
 * @returns {object} 일기 상세 데이터
 */
export const useDiaryBinding = () => {
  const params = useParams();

  const diaryData = useMemo(() => {
    // SSR 환경 체크
    if (typeof window === 'undefined') {
      return null;
    }

    // URL에서 id 추출
    const id = params?.id as string;
    
    if (!id) {
      return null;
    }

    // 로컬스토리지에서 일기 목록 조회
    const diariesStr = localStorage.getItem('diaries');
    
    if (!diariesStr) {
      return null;
    }

    try {
      const diaries: DiaryDetailData[] = JSON.parse(diariesStr);
      
      // id가 일치하는 일기 찾기
      const foundDiary = diaries.find((diary) => diary.id === Number(id));
      
      return foundDiary || null;
    } catch (error) {
      console.error('일기 데이터 파싱 오류:', error);
      return null;
    }
  }, [params]);

  return {
    diaryData,
  };
};

