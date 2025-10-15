"use client";

import React, { useState } from 'react';
import styles from './styles.module.css';
import { Selectbox } from '@/commons/components/selectbox';
import { Searchbar } from '@/commons/components/searchbar';
import { Button } from '@/commons/components/button';

export default function Diaries() {
  const [filterValue, setFilterValue] = useState('all');
  const [searchValue, setSearchValue] = useState('');

  // 필터 옵션
  const filterOptions = [
    { value: 'all', label: '전체' },
    { value: 'happy', label: '기쁨' },
    { value: 'sad', label: '슬픔' },
    { value: 'angry', label: '화남' },
    { value: 'surprise', label: '놀람' },
    { value: 'etc', label: '기타' },
  ];

  const handleFilterChange = (value: string) => {
    setFilterValue(value);
  };

  const handleSearch = (value: string) => {
    console.log('검색:', value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleWriteDiary = () => {
    console.log('일기쓰기 클릭');
  };

  return (
    <div className={styles.container}>
      {/* Gap 1 - 32px */}
      <div className={styles.gap1}></div>
      
      {/* Search Section - 48px */}
      <div className={styles.search}>
        <div className={styles.searchLeft}>
          <Selectbox
            variant="primary"
            size="medium"
            theme="light"
            options={filterOptions}
            value={filterValue}
            onValueChange={handleFilterChange}
            placeholder="전체"
            className={styles.selectBox}
          />
          <Searchbar
            variant="primary"
            size="medium"
            theme="light"
            placeholder="검색어를 입력해 주세요."
            value={searchValue}
            onChange={handleSearchChange}
            onSearch={handleSearch}
            className={styles.searchbar}
          />
        </div>
        <Button
          variant="primary"
          size="medium"
          theme="light"
          onClick={handleWriteDiary}
          icon={<img src="/icons/plus_outline_light_m.svg" alt="" width="24" height="24" />}
          className={styles.writeButton}
        >
          일기쓰기
        </Button>
      </div>
      
      {/* Gap 2 - 42px */}
      <div className={styles.gap2}></div>
      
      {/* Main Content - 936px */}
      <div className={styles.main}>
        <div className={styles.mainPlaceholder}>Main Content Area</div>
      </div>
      
      {/* Gap 3 - 40px */}
      <div className={styles.gap3}></div>
      
      {/* Pagination - 32px */}
      <div className={styles.pagination}>
        <div className={styles.paginationPlaceholder}>Pagination Area</div>
      </div>
      
      {/* Gap 4 - 40px */}
      <div className={styles.gap4}></div>
    </div>
  );
}
