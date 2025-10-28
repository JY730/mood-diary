'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import { Selectbox } from '@/commons/components/selectbox';
import { Searchbar } from '@/commons/components/searchbar';
import { Button } from '@/commons/components/button';
import { Pagination } from '@/commons/components/pagination';
import { getEmotionData } from '@/commons/constants/enum';
import { useLinkModal } from './hooks/index.link.modal.hook';
import { useDiariesBinding } from './hooks/index.binding.hook';
import { useLinkRouting } from './hooks/index.link.routing.hook';
import { useSearch } from './hooks/index.search.hook';
import { useFilter } from './hooks/index.filter.hook';
import { usePagination } from './hooks/index.pagination.hook';
import { useDeleteDiary } from './hooks/index.delete.hook';
import { useAuthGuard } from '@/commons/providers/auth/auth.guard.hook';

export default function Diaries() {
  const [searchValue, setSearchValue] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { openDiaryModal } = useLinkModal();
  const { diaries, isLoaded, formatDate } = useDiariesBinding();
  const { handleCardClick } = useLinkRouting();
  const { searchResult, isSearching, handleSearch, handleRealTimeSearch } = useSearch(diaries);
  const { filterValue, setFilterValue, filteredDiaries, filterOptions } = useFilter(diaries);
  const { isAuthorized } = useAuthGuard();
  const {
    handleDeleteClick: handleDeleteClickWithAuth
  } = useDeleteDiary();
  
  // 검색 결과에 필터 적용
  const getFilteredSearchResult = useMemo(() => {
    if (!searchResult.searchQuery) {
      return [];
    }
    
    if (filterValue === 'all') {
      return searchResult.filteredDiaries;
    }
    
    return searchResult.filteredDiaries.filter(diary => diary.emotion === filterValue);
  }, [searchResult, filterValue]);

  // 검색 결과에 따른 표시할 데이터 결정
  const allDiaries = searchResult.searchQuery ? getFilteredSearchResult : filteredDiaries;
  
  // 페이지네이션 hook 사용
  const {
    currentPage,
    totalPages,
    setCurrentPage,
    getCurrentPageData
  } = usePagination(allDiaries, {
    itemsPerPage: 12, // 한 페이지당 12개 아이템
    initialPage: 1
  });

  // 현재 페이지의 데이터 가져오기 (12개 모두)
  const displayDiaries = getCurrentPageData(allDiaries);

  const handleFilterChange = (value: string) => {
    setFilterValue(value);
    setCurrentPage(1); // 필터 변경 시 첫 페이지로 이동
  };

  const handleSearchSubmit = (value: string) => {
    handleSearch(value);
    setSearchValue(value);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    // 실시간 검색 실행 (디바운싱 적용)
    handleRealTimeSearch(value);
    setCurrentPage(1); // 실시간 검색 시에도 첫 페이지로 이동
  };

  // 검색창 포커스 유지 - 검색 결과가 변경되어도 포커스 유지
  useEffect(() => {
    if (searchInputRef.current && document.activeElement === searchInputRef.current) {
      // 다음 렌더링 사이클에서 포커스 복원
      requestAnimationFrame(() => {
        if (searchInputRef.current && document.activeElement !== searchInputRef.current) {
          searchInputRef.current.focus();
        }
      });
    }
  }, [searchResult]);

  const handleWriteDiary = () => {
    openDiaryModal();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log('페이지 변경:', page);
  };

  // 일기 카드 렌더링 함수
  const renderDiaryCard = (diary: typeof diaries[0]) => {
    const emotionData = getEmotionData(diary.emotion);
    return (
      <div 
        key={diary.id} 
        className={styles.diaryCard}
        data-testid="diary-card"
        onClick={() => handleCardClick(diary.id)}
      >
        <div className={styles.cardImageContainer}>
          <div className={styles.cardImageTop}>
            {isAuthorized() && (
              <button 
                className={styles.closeButton} 
                onClick={(e) => handleDeleteClickWithAuth(e, diary)}
                data-testid="diary-delete-button"
              >
                <img 
                  src="/icons/close_outline_light_m.svg" 
                  alt="닫기" 
                  width="24" 
                  height="24" 
                />
              </button>
            )}
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
  };

  return (
    <div className={styles.container} data-testid="diaries-container">
      {/* Gap 1 - 32px */}
      <div className={styles.gap1}></div>
      
      {/* Search Section - 48px */}
      <div className={styles.search}>
        {/* --- 데스크톱 레이아웃: 기존 1줄 구조 유지 --- */}
        <div className={styles.desktopSearch}>
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
          <div className={styles.searchbarContainer}>
            <div className={styles.searchbarWrapper}>
              <Searchbar
                ref={searchInputRef}
                variant="primary"
                size="medium"
                theme="light"
                placeholder={isSearching ? "검색 중..." : "검색어를 입력해 주세요."}
                value={searchValue}
                onChange={handleSearchChange}
                onSearch={handleSearchSubmit}
                className={styles.searchbar}
              />
            </div>
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

        {/* --- 모바일 전용 레이아웃: 검색바(1줄) + (필터 + 버튼)(1줄) --- */}
        <div className={styles.mobileSearch}>
          <div className={styles.mobileTop}>
            <Searchbar
              ref={searchInputRef}
              variant="primary"
              size="medium"
              theme="light"
              placeholder={isSearching ? "검색 중..." : "검색어를 입력해 주세요."}
              value={searchValue}
              onChange={handleSearchChange}
              onSearch={handleSearchSubmit}
              className={styles.searchbar}
            />
          </div>

          <div className={styles.mobileBottom}>
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
        </div>
      </div>
      
      {/* Gap 2 - 42px */}
      <div className={styles.gap2}></div>
      
      {/* Main Content - 936px */}
      <div className={styles.main}>
        {isLoaded && allDiaries.length === 0 ? (
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
            {searchResult.searchQuery ? 
              `"${searchResult.searchQuery}"에 대한 검색 결과가 없습니다.` : 
              '작성된 일기가 없습니다.'
            }
          </div>
        ) : (
          <div className={`${styles.diaryGrid} ${displayDiaries.length >= 4 ? styles.centerAlign : ''}`}>
            {displayDiaries.map(renderDiaryCard)}
          </div>
        )}
      </div>
      
      {/* Gap 3 - 40px */}
      <div className={styles.gap3}></div>
      
      {/* Pagination - 32px */}
      {totalPages > 1 && (
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
      )}
      
      {/* Gap 4 - 40px */}
      <div className={styles.gap4}></div>
      
    </div>
  );
}
