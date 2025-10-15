"use client";

import React from 'react';
import styles from './styles.module.css';

const DiariesNew: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      {/* Header - 24px */}
      <div className={styles.header}>
        Header 영역
      </div>
      
      {/* Gap 1 - 40px */}
      <div className={styles.gap1}></div>
      
      {/* Emotion Box - 64px */}
      <div className={styles.emotionBox}>
        Emotion Box 영역
      </div>
      
      {/* Gap 2 - 40px */}
      <div className={styles.gap2}></div>
      
      {/* Input Title - 76px */}
      <div className={styles.inputTitle}>
        Input Title 영역
      </div>
      
      {/* Gap 3 - 24px */}
      <div className={styles.gap3}></div>
      
      {/* Input Content - 156px */}
      <div className={styles.inputContent}>
        Input Content 영역
      </div>
      
      {/* Gap 4 - 40px */}
      <div className={styles.gap4}></div>
      
      {/* Footer - 48px */}
      <div className={styles.footer}>
        Footer 영역
      </div>
    </div>
  );
};

export default DiariesNew;
