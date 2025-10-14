import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Searchbar } from './index';

/**
 * Searchbar 컴포넌트는 다양한 variant, size, theme을 지원하는 범용 검색 컴포넌트입니다.
 * Figma 디자인 시스템을 기반으로 구현되었습니다.
 */
const meta = {
  title: 'Commons/Components/Searchbar',
  component: Searchbar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 스타일과 크기, 테마를 지원하는 검색 입력 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: '검색바의 시각적 스타일 변형',
      table: {
        type: { summary: 'primary | secondary | tertiary' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '검색바의 크기',
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
    showSearchIcon: {
      control: 'boolean',
      description: '검색 아이콘 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showClearButton: {
      control: 'boolean',
      description: '텍스트가 있을 때 지우기 버튼 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '검색어를 입력해 주세요.' },
      },
    },
  },
} satisfies Meta<typeof Searchbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Primary 검색바의 기본 상태입니다.
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    placeholder: '검색어를 입력해 주세요.',
  },
};

/**
 * Secondary 검색바의 기본 상태입니다.
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'light',
    placeholder: '검색어를 입력해 주세요.',
  },
};

/**
 * Tertiary 검색바의 기본 상태입니다.
 */
export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'light',
    placeholder: '검색어를 입력해 주세요.',
  },
};

/**
 * Small 크기의 검색바입니다.
 */
export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    theme: 'light',
    placeholder: 'Small Searchbar',
  },
};

/**
 * Medium 크기의 검색바입니다.
 */
export const Medium: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    placeholder: 'Medium Searchbar',
  },
};

/**
 * Large 크기의 검색바입니다.
 */
export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    theme: 'light',
    placeholder: 'Large Searchbar',
  },
};

/**
 * Light 테마의 검색바입니다.
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
 * Dark 테마의 검색바입니다.
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
 * 비활성화된 검색바입니다.
 */
export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    placeholder: 'Disabled Searchbar',
    disabled: true,
  },
};

/**
 * 검색 아이콘이 없는 검색바입니다.
 */
export const WithoutSearchIcon: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    placeholder: '검색어를 입력해 주세요.',
    showSearchIcon: false,
  },
};

/**
 * 지우기 버튼이 없는 검색바입니다.
 */
export const WithoutClearButton: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    placeholder: '검색어를 입력해 주세요.',
    showClearButton: false,
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
    placeholder: '검색어를 입력해 주세요.',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '600px' }}>
      <Searchbar variant="primary" size="medium" theme="light" placeholder="Primary" />
      <Searchbar variant="secondary" size="medium" theme="light" placeholder="Secondary" />
      <Searchbar variant="tertiary" size="medium" theme="light" placeholder="Tertiary" />
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
    placeholder: '검색어를 입력해 주세요.',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '600px' }}>
      <Searchbar variant="primary" size="small" theme="light" placeholder="Small" />
      <Searchbar variant="primary" size="medium" theme="light" placeholder="Medium" />
      <Searchbar variant="primary" size="large" theme="light" placeholder="Large" />
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
    placeholder: '검색어를 입력해 주세요.',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px', width: '600px' }}>
      <div>
        <h3 style={{ marginBottom: '12px' }}>Primary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Searchbar variant="primary" size="small" theme="light" placeholder="Small" />
          <Searchbar variant="primary" size="medium" theme="light" placeholder="Medium" />
          <Searchbar variant="primary" size="large" theme="light" placeholder="Large" />
          <Searchbar variant="primary" size="medium" theme="light" placeholder="Disabled" disabled />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px' }}>Secondary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Searchbar variant="secondary" size="small" theme="light" placeholder="Small" />
          <Searchbar variant="secondary" size="medium" theme="light" placeholder="Medium" />
          <Searchbar variant="secondary" size="large" theme="light" placeholder="Large" />
          <Searchbar variant="secondary" size="medium" theme="light" placeholder="Disabled" disabled />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px' }}>Tertiary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Searchbar variant="tertiary" size="small" theme="light" placeholder="Small" />
          <Searchbar variant="tertiary" size="medium" theme="light" placeholder="Medium" />
          <Searchbar variant="tertiary" size="large" theme="light" placeholder="Large" />
          <Searchbar variant="tertiary" size="medium" theme="light" placeholder="Disabled" disabled />
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
    placeholder: '검색어를 입력해 주세요.',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px', backgroundColor: '#000', minHeight: '400px', width: '600px' }}>
      <div>
        <h3 style={{ marginBottom: '12px', color: '#fff' }}>Primary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Searchbar variant="primary" size="small" theme="dark" placeholder="Small" />
          <Searchbar variant="primary" size="medium" theme="dark" placeholder="Medium" />
          <Searchbar variant="primary" size="large" theme="dark" placeholder="Large" />
          <Searchbar variant="primary" size="medium" theme="dark" placeholder="Disabled" disabled />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', color: '#fff' }}>Secondary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Searchbar variant="secondary" size="small" theme="dark" placeholder="Small" />
          <Searchbar variant="secondary" size="medium" theme="dark" placeholder="Medium" />
          <Searchbar variant="secondary" size="large" theme="dark" placeholder="Large" />
          <Searchbar variant="secondary" size="medium" theme="dark" placeholder="Disabled" disabled />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', color: '#fff' }}>Tertiary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Searchbar variant="tertiary" size="small" theme="dark" placeholder="Small" />
          <Searchbar variant="tertiary" size="medium" theme="dark" placeholder="Medium" />
          <Searchbar variant="tertiary" size="large" theme="dark" placeholder="Large" />
          <Searchbar variant="tertiary" size="medium" theme="dark" placeholder="Disabled" disabled />
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
    placeholder: '검색어를 입력해 주세요.',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px', width: '600px' }}>
      <div>
        <h3 style={{ marginBottom: '12px' }}>기본 (아이콘 모두 표시)</h3>
        <Searchbar variant="primary" size="medium" theme="light" placeholder="검색어를 입력해 주세요." />
      </div>
      <div>
        <h3 style={{ marginBottom: '12px' }}>검색 아이콘 없음</h3>
        <Searchbar variant="primary" size="medium" theme="light" placeholder="검색어를 입력해 주세요." showSearchIcon={false} />
      </div>
      <div>
        <h3 style={{ marginBottom: '12px' }}>지우기 버튼 없음</h3>
        <Searchbar variant="primary" size="medium" theme="light" placeholder="검색어를 입력해 주세요." showClearButton={false} />
      </div>
      <div>
        <h3 style={{ marginBottom: '12px' }}>아이콘 모두 없음</h3>
        <Searchbar variant="primary" size="medium" theme="light" placeholder="검색어를 입력해 주세요." showSearchIcon={false} showClearButton={false} />
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
    placeholder: '검색어를 입력해 주세요.',
    onSearch: (value) => console.log('검색:', value),
    onClear: () => console.log('지우기 클릭'),
  },
  render: function InteractiveRender() {
    const [value, setValue] = useState('');
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px', width: '600px' }}>
        <div style={{ marginBottom: '8px' }}>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
            입력값: {value || '(없음)'}
          </p>
          <p style={{ fontSize: '12px', color: '#999' }}>
            * Enter 키를 누르거나 검색 아이콘을 클릭하면 검색됩니다.
          </p>
        </div>
        <Searchbar
          variant="primary"
          size="medium"
          theme="light"
          placeholder="검색어를 입력해 주세요."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onSearch={(searchValue) => {
            console.log('검색:', searchValue);
            alert(`검색어: ${searchValue}`);
          }}
          onClear={() => {
            setValue('');
            console.log('지우기 클릭');
          }}
        />
      </div>
    );
  },
};

/**
 * 실제 사용 예시 - 검색 결과와 함께 사용하는 검색바입니다.
 */
export const RealWorldExample: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    placeholder: '검색어를 입력해 주세요.',
  },
  render: function RealWorldRender() {
    const [searchValue, setSearchValue] = useState('');
    const [searchedValue, setSearchedValue] = useState('');
    
    // 가상의 데이터
    const allItems = [
      '강아지', '고양이', '토끼', '햄스터', '앵무새',
      '금붕어', '거북이', '이구아나', '도마뱀', '뱀',
      '친칠라', '페럿', '기니피그', '미어캣', '프레리도그',
    ];
    
    // 검색 결과 필터링
    const searchResults = searchedValue
      ? allItems.filter(item => item.includes(searchedValue))
      : [];
    
    const handleSearch = (value: string) => {
      setSearchedValue(value);
      console.log('검색:', value);
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', width: '600px' }}>
        <Searchbar
          variant="primary"
          size="medium"
          theme="light"
          placeholder="애완동물을 검색해보세요"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSearch={handleSearch}
          onClear={() => {
            setSearchValue('');
            setSearchedValue('');
          }}
        />
        
        {searchedValue && (
          <div>
            <h3 style={{ marginBottom: '12px', fontSize: '16px' }}>
              &quot;{searchedValue}&quot; 검색 결과 ({searchResults.length}개)
            </h3>
            {searchResults.length > 0 ? (
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '8px',
                padding: '16px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
              }}>
                {searchResults.map((item, index) => (
                  <div 
                    key={index}
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
            ) : (
              <div style={{ 
                padding: '40px 16px',
                textAlign: 'center',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                color: '#999',
              }}>
                검색 결과가 없습니다.
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
};

