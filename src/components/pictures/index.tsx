'use client';

import React, { useState } from 'react';
import styles from './styles.module.css';
import { Selectbox } from '@/commons/components/selectbox';

export default function Pictures() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  // Mock 데이터: 강아지 사진 10개
  const mockDogImages = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    src: '/images/dog-1.jpg',
    alt: `강아지 사진 ${index + 1}`,
  }));

  // 필터 옵션
  const filterOptions = [
    { value: 'all', label: '기본' },
    { value: 'recent', label: '최신순' },
    { value: 'popular', label: '인기순' },
  ];

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
        {mockDogImages.map((image) => (
          <div key={image.id} className={styles.imageCard}>
            <img
              src={image.src}
              alt={image.alt}
              className={styles.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
