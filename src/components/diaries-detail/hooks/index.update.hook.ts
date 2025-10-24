import { useState, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { EmotionType } from '@/commons/constants/enum';

// 수정 폼 스키마 정의
const updateFormSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
  emotion: z.nativeEnum(EmotionType)
});

export type UpdateFormData = z.infer<typeof updateFormSchema>;

// 일기 데이터 타입 정의
export interface DiaryData {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
}

export const useDiaryUpdate = (initialData: DiaryData) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 폼 설정
  const form = useForm<UpdateFormData>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      title: initialData.title,
      content: initialData.content,
      emotion: initialData.emotion
    },
    mode: 'onChange'
  });

  // 수정 모드 진입
  const startEdit = useCallback(() => {
    setIsEditing(true);
    // 폼을 현재 데이터로 리셋
    form.reset({
      title: initialData.title,
      content: initialData.content,
      emotion: initialData.emotion
    });
  }, [form, initialData]);

  // 수정 취소
  const cancelEdit = useCallback(() => {
    setIsEditing(false);
    form.reset();
  }, [form]);

  // 수정 완료
  const submitUpdate = async (data: UpdateFormData) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // 로컬스토리지 접근 가능 여부 확인
      if (typeof window === 'undefined' || !localStorage) {
        throw new Error('로컬스토리지에 접근할 수 없습니다.');
      }

      // 로컬스토리지에서 일기 데이터 가져오기
      const diariesJson = localStorage.getItem('diaries');
      if (!diariesJson) {
        throw new Error('일기 데이터를 찾을 수 없습니다.');
      }
      
      let diaries: DiaryData[];
      try {
        diaries = JSON.parse(diariesJson);
      } catch {
        throw new Error('일기 데이터 형식이 올바르지 않습니다.');
      }
      
      // 해당 일기 찾기
      const diaryIndex = diaries.findIndex(diary => diary.id === initialData.id);
      if (diaryIndex === -1) {
        throw new Error('수정할 일기를 찾을 수 없습니다.');
      }
      
      // 일기 업데이트
      const updatedDiaries = [...diaries];
      updatedDiaries[diaryIndex] = { ...updatedDiaries[diaryIndex], ...data };
      
      // 로컬스토리지에 저장
      localStorage.setItem('diaries', JSON.stringify(updatedDiaries));
      
      // 수정 모드 종료
      setIsEditing(false);
      
      // 페이지 새로고침하여 변경사항 반영
      window.location.reload();
      
    } catch (error) {
      console.error('일기 수정 중 오류가 발생했습니다:', error);
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
      alert(`일기 수정 실패: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 폼 제출 핸들러
  const onSubmit = form.handleSubmit(submitUpdate);

  // 폼 유효성 검사 (메모이제이션)
  const isFormValid = useMemo(() => {
    return form.formState.isValid && !isSubmitting;
  }, [form.formState.isValid, isSubmitting]);

  return {
    // 상태
    isEditing,
    isSubmitting,
    
    // 폼
    form,
    
    // 액션
    startEdit,
    cancelEdit,
    onSubmit,
    
    // 유틸리티
    isFormValid
  };
};
