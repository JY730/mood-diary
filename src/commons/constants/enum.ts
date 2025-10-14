/**
 * Emotion Enum Constants
 * 감정 관련 enum 데이터 정의
 */

import { RED, BLUE, GRAY, YELLOW, GREEN } from './color';

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
    color: RED.RED_60,
    images: {
      medium: '/icons/emotion-happy-m.svg',
      small: '/icons/emotion-happy-s.svg',
    },
  },
  [EmotionType.SAD]: {
    type: EmotionType.SAD,
    label: '슬퍼요',
    color: BLUE.BLUE_60,
    images: {
      medium: '/icons/emotion-sad-m.svg',
      small: '/icons/emotion-sad-s.svg',
    },
  },
  [EmotionType.ANGRY]: {
    type: EmotionType.ANGRY,
    label: '화나요',
    color: GRAY.GRAY_60,
    images: {
      medium: '/icons/emotion-angry-m.svg',
      small: '/icons/emotion-angry-s.svg',
    },
  },
  [EmotionType.SURPRISE]: {
    type: EmotionType.SURPRISE,
    label: '놀랐어요',
    color: YELLOW.YELLOW_60,
    images: {
      medium: '/icons/emotion-surprise-m.svg',
      small: '/icons/emotion-surprise-s.svg',
    },
  },
  [EmotionType.ETC]: {
    type: EmotionType.ETC,
    label: '기타',
    color: GREEN.GREEN_60,
    images: {
      medium: '/icons/emotion-etc-m.svg',
      small: '/icons/emotion-etc-s.svg',
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
