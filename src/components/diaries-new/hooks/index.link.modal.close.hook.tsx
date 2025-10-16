'use client';

import { useModal } from '@/commons/providers/modal/modal.provider';
import { Modal } from '@/commons/components/modal';

/**
 * 일기 작성 모달의 닫기 기능을 관리하는 커스텀 훅
 * 닫기 버튼 클릭 시 등록취소 확인 모달을 표시합니다.
 */
export const useLinkModalClose = () => {
  const { openModal, closeModal, closeAllModals } = useModal();

  /**
   * 닫기 버튼 클릭 핸들러
   * 등록취소 확인 모달을 2중 모달로 표시합니다.
   */
  const handleClose = () => {
    openModal(
      <Modal
        variant="info"
        actions="dual"
        theme="light"
        title="일기 등록 취소"
        description="일기 등록을 취소 하시겠어요?"
        confirmText="등록 취소"
        cancelText="계속 작성"
        onConfirm={() => {
          // 등록취소 버튼: 등록취소모달과 일기쓰기폼모달 모두 닫기
          closeAllModals();
        }}
        onCancel={() => {
          // 계속작성 버튼: 등록취소모달만 닫기
          closeModal();
        }}
      />
    );
  };

  return {
    handleClose,
  };
};
