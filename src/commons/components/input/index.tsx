'use client';

import React, { forwardRef, InputHTMLAttributes } from 'react';
import styles from './styles.module.css';

// Input variant types
export type InputVariant = 'primary' | 'secondary' | 'tertiary';
export type InputSize = 'small' | 'medium' | 'large';
export type InputTheme = 'light' | 'dark';

// Input component props interface
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input variant style */
  variant?: InputVariant;
  /** Input size */
  size?: InputSize;
  /** Theme mode */
  theme?: InputTheme;
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Helper text */
  helperText?: string;
  /** Label text */
  label?: string;
  /** Whether the input is required */
  required?: boolean;
  /** Custom className */
  className?: string;
  /** Container className */
  containerClassName?: string;
}

/**
 * Input Component
 * 
 * 다양한 variant, size, theme을 지원하는 입력 컴포넌트
 * 
 * @example
 * ```tsx
 * <Input 
 *   variant="primary" 
 *   size="medium" 
 *   theme="light"
 *   placeholder="텍스트를 입력하세요"
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      theme = 'light',
      error = false,
      errorMessage,
      helperText,
      label,
      required = false,
      className = '',
      containerClassName = '',
      disabled = false,
      ...props
    },
    ref
  ) => {
    // Generate CSS classes
    const inputClasses = [
      styles.input,
      styles[`input--${variant}`],
      styles[`input--${size}`],
      styles[`input--${theme}`],
      error && styles['input--error'],
      disabled && styles['input--disabled'],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const containerClasses = [
      styles.container,
      styles[`container--${theme}`],
      containerClassName,
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

    return (
      <div className={containerClasses}>
        {label && (
          <label className={labelClasses}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        
        <input
          ref={ref}
          className={inputClasses}
          disabled={disabled}
          {...props}
        />
        
        {(helperText || errorMessage) && (
          <div className={helperTextClasses}>
            {error && errorMessage ? errorMessage : helperText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
