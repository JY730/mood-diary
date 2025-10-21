'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useModal } from '@/commons/providers/modal/modal.provider';
import { Modal } from '@/commons/components/modal';
import { ROUTES } from '@/commons/constants/url';

/**
 * GraphQL API URL 상수
 */
const GRAPHQL_API_URL = 'https://main-practice.codebootcamp.co.kr/graphql';

/**
 * 로그인 폼 검증 스키마
 * zod를 사용한 폼 검증
 */
const loginSchema = z.object({
  email: z.string().min(1, '이메일을 입력하세요').includes('@', { message: '올바른 이메일 형식이 아닙니다' }),
  password: z.string().min(1, '비밀번호를 입력하세요'),
});

/**
 * 로그인 폼 데이터 타입
 */
export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * loginUser API 응답 타입
 */
interface LoginUserResponse {
  data: {
    loginUser: {
      accessToken: string;
    };
  };
}

/**
 * fetchUserLoggedIn API 응답 타입
 */
interface FetchUserLoggedInResponse {
  data: {
    fetchUserLoggedIn: {
      _id: string;
      name: string;
    };
  };
}

/**
 * loginUser GraphQL mutation을 호출하는 함수
 * 
 * @param email - 사용자 이메일
 * @param password - 사용자 비밀번호
 * @returns Promise<string> - accessToken
 */
async function loginUser(email: string, password: string): Promise<string> {
  const response = await fetch(GRAPHQL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation loginUser($email: String!, $password: String!) {
          loginUser(email: $email, password: $password) {
            accessToken
          }
        }
      `,
      variables: { email, password },
    }),
  });

  const result: LoginUserResponse = await response.json();

  if ('errors' in result) {
    throw new Error('로그인에 실패했습니다');
  }

  return result.data.loginUser.accessToken;
}

/**
 * fetchUserLoggedIn GraphQL query를 호출하는 함수
 * 
 * @param accessToken - JWT 액세스 토큰
 * @returns Promise<{ _id: string; name: string }> - 로그인한 사용자 정보
 */
async function fetchUserLoggedIn(accessToken: string): Promise<{ _id: string; name: string }> {
  const response = await fetch(GRAPHQL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query: `
        query fetchUserLoggedIn {
          fetchUserLoggedIn {
            _id
            name
          }
        }
      `,
    }),
  });

  const result: FetchUserLoggedInResponse = await response.json();

  if ('errors' in result) {
    throw new Error('사용자 정보 조회에 실패했습니다');
  }

  return result.data.fetchUserLoggedIn;
}

/**
 * 로그인 폼 훅
 * 
 * react-hook-form, zod, @tanstack/react-query를 사용하여
 * 폼 상태 관리, 검증, API 호출을 수행합니다.
 * 로그인 성공 시 localStorage에 사용자 정보를 저장하고,
 * 일기 목록 페이지로 이동합니다.
 * 
 * @returns {object} 폼 관련 상태와 메서드
 */
export const useLoginForm = () => {
  const router = useRouter();
  const { openModal, closeAllModals } = useModal();
  const [hasShownModal, setHasShownModal] = useState(false);

  // react-hook-form 초기화
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  /**
   * 입력값 감시
   */
  const email = watch('email');
  const password = watch('password');

  /**
   * 버튼 활성화 조건: 모든 필드가 입력되고 유효한 경우
   */
  const isButtonEnabled = isValid && email.length > 0 && password.length > 0;

  /**
   * 로그인 Mutation
   * 
   * 1. loginUser API 호출하여 accessToken 획득
   * 2. fetchUserLoggedIn API 호출하여 사용자 정보 획득
   * 3. localStorage에 저장
   * 4. 성공/실패 모달 표시
   */
  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      // 1. loginUser API 호출
      const accessToken = await loginUser(data.email, data.password);

      // 2. fetchUserLoggedIn API 호출
      const user = await fetchUserLoggedIn(accessToken);

      return { accessToken, user };
    },
    onSuccess: ({ accessToken, user }) => {
      // 3. localStorage에 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user));

      // 4. 성공 모달 표시 (한 번만)
      if (!hasShownModal) {
        setHasShownModal(true);
        openModal(
          <Modal
            variant="info"
            actions="single"
            theme="light"
            title="로그인 완료"
            description="로그인이 완료되었습니다"
            confirmText="확인"
            onConfirm={() => {
              closeAllModals();
              setHasShownModal(false);
              router.push(ROUTES.DIARIES.LIST);
            }}
          />
        );
      }
    },
    onError: () => {
      // 5. 실패 모달 표시 (한 번만)
      if (!hasShownModal) {
        setHasShownModal(true);
        openModal(
          <Modal
            variant="danger"
            actions="single"
            theme="light"
            title="로그인 실패"
            description="로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요."
            confirmText="확인"
            onConfirm={() => {
              closeAllModals();
              setHasShownModal(false);
            }}
          />
        );
      }
    },
  });

  /**
   * 폼 제출 핸들러
   */
  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data);
  });

  return {
    register,
    onSubmit,
    errors,
    isButtonEnabled,
    isLoading: loginMutation.isPending,
  };
}

