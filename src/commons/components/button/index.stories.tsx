import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './index';

/**
 * Button 컴포넌트는 다양한 variant, size, theme을 지원하는 범용 버튼 컴포넌트입니다.
 * Figma 디자인 시스템을 기반으로 구현되었습니다.
 */
const meta = {
  title: 'Commons/Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 스타일과 크기, 테마를 지원하는 버튼 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: '버튼의 시각적 스타일 변형',
      table: {
        type: { summary: 'primary | secondary | tertiary' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '버튼의 크기',
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
    loading: {
      control: 'boolean',
      description: '로딩 상태',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: 'text',
      description: '버튼 내용',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: '아이콘 위치',
      table: {
        type: { summary: 'left | right' },
        defaultValue: { summary: 'left' },
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Primary 버튼의 기본 상태입니다.
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    children: 'Primary Button',
  },
};

/**
 * Secondary 버튼의 기본 상태입니다.
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'light',
    children: 'Secondary Button',
  },
};

/**
 * Tertiary 버튼의 기본 상태입니다.
 */
export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'light',
    children: 'Tertiary Button',
  },
};

/**
 * Small 크기의 버튼입니다.
 */
export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    theme: 'light',
    children: 'Small Button',
  },
};

/**
 * Medium 크기의 버튼입니다.
 */
export const Medium: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    children: 'Medium Button',
  },
};

/**
 * Large 크기의 버튼입니다.
 */
export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    theme: 'light',
    children: 'Large Button',
  },
};

/**
 * Light 테마의 버튼입니다.
 */
export const LightTheme: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    children: 'Light Theme',
  },
};

/**
 * Dark 테마의 버튼입니다.
 */
export const DarkTheme: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
    children: 'Dark Theme',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

/**
 * 비활성화된 버튼입니다.
 */
export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    children: 'Disabled Button',
    disabled: true,
  },
};

/**
 * 로딩 상태의 버튼입니다.
 */
export const Loading: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    children: 'Loading Button',
    loading: true,
  },
};

/**
 * 아이콘이 있는 버튼입니다 (왼쪽).
 */
export const WithIconLeft: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    children: 'Icon Left',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 5L10 15M5 10L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    iconPosition: 'left',
  },
};

/**
 * 아이콘이 있는 버튼입니다 (오른쪽).
 */
export const WithIconRight: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    children: 'Icon Right',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M7 5L13 10L7 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    iconPosition: 'right',
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
    children: 'Button',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button variant="primary" size="medium" theme="light">
        Primary
      </Button>
      <Button variant="secondary" size="medium" theme="light">
        Secondary
      </Button>
      <Button variant="tertiary" size="medium" theme="light">
        Tertiary
      </Button>
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
    children: 'Button',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button variant="primary" size="small" theme="light">
        Small
      </Button>
      <Button variant="primary" size="medium" theme="light">
        Medium
      </Button>
      <Button variant="primary" size="large" theme="light">
        Large
      </Button>
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
    children: 'Button',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '12px' }}>Primary</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="primary" size="small" theme="light">Small</Button>
          <Button variant="primary" size="medium" theme="light">Medium</Button>
          <Button variant="primary" size="large" theme="light">Large</Button>
          <Button variant="primary" size="medium" theme="light" disabled>Disabled</Button>
          <Button variant="primary" size="medium" theme="light" loading>Loading</Button>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px' }}>Secondary</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="secondary" size="small" theme="light">Small</Button>
          <Button variant="secondary" size="medium" theme="light">Medium</Button>
          <Button variant="secondary" size="large" theme="light">Large</Button>
          <Button variant="secondary" size="medium" theme="light" disabled>Disabled</Button>
          <Button variant="secondary" size="medium" theme="light" loading>Loading</Button>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px' }}>Tertiary</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="tertiary" size="small" theme="light">Small</Button>
          <Button variant="tertiary" size="medium" theme="light">Medium</Button>
          <Button variant="tertiary" size="large" theme="light">Large</Button>
          <Button variant="tertiary" size="medium" theme="light" disabled>Disabled</Button>
          <Button variant="tertiary" size="medium" theme="light" loading>Loading</Button>
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
    children: 'Button',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px', backgroundColor: '#000', minHeight: '400px' }}>
      <div>
        <h3 style={{ marginBottom: '12px', color: '#fff' }}>Primary</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="primary" size="small" theme="dark">Small</Button>
          <Button variant="primary" size="medium" theme="dark">Medium</Button>
          <Button variant="primary" size="large" theme="dark">Large</Button>
          <Button variant="primary" size="medium" theme="dark" disabled>Disabled</Button>
          <Button variant="primary" size="medium" theme="dark" loading>Loading</Button>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', color: '#fff' }}>Secondary</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="secondary" size="small" theme="dark">Small</Button>
          <Button variant="secondary" size="medium" theme="dark">Medium</Button>
          <Button variant="secondary" size="large" theme="dark">Large</Button>
          <Button variant="secondary" size="medium" theme="dark" disabled>Disabled</Button>
          <Button variant="secondary" size="medium" theme="dark" loading>Loading</Button>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', color: '#fff' }}>Tertiary</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="tertiary" size="small" theme="dark">Small</Button>
          <Button variant="tertiary" size="medium" theme="dark">Medium</Button>
          <Button variant="tertiary" size="large" theme="dark">Large</Button>
          <Button variant="tertiary" size="medium" theme="dark" disabled>Disabled</Button>
          <Button variant="tertiary" size="medium" theme="dark" loading>Loading</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

/**
 * 아이콘 조합을 보여주는 스토리입니다.
 */
export const WithIcons: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    children: 'Button',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px' }}>
      <div style={{ display: 'flex', gap: '12px' }}>
        <Button 
          variant="primary" 
          size="medium" 
          theme="light"
          icon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 5L10 15M5 10L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          }
          iconPosition="left"
        >
          Plus Left
        </Button>
        <Button 
          variant="primary" 
          size="medium" 
          theme="light"
          icon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 5L13 10L7 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
          iconPosition="right"
        >
          Arrow Right
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        <Button 
          variant="secondary" 
          size="medium" 
          theme="light"
          icon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10H16M16 10L12 6M16 10L12 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
          iconPosition="left"
        >
          Arrow Left
        </Button>
        <Button 
          variant="tertiary" 
          size="medium" 
          theme="light"
          icon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4V16M10 16L6 12M10 16L14 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
          iconPosition="right"
        >
          Download
        </Button>
      </div>
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
    children: 'Click Me!',
    onClick: () => alert('Button clicked!'),
  },
};

