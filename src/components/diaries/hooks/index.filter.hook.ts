import { useState, useMemo } from 'react';
import { EmotionType } from '@/commons/constants/enum';

export interface DiaryData {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface UseFilterResult {
  filterValue: string;
  setFilterValue: (value: string) => void;
  filteredDiaries: DiaryData[];
  filterOptions: FilterOption[];
}

export const useFilter = (diaries: DiaryData[]): UseFilterResult => {
  const [filterValue, setFilterValue] = useState<string>('all');

  // 필터 옵션 정의 (emotion enum과 일치하도록)
  const filterOptions: FilterOption[] = [
    { value: 'all', label: '전체' },
    { value: 'HAPPY', label: '행복해요' },
    { value: 'SAD', label: '슬퍼요' },
    { value: 'SURPRISE', label: '놀랐어요' },
    { value: 'ANGRY', label: '화나요' },
    { value: 'ETC', label: '기타' },
  ];

  // 필터링된 일기 목록 계산
  const filteredDiaries = useMemo(() => {
    if (filterValue === 'all') {
      return diaries;
    }
    
    return diaries.filter(diary => diary.emotion === filterValue);
  }, [diaries, filterValue]);

  return {
    filterValue,
    setFilterValue,
    filteredDiaries,
    filterOptions,
  };
};
