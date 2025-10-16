'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';

// Modal 컨텍스트 타입 정의
interface ModalContextType {
  isOpen: boolean;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  content: ReactNode | null;
}

// Modal 컨텍스트 생성
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Modal Hook
export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

// Modal Portal 컴포넌트
interface ModalPortalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const ModalPortal: React.FC<ModalPortalProps> = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  // 클라이언트 사이드에서만 포털 생성
  if (typeof window === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* 모달 컨텐츠 - max-w-md, w-full 제거됨 */}
      <div className="relative bg-white rounded-[24px] shadow-lg m-4">
        {children}
      </div>
    </div>,
    document.body
  );
};

// Modal Provider 컴포넌트
interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);

  const openModal = (modalContent: ReactNode) => {
    setContent(modalContent);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setContent(null);
  };

  const contextValue: ModalContextType = {
    isOpen,
    openModal,
    closeModal,
    content,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <ModalPortal isOpen={isOpen} onClose={closeModal}>
        {content}
      </ModalPortal>
    </ModalContext.Provider>
  );
};
