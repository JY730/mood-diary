'use client';

import { useState } from 'react';
import Button from '@/commons/components/button';
import Pagination from '@/commons/components/pagination';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [currentPage, setCurrentPage] = useState(1);

  const handleLoadingTest = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen p-8 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">UI 컴포넌트 테스트</h1>
        
        <div className="mb-8 text-center">
          <Button 
            variant="tertiary" 
            size="medium" 
            theme={theme}
            onClick={toggleTheme}
          >
            테마 전환: {theme === 'light' ? '라이트' : '다크'}
          </Button>
        </div>

        {/* Size Variants */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">크기 변형 (Size Variants)</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary" size="small" theme={theme}>
              Small
            </Button>
            <Button variant="primary" size="medium" theme={theme}>
              Medium
            </Button>
            <Button variant="primary" size="large" theme={theme}>
              Large
            </Button>
          </div>
        </section>

        {/* Variant Types */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">스타일 변형 (Style Variants)</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary" size="medium" theme={theme}>
              Primary
            </Button>
            <Button variant="secondary" size="medium" theme={theme}>
              Secondary
            </Button>
            <Button variant="tertiary" size="medium" theme={theme}>
              Tertiary
            </Button>
          </div>
        </section>

        {/* States */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">상태 (States)</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary" size="medium" theme={theme}>
              Normal
            </Button>
            <Button variant="primary" size="medium" theme={theme} disabled>
              Disabled
            </Button>
            <Button 
              variant="primary" 
              size="medium" 
              theme={theme} 
              loading={loading}
              onClick={handleLoadingTest}
            >
              {loading ? 'Loading...' : 'Click for Loading'}
            </Button>
          </div>
        </section>

        {/* With Icons */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">아이콘 포함 (With Icons)</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Button 
              variant="primary" 
              size="medium" 
              theme={theme}
              icon={<span>➕</span>}
              iconPosition="left"
            >
              Add Item
            </Button>
            <Button 
              variant="secondary" 
              size="medium" 
              theme={theme}
              icon={<span>📄</span>}
              iconPosition="right"
            >
              Copy
            </Button>
            <Button 
              variant="tertiary" 
              size="medium" 
              theme={theme}
              icon={<span>🔍</span>}
              iconPosition="left"
            >
              Search
            </Button>
          </div>
        </section>

        {/* All Combinations */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">모든 조합 (All Combinations)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(['primary', 'secondary', 'tertiary'] as const).map(variant => (
              <div key={variant} className="space-y-4">
                <h3 className="text-lg font-medium capitalize">{variant}</h3>
                <div className="space-y-2">
                  {(['small', 'medium', 'large'] as const).map(size => (
                    <div key={size} className="flex justify-center">
                      <Button variant={variant} size={size} theme={theme}>
                        {variant} {size}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">인터랙티브 예제 (Interactive Examples)</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="primary" 
                size="medium" 
                theme={theme}
                onClick={() => alert('Primary 버튼이 클릭되었습니다!')}
              >
                Alert 버튼
              </Button>
              <Button 
                variant="secondary" 
                size="medium" 
                theme={theme}
                onClick={() => console.log('Console log 버튼 클릭')}
              >
                Console Log
              </Button>
            </div>
          </div>
        </section>

        {/* Pagination Component Tests */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">페이지네이션 컴포넌트 (Pagination Component)</h2>
          
          {/* Size Variants */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">크기 변형 (Size Variants)</h3>
            <div className="space-y-4">
              <div className="flex justify-center">
                <Pagination
                  variant="primary"
                  size="small"
                  theme={theme}
                  currentPage={currentPage}
                  totalPages={10}
                  onPageChange={setCurrentPage}
                />
              </div>
              <div className="flex justify-center">
                <Pagination
                  variant="primary"
                  size="medium"
                  theme={theme}
                  currentPage={currentPage}
                  totalPages={10}
                  onPageChange={setCurrentPage}
                />
              </div>
              <div className="flex justify-center">
                <Pagination
                  variant="primary"
                  size="large"
                  theme={theme}
                  currentPage={currentPage}
                  totalPages={10}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          </div>

          {/* Variant Types */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">스타일 변형 (Style Variants)</h3>
            <div className="space-y-4">
              <div className="flex justify-center">
                <Pagination
                  variant="primary"
                  size="medium"
                  theme={theme}
                  currentPage={currentPage}
                  totalPages={10}
                  onPageChange={setCurrentPage}
                />
              </div>
              <div className="flex justify-center">
                <Pagination
                  variant="secondary"
                  size="medium"
                  theme={theme}
                  currentPage={currentPage}
                  totalPages={10}
                  onPageChange={setCurrentPage}
                />
              </div>
              <div className="flex justify-center">
                <Pagination
                  variant="tertiary"
                  size="medium"
                  theme={theme}
                  currentPage={currentPage}
                  totalPages={10}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          </div>

          {/* Different Page Counts */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">다양한 페이지 수 (Different Page Counts)</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm mb-2">3페이지</p>
                <div className="flex justify-center">
                  <Pagination
                    variant="primary"
                    size="medium"
                    theme={theme}
                    currentPage={1}
                    totalPages={3}
                    onPageChange={() => {}}
                  />
                </div>
              </div>
              <div>
                <p className="text-sm mb-2">20페이지 (경계 표시 포함)</p>
                <div className="flex justify-center">
                  <Pagination
                    variant="primary"
                    size="medium"
                    theme={theme}
                    currentPage={10}
                    totalPages={20}
                    showBoundaries={true}
                    onPageChange={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* States */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">상태 (States)</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm mb-2">일반 상태</p>
                <div className="flex justify-center">
                  <Pagination
                    variant="primary"
                    size="medium"
                    theme={theme}
                    currentPage={5}
                    totalPages={10}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </div>
              <div>
                <p className="text-sm mb-2">비활성화 상태</p>
                <div className="flex justify-center">
                  <Pagination
                    variant="primary"
                    size="medium"
                    theme={theme}
                    currentPage={5}
                    totalPages={10}
                    disabled={true}
                    onPageChange={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-sm opacity-70">
            현재 페이지: {currentPage}
          </div>
        </section>

        <footer className="text-center text-sm opacity-70 mt-16">
          Button & Pagination 컴포넌트 구현 완료 ✅
        </footer>
      </div>
    </div>
  );
}
