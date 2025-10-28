'use client';

import React from 'react';
import styles from './styles.module.css';
import { Input } from '@/commons/components/input';
import { Button } from '@/commons/components/button';
import { EmotionType, getAllEmotionData } from '@/commons/constants/enum';
import { useLinkModalClose } from './hooks/index.link.modal.close.hook';
import { useDiaryForm } from './hooks/index.form.hook';

const DiariesNew: React.FC = () => {
  const { handleClose } = useLinkModalClose();
  const { register, handleSubmit, isValid, watch, setValue } = useDiaryForm();
  
  const emotionData = getAllEmotionData();
  
  // 현재 선택된 감정 watch
  const selectedEmotion = watch('emotion');

  const handleEmotionChange = (emotionType: EmotionType) => {
    setValue('emotion', emotionType, { shouldValidate: true });
  };

  return (
    <div className={styles.wrapper} data-testid="diaries-new-form">
      {/* Header - 24px */}
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>일기 쓰기</h1>
      </div>
      
      {/* Gap 1 - 40px */}
      <div className={styles.gap1}></div>
      
      {/* Emotion Box - 64px */}
      <div className={styles.emotionBox}>
        <div className={styles.emotionTitle}>오늘 기분은 어땠나요?</div>
        <div className={styles.emotionRadioGroup}>
          {emotionData.map((emotion) => (
            <label key={emotion.type} className={styles.emotionRadioItem}>
              <input
                type="radio"
                name="emotion"
                value={emotion.type}
                checked={selectedEmotion === emotion.type}
                onChange={() => handleEmotionChange(emotion.type)}
                className={styles.emotionRadioInput}
                data-testid={`emotion-radio-${emotion.type.toLowerCase()}`}
              />
              <span className={styles.emotionRadioLabel}>{emotion.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Gap 2 - 40px */}
      <div className={styles.gap2}></div>
      
      {/* Input Title - 76px */}
      <div className={styles.inputTitle}>
        <div className={styles.inputLabel}>제목</div>
        <Input
          variant="primary"
          size="medium"
          theme="light"
          placeholder="제목을 입력합니다."
          {...register('title')}
          style={{ width: '100%' }}
          data-testid="diaries-new-title-input"
        />
      </div>
      
      {/* Gap 3 - 24px */}
      <div className={styles.gap3}></div>
      
      {/* Input Content - 156px */}
      <div className={styles.inputContent}>
        <div className={styles.inputLabel}>내용</div>
        <textarea
          placeholder="내용을 입력합니다."
          {...register('content')}
          className={styles.contentTextarea}
          data-testid="diaries-new-content-textarea"
        />
      </div>
      
      {/* Gap 4 - 40px */}
      <div className={styles.gap4}></div>
      
      {/* Footer - 48px */}
      <div className={styles.footer}>
        <Button
          variant="secondary"
          size="medium"
          theme="light"
          onClick={handleClose}
          data-testid="diaries-new-close-button"
        >
          닫기
        </Button>
        <Button
          variant="primary"
          size="medium"
          theme="light"
          onClick={handleSubmit}
          data-testid="diaries-new-submit-button"
          disabled={!isValid}
        >
          등록하기
        </Button>
      </div>
    </div>
  );
};

export default DiariesNew;
