import React from 'react';
import styles from './styles.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼의 시각적 스타일 변형
   */
  variant?: 'primary' | 'secondary' | 'tertiary';
  
  /**
   * 버튼의 크기
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * 테마 모드
   */
  theme?: 'light' | 'dark';
  
  /**
   * 버튼 내용
   */
  children: React.ReactNode;
  
  /**
   * 비활성화 상태
   */
  disabled?: boolean;
  
  /**
   * 로딩 상태
   */
  loading?: boolean;
  
  /**
   * 아이콘 (선택사항)
   */
  icon?: React.ReactNode;
  
  /**
   * 아이콘 위치
   */
  iconPosition?: 'left' | 'right';
}

/**
 * Button 컴포넌트
 * 
 * Figma 디자인 시스템을 기반으로 구현된 버튼 컴포넌트입니다.
 * 
 * 지원하는 variant:
 * - primary: 검은색 배경, 흰색 텍스트 (Node 3:1461)
 * - secondary: 흰색/회색 배경, 어두운 텍스트 (Node 3:482, 3:484)
 * - tertiary: 투명 배경, 텍스트만 표시
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="medium" theme="light" icon={<PlusIcon />}>
 *   일기쓰기
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  theme = 'light',
  children,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  className,
  ...props
}) => {
  const buttonClasses = [
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    styles[`button--${theme}`],
    disabled && styles['button--disabled'],
    loading && styles['button--loading'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <span className={styles.spinner} />
          <span className={styles.content}>{children}</span>
        </>
      );
    }

    if (icon) {
      return iconPosition === 'left' ? (
        <div className={styles.iconButtonContentainer}>
          <span className={styles.icon}>{icon}</span>
          <span className={styles.content}>{children}</span>
        </div>
      ) : (
        <>
          <span className={styles.content}>{children}</span>
          <span className={styles.icon}>{icon}</span>
        </>
      );
    }

    return <span className={styles.content}>{children}</span>;
  };

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

export default Button;
