'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { useAuth } from './auth.provider';
import { useModal } from '../modal/modal.provider';
import { Modal } from '@/commons/components/modal';
import { ROUTES, getAccessPermission } from '@/commons/constants/url';


/**
 * Window 객체에 추가되는 테스트 관련 속성들
 */
declare global {
  interface Window {
    __TEST_BYPASS__?: boolean;
  }
}

/**
 * 초기화 대기 시간 (ms)
 * AuthProvider 초기화 대기 시간
 */
const INITIALIZATION_DELAY = 100;

/**
 * AuthGuard Hook
 * 
 * 권한 검증을 수행하는 커스텀 훅
 * 페이지 접근 권한을 검증하고, 권한이 없는 경우 로그인 모달을 표시
 * 
 * 주요 기능:
 * - 페이지별 접근 권한 검증
 * - 테스트 환경과 실제 환경 구분
 * - 권한 없는 사용자에게 로그인 모달 표시
 * - 인증 상태 초기화 후 권한 검증 수행
 * - 모달 중복 표시 방지
 * 
 * 테스트 환경 설정:
 * - NEXT_PUBLIC_TEST_ENV=test: 테스트 환경 활성화
 * - window.__TEST_BYPASS__: 테스트 환경에서 로그인 검사 패스 여부 제어
 *   - true 또는 undefined: 로그인 검사 패스 (기본값 - 로그인 유저 시뮬레이션)
 *   - false: 로그인 검사 수행 (비회원 가드테스트용)
 * 
 * 테스트 시나리오:
 * - 비로그인유저 테스트: window.__TEST_BYPASS__ = false 설정
 * - 로그인유저 테스트: window.__TEST_BYPASS__ = true 또는 undefined (기본값)
 * 
 * @example
 * ```tsx
 * const { isAuthorized, checkPermission } = useAuthGuard();
 * 
 * useEffect(() => {
 *   if (!isAuthorized) {
 *     checkPermission();
 *   }
 * }, [isAuthorized, checkPermission]);
 * ```
 */
export function useAuthGuard() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { openModal, closeAllModals } = useModal();
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasShownLoginModal, setHasShownLoginModal] = useState(false);

  // 테스트 환경 변수 확인
  const isTestEnv = process.env.NEXT_PUBLIC_TEST_ENV === 'test';
  
  // 테스트 환경에서 로그인 검사 패스 여부 확인
  // 테스트 환경에서는 기본적으로 로그인 검사 패스 (로그인 유저 기본값)
  // 비회원 가드테스트가 필요한 경우에만 검사 수행
  const shouldBypassAuth = isTestEnv && (typeof window !== 'undefined' ? window.__TEST_BYPASS__ !== false : true);

  /**
   * AuthProvider 초기화 완료 후 권한 검증 수행
   * 
   * 테스트 환경에서는 즉시 초기화하고, 실제 환경에서는 대기 시간을 두어
   * AuthProvider 초기화 완료를 보장합니다.
   */
  useEffect(() => {
    // 테스트 환경에서는 즉시 초기화, 실제 환경에서는 대기
    if (isTestEnv) {
      setIsInitialized(true);
      return;
    }

    // AuthProvider가 초기화되기를 기다림 (새로고침 시 충돌 방지)
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, INITIALIZATION_DELAY);

    return () => clearTimeout(timer);
  }, [isTestEnv]);

  /**
   * 권한 검증 함수
   * 
   * 현재 경로와 로그인 상태를 기반으로 접근 권한을 검증합니다.
   * 테스트 환경에서는 설정에 따라 검사를 패스할 수 있습니다.
   * 
   * @returns {boolean} 권한이 있으면 true, 없으면 false
   */
  const checkPermission = () => {
    if (!isInitialized) return false;

    // 테스트 환경에서 로그인 검사 패스하는 경우
    if (shouldBypassAuth) {
      setHasShownLoginModal(false);
      return true;
    }

    // 실제 환경에서만 권한 검증 수행
    const hasPermission = getAccessPermission(pathname, isLoggedIn);

    // 권한이 있는 경우 모달 표시 플래그 초기화
    if (hasPermission) {
      setHasShownLoginModal(false);
      return true;
    }

    // 권한이 없고 아직 로그인 모달을 보여주지 않은 경우
    if (!hasPermission && !hasShownLoginModal) {
      setHasShownLoginModal(true);
      
      // 로그인 모달 표시
      openModal(
        <Modal
          variant="info"
          actions="dual"
          title="로그인하시겠습니까?"
          description="이 기능을 사용하려면 로그인이 필요합니다."
          confirmText="로그인하러가기"
          cancelText="취소"
          onConfirm={() => {
            // 모든 모달 닫기
            closeAllModals();
            // 로그인 페이지로 이동
            router.push(ROUTES.AUTH.LOGIN);
          }}
          onCancel={() => {
            // 모든 모달 닫기
            closeAllModals();
          }}
        />
      );
    }

    return false;
  };

  /**
   * 페이지 권한 검증
   * 
   * 경로 변경 시 자동으로 실행되어 페이지 접근 권한을 검증합니다.
   * 테스트 환경에서는 설정에 따라 검사를 패스할 수 있습니다.
   */
  useEffect(() => {
    if (!isInitialized) return;

    // 테스트 환경에서는 기본적으로 모든 페이지 접근 허용
    // 비회원 가드테스트가 필요한 경우에만 검사 수행
    if (isTestEnv && shouldBypassAuth) {
      setHasShownLoginModal(false);
      return;
    }

    checkPermission();
  }, [isInitialized, pathname, isLoggedIn, isTestEnv, hasShownLoginModal, checkPermission, shouldBypassAuth]);

  /**
   * 경로 변경 시 모달 표시 플래그 초기화
   * 
   * 페이지 이동 시 모달 중복 표시를 방지하기 위해 플래그를 초기화합니다.
   */
  useEffect(() => {
    setHasShownLoginModal(false);
  }, [pathname]);

  /**
   * 권한 여부 확인
   * 
   * 현재 사용자의 페이지 접근 권한을 확인합니다.
   * 
   * @returns {boolean} 권한이 있으면 true, 없으면 false
   */
  const isAuthorized = () => {
    if (!isInitialized) return false;
    
    // 테스트 환경에서 로그인 검사 패스하는 경우
    if (shouldBypassAuth) return true;
    
    return getAccessPermission(pathname, isLoggedIn);
  };

  return {
    isAuthorized: isAuthorized(),
    checkPermission,
    isInitialized,
    isTestEnv,
    shouldBypassAuth,
  };
}

/**
 * AuthGuard Hook Props
 */
interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * AuthGuard 컴포넌트
 * 
 * 페이지 접근 권한을 검증하고, 권한이 없는 경우 로그인 모달을 표시하는 가드 컴포넌트
 * 
 * 주요 기능:
 * - 페이지별 접근 권한 검증
 * - 테스트 환경과 실제 환경 구분
 * - 권한 없는 사용자에게 로그인 모달 표시
 * - 인증 상태 초기화 후 권한 검증 수행
 * 
 * @example
 * ```tsx
 * // layout.tsx
 * <AuthProvider>
 *   <AuthGuard>
 *     <App />
 *   </AuthGuard>
 * </AuthProvider>
 * ```
 */
export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthorized, isInitialized } = useAuthGuard();

  // AuthProvider 초기화 전에는 빈 화면 표시
  if (!isInitialized) {
    return <div />;
  }

  // 권한이 있는 경우 children 렌더링
  if (isAuthorized) {
    return <>{children}</>;
  }

  // 권한이 없는 경우 빈 화면 유지 (모달은 이미 표시됨)
  return <div />;
}
