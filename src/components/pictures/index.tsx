'use client';

import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { Selectbox } from '@/commons/components/selectbox';
import { useInfiniteDogPictures } from './hooks/index.binding.hook';
import { usePictureFilter } from './hooks/index.filter.hook';

/**
 * Pictures 컴포넌트
 * 
 * Dog CEO API를 통해 강아지 사진을 무한스크롤 방식으로 표시합니다.
 * 
 * 주요 기능:
 * - 초기 로딩 시 6개의 강아지 사진 표시
 * - 스크롤 시 자동으로 추가 사진 로드 (무한스크롤)
 * - 로딩 중 스플래시 스크린 애니메이션
 * - 필터 옵션 (기본: 640x640, 가로형: 640x480, 세로형: 480x640)
 * 
 * @returns {JSX.Element} Pictures 페이지 컴포넌트
 */
export default function Pictures() {
  const { images, isLoading, isError, setLastImageRef } = useInfiniteDogPictures();
  const { 
    selectedFilter, 
    filterOptions, 
    handleFilterChange, 
    getCurrentImageSize,
    getCurrentFilterClass
  } = usePictureFilter();

  // 브레이크포인트 감지 상태
  const [isMobile, setIsMobile] = useState(false);

  // 브레이크포인트 감지 효과
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    // 초기 체크
    checkMobile();

    // 리사이즈 이벤트 리스너
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 현재 필터와 브레이크포인트에 따른 이미지 크기
  const currentImageSize = getCurrentImageSize(isMobile);
  
  // 현재 필터에 따른 CSS 클래스명
  const filterClass = getCurrentFilterClass();

  /**
   * 컨텐츠 렌더링 함수
   * 로딩, 에러, 정상 상태에 따라 다른 UI를 반환합니다.
   */
  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: 6 }).map((_, index) => (
        <div 
          key={`splash-${index}`} 
          className={`${styles.splashScreen} ${styles[filterClass]}`}
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
        className={`${styles.imageCard} ${styles[filterClass]}`}
        ref={(el) => setLastImageRef(el, index)}
        style={{
          width: `${currentImageSize.width}px`,
          height: `${currentImageSize.height}px`,
        }}
      >
        <img
          src={imageUrl}
          alt={`강아지 사진 ${index + 1}`}
          className={styles.image}
          data-testid="dog-image"
          style={{
            width: `${currentImageSize.width}px`,
            height: `${currentImageSize.height}px`,
          }}
        />
      </div>
    ));
  };

  return (
    <div className={styles.container} data-testid="pictures-container">
      <div className={styles.gap1}></div>
      {/* Filter Section - navigation과 같은 레벨 */}
      <div className={styles.filter}>
        <Selectbox
          variant="primary"
          size="medium"
          theme="light"
          options={filterOptions}
          value={selectedFilter}
          onValueChange={handleFilterChange}
          containerClassName={styles.filterSelect}
          data-testid="filter-select"
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
