'use client';

import React, { forwardRef, InputHTMLAttributes } from 'react';
import styles from './styles.module.css';

// Toggle variant types
export type ToggleVariant = 'primary' | 'secondary' | 'tertiary';
export type ToggleSize = 'small' | 'medium' | 'large';
export type ToggleTheme = 'light' | 'dark';

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Toggle 스타일 변형 */
  variant?: ToggleVariant;
  /** Toggle 크기 */
  size?: ToggleSize;
  /** 테마 모드 */
  theme?: ToggleTheme;
  /** 체크 상태 */
  checked?: boolean;
  /** 라벨 텍스트 */
  label?: string;
  /** 라벨 위치 */
  labelPosition?: 'left' | 'right';
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 값 변경 콜백 */
  onValueChange?: (checked: boolean) => void;
  /** 컨테이너 추가 클래스 */
  containerClassName?: string;
}

/**
 * Toggle Component
 * 
 * 다양한 variant, size, theme을 지원하는 토글 스위치 컴포넌트
 * Figma 디자인 시스템을 기반으로 구현되었습니다.
 * 
 * @example
 * ```tsx
 * <Toggle 
 *   variant="primary" 
 *   size="medium" 
 *   theme="light"
 *   label="알림 받기"
 *   checked={isEnabled}
 *   onValueChange={setIsEnabled}
 * />
 * ```
 */
export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      theme = 'light',
      checked = false,
      label,
      labelPosition = 'right',
      disabled = false,
      className = '',
      containerClassName = '',
      onChange,
      onValueChange,
      ...props
    },
    ref
  ) => {
    // Handle change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      
      const newChecked = e.target.checked;
      onChange?.(e);
      onValueChange?.(newChecked);
    };

    // Generate CSS classes
    const containerClasses = [
      styles.toggleContainer,
      styles[`toggleContainer--${theme}`],
      disabled && styles['toggleContainer--disabled'],
      containerClassName,
    ]
      .filter(Boolean)
      .join(' ');

    const wrapperClasses = [
      styles.toggleWrapper,
      styles[`toggleWrapper--${variant}`],
      styles[`toggleWrapper--${size}`],
      styles[`toggleWrapper--${theme}`],
      checked && styles['toggleWrapper--checked'],
      disabled && styles['toggleWrapper--disabled'],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const sliderClasses = [
      styles.slider,
      styles[`slider--${variant}`],
      styles[`slider--${size}`],
      styles[`slider--${theme}`],
      checked && styles['slider--checked'],
      disabled && styles['slider--disabled'],
    ]
      .filter(Boolean)
      .join(' ');

    const labelClasses = [
      styles.label,
      styles[`label--${theme}`],
      styles[`label--${size}`],
      disabled && styles['label--disabled'],
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClasses}>
        {label && labelPosition === 'left' && (
          <label className={labelClasses} onClick={() => !disabled && onValueChange?.(!checked)}>
            {label}
          </label>
        )}

        <label className={wrapperClasses}>
          <input
            ref={ref}
            type="checkbox"
            className={styles.input}
            checked={checked}
            disabled={disabled}
            onChange={handleChange}
            {...props}
          />
          <span className={sliderClasses} />
        </label>

        {label && labelPosition === 'right' && (
          <label className={labelClasses} onClick={() => !disabled && onValueChange?.(!checked)}>
            {label}
          </label>
        )}
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';

export default Toggle;

