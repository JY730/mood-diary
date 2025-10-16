'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { EmotionType } from '@/commons/constants/enum';
import { ROUTES } from '@/commons/constants/url';
import { useModal } from '@/commons/providers/modal/modal.provider';
import { Modal } from '@/commons/components/modal';

/**
 * 일기 폼 데이터 타입
 */
export interface DiaryFormData {
  emotion: EmotionType;
  title: string;
  content: string;
}

/**
 * 로컬스토리지에 저장될 일기 데이터 타입
 */
export interface DiaryData extends DiaryFormData {
  id: number;
  createdAt: string;
}

/**
 * 일기 폼 검증 스키마
 * zod를 사용한 폼 검증
 */
const diaryFormSchema = z.object({
  emotion: z.nativeEnum(EmotionType),
  title: z.string().min(1, '제목을 입력해주세요.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
});

/**
 * 일기쓰기 폼 훅
 * 
 * react-hook-form과 zod를 사용하여 폼 상태 관리 및 검증을 수행합니다.
 * 로컬스토리지에 일기 데이터를 저장하고, 등록 완료 후 상세페이지로 이동합니다.
 * 
 * @returns {object} 폼 관련 상태와 메서드
 */
export const useDiaryForm = () => {
  const router = useRouter();
  const { openModal, closeAllModals } = useModal();

  // react-hook-form 초기화
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<DiaryFormData>({
    resolver: zodResolver(diaryFormSchema),
    mode: 'onChange',
    defaultValues: {
      emotion: EmotionType.HAPPY,
      title: '',
      content: '',
    },
  });

  /**
   * 로컬스토리지에서 다음 ID를 계산
   * 기존 일기가 있으면 최대 ID + 1, 없으면 1
   */
  const getNextId = (existingDiaries: DiaryData[]): number => {
    if (existingDiaries.length === 0) {
      return 1;
    }
    const maxId = Math.max(...existingDiaries.map((diary) => diary.id));
    return maxId + 1;
  };

  /**
   * 일기 등록 핸들러
   * 
   * 1. 로컬스토리지에서 기존 일기 조회
   * 2. 새 일기 데이터 생성 (id, createdAt 추가)
   * 3. 로컬스토리지에 저장
   * 4. 등록완료 모달 표시
   * 5. 모달 확인 시 상세페이지로 이동 및 모든 모달 닫기
   */
  const onSubmit = (data: DiaryFormData) => {
    // 1. 로컬스토리지에서 기존 일기 조회
    const existingDiariesStr = localStorage.getItem('diaries');
    const existingDiaries: DiaryData[] = existingDiariesStr
      ? JSON.parse(existingDiariesStr)
      : [];

    // 2. 새 일기 데이터 생성
    const nextId = getNextId(existingDiaries);
    const newDiary: DiaryData = {
      ...data,
      id: nextId,
      createdAt: new Date().toISOString(),
    };

    // 3. 로컬스토리지에 저장
    const updatedDiaries = [...existingDiaries, newDiary];
    localStorage.setItem('diaries', JSON.stringify(updatedDiaries));

    // 4. 등록완료 모달 표시
    openModal(
      <Modal
        variant="info"
        actions="single"
        title="일기 등록 완료"
        description="일기가 성공적으로 등록되었습니다."
        confirmText="확인"
        onConfirm={() => {
          // 5. 모든 모달 닫기 및 상세페이지로 이동
          closeAllModals();
          router.push(ROUTES.DIARIES.DETAIL(nextId));
        }}
      />
    );
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isValid,
    watch,
    setValue,
  };
};

