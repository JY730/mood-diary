'use client';

import React from 'react';
import styles from './styles.module.css';
import { Input } from '@/commons/components/input';
import { Button } from '@/commons/components/button';
import { ROUTES } from '@/commons/constants/url';
import { useLoginForm } from './hooks/index.form.hook';

/**
 * AuthLogin 컴포넌트
 * 
 * 로그인 페이지 UI 컴포넌트
 * 모던한 디자인 스타일로 구현
 */
const AuthLogin: React.FC = () => {
  const { register, onSubmit, isButtonEnabled, isLoading } = useLoginForm();

  return (
    <div className={styles.container} data-testid="auth-login-container">
      <div className={styles.wrapper}>
        {/* Header - 타이틀 섹션 */}
        <div className={styles.header}>
          <h1 className={styles.title}>로그인</h1>
          <p className={styles.subtitle}>반갑습니다! 로그인하여 시작하세요</p>
        </div>

        {/* Form - 입력 폼 섹션 */}
        <form className={styles.form} onSubmit={onSubmit}>
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
            data-testid="auth-login-email-input"
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
            data-testid="auth-login-password-input"
            {...register('password')}
          />

          {/* Submit Button */}
          <Button
            variant="primary"
            size="large"
            theme="light"
            className={styles.submitButton}
            data-testid="auth-login-submit-button"
            type="submit"
            disabled={!isButtonEnabled || isLoading}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </Button>

          {/* Footer - 회원가입 링크 */}
          <div className={styles.footer}>
            <span className={styles.footerText}>아직 계정이 없으신가요?</span>
            <a 
              href={ROUTES.AUTH.SIGNUP}
              className={styles.footerLink}
              data-testid="auth-login-signup-link"
            >
              회원가입
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthLogin;

