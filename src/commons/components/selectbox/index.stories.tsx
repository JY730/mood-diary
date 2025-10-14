import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Selectbox } from './index';

/**
 * Selectbox 컴포넌트는 다양한 variant, size, theme을 지원하는 범용 선택 컴포넌트입니다.
 * Figma 디자인 시스템을 기반으로 구현되었습니다.
 */
const meta = {
  title: 'Commons/Components/Selectbox',
  component: Selectbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 스타일과 크기, 테마를 지원하는 선택 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: '선택박스의 시각적 스타일 변형',
      table: {
        type: { summary: 'primary | secondary | tertiary' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '선택박스의 크기',
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
        defaultValue: { summary: '선택하세요' },
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
} satisfies Meta<typeof Selectbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 옵션 데이터
const basicOptions = [
  { value: 'all', label: '전체' },
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
];

// 피그마 디자인 기반 감정 옵션 (노드 3:1469)
const emotionOptions = [
  { value: 'all', label: '전체' },
  { value: 'happy', label: '행복해요' },
  { value: 'sad', label: '슬퍼요' },
  { value: 'surprised', label: '놀랐어요' },
  { value: 'angry', label: '화나요' },
  { value: 'etc', label: '기타' },
];

const categoryOptions = [
  { value: '', label: '카테고리 선택' },
  { value: 'electronics', label: '전자제품' },
  { value: 'clothing', label: '의류' },
  { value: 'books', label: '도서' },
  { value: 'sports', label: '스포츠' },
  { value: 'home', label: '홈&리빙' },
];

const countryOptions = [
  { value: '', label: '국가 선택' },
  { value: 'kr', label: '대한민국' },
  { value: 'us', label: '미국' },
  { value: 'jp', label: '일본' },
  { value: 'cn', label: '중국' },
  { value: 'uk', label: '영국' },
  { value: 'de', label: '독일' },
  { value: 'fr', label: '프랑스' },
];

/**
 * Primary 선택박스의 기본 상태입니다.
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    options: basicOptions,
    placeholder: '선택하세요',
  },
};

/**
 * Secondary 선택박스의 기본 상태입니다.
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'light',
    options: basicOptions,
    placeholder: '선택하세요',
  },
};

/**
 * Tertiary 선택박스의 기본 상태입니다.
 */
export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'light',
    options: basicOptions,
    placeholder: '선택하세요',
  },
};

/**
 * Small 크기의 선택박스입니다.
 */
export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    theme: 'light',
    options: basicOptions,
    placeholder: 'Small Select',
  },
};

/**
 * Medium 크기의 선택박스입니다.
 */
export const Medium: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    options: basicOptions,
    placeholder: 'Medium Select',
  },
};

/**
 * Large 크기의 선택박스입니다.
 */
export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    theme: 'light',
    options: basicOptions,
    placeholder: 'Large Select',
  },
};

/**
 * Light 테마의 선택박스입니다.
 */
export const LightTheme: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    options: basicOptions,
    placeholder: 'Light Theme',
  },
};

/**
 * Dark 테마의 선택박스입니다.
 */
export const DarkTheme: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
    options: basicOptions,
    placeholder: 'Dark Theme',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

/**
 * 비활성화된 선택박스입니다.
 */
export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    options: basicOptions,
    placeholder: 'Disabled Select',
    disabled: true,
  },
};

/**
 * 라벨이 있는 선택박스입니다.
 */
export const WithLabel: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    options: categoryOptions,
    label: '카테고리',
    placeholder: '카테고리를 선택하세요',
  },
};

/**
 * 필수 입력 표시가 있는 선택박스입니다.
 */
export const Required: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    options: countryOptions,
    label: '국가',
    placeholder: '국가를 선택하세요',
    required: true,
  },
};

/**
 * 도움말 텍스트가 있는 선택박스입니다.
 */
export const WithHelperText: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    options: categoryOptions,
    label: '상품 카테고리',
    placeholder: '카테고리를 선택하세요',
    helperText: '상품에 맞는 카테고리를 선택해주세요',
  },
};

/**
 * 에러 상태의 선택박스입니다.
 */
export const Error: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    options: categoryOptions,
    label: '카테고리',
    placeholder: '카테고리를 선택하세요',
    error: true,
    errorMessage: '카테고리를 선택해주세요.',
  },
};

/**
 * 에러 상태 (필수 입력)의 선택박스입니다.
 */
export const ErrorRequired: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    options: countryOptions,
    label: '국가',
    placeholder: '국가를 선택하세요',
    required: true,
    error: true,
    errorMessage: '필수 선택 항목입니다.',
  },
};

/**
 * 비활성화된 옵션이 포함된 선택박스입니다.
 */
export const WithDisabledOptions: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    options: [
      { value: '', label: '옵션 선택' },
      { value: 'available1', label: '사용 가능한 옵션 1' },
      { value: 'disabled1', label: '비활성화된 옵션 1', disabled: true },
      { value: 'available2', label: '사용 가능한 옵션 2' },
      { value: 'disabled2', label: '비활성화된 옵션 2', disabled: true },
      { value: 'available3', label: '사용 가능한 옵션 3' },
    ],
    label: '옵션 선택',
    placeholder: '옵션을 선택하세요',
    helperText: '일부 옵션은 현재 사용할 수 없습니다',
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
    options: basicOptions,
    placeholder: '선택하세요',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', width: '600px' }}>
      <div style={{ flex: '1', minWidth: '180px' }}>
        <Selectbox variant="primary" size="medium" theme="light" options={basicOptions} placeholder="Primary" />
      </div>
      <div style={{ flex: '1', minWidth: '180px' }}>
        <Selectbox variant="secondary" size="medium" theme="light" options={basicOptions} placeholder="Secondary" />
      </div>
      <div style={{ flex: '1', minWidth: '180px' }}>
        <Selectbox variant="tertiary" size="medium" theme="light" options={basicOptions} placeholder="Tertiary" />
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
    options: basicOptions,
    placeholder: '선택하세요',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <Selectbox variant="primary" size="small" theme="light" options={basicOptions} placeholder="Small" />
      <Selectbox variant="primary" size="medium" theme="light" options={basicOptions} placeholder="Medium" />
      <Selectbox variant="primary" size="large" theme="light" options={basicOptions} placeholder="Large" />
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
    options: basicOptions,
    placeholder: '선택하세요',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px', width: '600px' }}>
      <div>
        <h3 style={{ marginBottom: '12px' }}>Primary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Selectbox variant="primary" size="small" theme="light" options={basicOptions} placeholder="Small" />
          <Selectbox variant="primary" size="medium" theme="light" options={basicOptions} placeholder="Medium" />
          <Selectbox variant="primary" size="large" theme="light" options={basicOptions} placeholder="Large" />
          <Selectbox variant="primary" size="medium" theme="light" options={basicOptions} placeholder="Disabled" disabled />
          <Selectbox variant="primary" size="medium" theme="light" options={basicOptions} label="에러" placeholder="Error" error errorMessage="에러 메시지" />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px' }}>Secondary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Selectbox variant="secondary" size="small" theme="light" options={basicOptions} placeholder="Small" />
          <Selectbox variant="secondary" size="medium" theme="light" options={basicOptions} placeholder="Medium" />
          <Selectbox variant="secondary" size="large" theme="light" options={basicOptions} placeholder="Large" />
          <Selectbox variant="secondary" size="medium" theme="light" options={basicOptions} placeholder="Disabled" disabled />
          <Selectbox variant="secondary" size="medium" theme="light" options={basicOptions} label="에러" placeholder="Error" error errorMessage="에러 메시지" />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px' }}>Tertiary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Selectbox variant="tertiary" size="small" theme="light" options={basicOptions} placeholder="Small" />
          <Selectbox variant="tertiary" size="medium" theme="light" options={basicOptions} placeholder="Medium" />
          <Selectbox variant="tertiary" size="large" theme="light" options={basicOptions} placeholder="Large" />
          <Selectbox variant="tertiary" size="medium" theme="light" options={basicOptions} placeholder="Disabled" disabled />
          <Selectbox variant="tertiary" size="medium" theme="light" options={basicOptions} label="에러" placeholder="Error" error errorMessage="에러 메시지" />
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
    options: basicOptions,
    placeholder: '선택하세요',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px', backgroundColor: '#000', minHeight: '400px', width: '600px' }}>
      <div>
        <h3 style={{ marginBottom: '12px', color: '#fff' }}>Primary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Selectbox variant="primary" size="small" theme="dark" options={basicOptions} placeholder="Small" />
          <Selectbox variant="primary" size="medium" theme="dark" options={basicOptions} placeholder="Medium" />
          <Selectbox variant="primary" size="large" theme="dark" options={basicOptions} placeholder="Large" />
          <Selectbox variant="primary" size="medium" theme="dark" options={basicOptions} placeholder="Disabled" disabled />
          <Selectbox variant="primary" size="medium" theme="dark" options={basicOptions} label="에러" placeholder="Error" error errorMessage="에러 메시지" />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', color: '#fff' }}>Secondary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Selectbox variant="secondary" size="small" theme="dark" options={basicOptions} placeholder="Small" />
          <Selectbox variant="secondary" size="medium" theme="dark" options={basicOptions} placeholder="Medium" />
          <Selectbox variant="secondary" size="large" theme="dark" options={basicOptions} placeholder="Large" />
          <Selectbox variant="secondary" size="medium" theme="dark" options={basicOptions} placeholder="Disabled" disabled />
          <Selectbox variant="secondary" size="medium" theme="dark" options={basicOptions} label="에러" placeholder="Error" error errorMessage="에러 메시지" />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', color: '#fff' }}>Tertiary</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Selectbox variant="tertiary" size="small" theme="dark" options={basicOptions} placeholder="Small" />
          <Selectbox variant="tertiary" size="medium" theme="dark" options={basicOptions} placeholder="Medium" />
          <Selectbox variant="tertiary" size="large" theme="dark" options={basicOptions} placeholder="Large" />
          <Selectbox variant="tertiary" size="medium" theme="dark" options={basicOptions} placeholder="Disabled" disabled />
          <Selectbox variant="tertiary" size="medium" theme="dark" options={basicOptions} label="에러" placeholder="Error" error errorMessage="에러 메시지" />
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
    options: basicOptions,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px', width: '400px' }}>
      <Selectbox 
        variant="primary" 
        size="medium" 
        theme="light"
        options={categoryOptions}
        label="상품 카테고리"
        placeholder="카테고리를 선택하세요"
        required
      />
      <Selectbox 
        variant="primary" 
        size="medium" 
        theme="light"
        options={countryOptions}
        label="배송 국가"
        placeholder="국가를 선택하세요"
        required
        helperText="배송 가능한 국가를 선택해주세요"
      />
      <Selectbox 
        variant="primary" 
        size="medium" 
        theme="light"
        options={[
          { value: '', label: '우선순위 선택' },
          { value: 'high', label: '높음' },
          { value: 'medium', label: '보통' },
          { value: 'low', label: '낮음' },
        ]}
        label="우선순위"
        placeholder="우선순위를 선택하세요"
        helperText="작업의 우선순위를 설정해주세요"
      />
      <Selectbox 
        variant="primary" 
        size="medium" 
        theme="light"
        options={[
          { value: '', label: '상태 선택' },
          { value: 'active', label: '활성' },
          { value: 'inactive', label: '비활성' },
          { value: 'pending', label: '대기중' },
          { value: 'archived', label: '보관됨' },
        ]}
        label="상태"
        placeholder="상태를 선택하세요"
      />
    </div>
  ),
};

/**
 * 다양한 옵션 수를 보여주는 스토리입니다.
 */
export const VariousOptionCounts: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    options: basicOptions,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px', width: '400px' }}>
      <Selectbox 
        variant="primary" 
        size="medium" 
        theme="light"
        options={[
          { value: '', label: '옵션 선택' },
          { value: 'yes', label: '예' },
          { value: 'no', label: '아니오' },
        ]}
        label="2개 옵션"
        placeholder="예/아니오 선택"
      />
      <Selectbox 
        variant="primary" 
        size="medium" 
        theme="light"
        options={basicOptions}
        label="4개 옵션"
        placeholder="옵션을 선택하세요"
      />
      <Selectbox 
        variant="primary" 
        size="medium" 
        theme="light"
        options={categoryOptions}
        label="6개 옵션"
        placeholder="카테고리를 선택하세요"
      />
      <Selectbox 
        variant="primary" 
        size="medium" 
        theme="light"
        options={countryOptions}
        label="8개 옵션"
        placeholder="국가를 선택하세요"
      />
      <Selectbox 
        variant="primary" 
        size="medium" 
        theme="light"
        options={[
          { value: '', label: '월 선택' },
          { value: '1', label: '1월' },
          { value: '2', label: '2월' },
          { value: '3', label: '3월' },
          { value: '4', label: '4월' },
          { value: '5', label: '5월' },
          { value: '6', label: '6월' },
          { value: '7', label: '7월' },
          { value: '8', label: '8월' },
          { value: '9', label: '9월' },
          { value: '10', label: '10월' },
          { value: '11', label: '11월' },
          { value: '12', label: '12월' },
        ]}
        label="12개 옵션"
        placeholder="월을 선택하세요"
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
    options: categoryOptions,
    label: '카테고리 선택',
    placeholder: '카테고리를 선택하세요',
    helperText: '선택하면 콘솔에 출력됩니다',
    onValueChange: (value) => console.log('선택된 값:', value),
  },
};

/**
 * 피그마 디자인 기반 감정 선택 예시입니다.
 * 노드 3:1469의 디자인을 정확히 구현한 스토리입니다.
 */
export const FigmaEmotionExample: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    options: emotionOptions,
    placeholder: '전체',
    value: 'all', // 기본 선택값
  },
  render: function FigmaEmotionRender() {
    const [selectedEmotion, setSelectedEmotion] = useState('all');
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', width: '300px' }}>
        <div>
          <h3 style={{ marginBottom: '16px' }}>감정 필터 (피그마 디자인)</h3>
          <Selectbox
            variant="primary"
            size="medium"
            theme="light"
            options={emotionOptions}
            placeholder="전체"
            value={selectedEmotion}
            onValueChange={setSelectedEmotion}
          />
        </div>
        
        <div style={{ 
          padding: '16px',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
        }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
            선택된 감정: <strong>{emotionOptions.find(opt => opt.value === selectedEmotion)?.label}</strong>
          </p>
          <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#999' }}>
            이 스토리는 피그마 노드 3:1469의 디자인을 정확히 구현합니다.
          </p>
        </div>
      </div>
    );
  },
};

/**
 * 실제 사용 예시 - 필터링과 함께 사용하는 선택박스입니다.
 */
export const RealWorldExample: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    options: basicOptions,
  },
  render: function RealWorldRender() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    
    // 가상의 상품 데이터
    const allProducts = [
      { id: 1, name: '스마트폰', category: 'electronics', country: 'kr' },
      { id: 2, name: '노트북', category: 'electronics', country: 'us' },
      { id: 3, name: '티셔츠', category: 'clothing', country: 'kr' },
      { id: 4, name: '소설책', category: 'books', country: 'jp' },
      { id: 5, name: '운동화', category: 'sports', country: 'us' },
      { id: 6, name: '쿠션', category: 'home', country: 'kr' },
      { id: 7, name: '태블릿', category: 'electronics', country: 'cn' },
      { id: 8, name: '청바지', category: 'clothing', country: 'us' },
    ];
    
    // 필터링된 상품들
    const filteredProducts = allProducts.filter(product => {
      const categoryMatch = !selectedCategory || product.category === selectedCategory;
      const countryMatch = !selectedCountry || product.country === selectedCountry;
      return categoryMatch && countryMatch;
    });
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', minWidth: '500px' }}>
        <div>
          <h3 style={{ marginBottom: '16px' }}>상품 필터</h3>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
            <div style={{ flex: 1 }}>
              <Selectbox
                variant="primary"
                size="medium"
                theme="light"
                options={categoryOptions}
                label="카테고리"
                placeholder="카테고리 선택"
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Selectbox
                variant="primary"
                size="medium"
                theme="light"
                options={countryOptions}
                label="제조국"
                placeholder="국가 선택"
                value={selectedCountry}
                onValueChange={setSelectedCountry}
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 style={{ marginBottom: '12px' }}>
            상품 목록 ({filteredProducts.length}개)
          </h3>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '8px',
            padding: '16px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            minHeight: '200px',
          }}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div 
                  key={product.id}
                  style={{ 
                    padding: '12px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>{product.name}</span>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '12px', color: '#666' }}>
                    <span>{categoryOptions.find(c => c.value === product.category)?.label}</span>
                    <span>•</span>
                    <span>{countryOptions.find(c => c.value === product.country)?.label}</span>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100px',
                color: '#999',
              }}>
                조건에 맞는 상품이 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
};
