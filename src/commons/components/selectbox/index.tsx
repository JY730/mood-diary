'use client';

import React, { forwardRef, SelectHTMLAttributes, useState, useRef, useEffect } from 'react';
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
    const dropdownRef = useRef<HTMLDivElement>(null);
    const selectValue = value !== undefined ? value : internalValue;
    const hasValue = selectValue !== '';

    // 선택된 옵션 찾기
    const selectedOption = options.find(opt => opt.value === selectValue);
    const displayText = selectedOption?.label || placeholder;

    // 외부 클릭 감지
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

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

    // Handle option select
    const handleOptionSelect = (optionValue: string) => {
      if (value === undefined) {
        setInternalValue(optionValue);
      }
      
      // Create synthetic event for compatibility
      const syntheticEvent = {
        target: { value: optionValue },
        currentTarget: { value: optionValue },
      } as React.ChangeEvent<HTMLSelectElement>;
      
      onChange?.(syntheticEvent);
      onValueChange?.(optionValue);
      setIsOpen(false);
    };

    // Handle trigger click
    const handleTriggerClick = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          setIsOpen(!isOpen);
          break;
        case 'Escape':
          setIsOpen(false);
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            // Focus next option logic can be added here
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            // Focus previous option logic can be added here
          }
          break;
      }
    };

    return (
      <div className={containerClasses}>
        {label && (
          <label className={labelClasses}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}

        <div className={styles.selectboxContainer} ref={dropdownRef}>
          {/* Hidden native select for form compatibility */}
          <select
            ref={ref}
            className={styles.hiddenSelect}
            disabled={disabled}
            value={selectValue}
            onChange={() => {}} // Handled by custom dropdown
            tabIndex={-1}
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

          {/* Custom trigger */}
          <div 
            className={selectClasses}
            onClick={handleTriggerClick}
            onKeyDown={handleKeyDown}
            tabIndex={disabled ? -1 : 0}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-disabled={disabled}
            aria-controls={isOpen ? 'selectbox-dropdown' : undefined}
            data-testid="filter-select"
          >
            <span className={styles.displayText}>{displayText}</span>
            <span className={styles.arrow}>
              <img 
                src="/icons/arrow_drop_down.svg" 
                alt="" 
                width="20" 
                height="20"
                className={styles.arrowIcon}
              />
            </span>
          </div>

          {/* Custom dropdown menu */}
          {isOpen && (
            <div className={styles.dropdown} role="listbox" id="selectbox-dropdown">
              {options.map((option) => (
                <div
                  key={option.value}
                  className={`${styles.option} ${
                    option.value === selectValue ? styles.optionSelected : ''
                  } ${option.disabled ? styles.optionDisabled : ''}`}
                  onClick={() => !option.disabled && handleOptionSelect(option.value)}
                  role="option"
                  aria-selected={option.value === selectValue}
                  aria-disabled={option.disabled}
                  data-testid={`filter-option-${option.value}`}
                >
                  <span className={styles.optionText}>{option.label}</span>
                  {option.value === selectValue && (
                    <span className={styles.checkIcon}>
                      <img 
                        src="/icons/check_outline_light_xs.svg" 
                        alt="" 
                        width="16" 
                        height="16"
                      />
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
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

