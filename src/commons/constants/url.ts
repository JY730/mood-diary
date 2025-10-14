/**
 * URL Constants and Page Configuration
 * URL 경로 및 페이지 설정 관리
 * 다이나믹 라우팅과 링크 이동을 위한 URL 상수 정의
 */

// 접근 권한 타입 정의
export type AccessLevel = '누구나' | '회원전용';

// UI 구성요소 노출 설정 타입
export interface UIComponentsConfig {
  header: {
    visible: boolean;
    logo: boolean;
    darkModeToggle: boolean;
  };
  banner: boolean;
  navigation: boolean;
  footer: boolean;
}

// 페이지 설정 인터페이스
export interface PageConfig {
  path: string;
  accessLevel: AccessLevel;
  uiComponents: UIComponentsConfig;
}

// URL 경로 상수
export const ROUTES = {
  // 인증 관련
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
  },
  
  // 일기 관련
  DIARIES: {
    LIST: '/diaries',
    DETAIL: (id: string | number) => `/diaries/${id}`,
    DETAIL_TEMPLATE: '/diaries/[id]', // 템플릿 경로
  },
  
  // 사진 관련
  PICTURES: {
    LIST: '/pictures',
  },
} as const;

// 페이지별 설정
export const PAGE_CONFIGS: Record<string, PageConfig> = {
  LOGIN: {
    path: ROUTES.AUTH.LOGIN,
    accessLevel: '누구나',
    uiComponents: {
      header: {
        visible: false,
        logo: false,
        darkModeToggle: false,
      },
      banner: false,
      navigation: false,
      footer: false,
    },
  },
  
  SIGNUP: {
    path: ROUTES.AUTH.SIGNUP,
    accessLevel: '누구나',
    uiComponents: {
      header: {
        visible: false,
        logo: false,
        darkModeToggle: false,
      },
      banner: false,
      navigation: false,
      footer: false,
    },
  },
  
  DIARIES_LIST: {
    path: ROUTES.DIARIES.LIST,
    accessLevel: '누구나',
    uiComponents: {
      header: {
        visible: true,
        logo: true,
        darkModeToggle: false,
      },
      banner: true,
      navigation: true,
      footer: true,
    },
  },
  
  DIARIES_DETAIL: {
    path: ROUTES.DIARIES.DETAIL_TEMPLATE,
    accessLevel: '회원전용',
    uiComponents: {
      header: {
        visible: true,
        logo: true,
        darkModeToggle: false,
      },
      banner: false,
      navigation: false,
      footer: true,
    },
  },
  
  PICTURES_LIST: {
    path: ROUTES.PICTURES.LIST,
    accessLevel: '누구나',
    uiComponents: {
      header: {
        visible: true,
        logo: true,
        darkModeToggle: false,
      },
      banner: true,
      navigation: true,
      footer: true,
    },
  },
} as const;

// Export all URL constants
export const URL_CONSTANTS = {
  ROUTES,
  PAGE_CONFIGS,
} as const;

// 유틸리티 함수들
export const getPageConfig = (pathname: string): PageConfig | null => {
  // 다이나믹 라우팅 처리
  if (pathname.startsWith('/diaries/') && pathname !== '/diaries') {
    return PAGE_CONFIGS.DIARIES_DETAIL;
  }
  
  // 정확한 경로 매칭
  const config = Object.values(PAGE_CONFIGS).find(
    config => config.path === pathname
  );
  
  return config || null;
};

export const getAccessPermission = (pathname: string, isLoggedIn: boolean): boolean => {
  const config = getPageConfig(pathname);
  if (!config) return true; // 설정이 없는 페이지는 기본적으로 접근 허용
  
  if (config.accessLevel === '회원전용') {
    return isLoggedIn;
  }
  
  return true; // '누구나' 접근 가능
};

export const getUIComponentsConfig = (pathname: string): UIComponentsConfig | null => {
  const config = getPageConfig(pathname);
  return config?.uiComponents || null;
};

export const getDiaryDetailUrl = (id: string | number): string => {
  return ROUTES.DIARIES.DETAIL(id);
};

export const getAllRoutes = (): string[] => {
  const routes: string[] = [];
  
  // AUTH 경로들
  routes.push(ROUTES.AUTH.LOGIN, ROUTES.AUTH.SIGNUP);
  
  // DIARIES 경로들
  routes.push(ROUTES.DIARIES.LIST, ROUTES.DIARIES.DETAIL_TEMPLATE);
  
  // PICTURES 경로들
  routes.push(ROUTES.PICTURES.LIST);
  
  return routes;
};

export const getAllPageConfigs = (): PageConfig[] => {
  return Object.values(PAGE_CONFIGS);
};

// 타입 정의
export type RouteKeys = keyof typeof ROUTES;
export type PageConfigKeys = keyof typeof PAGE_CONFIGS;
export type URLConstants = typeof URL_CONSTANTS;
