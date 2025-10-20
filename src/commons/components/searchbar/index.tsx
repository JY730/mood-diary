'use client';

import React, { forwardRef, InputHTMLAttributes, useState } from 'react';
import styles from './styles.module.css';

// Searchbar variant types
export type SearchbarVariant = 'primary' | 'secondary' | 'tertiary';
export type SearchbarSize = 'small' | 'medium' | 'large';
export type SearchbarTheme = 'light' | 'dark';

// Searchbar component props interface
export interface SearchbarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Searchbar variant style */
  variant?: SearchbarVariant;
  /** Searchbar size */
  size?: SearchbarSize;
  /** Theme mode */
  theme?: SearchbarTheme;
  /** Custom className */
  className?: string;
  /** Container className */
  containerClassName?: string;
  /** Show search icon */
  showSearchIcon?: boolean;
  /** Show clear button when there's text */
  showClearButton?: boolean;
  /** Callback when search is triggered */
  onSearch?: (value: string) => void;
  /** Callback when clear button is clicked */
  onClear?: () => void;
}

/**
 * Searchbar Component
 * 
 * 다양한 variant, size, theme을 지원하는 검색 입력 컴포넌트
 * Figma 디자인 시스템을 기반으로 구현되었습니다.
 * 
 * @example
 * ```tsx
 * <Searchbar 
 *   variant="primary" 
 *   size="medium" 
 *   theme="light"
 *   placeholder="검색어를 입력해 주세요."
 *   onSearch={(value) => console.log(value)}
 * />
 * ```
 */
export const Searchbar = forwardRef<HTMLInputElement, SearchbarProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      theme = 'light',
      className = '',
      containerClassName = '',
      disabled = false,
      showSearchIcon = true,
      showClearButton = true,
      onSearch,
      onClear,
      placeholder = '검색어를 입력해 주세요.',
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState('');
    const inputValue = value !== undefined ? value : internalValue;
    const hasValue = String(inputValue).length > 0;

    // Generate CSS classes
    const containerClasses = [
      styles.searchbar,
      styles[`searchbar--${variant}`],
      styles[`searchbar--${size}`],
      styles[`searchbar--${theme}`],
      disabled && styles['searchbar--disabled'],
      hasValue && styles['searchbar--has-value'],
      containerClassName,
    ]
      .filter(Boolean)
      .join(' ');

    const inputClasses = [
      styles.input,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(e);
    };

    // Handle search
    const handleSearch = () => {
      if (onSearch && !disabled) {
        onSearch(String(inputValue));
      }
    };

    // Handle clear
    const handleClear = () => {
      if (value === undefined) {
        setInternalValue('');
      }
      if (onClear) {
        onClear();
      }
      if (onChange) {
        const syntheticEvent = {
          target: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
    };

    // Handle key press
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
      props.onKeyPress?.(e);
    };

    return (
      <div className={containerClasses}>
        {showSearchIcon && (
          <button
            type="button"
            className={styles.searchIcon}
            onClick={handleSearch}
            disabled={disabled}
            aria-label="검색"
            tabIndex={-1}
          >
            <img 
              src="/icons/search_outline_light_m.svg" 
              alt="" 
              width="24" 
              height="24"
            />
          </button>
        )}

        <input
          ref={ref}
          type="text"
          className={inputClasses}
          disabled={disabled}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          {...props}
        />

        {showClearButton && !disabled && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClear}
            aria-label="지우기"
            tabIndex={-1}
          >
            <img 
              src="/icons/close_outline_light_m.svg" 
              alt="" 
              width="20" 
              height="20"
            />
          </button>
        )}
      </div>
    );
  }
);

Searchbar.displayName = 'Searchbar';

export default Searchbar;

