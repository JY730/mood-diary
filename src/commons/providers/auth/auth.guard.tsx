'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { useAuth } from './auth.provider';
import { useModal } from '../modal/modal.provider';
import { Modal } from '@/commons/components/modal';
import { ROUTES, getAccessPermission } from '@/commons/constants/url';

/**
 * AuthGuard Props
 */
interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * 초기화 대기 시간 (ms)
 * AuthProvider 초기화 대기 시간
 */
const INITIALIZATION_DELAY = 100;

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
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { openModal, closeAllModals } = useModal();
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasShownLoginModal, setHasShownLoginModal] = useState(false);

  // 테스트 환경 변수 확인
  const isTestEnv = process.env.NEXT_PUBLIC_TEST_ENV === 'test';

  /**
   * AuthProvider 초기화 완료 후 권한 검증 수행
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
   * 페이지 권한 검증
   */
  useEffect(() => {
    if (!isInitialized) return;

    // 테스트 환경에서는 모든 페이지 접근 허용
    if (isTestEnv) {
      setHasShownLoginModal(false);
      return;
    }

    // 실제 환경에서만 권한 검증 수행
    const hasPermission = getAccessPermission(pathname, isLoggedIn);

    // 권한이 있는 경우 모달 표시 플래그 초기화
    if (hasPermission) {
      setHasShownLoginModal(false);
      return;
    }

    // 권한이 없고 아직 로그인 모달을 보여주지 않은 경우
    if (!hasPermission && !hasShownLoginModal) {
      setHasShownLoginModal(true);
      
      // 로그인 모달 표시
      openModal(
        <Modal
          variant="info"
          actions="single"
          title="로그인 필요"
          description="로그인해주세요"
          confirmText="확인"
          onConfirm={() => {
            // 모든 모달 닫기
            closeAllModals();
            // 로그인 페이지로 이동
            router.push(ROUTES.AUTH.LOGIN);
          }}
        />
      );
    }
  }, [isInitialized, pathname, isLoggedIn, isTestEnv, hasShownLoginModal, openModal, closeAllModals, router]);

  /**
   * 경로 변경 시 모달 표시 플래그 초기화
   */
  useEffect(() => {
    setHasShownLoginModal(false);
  }, [pathname]);

  // AuthProvider 초기화 전에는 빈 화면 표시
  if (!isInitialized) {
    return <div />;
  }

  // 테스트 환경이거나 권한이 있는 경우 children 렌더링
  if (isTestEnv || getAccessPermission(pathname, isLoggedIn)) {
    return <>{children}</>;
  }

  // 권한이 없는 경우 빈 화면 유지 (모달은 이미 표시됨)
  return <div />;
}
