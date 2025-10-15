/**
 * Emotion Enum Constants
 * 감정 관련 enum 데이터 정의
 */

import { RED, BLUE, GRAY, YELLOW, GREEN, PURPLE } from './color';

// 감정 타입 정의
export enum EmotionType {
  HAPPY = 'HAPPY',
  SAD = 'SAD',
  ANGRY = 'ANGRY',
  SURPRISE = 'SURPRISE',
  ETC = 'ETC',
}

// 감정 이미지 사이즈 타입
export enum EmotionImageSize {
  MEDIUM = 'M',
  SMALL = 'S',
}

// 감정 데이터 인터페이스
export interface EmotionData {
  type: EmotionType;
  label: string;
  color: string;
  images: {
    medium: string;
    small: string;
  };
}

// 감정 enum 데이터
export const EMOTION_DATA: Record<EmotionType, EmotionData> = {
  [EmotionType.HAPPY]: {
    type: EmotionType.HAPPY,
    label: '행복해요',
    color: RED.RED_40,
    images: {
      medium: '/images/emotion-happy-m.png',
      small: '/images/emotion-happy-s.png',
    },
  },
  [EmotionType.SAD]: {
    type: EmotionType.SAD,
    label: '슬퍼요',
    color: BLUE.BLUE_40,
    images: {
      medium: '/images/emotion-sad-m.png',
      small: '/images/emotion-sad-s.png',
    },
  },
  [EmotionType.ANGRY]: {
    type: EmotionType.ANGRY,
    label: '화나요',
    color: GRAY.GRAY_60,
    images: {
      medium: '/images/emotion-angry-m.png',
      small: '/images/emotion-angry-s.png',
    },
  },
  [EmotionType.SURPRISE]: {
    type: EmotionType.SURPRISE,
    label: '놀랐어요',
    color: YELLOW.YELLOW_60,
    images: {
      medium: '/images/emotion-surprise-m.png',
      small: '/images/emotion-surprise-s.png',
    },
  },
  [EmotionType.ETC]: {
    type: EmotionType.ETC,
    label: '기타',
    color: PURPLE.PURPLE_40,
    images: {
      medium: '/images/emotion-etc-m.png',
      small: '/images/emotion-etc-s.png',
    },
  },
} as const;

// 유틸리티 함수들
export const getEmotionData = (type: EmotionType): EmotionData => {
  return EMOTION_DATA[type];
};

export const getEmotionLabel = (type: EmotionType): string => {
  return EMOTION_DATA[type].label;
};

export const getEmotionColor = (type: EmotionType): string => {
  return EMOTION_DATA[type].color;
};

export const getEmotionImage = (type: EmotionType, size: EmotionImageSize): string => {
  const emotionData = EMOTION_DATA[type];
  return size === EmotionImageSize.MEDIUM ? emotionData.images.medium : emotionData.images.small;
};

export const getAllEmotionTypes = (): EmotionType[] => {
  return Object.values(EmotionType);
};

export const getAllEmotionData = (): EmotionData[] => {
  return Object.values(EMOTION_DATA);
};

// Export all emotion constants (다른 파일들과 일관성 유지)
export const EMOTION_CONSTANTS = {
  EMOTION_DATA,
  EmotionType,
  EmotionImageSize,
} as const;

// 타입 정의 (다른 파일들과 일관성 유지)
export type EmotionConstants = typeof EMOTION_CONSTANTS;
