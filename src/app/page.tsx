'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/commons/constants/url';

export default function Home() { 
  const router = useRouter();

  useEffect(() => {
    // 메인페이지 접속 시 일기보관함 페이지로 리다이렉트
    // 사용자가 http://localhost:3000/ 에 접속하면 자동으로 /diaries로 이동하여
    // 일기보관함 탭이 활성화된 상태로 일기목록을 보여줍니다.
    router.replace(ROUTES.DIARIES.LIST);
  }, [router]);

  return null; // 리다이렉트 중이므로 아무것도 렌더링하지 않음

  /* 이전 코드 (주석처리)
   * 메인페이지에서 직접 Diaries 컴포넌트를 렌더링하는 방식
   * 문제점: 라우팅 훅에서 루트 경로(/)를 일기보관함으로 인식하지 않아서
   * 탭이 활성화되지 않는 문제가 있었습니다.
   * 
   * import Diaries from "@/components/diaries";
   * 
   * export default function Home() { 
   *   return <Diaries />
   * }
   */
}
