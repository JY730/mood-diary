'use client';

import React, { useState, useCallback } from 'react';
import { EmotionType } from '@/commons/constants/enum';
import { useModal } from '@/commons/providers/modal/modal.provider';
import { Modal } from '@/commons/components/modal';

/**
 * 일기 데이터 타입
 */
export interface Diary {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
}

/**
 * 일기 삭제 훅
 * 
 * 일기 삭제 기능을 제공하는 커스텀 훅입니다.
 * 로컬스토리지에서 일기 데이터를 삭제하고 페이지를 새로고침합니다.
 * 
 * 주요 기능:
 * - 일기 삭제 모달 상태 관리
 * - 로컬스토리지에서 일기 데이터 삭제
 * - 삭제 후 페이지 새로고침
 * 
 * @returns {object} 삭제 관련 함수들과 상태
 */
export const useDeleteDiary = () => {
  const [diaryToDelete, setDiaryToDelete] = useState<Diary | null>(null);
  const { openModal, closeModal } = useModal();

  /**
   * 삭제 모달 닫기
   * 모달 상태를 초기화하고 모달을 닫습니다.
   */
  const closeDeleteModal = useCallback(() => {
    setDiaryToDelete(null);
    closeModal();
  }, [closeModal]);


  /**
   * 삭제 모달 열기
   * @param diary - 삭제할 일기 데이터
   */
  const openDeleteModal = useCallback((diary: Diary) => {
    setDiaryToDelete(diary);
    
    // 삭제 함수를 인라인으로 정의하여 최신 상태 참조
    const handleDelete = () => {
      console.log('deleteDiary 함수 호출됨, diaryToDelete:', diary);
      
      if (!diary) {
        console.log('diary가 null입니다');
        return;
      }

      try {
        // 로컬스토리지에서 일기 데이터 가져오기
        const diariesData = localStorage.getItem('diaries');
        if (!diariesData) {
          console.log('로컬스토리지에 데이터가 없습니다');
          return;
        }

        const diaries: Diary[] = JSON.parse(diariesData);
        console.log('삭제 전 일기 개수:', diaries.length);
        
        // 해당 일기 제거
        const updatedDiaries = diaries.filter(d => d.id !== diary.id);
        console.log('삭제 후 일기 개수:', updatedDiaries.length);
        
        // 로컬스토리지에 업데이트된 데이터 저장
        localStorage.setItem('diaries', JSON.stringify(updatedDiaries));
        console.log('로컬스토리지 업데이트 완료');
        
        // 모달 닫기
        closeModal();
        
        // 페이지 새로고침
        console.log('페이지 새로고침 시작');
        window.location.reload();
      } catch (error) {
        console.error('일기 삭제 중 오류가 발생했습니다:', error);
      }
    };
    
    // useModal을 사용하여 오버레이 모달 열기
    const modalElement = React.createElement(Modal, {
      variant: "info",
      actions: "dual",
      theme: "light",
      title: "일기 삭제",
      description: "일기를 삭제 하시겠어요?",
      confirmText: "삭제",
      cancelText: "취소",
      onConfirm: handleDelete,
      onCancel: closeModal,
    });
    
    openModal(modalElement);
  }, [openModal, closeModal]);

  /**
   * 삭제 버튼 클릭 핸들러
   * 이벤트 전파를 막고 삭제 모달을 엽니다.
   * @param event - 클릭 이벤트
   * @param diary - 삭제할 일기 데이터
   */
  const handleDeleteClick = useCallback((event: React.MouseEvent<HTMLButtonElement>, diary: Diary) => {
    event.stopPropagation();
    openDeleteModal(diary);
  }, [openDeleteModal]);

  return {
    diaryToDelete,
    openDeleteModal,
    closeDeleteModal,
    handleDeleteClick,
  };
};