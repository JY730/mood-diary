'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';
import { Selectbox } from '@/commons/components/selectbox';
import { Searchbar } from '@/commons/components/searchbar';
import { Button } from '@/commons/components/button';
import { Pagination } from '@/commons/components/pagination';
import { getEmotionData } from '@/commons/constants/enum';
import { useLinkModal } from './hooks/index.link.modal.hook';
import { useDiariesBinding } from './hooks/index.binding.hook';

export default function Diaries() {
  const [filterValue, setFilterValue] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { openDiaryModal } = useLinkModal();
  const { diaries, isLoaded, formatDate } = useDiariesBinding();
  const router = useRouter();
  
  // 페이지네이션 설정
  const itemsPerPage = 12; // 한 페이지당 12개 아이템 (3행 x 4개)
  const totalPages = Math.ceil(diaries.length / itemsPerPage);

  // 현재 페이지에 표시할 데이터 계산
  const getCurrentPageData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return diaries.slice(startIndex, endIndex);
  }, [diaries, currentPage, itemsPerPage]);

  // 현재 페이지 데이터를 3행으로 나누기
  const getRowData = (rowIndex: number) => {
    const startIndex = rowIndex * 4;
    const endIndex = startIndex + 4;
    return getCurrentPageData.slice(startIndex, endIndex);
  };

  // 일기 카드 클릭 핸들러
  const handleCardClick = (diaryId: number) => {
    router.push(`/diaries/${diaryId}`);
  };

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
    openDiaryModal();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log('페이지 변경:', page);
  };

  return (
    <div className={styles.container} data-testid="diaries-container">
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
          data-testid="diaries-write-button"
        >
          일기쓰기
        </Button>
      </div>
      
      {/* Gap 2 - 42px */}
      <div className={styles.gap2}></div>
      
      {/* Main Content - 936px */}
      <div className={styles.main}>
        {isLoaded && diaries.length === 0 ? (
          <div 
            data-testid="diaries-empty"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              fontSize: '16px',
              color: 'var(--gray-50)'
            }}
          >
            작성된 일기가 없습니다.
          </div>
        ) : (
          <div className={styles.diaryGrid}>
            {/* 첫 번째 행 */}
            <div className={styles.diaryRow}>
              {getRowData(0).map((diary) => {
                const emotionData = getEmotionData(diary.emotion);
                return (
                  <div 
                    key={diary.id} 
                    className={styles.diaryCard}
                    data-testid="diary-card"
                    onClick={() => handleCardClick(diary.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className={styles.cardImageContainer}>
                      <div className={styles.cardImageTop}>
                        <button className={styles.closeButton}>
                          <img 
                            src="/icons/close_outline_light_m.svg" 
                            alt="닫기" 
                            width="24" 
                            height="24" 
                          />
                        </button>
                      </div>
                      <div className={styles.cardImageMain}>
                        <img 
                          src={emotionData.images.medium} 
                          alt={diary.title}
                          className={styles.cardImage}
                          data-testid="diary-card-image"
                        />
                      </div>
                    </div>
                    <div className={styles.cardContent}>
                      <div className={styles.cardHeader}>
                        <span 
                          className={styles.emotionText}
                          style={{ color: emotionData.color }}
                          data-testid="diary-card-emotion"
                        >
                          {emotionData.label}
                        </span>
                        <span 
                          className={styles.dateText}
                          data-testid="diary-card-date"
                        >
                          {formatDate(diary.createdAt)}
                        </span>
                      </div>
                      <div 
                        className={styles.cardTitle}
                        data-testid="diary-card-title"
                      >
                        {diary.title}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* 두 번째 행 */}
            <div className={styles.diaryRow}>
              {getRowData(1).map((diary) => {
                const emotionData = getEmotionData(diary.emotion);
                return (
                  <div 
                    key={diary.id} 
                    className={styles.diaryCard}
                    data-testid="diary-card"
                    onClick={() => handleCardClick(diary.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className={styles.cardImageContainer}>
                      <div className={styles.cardImageTop}>
                        <button className={styles.closeButton}>
                          <img 
                            src="/icons/close_outline_light_m.svg" 
                            alt="닫기" 
                            width="24" 
                            height="24" 
                          />
                        </button>
                      </div>
                      <div className={styles.cardImageMain}>
                        <img 
                          src={emotionData.images.medium} 
                          alt={diary.title}
                          className={styles.cardImage}
                          data-testid="diary-card-image"
                        />
                      </div>
                    </div>
                    <div className={styles.cardContent}>
                      <div className={styles.cardHeader}>
                        <span 
                          className={styles.emotionText}
                          style={{ color: emotionData.color }}
                          data-testid="diary-card-emotion"
                        >
                          {emotionData.label}
                        </span>
                        <span 
                          className={styles.dateText}
                          data-testid="diary-card-date"
                        >
                          {formatDate(diary.createdAt)}
                        </span>
                      </div>
                      <div 
                        className={styles.cardTitle}
                        data-testid="diary-card-title"
                      >
                        {diary.title}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* 세 번째 행 */}
            <div className={styles.diaryRow}>
              {getRowData(2).map((diary) => {
                const emotionData = getEmotionData(diary.emotion);
                return (
                  <div 
                    key={diary.id} 
                    className={styles.diaryCard}
                    data-testid="diary-card"
                    onClick={() => handleCardClick(diary.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className={styles.cardImageContainer}>
                      <div className={styles.cardImageTop}>
                        <button className={styles.closeButton}>
                          <img 
                            src="/icons/close_outline_light_m.svg" 
                            alt="닫기" 
                            width="24" 
                            height="24" 
                          />
                        </button>
                      </div>
                      <div className={styles.cardImageMain}>
                        <img 
                          src={emotionData.images.medium} 
                          alt={diary.title}
                          className={styles.cardImage}
                          data-testid="diary-card-image"
                        />
                      </div>
                    </div>
                    <div className={styles.cardContent}>
                      <div className={styles.cardHeader}>
                        <span 
                          className={styles.emotionText}
                          style={{ color: emotionData.color }}
                          data-testid="diary-card-emotion"
                        >
                          {emotionData.label}
                        </span>
                        <span 
                          className={styles.dateText}
                          data-testid="diary-card-date"
                        >
                          {formatDate(diary.createdAt)}
                        </span>
                      </div>
                      <div 
                        className={styles.cardTitle}
                        data-testid="diary-card-title"
                      >
                        {diary.title}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      
      {/* Gap 3 - 40px */}
      <div className={styles.gap3}></div>
      
      {/* Pagination - 32px */}
      <div className={styles.pagination}>
        <Pagination
          variant="primary"
          size="medium"
          theme="light"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          visiblePages={5}
          className={styles.paginationComponent}
        />
      </div>
      
      {/* Gap 4 - 40px */}
      <div className={styles.gap4}></div>
    </div>
  );
}
