'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { ROUTES } from '../../constants/url';

/**
 * Link Routing Hook
 * 
 * 페이지 이동과 현재 경로 기반 액티브 상태 관리를 위한 커스텀 훅
 * Layout 컴포넌트에서 네비게이션 라우팅과 액티브 상태를 관리합니다.
 * 
 * @example
 * ```tsx
 * const {
 *   handleLogoClick,
 *   handleDiariesClick,
 *   handlePicturesClick,
 *   isDiariesActive,
 *   isPicturesActive,
 * } = useLinkRouting();
 * ```
 */
function useLinkRouting() {
  const router = useRouter();
  const pathname = usePathname();

  // 로고 클릭 핸들러 (일기목록페이지로 이동)
  const handleLogoClick = useCallback(() => {
    router.push(ROUTES.DIARIES.LIST);
  }, [router]);

  // 일기보관함 클릭 핸들러
  const handleDiariesClick = useCallback(() => {
    router.push(ROUTES.DIARIES.LIST);
  }, [router]);

  // 사진보관함 클릭 핸들러
  const handlePicturesClick = useCallback(() => {
    router.push(ROUTES.PICTURES.LIST);
  }, [router]);

  // 현재 경로가 일기 관련 페이지인지 확인
  const isDiariesActive = pathname === ROUTES.DIARIES.LIST || pathname.startsWith('/diaries/');
  
  // 현재 경로가 사진 관련 페이지인지 확인
  const isPicturesActive = pathname === ROUTES.PICTURES.LIST;

  return {
    // 핸들러 함수들
    handleLogoClick,
    handleDiariesClick,
    handlePicturesClick,
    
    // 액티브 상태
    isDiariesActive,
    isPicturesActive,
    
    // 현재 경로
    currentPath: pathname,
  };
}

export default useLinkRouting;
