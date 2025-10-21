'use client';

import { useCallback } from 'react';
import { useAuth } from '../../providers/auth/auth.provider';

/**
 * Auth Hook
 * 
 * Layout 컴포넌트에서 인증 관련 기능을 사용하기 위한 커스텀 훅
 * auth provider의 login, logout 메서드를 클릭 핸들러로 제공합니다.
 * 
 * @example
 * ```tsx
 * const {
 *   handleLoginClick,
 *   handleLogoutClick,
 * } = useAuthHandlers();
 * ```
 */
function useAuthHandlers() {
  const { login, logout } = useAuth();

  // 로그인 버튼 클릭 핸들러
  const handleLoginClick = useCallback(() => {
    login();
  }, [login]);

  // 로그아웃 버튼 클릭 핸들러
  const handleLogoutClick = useCallback(() => {
    logout();
  }, [logout]);

  return {
    // 인증 핸들러 함수들
    handleLoginClick,
    handleLogoutClick,
  };
}

export default useAuthHandlers;

