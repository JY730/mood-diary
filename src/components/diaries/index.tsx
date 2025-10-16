'use client';

import React, { useState } from 'react';
import styles from './styles.module.css';
import { Selectbox } from '@/commons/components/selectbox';
import { Searchbar } from '@/commons/components/searchbar';
import { Button } from '@/commons/components/button';
import { Pagination } from '@/commons/components/pagination';
import { EmotionType, getEmotionData } from '@/commons/constants/enum';
import { useLinkModal } from './hooks/index.link.modal.hook';

// Mock 데이터 타입 정의
interface DiaryCard {
  id: number;
  emotion: EmotionType;
  date: string;
  title: string;
  image: string;
}

export default function Diaries() {
  const [filterValue, setFilterValue] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { openDiaryModal } = useLinkModal();

  // Mock 데이터 생성 - enum 타입에 지정된 이미지 경로 사용
  const baseCards: DiaryCard[] = [
    { id: 1, emotion: EmotionType.SAD, date: '2024. 03. 12', title: '타이틀 영역 입니다. 한줄까지만 노출 됩니다.', image: getEmotionData(EmotionType.SAD).images.medium },
    { id: 2, emotion: EmotionType.SURPRISE, date: '2024. 03. 12', title: '타이틀 영역 입니다.', image: getEmotionData(EmotionType.SURPRISE).images.medium },
    { id: 3, emotion: EmotionType.ANGRY, date: '2024. 03. 12', title: '타이틀 영역 입니다.', image: getEmotionData(EmotionType.ANGRY).images.medium },
    { id: 4, emotion: EmotionType.HAPPY, date: '2024. 03. 12', title: '타이틀 영역 입니다.', image: getEmotionData(EmotionType.HAPPY).images.medium },
    { id: 5, emotion: EmotionType.ETC, date: '2024. 03. 12', title: '타이틀 영역 입니다. 한줄까지만 노출 됩니다.', image: getEmotionData(EmotionType.ETC).images.medium },
    { id: 6, emotion: EmotionType.SURPRISE, date: '2024. 03. 12', title: '타이틀 영역 입니다.', image: getEmotionData(EmotionType.SURPRISE).images.medium },
    { id: 7, emotion: EmotionType.ANGRY, date: '2024. 03. 12', title: '타이틀 영역 입니다.', image: getEmotionData(EmotionType.ANGRY).images.medium },
    { id: 8, emotion: EmotionType.HAPPY, date: '2024. 03. 12', title: '타이틀 영역 입니다.', image: getEmotionData(EmotionType.HAPPY).images.medium },
    { id: 9, emotion: EmotionType.SAD, date: '2024. 03. 12', title: '타이틀 영역 입니다. 한줄까지만 노출 됩니다.', image: getEmotionData(EmotionType.SAD).images.medium },
    { id: 10, emotion: EmotionType.SURPRISE, date: '2024. 03. 12', title: '타이틀 영역 입니다.', image: getEmotionData(EmotionType.SURPRISE).images.medium },
    { id: 11, emotion: EmotionType.ANGRY, date: '2024. 03. 12', title: '타이틀 영역 입니다.', image: getEmotionData(EmotionType.ANGRY).images.medium },
    { id: 12, emotion: EmotionType.HAPPY, date: '2024. 03. 12', title: '타이틀 영역 입니다.', image: getEmotionData(EmotionType.HAPPY).images.medium },
  ];

  const mockDiaryCards: DiaryCard[] = Array.from({ length: 60 }, (_, i) => {
    const base = baseCards[i % baseCards.length];
    return { ...base, id: i + 1 };
  });
  
  // 페이지네이션 설정
  const itemsPerPage = 12; // 한 페이지당 12개 아이템 (3행 x 4개)
  const totalPages = Math.ceil(mockDiaryCards.length / itemsPerPage);

  // 현재 페이지에 표시할 데이터 계산
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return mockDiaryCards.slice(startIndex, endIndex);
  };

  // 현재 페이지 데이터를 3행으로 나누기
  const getRowData = (rowIndex: number) => {
    const currentData = getCurrentPageData();
    const startIndex = rowIndex * 4;
    const endIndex = startIndex + 4;
    return currentData.slice(startIndex, endIndex);
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
        <div className={styles.diaryGrid}>
          {/* 첫 번째 행 */}
          <div className={styles.diaryRow}>
            {getRowData(0).map((card) => {
              const emotionData = getEmotionData(card.emotion);
              return (
                <div key={card.id} className={styles.diaryCard}>
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
                        src={card.image} 
                        alt={card.title}
                        className={styles.cardImage}
                      />
                    </div>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <span 
                        className={styles.emotionText}
                        style={{ color: emotionData.color }}
                      >
                        {emotionData.label}
                      </span>
                      <span className={styles.dateText}>{card.date}</span>
                    </div>
                    <div className={styles.cardTitle}>
                      {card.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* 두 번째 행 */}
          <div className={styles.diaryRow}>
            {getRowData(1).map((card) => {
              const emotionData = getEmotionData(card.emotion);
              return (
                <div key={card.id} className={styles.diaryCard}>
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
                        src={card.image} 
                        alt={card.title}
                        className={styles.cardImage}
                      />
                    </div>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <span 
                        className={styles.emotionText}
                        style={{ color: emotionData.color }}
                      >
                        {emotionData.label}
                      </span>
                      <span className={styles.dateText}>{card.date}</span>
                    </div>
                    <div className={styles.cardTitle}>
                      {card.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* 세 번째 행 */}
          <div className={styles.diaryRow}>
            {getRowData(2).map((card) => {
              const emotionData = getEmotionData(card.emotion);
              return (
                <div key={card.id} className={styles.diaryCard}>
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
                        src={card.image} 
                        alt={card.title}
                        className={styles.cardImage}
                      />
                    </div>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <span 
                        className={styles.emotionText}
                        style={{ color: emotionData.color }}
                      >
                        {emotionData.label}
                      </span>
                      <span className={styles.dateText}>{card.date}</span>
                    </div>
                    <div className={styles.cardTitle}>
                      {card.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
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
