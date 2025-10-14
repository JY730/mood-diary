import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Pagination } from './index';

/**
 * Pagination 컴포넌트는 다양한 variant, size, theme을 지원하는 범용 페이지네이션 컴포넌트입니다.
 * Figma 디자인 시스템을 기반으로 구현되었습니다.
 */
const meta = {
  title: 'Commons/Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 스타일과 크기, 테마를 지원하는 페이지네이션 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: '페이지네이션의 시각적 스타일 변형',
      table: {
        type: { summary: 'primary | secondary | tertiary' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '페이지네이션의 크기',
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
    currentPage: {
      control: 'number',
      description: '현재 페이지 번호 (1부터 시작)',
      table: {
        type: { summary: 'number' },
      },
    },
    totalPages: {
      control: 'number',
      description: '전체 페이지 수',
      table: {
        type: { summary: 'number' },
      },
    },
    visiblePages: {
      control: 'number',
      description: '표시할 페이지 번호 개수',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5' },
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
    hidePageNumbers: {
      control: 'boolean',
      description: '페이지 번호 숨김 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showBoundaries: {
      control: 'boolean',
      description: '경계 페이지 표시 여부 (첫 페이지, 마지막 페이지)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    prevLabel: {
      control: 'text',
      description: '이전 버튼 라벨',
      table: {
        type: { summary: 'string' },
      },
    },
    nextLabel: {
      control: 'text',
      description: '다음 버튼 라벨',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Primary 페이지네이션의 기본 상태입니다.
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 1,
    totalPages: 10,
    onPageChange: (page) => console.log('페이지 변경:', page),
  },
};

/**
 * Secondary 페이지네이션의 기본 상태입니다.
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'light',
    currentPage: 1,
    totalPages: 10,
    onPageChange: (page) => console.log('페이지 변경:', page),
  },
};

/**
 * Tertiary 페이지네이션의 기본 상태입니다.
 */
export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'light',
    currentPage: 1,
    totalPages: 10,
    onPageChange: (page) => console.log('페이지 변경:', page),
  },
};

/**
 * Small 크기의 페이지네이션입니다.
 */
export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    theme: 'light',
    currentPage: 1,
    totalPages: 10,
    onPageChange: (page) => console.log('페이지 변경:', page),
  },
};

/**
 * Medium 크기의 페이지네이션입니다.
 */
export const Medium: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 1,
    totalPages: 10,
    onPageChange: (page) => console.log('페이지 변경:', page),
  },
};

/**
 * Large 크기의 페이지네이션입니다.
 */
export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    theme: 'light',
    currentPage: 1,
    totalPages: 10,
    onPageChange: (page) => console.log('페이지 변경:', page),
  },
};

/**
 * Light 테마의 페이지네이션입니다.
 */
export const LightTheme: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 5,
    totalPages: 10,
    onPageChange: (page) => console.log('페이지 변경:', page),
  },
};

/**
 * Dark 테마의 페이지네이션입니다.
 */
export const DarkTheme: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
    currentPage: 5,
    totalPages: 10,
    onPageChange: (page) => console.log('페이지 변경:', page),
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

/**
 * 비활성화된 페이지네이션입니다.
 */
export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 5,
    totalPages: 10,
    disabled: true,
    onPageChange: (page) => console.log('페이지 변경:', page),
  },
};

/**
 * 페이지 번호가 숨겨진 페이지네이션입니다.
 */
export const HidePageNumbers: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 5,
    totalPages: 10,
    hidePageNumbers: true,
    onPageChange: (page) => console.log('페이지 변경:', page),
  },
};

/**
 * 경계 페이지를 표시하는 페이지네이션입니다.
 */
export const WithBoundaries: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 15,
    totalPages: 30,
    visiblePages: 5,
    showBoundaries: true,
    onPageChange: (page) => console.log('페이지 변경:', page),
  },
};

/**
 * 적은 페이지 수 (3페이지)의 페이지네이션입니다.
 */
export const FewPages: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 1,
    totalPages: 3,
    onPageChange: (page) => console.log('페이지 변경:', page),
  },
};

/**
 * 많은 페이지 수 (100페이지)의 페이지네이션입니다.
 */
export const ManyPages: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 50,
    totalPages: 100,
    visiblePages: 7,
    showBoundaries: true,
    onPageChange: (page) => console.log('페이지 변경:', page),
  },
};

/**
 * 첫 페이지 상태의 페이지네이션입니다.
 */
export const FirstPage: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 1,
    totalPages: 10,
    onPageChange: (page) => console.log('페이지 변경:', page),
  },
};

/**
 * 마지막 페이지 상태의 페이지네이션입니다.
 */
export const LastPage: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 10,
    totalPages: 10,
    onPageChange: (page) => console.log('페이지 변경:', page),
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
    currentPage: 5,
    totalPages: 10,
    onPageChange: (page) => console.log('페이지 변경:', page),
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px' }}>
      <Pagination variant="primary" size="medium" theme="light" currentPage={5} totalPages={10} onPageChange={(page) => console.log(page)} />
      <Pagination variant="secondary" size="medium" theme="light" currentPage={5} totalPages={10} onPageChange={(page) => console.log(page)} />
      <Pagination variant="tertiary" size="medium" theme="light" currentPage={5} totalPages={10} onPageChange={(page) => console.log(page)} />
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
    currentPage: 5,
    totalPages: 10,
    onPageChange: (page) => console.log('페이지 변경:', page),
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px', alignItems: 'center' }}>
      <Pagination variant="primary" size="small" theme="light" currentPage={5} totalPages={10} onPageChange={(page) => console.log(page)} />
      <Pagination variant="primary" size="medium" theme="light" currentPage={5} totalPages={10} onPageChange={(page) => console.log(page)} />
      <Pagination variant="primary" size="large" theme="light" currentPage={5} totalPages={10} onPageChange={(page) => console.log(page)} />
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
    currentPage: 5,
    totalPages: 10,
    onPageChange: (page) => console.log('페이지 변경:', page),
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '12px' }}>Primary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Pagination variant="primary" size="small" theme="light" currentPage={3} totalPages={10} onPageChange={(page) => console.log(page)} />
          <Pagination variant="primary" size="medium" theme="light" currentPage={5} totalPages={10} onPageChange={(page) => console.log(page)} />
          <Pagination variant="primary" size="large" theme="light" currentPage={7} totalPages={10} onPageChange={(page) => console.log(page)} />
          <Pagination variant="primary" size="medium" theme="light" currentPage={5} totalPages={10} disabled onPageChange={(page) => console.log(page)} />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px' }}>Secondary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Pagination variant="secondary" size="small" theme="light" currentPage={3} totalPages={10} onPageChange={(page) => console.log(page)} />
          <Pagination variant="secondary" size="medium" theme="light" currentPage={5} totalPages={10} onPageChange={(page) => console.log(page)} />
          <Pagination variant="secondary" size="large" theme="light" currentPage={7} totalPages={10} onPageChange={(page) => console.log(page)} />
          <Pagination variant="secondary" size="medium" theme="light" currentPage={5} totalPages={10} disabled onPageChange={(page) => console.log(page)} />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px' }}>Tertiary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Pagination variant="tertiary" size="small" theme="light" currentPage={3} totalPages={10} onPageChange={(page) => console.log(page)} />
          <Pagination variant="tertiary" size="medium" theme="light" currentPage={5} totalPages={10} onPageChange={(page) => console.log(page)} />
          <Pagination variant="tertiary" size="large" theme="light" currentPage={7} totalPages={10} onPageChange={(page) => console.log(page)} />
          <Pagination variant="tertiary" size="medium" theme="light" currentPage={5} totalPages={10} disabled onPageChange={(page) => console.log(page)} />
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
    currentPage: 5,
    totalPages: 10,
    onPageChange: (page) => console.log('페이지 변경:', page),
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px', backgroundColor: '#000', minHeight: '400px' }}>
      <div>
        <h3 style={{ marginBottom: '12px', color: '#fff' }}>Primary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Pagination variant="primary" size="small" theme="dark" currentPage={3} totalPages={10} onPageChange={(page) => console.log(page)} />
          <Pagination variant="primary" size="medium" theme="dark" currentPage={5} totalPages={10} onPageChange={(page) => console.log(page)} />
          <Pagination variant="primary" size="large" theme="dark" currentPage={7} totalPages={10} onPageChange={(page) => console.log(page)} />
          <Pagination variant="primary" size="medium" theme="dark" currentPage={5} totalPages={10} disabled onPageChange={(page) => console.log(page)} />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', color: '#fff' }}>Secondary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Pagination variant="secondary" size="small" theme="dark" currentPage={3} totalPages={10} onPageChange={(page) => console.log(page)} />
          <Pagination variant="secondary" size="medium" theme="dark" currentPage={5} totalPages={10} onPageChange={(page) => console.log(page)} />
          <Pagination variant="secondary" size="large" theme="dark" currentPage={7} totalPages={10} onPageChange={(page) => console.log(page)} />
          <Pagination variant="secondary" size="medium" theme="dark" currentPage={5} totalPages={10} disabled onPageChange={(page) => console.log(page)} />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', color: '#fff' }}>Tertiary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Pagination variant="tertiary" size="small" theme="dark" currentPage={3} totalPages={10} onPageChange={(page) => console.log(page)} />
          <Pagination variant="tertiary" size="medium" theme="dark" currentPage={5} totalPages={10} onPageChange={(page) => console.log(page)} />
          <Pagination variant="tertiary" size="large" theme="dark" currentPage={7} totalPages={10} onPageChange={(page) => console.log(page)} />
          <Pagination variant="tertiary" size="medium" theme="dark" currentPage={5} totalPages={10} disabled onPageChange={(page) => console.log(page)} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

/**
 * 다양한 옵션 조합을 보여주는 스토리입니다.
 */
export const OptionsCombination: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 15,
    totalPages: 30,
    onPageChange: (page) => console.log('페이지 변경:', page),
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '12px' }}>기본 (visiblePages: 5)</h3>
        <Pagination variant="primary" size="medium" theme="light" currentPage={15} totalPages={30} onPageChange={(page) => console.log(page)} />
      </div>
      <div>
        <h3 style={{ marginBottom: '12px' }}>경계 표시 (showBoundaries: true)</h3>
        <Pagination variant="primary" size="medium" theme="light" currentPage={15} totalPages={30} showBoundaries onPageChange={(page) => console.log(page)} />
      </div>
      <div>
        <h3 style={{ marginBottom: '12px' }}>더 많은 페이지 번호 (visiblePages: 7)</h3>
        <Pagination variant="primary" size="medium" theme="light" currentPage={15} totalPages={30} visiblePages={7} onPageChange={(page) => console.log(page)} />
      </div>
      <div>
        <h3 style={{ marginBottom: '12px' }}>페이지 번호 숨김 (hidePageNumbers: true)</h3>
        <Pagination variant="primary" size="medium" theme="light" currentPage={15} totalPages={30} hidePageNumbers onPageChange={(page) => console.log(page)} />
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
    currentPage: 1,
    totalPages: 10,
    onPageChange: (page) => console.log('페이지 변경:', page),
  },
  render: function InteractiveRender() {
    const [currentPage, setCurrentPage] = useState(1);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <p style={{ fontSize: '14px', color: '#666' }}>현재 페이지: {currentPage}</p>
        </div>
        <Pagination
          variant="primary"
          size="medium"
          theme="light"
          currentPage={currentPage}
          totalPages={10}
          onPageChange={(page) => {
            setCurrentPage(page);
            console.log('페이지 변경:', page);
          }}
        />
      </div>
    );
  },
};

/**
 * 실제 사용 예시 - 데이터 목록과 함께 사용하는 페이지네이션입니다.
 */
export const RealWorldExample: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 1,
    totalPages: 5,
    onPageChange: (page) => console.log('페이지 변경:', page),
  },
  render: function RealWorldRender() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    
    // 가상의 데이터
    const allItems = Array.from({ length: 25 }, (_, i) => `항목 ${i + 1}`);
    
    // 현재 페이지의 아이템들
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = allItems.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(allItems.length / itemsPerPage);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', minWidth: '400px' }}>
        <div>
          <h3 style={{ marginBottom: '12px' }}>데이터 목록 (총 {allItems.length}개)</h3>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '8px',
            padding: '16px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            minHeight: '200px',
          }}>
            {currentItems.map((item, index) => (
              <div 
                key={startIndex + index}
                style={{ 
                  padding: '12px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            variant="primary"
            size="medium"
            theme="light"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              console.log('페이지 변경:', page);
            }}
          />
        </div>
      </div>
    );
  },
};

