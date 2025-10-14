'use client';

import React, { forwardRef, SelectHTMLAttributes, useState } from 'react';
import styles from './styles.module.css';

// Selectbox variant types
export type SelectboxVariant = 'primary' | 'secondary' | 'tertiary';
export type SelectboxSize = 'small' | 'medium' | 'large';
export type SelectboxTheme = 'light' | 'dark';

export interface SelectboxOption {
  /** 옵션 값 */
  value: string;
  /** 옵션 라벨 */
  label: string;
  /** 비활성화 여부 */
  disabled?: boolean;
}

export interface SelectboxProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Selectbox 스타일 변형 */
  variant?: SelectboxVariant;
  /** Selectbox 크기 */
  size?: SelectboxSize;
  /** 테마 모드 */
  theme?: SelectboxTheme;
  /** 선택 옵션 목록 */
  options: SelectboxOption[];
  /** 플레이스홀더 텍스트 */
  placeholder?: string;
  /** 에러 상태 */
  error?: boolean;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 도움말 텍스트 */
  helperText?: string;
  /** 라벨 */
  label?: string;
  /** 필수 입력 여부 */
  required?: boolean;
  /** 컨테이너 추가 클래스 */
  containerClassName?: string;
  /** 값 변경 콜백 */
  onValueChange?: (value: string) => void;
}

/**
 * Selectbox Component
 * 
 * 다양한 variant, size, theme을 지원하는 선택 컴포넌트
 * Figma 디자인 시스템을 기반으로 구현되었습니다.
 * 
 * @example
 * ```tsx
 * <Selectbox 
 *   variant="primary" 
 *   size="medium" 
 *   theme="light"
 *   options={[
 *     { value: 'all', label: '전체' },
 *     { value: 'option1', label: '옵션1' },
 *   ]}
 *   placeholder="선택하세요"
 * />
 * ```
 */
export const Selectbox = forwardRef<HTMLSelectElement, SelectboxProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      theme = 'light',
      options = [],
      placeholder = '선택하세요',
      error = false,
      errorMessage,
      helperText,
      label,
      required = false,
      className = '',
      containerClassName = '',
      disabled = false,
      value,
      onChange,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const selectValue = value !== undefined ? value : internalValue;
    const hasValue = selectValue !== '';

    // 선택된 옵션 찾기
    const selectedOption = options.find(opt => opt.value === selectValue);
    const displayText = selectedOption?.label || placeholder;

    // Generate CSS classes
    const containerClasses = [
      styles.selectboxWrapper,
      styles[`selectboxWrapper--${theme}`],
      containerClassName,
    ]
      .filter(Boolean)
      .join(' ');

    const selectClasses = [
      styles.selectbox,
      styles[`selectbox--${variant}`],
      styles[`selectbox--${size}`],
      styles[`selectbox--${theme}`],
      error && styles['selectbox--error'],
      disabled && styles['selectbox--disabled'],
      hasValue && styles['selectbox--has-value'],
      isOpen && styles['selectbox--open'],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const labelClasses = [
      styles.label,
      styles[`label--${theme}`],
      styles[`label--${size}`],
      required && styles['label--required'],
      error && styles['label--error'],
    ]
      .filter(Boolean)
      .join(' ');

    const helperTextClasses = [
      styles.helperText,
      styles[`helperText--${theme}`],
      styles[`helperText--${size}`],
      error && styles['helperText--error'],
    ]
      .filter(Boolean)
      .join(' ');

    // Handle change
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newValue = e.target.value;
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(e);
      onValueChange?.(newValue);
    };

    // Handle focus
    const handleFocus = () => {
      setIsOpen(true);
    };

    // Handle blur
    const handleBlur = () => {
      setIsOpen(false);
    };

    return (
      <div className={containerClasses}>
        {label && (
          <label className={labelClasses}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}

        <div className={selectClasses}>
          <select
            ref={ref}
            className={styles.select}
            disabled={disabled}
            value={selectValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          >
            {placeholder && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          <div className={styles.display}>
            <span className={styles.displayText}>{displayText}</span>
            <span className={styles.arrow}>
              <img 
                src="/icons/arrow_drop_down.svg" 
                alt="" 
                width="24" 
                height="24"
                className={styles.arrowIcon}
              />
            </span>
          </div>
        </div>

        {(helperText || errorMessage) && (
          <div className={helperTextClasses}>
            {error && errorMessage ? errorMessage : helperText}
          </div>
        )}
      </div>
    );
  }
);

Selectbox.displayName = 'Selectbox';

export default Selectbox;

