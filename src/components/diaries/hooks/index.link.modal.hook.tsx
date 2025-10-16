'use client';

import { useModal } from '@/commons/providers/modal/modal.provider';
import DiariesNew from '@/components/diaries-new';

/**
 * 일기 작성 모달을 관리하는 커스텀 훅
 * 모달 열기/닫기 기능을 제공합니다.
 */
export const useLinkModal = () => {
  const { openModal, closeModal, isOpen } = useModal();

  /**
   * 일기 작성 모달을 엽니다.
   */
  const openDiaryModal = () => {
    openModal(
      <div data-testid="diaries-new-modal">
        <DiariesNew />
      </div>
    );
  };

  /**
   * 모달을 닫습니다.
   */
  const closeDiaryModal = () => {
    closeModal();
  };

  return {
    openDiaryModal,
    closeDiaryModal,
    isModalOpen: isOpen,
  };
};
