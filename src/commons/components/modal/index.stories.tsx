import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Modal } from './index';

/**
 * Modal 컴포넌트는 다양한 variant, actions, theme을 지원하는 모달 컴포넌트입니다.
 * Figma 디자인 시스템을 기반으로 구현되었습니다.
 */
const meta = {
  title: 'Commons/Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 스타일과 액션, 테마를 지원하는 모달 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'danger'],
      description: '모달의 시각적 스타일 변형',
      table: {
        type: { summary: 'info | danger' },
        defaultValue: { summary: 'info' },
      },
    },
    actions: {
      control: 'select',
      options: ['single', 'dual'],
      description: '액션 버튼 개수',
      table: {
        type: { summary: 'single | dual' },
        defaultValue: { summary: 'single' },
      },
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: '테마 모드',
      table: {
        type: { summary: 'light | dark' },
        defaultValue: { summary: 'light' },
      },
    },
    title: {
      control: 'text',
      description: '모달 제목',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: 'text',
      description: '모달 설명',
      table: {
        type: { summary: 'string' },
      },
    },
    confirmText: {
      control: 'text',
      description: '확인 버튼 텍스트',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '확인' },
      },
    },
    cancelText: {
      control: 'text',
      description: '취소 버튼 텍스트 (dual actions일 때만)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '취소' },
      },
    },
    onConfirm: {
      action: 'confirmed',
      description: '확인 버튼 클릭 핸들러',
      table: {
        type: { summary: '() => void' },
      },
    },
    onCancel: {
      action: 'cancelled',
      description: '취소 버튼 클릭 핸들러',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Info variant의 기본 상태입니다.
 */
export const Info: Story = {
  args: {
    variant: 'info',
    actions: 'single',
    theme: 'light',
    title: '알림',
    description: '작업이 완료되었습니다.',
    confirmText: '확인',
  },
};

/**
 * Danger variant의 기본 상태입니다.
 */
export const Danger: Story = {
  args: {
    variant: 'danger',
    actions: 'single',
    theme: 'light',
    title: '경고',
    description: '이 작업은 되돌릴 수 없습니다.',
    confirmText: '확인',
  },
};

/**
 * Single action 모달입니다.
 */
export const SingleAction: Story = {
  args: {
    variant: 'info',
    actions: 'single',
    theme: 'light',
    title: '일기 등록 완료',
    description: '일기가 성공적으로 등록되었습니다.',
    confirmText: '확인',
  },
};

/**
 * Dual action 모달입니다.
 */
export const DualAction: Story = {
  args: {
    variant: 'info',
    actions: 'dual',
    theme: 'light',
    title: '일기 등록 취소',
    description: '일기 등록을 취소 하시겠어요?',
    confirmText: '등록 취소',
    cancelText: '계속 작성',
  },
};

/**
 * Light 테마의 모달입니다.
 */
export const LightTheme: Story = {
  args: {
    variant: 'info',
    actions: 'dual',
    theme: 'light',
    title: '설정 변경',
    description: '변경사항을 저장하시겠습니까?',
    confirmText: '저장',
    cancelText: '취소',
  },
};

/**
 * Dark 테마의 모달입니다.
 */
export const DarkTheme: Story = {
  args: {
    variant: 'info',
    actions: 'dual',
    theme: 'dark',
    title: '설정 변경',
    description: '변경사항을 저장하시겠습니까?',
    confirmText: '저장',
    cancelText: '취소',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

/**
 * Info variant + Single action 조합입니다.
 */
export const InfoSingle: Story = {
  args: {
    variant: 'info',
    actions: 'single',
    theme: 'light',
    title: '저장 완료',
    description: '변경사항이 저장되었습니다.',
    confirmText: '확인',
  },
};

/**
 * Info variant + Dual action 조합입니다.
 */
export const InfoDual: Story = {
  args: {
    variant: 'info',
    actions: 'dual',
    theme: 'light',
    title: '변경 사항',
    description: '변경사항을 저장하시겠습니까?',
    confirmText: '저장',
    cancelText: '취소',
  },
};

/**
 * Danger variant + Single action 조합입니다.
 */
export const DangerSingle: Story = {
  args: {
    variant: 'danger',
    actions: 'single',
    theme: 'light',
    title: '오류 발생',
    description: '작업을 완료할 수 없습니다.',
    confirmText: '확인',
  },
};

/**
 * Danger variant + Dual action 조합입니다.
 */
export const DangerDual: Story = {
  args: {
    variant: 'danger',
    actions: 'dual',
    theme: 'light',
    title: '삭제 확인',
    description: '정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
    confirmText: '삭제',
    cancelText: '취소',
  },
};

/**
 * 모든 variant를 한눈에 볼 수 있는 스토리입니다.
 */
export const AllVariants: Story = {
  args: {
    variant: 'info',
    actions: 'single',
    theme: 'light',
    title: '알림',
    description: '작업이 완료되었습니다.',
    confirmText: '확인',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Modal
        variant="info"
        actions="single"
        theme="light"
        title="알림"
        description="작업이 완료되었습니다."
        confirmText="확인"
      />
      <Modal
        variant="danger"
        actions="single"
        theme="light"
        title="경고"
        description="이 작업은 되돌릴 수 없습니다."
        confirmText="확인"
      />
    </div>
  ),
};

/**
 * 모든 action을 한눈에 볼 수 있는 스토리입니다.
 */
export const AllActions: Story = {
  args: {
    variant: 'info',
    actions: 'single',
    theme: 'light',
    title: '알림',
    description: '작업이 완료되었습니다.',
    confirmText: '확인',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Modal
        variant="info"
        actions="single"
        theme="light"
        title="일기 등록 완료"
        description="일기가 성공적으로 등록되었습니다."
        confirmText="확인"
      />
      <Modal
        variant="info"
        actions="dual"
        theme="light"
        title="일기 등록 취소"
        description="일기 등록을 취소 하시겠어요?"
        confirmText="등록 취소"
        cancelText="계속 작성"
      />
    </div>
  ),
};

/**
 * Light 테마의 모든 조합을 보여주는 스토리입니다.
 */
export const LightThemeShowcase: Story = {
  args: {
    variant: 'info',
    actions: 'single',
    theme: 'light',
    title: '알림',
    description: '작업이 완료되었습니다.',
    confirmText: '확인',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '12px' }}>Info - Single Action</h3>
        <Modal
          variant="info"
          actions="single"
          theme="light"
          title="저장 완료"
          description="변경사항이 저장되었습니다."
          confirmText="확인"
        />
      </div>
      <div>
        <h3 style={{ marginBottom: '12px' }}>Info - Dual Action</h3>
        <Modal
          variant="info"
          actions="dual"
          theme="light"
          title="변경 사항"
          description="변경사항을 저장하시겠습니까?"
          confirmText="저장"
          cancelText="취소"
        />
      </div>
      <div>
        <h3 style={{ marginBottom: '12px' }}>Danger - Single Action</h3>
        <Modal
          variant="danger"
          actions="single"
          theme="light"
          title="오류 발생"
          description="작업을 완료할 수 없습니다."
          confirmText="확인"
        />
      </div>
      <div>
        <h3 style={{ marginBottom: '12px' }}>Danger - Dual Action</h3>
        <Modal
          variant="danger"
          actions="dual"
          theme="light"
          title="삭제 확인"
          description="정말로 삭제하시겠습니까?"
          confirmText="삭제"
          cancelText="취소"
        />
      </div>
    </div>
  ),
};

/**
 * Dark 테마의 모든 조합을 보여주는 스토리입니다.
 */
export const DarkThemeShowcase: Story = {
  args: {
    variant: 'info',
    actions: 'single',
    theme: 'dark',
    title: '알림',
    description: '작업이 완료되었습니다.',
    confirmText: '확인',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px', backgroundColor: '#000', minHeight: '600px' }}>
      <div>
        <h3 style={{ marginBottom: '12px', color: '#fff' }}>Info - Single Action</h3>
        <Modal
          variant="info"
          actions="single"
          theme="dark"
          title="저장 완료"
          description="변경사항이 저장되었습니다."
          confirmText="확인"
        />
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', color: '#fff' }}>Info - Dual Action</h3>
        <Modal
          variant="info"
          actions="dual"
          theme="dark"
          title="변경 사항"
          description="변경사항을 저장하시겠습니까?"
          confirmText="저장"
          cancelText="취소"
        />
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', color: '#fff' }}>Danger - Single Action</h3>
        <Modal
          variant="danger"
          actions="single"
          theme="dark"
          title="오류 발생"
          description="작업을 완료할 수 없습니다."
          confirmText="확인"
        />
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', color: '#fff' }}>Danger - Dual Action</h3>
        <Modal
          variant="danger"
          actions="dual"
          theme="dark"
          title="삭제 확인"
          description="정말로 삭제하시겠습니까?"
          confirmText="삭제"
          cancelText="취소"
        />
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

/**
 * 실제 사용 예시 - 일기 등록 취소 확인 모달입니다.
 */
export const DiaryCancel: Story = {
  args: {
    variant: 'info',
    actions: 'dual',
    theme: 'light',
    title: '일기 등록 취소',
    description: '일기 등록을 취소 하시겠어요?',
    confirmText: '등록 취소',
    cancelText: '계속 작성',
    onConfirm: () => console.log('일기 등록 취소됨'),
    onCancel: () => console.log('계속 작성'),
  },
};

/**
 * 실제 사용 예시 - 일기 삭제 확인 모달입니다.
 */
export const DiaryDelete: Story = {
  args: {
    variant: 'danger',
    actions: 'dual',
    theme: 'light',
    title: '일기 삭제',
    description: '정말로 이 일기를 삭제하시겠습니까? 삭제된 일기는 복구할 수 없습니다.',
    confirmText: '삭제',
    cancelText: '취소',
    onConfirm: () => console.log('일기 삭제됨'),
    onCancel: () => console.log('삭제 취소'),
  },
};

/**
 * 실제 사용 예시 - 저장 완료 모달입니다.
 */
export const SaveSuccess: Story = {
  args: {
    variant: 'info',
    actions: 'single',
    theme: 'light',
    title: '저장 완료',
    description: '일기가 성공적으로 저장되었습니다.',
    confirmText: '확인',
    onConfirm: () => console.log('확인됨'),
  },
};

/**
 * 실제 사용 예시 - 오류 알림 모달입니다.
 */
export const ErrorNotification: Story = {
  args: {
    variant: 'danger',
    actions: 'single',
    theme: 'light',
    title: '오류 발생',
    description: '일기를 저장하는 중 오류가 발생했습니다. 다시 시도해주세요.',
    confirmText: '확인',
    onConfirm: () => console.log('확인됨'),
  },
};

/**
 * 상호작용 예시를 보여주는 스토리입니다.
 */
export const Interactive: Story = {
  args: {
    variant: 'info',
    actions: 'dual',
    theme: 'light',
    title: '확인 필요',
    description: '이 작업을 진행하시겠습니까?',
    confirmText: '확인',
    cancelText: '취소',
    onConfirm: () => alert('확인 버튼이 클릭되었습니다!'),
    onCancel: () => alert('취소 버튼이 클릭되었습니다!'),
  },
};

