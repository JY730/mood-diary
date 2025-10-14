import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from './index';

/**
 * Input 컴포넌트는 다양한 variant, size, theme을 지원하는 범용 입력 컴포넌트입니다.
 * Figma 디자인 시스템을 기반으로 구현되었습니다.
 */
const meta = {
  title: 'Commons/Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 스타일과 크기, 테마를 지원하는 입력 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: '입력의 시각적 스타일 변형',
      table: {
        type: { summary: 'primary | secondary | tertiary' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '입력의 크기',
      table: {
        type: { summary: 'small | medium | large' },
        defaultValue: { summary: 'medium' },
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
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'boolean',
      description: '에러 상태',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description: '필수 입력 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: '라벨 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    helperText: {
      control: 'text',
      description: '도움말 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    errorMessage: {
      control: 'text',
      description: '에러 메시지',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Primary 입력의 기본 상태입니다.
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    placeholder: '텍스트를 입력하세요',
  },
};

/**
 * Secondary 입력의 기본 상태입니다.
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'light',
    placeholder: '텍스트를 입력하세요',
  },
};

/**
 * Tertiary 입력의 기본 상태입니다.
 */
export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'light',
    placeholder: '텍스트를 입력하세요',
  },
};

/**
 * Small 크기의 입력입니다.
 */
export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    theme: 'light',
    placeholder: 'Small Input',
  },
};

/**
 * Medium 크기의 입력입니다.
 */
export const Medium: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    placeholder: 'Medium Input',
  },
};

/**
 * Large 크기의 입력입니다.
 */
export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    theme: 'light',
    placeholder: 'Large Input',
  },
};

/**
 * Light 테마의 입력입니다.
 */
export const LightTheme: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    placeholder: 'Light Theme',
  },
};

/**
 * Dark 테마의 입력입니다.
 */
export const DarkTheme: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
    placeholder: 'Dark Theme',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

/**
 * 비활성화된 입력입니다.
 */
export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    placeholder: 'Disabled Input',
    disabled: true,
  },
};

/**
 * 라벨이 있는 입력입니다.
 */
export const WithLabel: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    label: '이름',
    placeholder: '이름을 입력하세요',
  },
};

/**
 * 필수 입력 표시가 있는 입력입니다.
 */
export const Required: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    label: '이메일',
    placeholder: 'example@email.com',
    required: true,
  },
};

/**
 * 도움말 텍스트가 있는 입력입니다.
 */
export const WithHelperText: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    label: '비밀번호',
    placeholder: '비밀번호를 입력하세요',
    helperText: '8자 이상, 영문 대소문자, 숫자, 특수문자 포함',
    type: 'password',
  },
};

/**
 * 에러 상태의 입력입니다.
 */
export const Error: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    label: '이메일',
    placeholder: 'example@email.com',
    error: true,
    errorMessage: '올바른 이메일 형식이 아닙니다.',
  },
};

/**
 * 에러 상태 (필수 입력)의 입력입니다.
 */
export const ErrorRequired: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    label: '이름',
    placeholder: '이름을 입력하세요',
    required: true,
    error: true,
    errorMessage: '필수 입력 항목입니다.',
  },
};

/**
 * 모든 variant를 한눈에 볼 수 있는 스토리입니다.
 */
export const AllVariants: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    placeholder: '텍스트를 입력하세요',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', width: '600px' }}>
      <div style={{ flex: '1', minWidth: '180px' }}>
        <Input variant="primary" size="medium" theme="light" placeholder="Primary" />
      </div>
      <div style={{ flex: '1', minWidth: '180px' }}>
        <Input variant="secondary" size="medium" theme="light" placeholder="Secondary" />
      </div>
      <div style={{ flex: '1', minWidth: '180px' }}>
        <Input variant="tertiary" size="medium" theme="light" placeholder="Tertiary" />
      </div>
    </div>
  ),
};

/**
 * 모든 크기를 한눈에 볼 수 있는 스토리입니다.
 */
export const AllSizes: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    placeholder: '텍스트를 입력하세요',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <Input variant="primary" size="small" theme="light" placeholder="Small" />
      <Input variant="primary" size="medium" theme="light" placeholder="Medium" />
      <Input variant="primary" size="large" theme="light" placeholder="Large" />
    </div>
  ),
};

/**
 * Light 테마의 모든 조합을 보여주는 스토리입니다.
 */
export const LightThemeShowcase: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    placeholder: '텍스트를 입력하세요',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px', width: '600px' }}>
      <div>
        <h3 style={{ marginBottom: '12px' }}>Primary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Input variant="primary" size="small" theme="light" placeholder="Small" />
          <Input variant="primary" size="medium" theme="light" placeholder="Medium" />
          <Input variant="primary" size="large" theme="light" placeholder="Large" />
          <Input variant="primary" size="medium" theme="light" placeholder="Disabled" disabled />
          <Input variant="primary" size="medium" theme="light" label="에러" placeholder="Error" error errorMessage="에러 메시지" />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px' }}>Secondary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Input variant="secondary" size="small" theme="light" placeholder="Small" />
          <Input variant="secondary" size="medium" theme="light" placeholder="Medium" />
          <Input variant="secondary" size="large" theme="light" placeholder="Large" />
          <Input variant="secondary" size="medium" theme="light" placeholder="Disabled" disabled />
          <Input variant="secondary" size="medium" theme="light" label="에러" placeholder="Error" error errorMessage="에러 메시지" />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px' }}>Tertiary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Input variant="tertiary" size="small" theme="light" placeholder="Small" />
          <Input variant="tertiary" size="medium" theme="light" placeholder="Medium" />
          <Input variant="tertiary" size="large" theme="light" placeholder="Large" />
          <Input variant="tertiary" size="medium" theme="light" placeholder="Disabled" disabled />
          <Input variant="tertiary" size="medium" theme="light" label="에러" placeholder="Error" error errorMessage="에러 메시지" />
        </div>
      </div>
    </div>
  ),
};

/**
 * Dark 테마의 모든 조합을 보여주는 스토리입니다.
 */
export const DarkThemeShowcase: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
    placeholder: '텍스트를 입력하세요',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px', backgroundColor: '#000', minHeight: '400px', width: '600px' }}>
      <div>
        <h3 style={{ marginBottom: '12px', color: '#fff' }}>Primary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Input variant="primary" size="small" theme="dark" placeholder="Small" />
          <Input variant="primary" size="medium" theme="dark" placeholder="Medium" />
          <Input variant="primary" size="large" theme="dark" placeholder="Large" />
          <Input variant="primary" size="medium" theme="dark" placeholder="Disabled" disabled />
          <Input variant="primary" size="medium" theme="dark" label="에러" placeholder="Error" error errorMessage="에러 메시지" />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', color: '#fff' }}>Secondary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Input variant="secondary" size="small" theme="dark" placeholder="Small" />
          <Input variant="secondary" size="medium" theme="dark" placeholder="Medium" />
          <Input variant="secondary" size="large" theme="dark" placeholder="Large" />
          <Input variant="secondary" size="medium" theme="dark" placeholder="Disabled" disabled />
          <Input variant="secondary" size="medium" theme="dark" label="에러" placeholder="Error" error errorMessage="에러 메시지" />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', color: '#fff' }}>Tertiary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Input variant="tertiary" size="small" theme="dark" placeholder="Small" />
          <Input variant="tertiary" size="medium" theme="dark" placeholder="Medium" />
          <Input variant="tertiary" size="large" theme="dark" placeholder="Large" />
          <Input variant="tertiary" size="medium" theme="dark" placeholder="Disabled" disabled />
          <Input variant="tertiary" size="medium" theme="dark" label="에러" placeholder="Error" error errorMessage="에러 메시지" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

/**
 * 폼 예시를 보여주는 스토리입니다.
 */
export const FormExample: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px', width: '400px' }}>
      <Input 
        variant="primary" 
        size="medium" 
        theme="light"
        label="이름"
        placeholder="홍길동"
        required
      />
      <Input 
        variant="primary" 
        size="medium" 
        theme="light"
        label="이메일"
        placeholder="example@email.com"
        type="email"
        required
        helperText="가입하신 이메일 주소를 입력해주세요"
      />
      <Input 
        variant="primary" 
        size="medium" 
        theme="light"
        label="비밀번호"
        placeholder="비밀번호를 입력하세요"
        type="password"
        required
        helperText="8자 이상, 영문 대소문자, 숫자, 특수문자 포함"
      />
      <Input 
        variant="primary" 
        size="medium" 
        theme="light"
        label="전화번호"
        placeholder="010-1234-5678"
        type="tel"
        helperText="휴대폰 번호를 입력해주세요"
      />
    </div>
  ),
};

/**
 * 다양한 입력 타입을 보여주는 스토리입니다.
 */
export const InputTypes: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px', width: '400px' }}>
      <Input 
        variant="primary" 
        size="medium" 
        theme="light"
        label="텍스트"
        placeholder="텍스트를 입력하세요"
        type="text"
      />
      <Input 
        variant="primary" 
        size="medium" 
        theme="light"
        label="이메일"
        placeholder="example@email.com"
        type="email"
      />
      <Input 
        variant="primary" 
        size="medium" 
        theme="light"
        label="비밀번호"
        placeholder="비밀번호를 입력하세요"
        type="password"
      />
      <Input 
        variant="primary" 
        size="medium" 
        theme="light"
        label="숫자"
        placeholder="0"
        type="number"
      />
      <Input 
        variant="primary" 
        size="medium" 
        theme="light"
        label="날짜"
        type="date"
      />
      <Input 
        variant="primary" 
        size="medium" 
        theme="light"
        label="시간"
        type="time"
      />
      <Input 
        variant="primary" 
        size="medium" 
        theme="light"
        label="검색"
        placeholder="검색어를 입력하세요"
        type="search"
      />
    </div>
  ),
};

/**
 * 상호작용 예시를 보여주는 스토리입니다.
 */
export const Interactive: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    label: '입력 필드',
    placeholder: '입력해보세요',
    helperText: '텍스트를 입력하면 콘솔에 출력됩니다',
    onChange: (e) => console.log('입력값:', e.target.value),
  },
};

