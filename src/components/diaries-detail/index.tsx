"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/commons/components/button';
import { Input } from '@/commons/components/input';
import { EmotionType, getEmotionData, getEmotionImage, EmotionImageSize } from '@/commons/constants/enum';
import styles from './styles.module.css';

// Mock 데이터 인터페이스
interface DiaryDetailData {
  id: string;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
}

interface RetrospectData {
  id: string;
  content: string;
  createdAt: string;
}

// Mock 데이터
const mockDiaryData: DiaryDetailData = {
  id: '1',
  title: '이것은 타이틀 입니다.',
  content: '내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다',
  emotion: EmotionType.HAPPY,
  createdAt: '2024. 07. 12'
};

// Mock 회고 데이터
const mockRetrospectData: RetrospectData[] = [
  {
    id: '1',
    content: '3년이 지나고 다시 보니 이때가 그립다.',
    createdAt: '2024. 09. 24'
  },
  {
    id: '2',
    content: '3년이 지나고 다시 보니 이때가 그립다.',
    createdAt: '2024. 09. 24'
  }
];

const DiariesDetail: React.FC = () => {
  const [retrospectInput, setRetrospectInput] = useState('');
  const [retrospectList, setRetrospectList] = useState<RetrospectData[]>(mockRetrospectData);
  
  const emotionData = getEmotionData(mockDiaryData.emotion);
  const emotionImageSrc = getEmotionImage(mockDiaryData.emotion, EmotionImageSize.SMALL);

  const handleCopyContent = () => {
    navigator.clipboard.writeText(mockDiaryData.content);
  };

  const handleEdit = () => {
    console.log('수정 버튼 클릭');
  };

  const handleDelete = () => {
    console.log('삭제 버튼 클릭');
  };

  const handleRetrospectSubmit = () => {
    if (retrospectInput.trim()) {
      const newRetrospect: RetrospectData = {
        id: Date.now().toString(),
        content: retrospectInput.trim(),
        createdAt: new Date().toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }).replace(/\. /g, '. ').replace(/\.$/, '')
      };
      setRetrospectList([newRetrospect, ...retrospectList]);
      setRetrospectInput('');
    }
  };

  const handleRetrospectInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRetrospectInput(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.gap64}></div>
      
      {/* detail-title 영역 */}
      <div className={styles.detailTitle}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>{mockDiaryData.title}</h1>
        </div>
        <div className={styles.emotionAndDate}>
          <div className={styles.emotionInfo}>
            <Image
              src={emotionImageSrc}
              alt={emotionData.label}
              width={32}
              height={32}
              className={styles.emotionIcon}
            />
            <span 
              className={styles.emotionText}
              style={{ color: emotionData.color }}
            >
              {emotionData.label}
            </span>
          </div>
          <div className={styles.dateInfo}>
            <span className={styles.dateText}>{mockDiaryData.createdAt}</span>
            <span className={styles.createdText}>작성</span>
          </div>
        </div>
      </div>
      
      <div className={styles.gap24}></div>
      
      {/* detail-content 영역 */}
      <div className={styles.detailContent}>
        <div className={styles.contentArea}>
          <h2 className={styles.contentLabel}>내용</h2>
          <p className={styles.contentText}>{mockDiaryData.content}</p>
        </div>
        <div className={styles.copyButtonArea}>
          <button className={styles.copyButton} onClick={handleCopyContent}>
            <Image
              src="/icons/copy_outline_light_m.svg"
              alt="복사"
              width={24}
              height={24}
            />
            <span className={styles.copyButtonText}>내용 복사</span>
          </button>
        </div>
      </div>
      
      <div className={styles.gap24}></div>
      
      {/* detail-footer 영역 */}
      <div className={styles.detailFooter}>
        <div className={styles.buttonGroup}>
          <Button
            variant="tertiary"
            size="small"
            theme="light"
            onClick={handleEdit}
            className={styles.actionButton}
          >
            수정
          </Button>
          <Button
            variant="tertiary"
            size="small"
            theme="light"
            onClick={handleDelete}
            className={styles.actionButton}
          >
            삭제
          </Button>
        </div>
      </div>
      
      <div className={styles.gap24}></div>
      
      {/* retrospect-input 영역 */}
      <div className={styles.retrospectInput}>
        <h2 className={styles.retrospectLabel}>회고</h2>
        <div className={styles.retrospectInputContainer}>
          <Input
            variant="primary"
            size="medium"
            theme="light"
            placeholder="회고를 남겨보세요."
            value={retrospectInput}
            onChange={handleRetrospectInputChange}
            className={styles.retrospectInputField}
          />
          <Button
            variant="primary"
            size="medium"
            theme="light"
            onClick={handleRetrospectSubmit}
            className={styles.retrospectSubmitButton}
          >
            입력
          </Button>
        </div>
      </div>
      
      <div className={styles.gap16}></div>
      
      {/* retrospect-list 영역 */}
      <div className={styles.retrospectList}>
        {retrospectList.map((retrospect, index) => (
          <div key={retrospect.id}>
            <div className={styles.retrospectItem}>
              <span className={styles.retrospectText}>{retrospect.content}</span>
              <span className={styles.retrospectDate}>[{retrospect.createdAt}]</span>
            </div>
            {index < retrospectList.length - 1 && <div className={styles.retrospectDivider}></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiariesDetail;
