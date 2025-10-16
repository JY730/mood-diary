'use client';

import { usePathname } from 'next/navigation';
import { getUIComponentsConfig, UIComponentsConfig } from '../../constants/url';

/**
 * Area Hook
 * 
 * 현재 경로에 따라 UI 영역의 노출 여부를 결정하는 커스텀 훅
 * URL 설정에 기반하여 header, banner, navigation, footer 영역의 표시 상태를 관리합니다.
 * 
 * @example
 * ```tsx
 * const {
 *   showHeader,
 *   showLogo,
 *   showBanner,
 *   showNavigation,
 *   showFooter,
 * } = useArea();
 * ```
 */
function useArea() {
  const pathname = usePathname();
  
  // URL 설정에서 UI 컴포넌트 설정 가져오기
  const uiConfig: UIComponentsConfig | null = getUIComponentsConfig(pathname);
  
  // 기본값 설정 (설정이 없는 경우 모든 영역 노출)
  const defaultConfig: UIComponentsConfig = {
    header: {
      visible: true,
      logo: true,
      darkModeToggle: false,
    },
    banner: true,
    navigation: true,
    footer: true,
  };
  
  const config = uiConfig || defaultConfig;
  
  return {
    // UI 영역 노출 상태
    showHeader: config.header.visible,
    showLogo: config.header.logo,
    showBanner: config.banner,
    showNavigation: config.navigation,
    showFooter: config.footer,
  };
}

export default useArea;
