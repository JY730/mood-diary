'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

// Zod 스키마 정의
const retrospectFormSchema = z.object({
  content: z.string().min(1, '회고 내용을 입력해주세요.'),
});

export type RetrospectFormData = z.infer<typeof retrospectFormSchema>;

// 로컬스토리지 데이터 타입
export interface RetrospectData {
  id: number;
  content: string;
  diaryId: number;
  createdAt: string;
}

export const useRetrospectForm = (diaryId: number) => {
  const router = useRouter();
  
  const form = useForm<RetrospectFormData>({
    resolver: zodResolver(retrospectFormSchema),
    defaultValues: {
      content: '',
    },
  });

  // 로컬스토리지에서 기존 회고 데이터 가져오기
  const getExistingRetrospects = (): RetrospectData[] => {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem('retrospects');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('로컬스토리지에서 회고 데이터를 가져오는 중 오류:', error);
      return [];
    }
  };

  // 로컬스토리지에 회고 데이터 저장
  const saveRetrospects = (retrospects: RetrospectData[]): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('retrospects', JSON.stringify(retrospects));
    } catch (error) {
      console.error('로컬스토리지에 회고 데이터를 저장하는 중 오류:', error);
    }
  };

  // 새로운 ID 생성 (기존 데이터 중 가장 큰 ID + 1)
  const generateNewId = (existingRetrospects: RetrospectData[]): number => {
    if (existingRetrospects.length === 0) return 1;
    const maxId = Math.max(...existingRetrospects.map(r => r.id));
    return maxId + 1;
  };

  // 회고 등록 처리
  const onSubmit = (data: RetrospectFormData) => {
    const existingRetrospects = getExistingRetrospects();
    const newId = generateNewId(existingRetrospects);
    
    const newRetrospect: RetrospectData = {
      id: newId,
      content: data.content.trim(),
      diaryId: diaryId,
      createdAt: new Date().toISOString(),
    };

    // 기존 데이터에 새 회고 추가
    const updatedRetrospects = [...existingRetrospects, newRetrospect];
    saveRetrospects(updatedRetrospects);

    // 폼 리셋
    form.reset();

    // 페이지 새로고침
    router.refresh();
  };

  // 입력값이 있을 때 버튼 활성화 여부 확인
  const isSubmitEnabled = form.watch('content')?.trim().length > 0;

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitEnabled,
  };
};
