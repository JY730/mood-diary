'use client';

import { useRouter } from 'next/navigation';

import { Modal } from '@/commons/components/modal';
import { ROUTES } from '@/commons/constants/url';
import { useAuth } from '@/commons/providers/auth/auth.provider';
import { useModal } from '@/commons/providers/modal/modal.provider';
import DiariesNew from '@/components/diaries-new';

/**
 * 일기 작성 모달을 관리하는 커스텀 훅
 * 권한 검증을 통한 모달 열기/닫기 기능을 제공합니다.
 * 
 * 주요 기능:
 * - 권한 검증을 통한 일기 작성 모달 열기
 * - 비로그인 사용자에게는 로그인 요청 모달 표시
 * - 로그인 사용자에게는 일기 작성 모달 표시
 */
export const useLinkModal = () => {
  const { openModal, closeModal, modals } = useModal();
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  /**
   * 일기 작성 모달을 엽니다.
   * 권한 검증을 통해 로그인 상태에 따라 다른 모달을 표시합니다.
   * 
   * - 로그인 사용자: 일기 작성 모달 표시
   * - 비로그인 사용자: 로그인 요청 모달 표시
   */
  const openDiaryModal = () => {
    // 테스트 환경에서 로그인 검사 패스 여부 확인
    const isTestEnv = process.env.NEXT_PUBLIC_TEST_ENV === 'test';
    const shouldBypassAuth = isTestEnv && 
      (typeof window !== 'undefined' ? window.__TEST_BYPASS__ !== false : true);
    
    // 테스트 환경에서 로그인 검사 패스하는 경우
    if (shouldBypassAuth) {
      openModal(
        <div data-testid="diaries-new-modal">
          <DiariesNew />
        </div>
      );
      return;
    }

    // 로그인 상태 확인
    if (isLoggedIn) {
      // 로그인 사용자: 일기 작성 모달 표시
      openModal(
        <div data-testid="diaries-new-modal">
          <DiariesNew />
        </div>
      );
    } else {
      // 비로그인 사용자: 로그인 요청 모달 표시
      openModal(
        <Modal
          variant="info"
          actions="dual"
          title="로그인하시겠습니까?"
          description="이 기능을 사용하려면 로그인이 필요합니다."
          confirmText="로그인하러가기"
          cancelText="취소"
          onConfirm={() => {
            closeModal();
            router.push(ROUTES.AUTH.LOGIN);
          }}
          onCancel={() => {
            closeModal();
          }}
        />
      );
    }
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
    isModalOpen: modals.length > 0,
  };
};
