'use client';

import React from 'react';
import styles from './styles.module.css';
import { Input } from '@/commons/components/input';
import { Button } from '@/commons/components/button';
import { useSignupForm } from './hooks/index.form.hook';
import { ROUTES } from '@/commons/constants/url';

/**
 * AuthSignup 컴포넌트
 * 
 * 회원가입 페이지 UI 컴포넌트
 * 모던한 디자인 스타일로 구현
 */
const AuthSignup: React.FC = () => {
  const { register, handleSubmit, errors, isValid, isLoading } = useSignupForm();

  return (
    <div className={styles.container} data-testid="auth-signup-container">
      <div className={styles.wrapper}>
        {/* Header - 타이틀 섹션 */}
        <div className={styles.header}>
          <h1 className={styles.title}>회원가입</h1>
          <p className={styles.subtitle}>새로운 계정을 만들어보세요</p>
        </div>

        {/* Form - 입력 폼 섹션 */}
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Email Input */}
          <Input
            variant="primary"
            size="large"
            theme="light"
            label="이메일"
            type="email"
            placeholder="이메일을 입력하세요"
            className={styles.input}
            required
            error={!!errors.email}
            errorMessage={errors.email?.message}
            data-testid="auth-signup-email-input"
            {...register('email')}
          />

          {/* Password Input */}
          <Input
            variant="primary"
            size="large"
            theme="light"
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력하세요"
            className={styles.input}
            required
            error={!!errors.password}
            errorMessage={errors.password?.message}
            data-testid="auth-signup-password-input"
            {...register('password')}
          />

          {/* Password Confirmation Input */}
          <Input
            variant="primary"
            size="large"
            theme="light"
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            className={styles.input}
            required
            error={!!errors.passwordConfirm}
            errorMessage={errors.passwordConfirm?.message}
            data-testid="auth-signup-password-confirm-input"
            {...register('passwordConfirm')}
          />

          {/* Name Input */}
          <Input
            variant="primary"
            size="large"
            theme="light"
            label="이름"
            type="text"
            placeholder="이름을 입력하세요"
            className={styles.input}
            required
            error={!!errors.name}
            errorMessage={errors.name?.message}
            data-testid="auth-signup-name-input"
            {...register('name')}
          />

          {/* Submit Button */}
          <Button
            variant="primary"
            size="large"
            theme="light"
            className={styles.submitButton}
            data-testid="auth-signup-submit-button"
            disabled={!isValid || isLoading}
            loading={isLoading}
            type="submit"
          >
            회원가입
          </Button>

          {/* Footer - 로그인 링크 */}
          <div className={styles.footer}>
            <span className={styles.footerText}>이미 계정이 있으신가요?</span>
            <a 
              href={ROUTES.AUTH.LOGIN}
              className={styles.footerLink}
              data-testid="auth-signup-login-link"
            >
              로그인
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthSignup;

