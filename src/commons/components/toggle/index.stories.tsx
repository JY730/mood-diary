import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Toggle } from './index';
import React from 'react';

/**
 * Toggle 컴포넌트는 다양한 variant, size, theme을 지원하는 토글 스위치 컴포넌트입니다.
 * Figma 디자인 시스템을 기반으로 구현되었습니다.
 */
const meta = {
  title: 'Commons/Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 스타일과 크기, 테마를 지원하는 토글 스위치 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: '토글의 시각적 스타일 변형',
      table: {
        type: { summary: 'primary | secondary | tertiary' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '토글의 크기',
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
    checked: {
      control: 'boolean',
      description: '체크 상태',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
    label: {
      control: 'text',
      description: '라벨 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: '라벨 위치',
      table: {
        type: { summary: 'left | right' },
        defaultValue: { summary: 'right' },
      },
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Primary 토글의 기본 상태입니다.
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    checked: false,
  },render: (args) => {
    const [checked, setChecked] = React.useState(args.checked);
    return (
      <Toggle
        {...args}
        checked={checked}
        onValueChange={setChecked}
      />
    );
  },
};

/**
 * Secondary 토글의 기본 상태입니다.
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'light',
    checked: false,
  },render: (args) => {
    const [checked, setChecked] = React.useState(args.checked);
    return (
      <Toggle
        {...args}
        checked={checked}
        onValueChange={setChecked}
      />
    );
  },
};

/**
 * Tertiary 토글의 기본 상태입니다.
 */
export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'light',
    checked: false,
  },render: (args) => {
    const [checked, setChecked] = React.useState(args.checked);
    return (
      <Toggle
        {...args}
        checked={checked}
        onValueChange={setChecked}
      />
    );
  },
};

/**
 * Small 크기의 토글입니다.
 */
export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    theme: 'light',
    checked: false,
  },
};

/**
 * Medium 크기의 토글입니다.
 */
export const Medium: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    checked: false,
  },
};

/**
 * Large 크기의 토글입니다.
 */
export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    theme: 'light',
    checked: false,
  },
};

/**
 * Light 테마의 토글입니다.
 */
export const LightTheme: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    checked: false,
  },
};

/**
 * Dark 테마의 토글입니다.
 */
export const DarkTheme: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
    checked: false,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

/**
 * 체크된 상태의 토글입니다.
 */
export const Checked: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    checked: true,
  },
};

/**
 * 비활성화된 토글입니다.
 */
export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    checked: false,
    disabled: true,
  },
};

/**
 * 비활성화된 체크 상태의 토글입니다.
 */
export const DisabledChecked: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    checked: true,
    disabled: true,
  },
};

/**
 * 라벨이 있는 토글입니다 (오른쪽).
 */
export const WithLabelRight: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    checked: false,
    label: '알림 받기',
    labelPosition: 'right',
  },
};

/**
 * 라벨이 있는 토글입니다 (왼쪽).
 */
export const WithLabelLeft: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    checked: false,
    label: '자동 저장',
    labelPosition: 'left',
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
    checked: false,
  },
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
        <Toggle variant="primary" size="medium" theme="light" checked={false} />
        <span style={{ fontSize: '12px', color: '#666' }}>Primary</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
        <Toggle variant="secondary" size="medium" theme="light" checked={false} />
        <span style={{ fontSize: '12px', color: '#666' }}>Secondary</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
        <Toggle variant="tertiary" size="medium" theme="light" checked={false} />
        <span style={{ fontSize: '12px', color: '#666' }}>Tertiary</span>
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
    checked: false,
  },
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
        <Toggle variant="primary" size="small" theme="light" checked={false} />
        <span style={{ fontSize: '12px', color: '#666' }}>Small</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
        <Toggle variant="primary" size="medium" theme="light" checked={false} />
        <span style={{ fontSize: '12px', color: '#666' }}>Medium</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
        <Toggle variant="primary" size="large" theme="light" checked={false} />
        <span style={{ fontSize: '12px', color: '#666' }}>Large</span>
      </div>
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
    checked: false,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '12px' }}>Primary</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Toggle variant="primary" size="small" theme="light" checked={false} />
          <Toggle variant="primary" size="medium" theme="light" checked={false} />
          <Toggle variant="primary" size="large" theme="light" checked={false} />
          <Toggle variant="primary" size="medium" theme="light" checked={true} />
          <Toggle variant="primary" size="medium" theme="light" checked={false} disabled />
          <Toggle variant="primary" size="medium" theme="light" checked={true} disabled />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px' }}>Secondary</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Toggle variant="secondary" size="small" theme="light" checked={false} />
          <Toggle variant="secondary" size="medium" theme="light" checked={false} />
          <Toggle variant="secondary" size="large" theme="light" checked={false} />
          <Toggle variant="secondary" size="medium" theme="light" checked={true} />
          <Toggle variant="secondary" size="medium" theme="light" checked={false} disabled />
          <Toggle variant="secondary" size="medium" theme="light" checked={true} disabled />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px' }}>Tertiary</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Toggle variant="tertiary" size="small" theme="light" checked={false} />
          <Toggle variant="tertiary" size="medium" theme="light" checked={false} />
          <Toggle variant="tertiary" size="large" theme="light" checked={false} />
          <Toggle variant="tertiary" size="medium" theme="light" checked={true} />
          <Toggle variant="tertiary" size="medium" theme="light" checked={false} disabled />
          <Toggle variant="tertiary" size="medium" theme="light" checked={true} disabled />
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
    checked: false,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px', backgroundColor: '#000', minHeight: '400px' }}>
      <div>
        <h3 style={{ marginBottom: '12px', color: '#fff' }}>Primary</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Toggle variant="primary" size="small" theme="dark" checked={false} />
          <Toggle variant="primary" size="medium" theme="dark" checked={false} />
          <Toggle variant="primary" size="large" theme="dark" checked={false} />
          <Toggle variant="primary" size="medium" theme="dark" checked={true} />
          <Toggle variant="primary" size="medium" theme="dark" checked={false} disabled />
          <Toggle variant="primary" size="medium" theme="dark" checked={true} disabled />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', color: '#fff' }}>Secondary</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Toggle variant="secondary" size="small" theme="dark" checked={false} />
          <Toggle variant="secondary" size="medium" theme="dark" checked={false} />
          <Toggle variant="secondary" size="large" theme="dark" checked={false} />
          <Toggle variant="secondary" size="medium" theme="dark" checked={true} />
          <Toggle variant="secondary" size="medium" theme="dark" checked={false} disabled />
          <Toggle variant="secondary" size="medium" theme="dark" checked={true} disabled />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', color: '#fff' }}>Tertiary</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Toggle variant="tertiary" size="small" theme="dark" checked={false} />
          <Toggle variant="tertiary" size="medium" theme="dark" checked={false} />
          <Toggle variant="tertiary" size="large" theme="dark" checked={false} />
          <Toggle variant="tertiary" size="medium" theme="dark" checked={true} />
          <Toggle variant="tertiary" size="medium" theme="dark" checked={false} disabled />
          <Toggle variant="tertiary" size="medium" theme="dark" checked={true} disabled />
        </div>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

/**
 * 라벨 조합을 보여주는 스토리입니다.
 */
export const WithLabels: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    checked: false,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px' }}>
      <Toggle 
        variant="primary" 
        size="medium" 
        theme="light"
        checked={false}
        label="알림 받기"
        labelPosition="right"
      />
      <Toggle 
        variant="primary" 
        size="medium" 
        theme="light"
        checked={true}
        label="자동 저장"
        labelPosition="right"
      />
      <Toggle 
        variant="secondary" 
        size="medium" 
        theme="light"
        checked={false}
        label="다크 모드"
        labelPosition="left"
      />
      <Toggle 
        variant="tertiary" 
        size="medium" 
        theme="light"
        checked={true}
        label="소리 켜기"
        labelPosition="left"
      />
    </div>
  ),
};

/**
 * 설정 패널 예시를 보여주는 스토리입니다.
 */
export const SettingsExample: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    checked: false,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', width: '300px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>설정</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
          <div>
            <div style={{ fontWeight: '500', marginBottom: '4px' }}>푸시 알림</div>
            <div style={{ fontSize: '12px', color: '#666' }}>새로운 메시지 알림을 받습니다</div>
          </div>
          <Toggle variant="primary" size="medium" theme="light" checked={true} />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
          <div>
            <div style={{ fontWeight: '500', marginBottom: '4px' }}>이메일 알림</div>
            <div style={{ fontSize: '12px', color: '#666' }}>이메일로 알림을 받습니다</div>
          </div>
          <Toggle variant="primary" size="medium" theme="light" checked={false} />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
          <div>
            <div style={{ fontWeight: '500', marginBottom: '4px' }}>자동 저장</div>
            <div style={{ fontSize: '12px', color: '#666' }}>작업 내용을 자동으로 저장합니다</div>
          </div>
          <Toggle variant="secondary" size="medium" theme="light" checked={true} />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
          <div>
            <div style={{ fontWeight: '500', marginBottom: '4px' }}>다크 모드</div>
            <div style={{ fontSize: '12px', color: '#666' }}>어두운 테마를 사용합니다</div>
          </div>
          <Toggle variant="tertiary" size="medium" theme="light" checked={false} />
        </div>
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
    checked: false,
    label: '클릭해보세요!',
    labelPosition: 'right',
    onValueChange: (checked: boolean) => console.log('토글 상태:', checked),
  },
};
