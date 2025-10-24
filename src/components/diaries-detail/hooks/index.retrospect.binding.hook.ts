'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';

/**
 * 회고 데이터 타입
 */
export interface RetrospectData {
  id: number;
  content: string;
  diaryId: number;
  createdAt: string;
}

/**
 * 회고 데이터 바인딩 훅
 * 
 * URL의 [id] 파라미터를 추출하여 로컬스토리지에서 해당 일기의 회고 데이터를 조회합니다.
 * useMemo를 활용하여 최소한의 리렌더링으로 데이터를 바인딩합니다.
 * 
 * @returns {object} 회고 데이터 배열
 */
export const useRetrospectBinding = () => {
  const params = useParams();

  const retrospectData = useMemo(() => {
    // SSR 환경 체크
    if (typeof window === 'undefined') {
      return [];
    }

    // URL에서 id 추출
    const id = params?.id as string;
    
    if (!id) {
      return [];
    }

    // 로컬스토리지에서 회고 목록 조회
    const retrospectsStr = localStorage.getItem('retrospects');
    
    if (!retrospectsStr) {
      return [];
    }

    try {
      const retrospects: RetrospectData[] = JSON.parse(retrospectsStr);
      
      // diaryId가 일치하는 회고들 필터링
      const filteredRetrospects = retrospects.filter(
        (retrospect) => retrospect.diaryId === Number(id)
      );
      
      // 생성일 기준으로 최신순 정렬
      return filteredRetrospects.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } catch (error) {
      console.error('회고 데이터 파싱 오류:', error);
      return [];
    }
  }, [params]);

  return {
    retrospectData,
  };
};
