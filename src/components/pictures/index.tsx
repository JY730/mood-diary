'use client';

import React, { useState } from 'react';
import styles from './styles.module.css';
import { Selectbox } from '@/commons/components/selectbox';
import { useInfiniteDogPictures } from './hooks/index.binding.hook';

/**
 * Pictures 컴포넌트
 * 
 * Dog CEO API를 통해 강아지 사진을 무한스크롤 방식으로 표시합니다.
 * 
 * 주요 기능:
 * - 초기 로딩 시 6개의 강아지 사진 표시
 * - 스크롤 시 자동으로 추가 사진 로드 (무한스크롤)
 * - 로딩 중 스플래시 스크린 애니메이션
 * - 필터 옵션 (기본, 최신순, 인기순)
 * 
 * @returns {JSX.Element} Pictures 페이지 컴포넌트
 */
export default function Pictures() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const { images, isLoading, isError, setLastImageRef } = useInfiniteDogPictures();

  // 필터 옵션
  const filterOptions = [
    { value: 'all', label: '기본' },
    { value: 'recent', label: '최신순' },
    { value: 'popular', label: '인기순' },
  ];

  /**
   * 컨텐츠 렌더링 함수
   * 로딩, 에러, 정상 상태에 따라 다른 UI를 반환합니다.
   */
  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: 6 }).map((_, index) => (
        <div 
          key={`splash-${index}`} 
          className={styles.splashScreen}
          data-testid="splash-screen"
        />
      ));
    }

    if (isError) {
      return null; // 에러 시 빈 상태
    }

    return images.map((imageUrl, index) => (
      <div 
        key={`${imageUrl}-${index}`} 
        className={styles.imageCard}
        ref={(el) => setLastImageRef(el, index)}
      >
        <img
          src={imageUrl}
          alt={`강아지 사진 ${index + 1}`}
          className={styles.image}
          data-testid="dog-image"
        />
      </div>
    ));
  };

  return (
    <div className={styles.container} data-testid="pictures-container">
      {/* Gap 1 - 32px */}
      <div className={styles.gap1}></div>
      
      {/* Filter Section - 48px */}
      <div className={styles.filter}>
        <Selectbox
          variant="primary"
          size="medium"
          theme="light"
          options={filterOptions}
          value={selectedFilter}
          onValueChange={setSelectedFilter}
          containerClassName={styles.filterSelect}
        />
      </div>
      
      {/* Gap 2 - 42px */}
      <div className={styles.gap2}></div>
      
      {/* Main Content - auto */}
      <div className={styles.main}>
        {renderContent()}
      </div>
    </div>
  );
}
