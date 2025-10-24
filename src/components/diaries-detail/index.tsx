'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/commons/components/button';
import { Input } from '@/commons/components/input';
import { getEmotionData, getEmotionImage, EmotionImageSize } from '@/commons/constants/enum';
import { useDiaryBinding } from './hooks/index.binding.hook';
import { useRetrospectForm } from './hooks/index.retrospect.form.hook';
import { useRetrospectBinding } from './hooks/index.retrospect.binding.hook';
import styles from './styles.module.css';


const DiariesDetail: React.FC = () => {
  // 일기 데이터 바인딩 훅 사용
  const { diaryData } = useDiaryBinding();
  
  // 회고 데이터 바인딩 훅 사용
  const { retrospectData } = useRetrospectBinding();
  
  // 회고 폼 훅 사용
  const { form, onSubmit, isSubmitEnabled } = useRetrospectForm(diaryData?.id || 0);

  // 일기 데이터가 없는 경우 처리
  if (!diaryData) {
    return <div data-testid="diary-detail-not-found">일기를 찾을 수 없습니다.</div>;
  }

  const emotionData = getEmotionData(diaryData.emotion);
  const emotionImageSrc = getEmotionImage(diaryData.emotion, EmotionImageSize.SMALL);
  
  // 날짜 포맷팅 함수
  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}. ${month}. ${day}`;
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(diaryData.content);
  };

  const handleEdit = () => {
    console.log('수정 버튼 클릭');
  };

  const handleDelete = () => {
    console.log('삭제 버튼 클릭');
  };

  // 회고 등록 핸들러는 훅에서 제공

  return (
    <div className={styles.container} data-testid="diary-detail-container">
      <div className={styles.gap64}></div>
      
      {/* detail-title 영역 */}
      <div className={styles.detailTitle}>
        <div className={styles.titleSection}>
          <h1 className={styles.title} data-testid="diary-detail-title">
            {diaryData.title}
          </h1>
        </div>
        <div className={styles.emotionAndDate}>
          <div className={styles.emotionInfo}>
            <Image
              src={emotionImageSrc}
              alt={emotionData.label}
              width={32}
              height={32}
              className={styles.emotionIcon}
              data-testid="diary-detail-emotion-image"
            />
            <span 
              className={styles.emotionText}
              style={{ color: emotionData.color }}
              data-testid="diary-detail-emotion-text"
            >
              {emotionData.label}
            </span>
          </div>
          <div className={styles.dateInfo}>
            <span className={styles.dateText} data-testid="diary-detail-created-at">
              {formatDate(diaryData.createdAt)}
            </span>
            <span className={styles.createdText}>작성</span>
          </div>
        </div>
      </div>
      
      <div className={styles.gap24}></div>
      
      {/* detail-content 영역 */}
      <div className={styles.detailContent}>
        <div className={styles.contentArea}>
          <h2 className={styles.contentLabel}>내용</h2>
          <p className={styles.contentText} data-testid="diary-detail-content">
            {diaryData.content}
          </p>
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
      
      <div className={styles.retrospectContainer}>
        {/* retrospect-input 영역 */}
        <div className={styles.retrospectInput}>
          <h2 className={styles.retrospectLabel}>회고</h2>
          <div className={styles.retrospectInputContainer}>
            <Input
              variant="primary"
              size="medium"
              theme="light"
              placeholder="회고를 남겨보세요."
              {...form.register('content')}
              className={styles.retrospectInputField}
            />
            <Button
              variant="primary"
              size="medium"
              theme="light"
              onClick={onSubmit}
              disabled={!isSubmitEnabled}
              className={styles.retrospectSubmitButton}
            >
              입력
            </Button>
          </div>
        </div>
        
        {/* retrospect-list 영역 */}
        {retrospectData.length > 0 && (
          <div className={styles.retrospectList} data-testid="retrospect-list">
            {retrospectData.map((retrospect, index) => (
              <div className={styles.retrospectItemContainer} key={retrospect.id}>
                <div className={styles.retrospectItem}>
                  <span className={styles.retrospectText} data-testid={`retrospect-content-${index}`}>
                    {retrospect.content}
                  </span>
                  <span className={styles.retrospectDate} data-testid={`retrospect-date-${index}`}>
                    {formatDate(retrospect.createdAt)}
                  </span>
                </div>
                {index < retrospectData.length - 1 && (
                  <div className={styles.retrospectDivider}></div>
                )}
              </div>
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default DiariesDetail;
