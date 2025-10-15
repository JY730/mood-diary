import React from 'react';
import Image from 'next/image';
import { Button } from '@/commons/components/button';
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

// Mock 데이터
const mockDiaryData: DiaryDetailData = {
  id: '1',
  title: '이것은 타이틀 입니다.',
  content: '내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다',
  emotion: EmotionType.HAPPY,
  createdAt: '2024. 07. 12'
};

const DiariesDetail: React.FC = () => {
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
            variant="secondary"
            size="medium"
            theme="light"
            onClick={handleEdit}
            style={{ width: '51px' }}
          >
            수정
          </Button>
          <Button
            variant="secondary"
            size="medium"
            theme="light"
            onClick={handleDelete}
            style={{ width: '51px' }}
          >
            삭제
          </Button>
        </div>
      </div>
      
      <div className={styles.gap24}></div>
      
      <div className={styles.retrospectInput}>
        retrospect-input (1168 * 85)
      </div>
      
      <div className={styles.gap16}></div>
      
      <div className={styles.retrospectList}>
        retrospect-list (1168 * 72)
      </div>
    </div>
  );
};

export default DiariesDetail;
