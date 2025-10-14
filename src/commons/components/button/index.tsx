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
 * 다양한 variant, size, theme을 지원하는 버튼 컴포넌트입니다.
 * Figma 디자인 시스템을 기반으로 구현되었습니다.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="medium" theme="light">
 *   클릭하세요
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
        <>
          <span className={styles.icon}>{icon}</span>
          <span className={styles.content}>{children}</span>
        </>
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
