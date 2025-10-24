'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useModal } from '@/commons/providers/modal/modal.provider';
import { Modal } from '@/commons/components/modal';
import { EmotionType } from '@/commons/constants/enum';

// 기존 DiaryData 인터페이스 재사용
export interface DiaryData {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
}

export interface UseDiaryDeleteReturn {
  showDeleteModal: () => void;
}

export const useDiaryDelete = (diaryData: DiaryData): UseDiaryDeleteReturn => {
  const { openModal, closeModal } = useModal();
  const router = useRouter();

  const showDeleteModal = () => {
    openModal(
      React.createElement(Modal, {
        variant: "info",
        actions: "dual",
        title: "일기 삭제",
        description:  "일기를 삭제하시겠습니까?",
        confirmText: "삭제",
        cancelText: "취소",
        onConfirm: confirmDelete,
        onCancel: closeModal
      })
    );
  };

  const confirmDelete = () => {
    try {
      // 로컬스토리지에서 diaries 데이터 가져오기
      const diariesJson = localStorage.getItem('diaries');
      if (!diariesJson) {
        console.error('diaries 데이터를 찾을 수 없습니다.');
        return;
      }

      const diaries: DiaryData[] = JSON.parse(diariesJson);
      
      // 해당 일기 삭제
      const updatedDiaries = diaries.filter(diary => diary.id !== diaryData.id);
      
      // 로컬스토리지에 업데이트된 데이터 저장
      localStorage.setItem('diaries', JSON.stringify(updatedDiaries));
      
      // 모달 닫기
      closeModal();
      
      // /diaries 페이지로 이동
      router.push('/diaries');
    } catch (error) {
      console.error('일기 삭제 중 오류가 발생했습니다:', error);
    }
  };

  return {
    showDeleteModal,
  };
};
