'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import React from 'react';
import styles from './styles.module.css';

/**
 * Modal Stack Item 타입
 * 각 모달의 고유 ID와 컨텐츠를 포함
 */
interface ModalStackItem {
  id: string;
  content: React.ReactNode;
}

/**
 * Modal Context 타입 정의
 * 모달 스택 관리를 위한 상태와 메서드
 */
interface ModalContextType {
  modals: ModalStackItem[];
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  closeAllModals: () => void;
}

/**
 * Modal Context 생성
 */
const ModalContext = createContext<ModalContextType | undefined>(undefined);

/**
 * useModal Hook
 * 
 * ModalProvider 내부에서 모달 상태와 메서드에 접근하기 위한 커스텀 훅
 * 
 * @returns {ModalContextType} 모달 컨텍스트 값
 * @throws {Error} ModalProvider 외부에서 사용될 경우 에러 발생
 * 
 * @example
 * ```tsx
 * const { openModal, closeModal } = useModal();
 * 
 * const handleOpenModal = () => {
 *   openModal(<Modal title="제목" description="설명" />);
 * };
 * ```
 */
export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}

/**
 * Modal Portal Props
 */
interface ModalPortalProps {
  modals: ModalStackItem[];
  onClose: () => void;
}

/**
 * ModalPortal 컴포넌트
 * 
 * React Portal을 사용하여 모달을 document.body에 렌더링
 * 중첩 모달을 지원하며 각 모달마다 독립적인 backdrop을 제공
 */
function ModalPortal({ modals, onClose }: ModalPortalProps) {
  // 클라이언트 사이드에서만 포털 생성
  if (typeof window === 'undefined') return null;
  if (modals.length === 0) return null;

  return createPortal(
    <>
      {modals.map((modal, index) => {
        const zIndex = 50 + index * 10;
        
        return (
          <div
            key={modal.id}
            className={styles.modalLayer}
            style={{ zIndex }}
          >
            {/* 배경 오버레이 - 각 모달마다 backdrop */}
            <div 
              className={styles.backdrop}
              onClick={() => {
                // 맨 위의 모달만 닫기
                if (index === modals.length - 1) {
                  onClose();
                }
              }}
            />
            
            {/* 모달 컨텐츠 */}
            <div className={styles.modalContent}>
              {modal.content}
            </div>
          </div>
        );
      })}
    </>,
    document.body
  );
}

/**
 * Modal Provider Props
 */
interface ModalProviderProps {
  children: React.ReactNode;
}

/**
 * ModalProvider 컴포넌트
 * 
 * 애플리케이션 전역에서 모달 상태를 관리하는 Context Provider
 * 
 * 주요 기능:
 * - 중첩 모달 스택 관리
 * - 각 모달마다 독립적인 backdrop 제공
 * - 모달이 열려있을 때 body 스크롤 제어
 * - z-index 자동 관리
 * 
 * @example
 * ```tsx
 * // layout.tsx
 * <ModalProvider>
 *   <App />
 * </ModalProvider>
 * ```
 */
export function ModalProvider({ children }: ModalProviderProps) {
  const [modals, setModals] = useState<ModalStackItem[]>([]);

  // body 스크롤 제어
  useEffect(() => {
    if (modals.length > 0) {
      // 모달이 1개라도 열려있으면 body 스크롤 제거
      document.body.style.overflow = 'hidden';
    } else {
      // 모달이 모두 닫히면 body 스크롤 복원
      document.body.style.overflow = '';
    }

    // cleanup 함수
    return () => {
      document.body.style.overflow = '';
    };
  }, [modals.length]);

  const openModal = (modalContent: React.ReactNode) => {
    const newModal: ModalStackItem = {
      id: `modal-${Date.now()}-${Math.random()}`,
      content: modalContent,
    };
    setModals((prev) => [...prev, newModal]);
  };

  const closeModal = () => {
    // 맨 위의 모달만 닫기
    setModals((prev) => prev.slice(0, -1));
  };

  const closeAllModals = () => {
    // 모든 모달 닫기
    setModals([]);
  };

  const contextValue: ModalContextType = {
    modals,
    openModal,
    closeModal,
    closeAllModals,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <ModalPortal modals={modals} onClose={closeModal} />
    </ModalContext.Provider>
  );
}
