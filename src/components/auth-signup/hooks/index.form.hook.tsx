'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useModal } from '@/commons/providers/modal/modal.provider';
import { Modal } from '@/commons/components/modal';
import { ROUTES } from '@/commons/constants/url';

/**
 * 회원가입 폼 데이터 타입
 */
export interface SignupFormData {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
}

/**
 * GraphQL API 응답 타입
 */
interface CreateUserResponse {
  _id: string;
}

/**
 * 회원가입 폼 검증 스키마
 * zod를 사용한 폼 검증
 */
const signupFormSchema = z
  .object({
    email: z
      .string()
      .min(1, '이메일을 입력해주세요.')
      .refine((email) => email.includes('@'), {
        message: '이메일에 @를 포함해주세요.',
      }),
    password: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .refine((password) => /[a-zA-Z]/.test(password) && /[0-9]/.test(password), {
        message: '비밀번호는 영문과 숫자를 모두 포함해야 합니다.',
      }),
    passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
    name: z.string().min(1, '이름을 입력해주세요.'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

/**
 * createUser GraphQL mutation을 호출하는 함수
 * 
 * @param data - 회원가입 폼 데이터
 * @returns Promise<CreateUserResponse>
 */
const createUser = async (data: SignupFormData): Promise<CreateUserResponse> => {
  const query = `
    mutation createUser($createUserInput: CreateUserInput!) {
      createUser(createUserInput: $createUserInput) {
        _id
      }
    }
  `;

  const variables = {
    createUserInput: {
      email: data.email,
      password: data.password,
      name: data.name,
    },
  };

  const response = await fetch('https://main-practice.codebootcamp.co.kr/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await response.json();

  // GraphQL 에러 처리
  if (result.errors) {
    throw new Error(result.errors[0].message || '회원가입에 실패했습니다.');
  }

  return result.data.createUser;
};

/**
 * 회원가입 폼 훅
 * 
 * react-hook-form, zod, @tanstack/react-query를 사용하여
 * 폼 상태 관리, 검증, API 호출을 수행합니다.
 * 
 * @returns {object} 폼 관련 상태와 메서드
 */
export const useSignupForm = () => {
  const router = useRouter();
  const { openModal, closeAllModals } = useModal();

  // react-hook-form 초기화
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      name: '',
    },
  });

  // react-query useMutation 설정
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // 성공 시 가입완료 모달 표시 (한 번만)
      openModal(
        <Modal
          variant="info"
          actions="single"
          title="가입 완료"
          description="회원가입이 성공적으로 완료되었습니다."
          confirmText="확인"
          onConfirm={() => {
            // 모든 모달 닫기
            closeAllModals();
            // 로그인 페이지로 이동
            router.push(ROUTES.AUTH.LOGIN);
          }}
        />
      );
    },
    onError: (error: Error) => {
      // 실패 시 가입실패 모달 표시 (한 번만)
      openModal(
        <Modal
          variant="danger"
          actions="single"
          title="가입 실패"
          description={error.message || '회원가입에 실패했습니다. 다시 시도해주세요.'}
          confirmText="확인"
          onConfirm={() => {
            // 모든 모달 닫기
            closeAllModals();
            // 회원가입 페이지에 그대로 머물러 있음
          }}
        />
      );
    },
  });

  /**
   * 폼 제출 핸들러
   */
  const onSubmit = (data: SignupFormData) => {
    mutation.mutate(data);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isValid,
    isLoading: mutation.isPending,
  };
};

