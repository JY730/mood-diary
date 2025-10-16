"use client";

import React, { useState } from 'react';
import styles from './styles.module.css';
import { Input } from '@/commons/components/input';
import { Button } from '@/commons/components/button';
import { EmotionType, getAllEmotionData } from '@/commons/constants/enum';
import { useModal } from '@/commons/providers/modal/modal.provider';

const DiariesNew: React.FC = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType>(EmotionType.HAPPY);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { closeModal } = useModal();
  
  const emotionData = getAllEmotionData();

  const handleEmotionChange = (emotionType: EmotionType) => {
    setSelectedEmotion(emotionType);
  };

  const handleSubmit = () => {
    // 등록하기 로직
    console.log('일기 등록:', { selectedEmotion, title, content });
    closeModal();
  };

  const handleClose = () => {
    closeModal();
  };

  return (
    <div className={styles.wrapper}>
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>
      
      {/* Gap 3 - 24px */}
      <div className={styles.gap3}></div>
      
      {/* Input Content - 156px */}
      <div className={styles.inputContent}>
        <div className={styles.inputLabel}>내용</div>
        <textarea
          placeholder="내용을 입력합니다."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.contentTextarea}
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
          style={{ width: '104px' }}
        >
          닫기
        </Button>
        <Button
          variant="primary"
          size="medium"
          theme="light"
          onClick={handleSubmit}
          style={{ width: '104px' }}
        >
          등록하기
        </Button>
      </div>
    </div>
  );
};

export default DiariesNew;
