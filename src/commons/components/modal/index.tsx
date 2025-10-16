import React from 'react';
import { Button } from '../button';
import styles from './styles.module.css';

// Modal variant types
export type ModalVariant = 'info' | 'danger';
export type ModalActions = 'single' | 'dual';
export type ModalTheme = 'light' | 'dark';

// Modal component props interface
export interface ModalProps {
  /** 모달의 시각적 스타일 변형 */
  variant?: ModalVariant;
  /** 액션 버튼 개수 */
  actions?: ModalActions;
  /** 테마 모드 */
  theme?: ModalTheme;
  /** 모달 제목 */
  title: string;
  /** 모달 설명 */
  description: string;
  /** 확인 버튼 텍스트 */
  confirmText?: string;
  /** 취소 버튼 텍스트 (dual actions일 때만) */
  cancelText?: string;
  /** 확인 버튼 클릭 핸들러 */
  onConfirm?: () => void;
  /** 취소 버튼 클릭 핸들러 */
  onCancel?: () => void;
}

/**
 * Modal Component
 * 
 * 다양한 variant, actions, theme을 지원하는 모달 컴포넌트입니다.
 * Figma 디자인 시스템을 기반으로 구현되었습니다.
 * 
 * @example
 * ```tsx
 * <Modal 
 *   variant="info" 
 *   actions="dual" 
 *   theme="light"
 *   title="일기 등록 취소"
 *   description="일기 등록을 취소 하시겠어요?"
 *   confirmText="등록 취소"
 *   cancelText="계속 작성"
 *   onConfirm={handleConfirm}
 *   onCancel={handleCancel}
 * />
 * ```
 */
export const Modal: React.FC<ModalProps> = ({
  variant = 'info',
  actions = 'single',
  theme = 'light',
  title,
  description,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
}) => {
  const modalClasses = [
    styles.modal,
    styles[`modal--${variant}`],
    styles[`modal--${actions}`],
    styles[`modal--${theme}`],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={modalClasses} data-testid="modal">
      {/* 컨텐츠 영역 */}
      <div className={styles.content} data-testid="modal-content">
        <h2 className={styles.title} data-testid="modal-title">{title}</h2>
        <p className={styles.description} data-testid="modal-description">{description}</p>
      </div>
      
      {/* 버튼 영역 */}
      <div className={styles.buttonArea} data-testid="modal-button-area">
        {actions === 'dual' && (
          <Button
            variant="secondary"
            size="medium"
            theme="light"
            className={styles.dualButton}
            onClick={onCancel}
            data-testid="modal-cancel-button"
          >
            {cancelText}
          </Button>
        )}
        
        <Button
          variant="primary"
          size="medium"
          theme="light"
          className={actions === 'dual' ? styles.dualButton : styles.singleButton}
          onClick={onConfirm}
          data-testid="modal-confirm-button"
        >
          {confirmText}
        </Button>
      </div>
    </div>
  );
};

export default Modal;