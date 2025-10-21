'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { ROUTES } from '@/commons/constants/url';

/**
 * User 타입 정의
 */
interface User {
  id: string;
  email?: string;
  name?: string;
  [key: string]: unknown;
}

/**
 * Auth Context 타입 정의
 * 인증 관리를 위한 상태와 메서드
 */
interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
}

/**
 * Auth Context 생성
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * useAuth Hook
 * 
 * AuthProvider 내부에서 인증 상태와 메서드에 접근하기 위한 커스텀 훅
 * 
 * @returns {AuthContextType} 인증 컨텍스트 값
 * @throws {Error} AuthProvider 외부에서 사용될 경우 에러 발생
 * 
 * @example
 * ```tsx
 * const { isLoggedIn, user, login, logout } = useAuth();
 * 
 * if (isLoggedIn) {
 *   console.log('사용자:', user);
 * }
 * ```
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

/**
 * Auth Provider Props
 */
interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * LocalStorage Keys
 */
const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  USER: 'user',
} as const;

/**
 * AuthProvider 컴포넌트
 * 
 * 애플리케이션 전역에서 인증 상태를 관리하는 Context Provider
 * 
 * 주요 기능:
 * - 로그인: 로그인 페이지로 이동
 * - 로그아웃: accessToken과 user 제거 후 로그인 페이지로 이동
 * - 로그인 상태 검증: localStorage의 accessToken 유무로 확인
 * - 실시간 감지: storage 이벤트를 통해 모든 페이지에서 최신 상태 유지
 * 
 * @example
 * ```tsx
 * // layout.tsx
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 * ```
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  /**
   * localStorage에서 인증 상태 확인
   */
  const checkAuthStatus = () => {
    if (typeof window === 'undefined') return;

    try {
      const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      const userStr = localStorage.getItem(STORAGE_KEYS.USER);

      // accessToken 유무로 로그인 상태 확인
      setIsLoggedIn(!!accessToken);

      // user 정보 파싱
      if (userStr) {
        try {
          const parsedUser = JSON.parse(userStr);
          setUser(parsedUser);
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  /**
   * 컴포넌트 마운트 시 인증 상태 초기화
   */
  useEffect(() => {
    checkAuthStatus();
  }, []);

  /**
   * storage 이벤트 리스너 등록
   * 다른 탭이나 창에서 localStorage가 변경되면 실시간으로 감지
   */
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key === STORAGE_KEYS.ACCESS_TOKEN ||
        e.key === STORAGE_KEYS.USER ||
        e.key === null // localStorage.clear() 호출 시
      ) {
        checkAuthStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  /**
   * 같은 탭 내에서의 localStorage 변경 감지
   * storage 이벤트는 다른 탭에서만 발생하므로, 
   * 같은 탭에서의 변경을 감지하기 위해 주기적으로 체크
   */
  useEffect(() => {
    const interval = setInterval(() => {
      checkAuthStatus();
    }, 1000); // 1초마다 체크

    return () => {
      clearInterval(interval);
    };
  }, []);

  /**
   * 로그인 함수
   * 로그인 페이지로 이동
   */
  const login = () => {
    router.push(ROUTES.AUTH.LOGIN);
  };

  /**
   * 로그아웃 함수
   * 1. localStorage에서 accessToken 제거
   * 2. localStorage에서 user 제거
   * 3. 로그인 페이지로 이동
   */
  const logout = () => {
    if (typeof window === 'undefined') return;

    try {
      // localStorage 데이터 제거
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);

      // 상태 업데이트
      setIsLoggedIn(false);
      setUser(null);

      // 로그인 페이지로 이동
      router.push(ROUTES.AUTH.LOGIN);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const contextValue: AuthContextType = {
    isLoggedIn,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
