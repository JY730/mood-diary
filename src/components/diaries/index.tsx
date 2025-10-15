"use client";

import React, { useState } from 'react';
import styles from './styles.module.css';
import { Selectbox } from '@/commons/components/selectbox';
import { Searchbar } from '@/commons/components/searchbar';
import { Button } from '@/commons/components/button';
import { EmotionType, getEmotionData } from '@/commons/constants/enum';

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

  // Mock 데이터 생성 - enum 타입에 지정된 이미지 경로 사용
  const mockDiaryCards: DiaryCard[] = [
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
        <div className={styles.diaryGrid}>
          {/* 첫 번째 행 */}
          <div className={styles.diaryRow}>
            {mockDiaryCards.slice(0, 4).map((card) => {
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
            {mockDiaryCards.slice(4, 8).map((card) => {
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
            {mockDiaryCards.slice(8, 12).map((card) => {
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
        <div className={styles.paginationPlaceholder}>Pagination Area</div>
      </div>
      
      {/* Gap 4 - 40px */}
      <div className={styles.gap4}></div>
    </div>
  );
}
