/**
 * Typography Design Tokens
 * 피그마 파운데이션(3459:1422)에서 추출한 타이포그래피 토큰
 * 모바일/웹 분기 및 한글/영문 폰트 지원
 */

// Font Family
export const FONT_FAMILY = {
  KOREAN: "var(--font-korean)",
  ENGLISH: "var(--font-english)",
} as const;

// Font Weight
export const FONT_WEIGHT = {
  REGULAR: 400,
  MEDIUM: 500,
  SEMIBOLD: 600,
  BOLD: 700,
  EXTRABOLD: 800,
} as const;

// Typography Style Interface
interface TypographyStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
}

// Web Headline Typography
export const WEB_HEADLINE = {
  HEADLINE_01: {
    fontFamily: FONT_FAMILY.KOREAN,
    fontSize: 48,
    fontWeight: FONT_WEIGHT.SEMIBOLD,
    lineHeight: 60,
  },
  HEADLINE_02: {
    fontFamily: FONT_FAMILY.KOREAN,
    fontSize: 36,
    fontWeight: FONT_WEIGHT.SEMIBOLD,
    lineHeight: 48,
  },
  HEADLINE_03: {
    fontFamily: FONT_FAMILY.KOREAN,
    fontSize: 28,
    fontWeight: FONT_WEIGHT.SEMIBOLD,
    lineHeight: 36,
  },
} as const;

// Mobile/Default Headline Typography
export const HEADLINE = {
  HEADLINE_01: {
    fontFamily: FONT_FAMILY.KOREAN,
    fontSize: 24,
    fontWeight: FONT_WEIGHT.BOLD,
    lineHeight: 32,
  },
  HEADLINE_02: {
    fontFamily: FONT_FAMILY.KOREAN,
    fontSize: 22,
    fontWeight: FONT_WEIGHT.EXTRABOLD,
    lineHeight: 30,
  },
  HEADLINE_03: {
    fontFamily: FONT_FAMILY.KOREAN,
    fontSize: 20,
    fontWeight: FONT_WEIGHT.BOLD,
    lineHeight: 28,
  },
} as const;

// Title Typography
export const TITLE = {
  TITLE_01: {
    fontFamily: FONT_FAMILY.KOREAN,
    fontSize: 18,
    fontWeight: FONT_WEIGHT.BOLD,
    lineHeight: 24,
  },
  TITLE_02: {
    fontFamily: FONT_FAMILY.KOREAN,
    fontSize: 16,
    fontWeight: FONT_WEIGHT.BOLD,
    lineHeight: 22,
  },
  TITLE_03: {
    fontFamily: FONT_FAMILY.KOREAN,
    fontSize: 14,
    fontWeight: FONT_WEIGHT.BOLD,
    lineHeight: 20,
  },
  SUBTITLE_01: {
    fontFamily: FONT_FAMILY.KOREAN,
    fontSize: 14,
    fontWeight: FONT_WEIGHT.SEMIBOLD,
    lineHeight: 22,
  },
  SUBTITLE_02: {
    fontFamily: FONT_FAMILY.KOREAN,
    fontSize: 12,
    fontWeight: FONT_WEIGHT.SEMIBOLD,
    lineHeight: 18,
  },
} as const;

// Body Typography
export const BODY = {
  BODY_01_MEDIUM: {
    fontFamily: FONT_FAMILY.KOREAN,
    fontSize: 16,
    fontWeight: FONT_WEIGHT.MEDIUM,
    lineHeight: 24,
  },
  BODY_02_MEDIUM: {
    fontFamily: FONT_FAMILY.KOREAN,
    fontSize: 14,
    fontWeight: FONT_WEIGHT.MEDIUM,
    lineHeight: 22,
  },
  BODY_03_MEDIUM: {
    fontFamily: FONT_FAMILY.KOREAN,
    fontSize: 12,
    fontWeight: FONT_WEIGHT.MEDIUM,
    lineHeight: 18,
  },
  BODY_01_REGULAR: {
    fontFamily: FONT_FAMILY.KOREAN,
    fontSize: 16,
    fontWeight: FONT_WEIGHT.REGULAR,
    lineHeight: 22,
  },
  BODY_02_REGULAR: {
    fontFamily: FONT_FAMILY.KOREAN,
    fontSize: 14,
    fontWeight: FONT_WEIGHT.REGULAR,
    lineHeight: 20,
  },
  BODY_03_REGULAR: {
    fontFamily: FONT_FAMILY.KOREAN,
    fontSize: 12,
    fontWeight: FONT_WEIGHT.REGULAR,
    lineHeight: 16,
  },
} as const;

// Caption Typography
export const CAPTION = {
  CAPTION_01: {
    fontFamily: FONT_FAMILY.KOREAN,
    fontSize: 12,
    fontWeight: FONT_WEIGHT.SEMIBOLD,
    lineHeight: 14,
  },
  CAPTION_02_MEDIUM: {
    fontFamily: FONT_FAMILY.KOREAN,
    fontSize: 10,
    fontWeight: FONT_WEIGHT.SEMIBOLD,
    lineHeight: 12,
  },
  CAPTION_02_REGULAR: {
    fontFamily: FONT_FAMILY.KOREAN,
    fontSize: 10,
    fontWeight: FONT_WEIGHT.MEDIUM,
    lineHeight: 12,
  },
  CAPTION_03: {
    fontFamily: FONT_FAMILY.KOREAN,
    fontSize: 8,
    fontWeight: FONT_WEIGHT.SEMIBOLD,
    lineHeight: 10,
  },
} as const;

// Export all typography tokens
export const TYPOGRAPHY = {
  WEB_HEADLINE,
  HEADLINE,
  TITLE,
  BODY,
  CAPTION,
  FONT_FAMILY,
  FONT_WEIGHT,
} as const;

// Type definitions
export type WebHeadlineType = keyof typeof WEB_HEADLINE;
export type HeadlineType = keyof typeof HEADLINE;
export type TitleType = keyof typeof TITLE;
export type BodyType = keyof typeof BODY;
export type CaptionType = keyof typeof CAPTION;
export type TypographyToken = typeof TYPOGRAPHY;

// Utility function to generate CSS string
export const getTypographyStyle = (style: TypographyStyle): string => {
  return `
    font-family: ${style.fontFamily};
    font-size: ${style.fontSize}px;
    font-weight: ${style.fontWeight};
    line-height: ${style.lineHeight}px;
  `.trim();
};

// Utility function to get typography object for CSS-in-JS
export const getTypographyCSSObject = (style: TypographyStyle) => {
  return {
    fontFamily: style.fontFamily,
    fontSize: `${style.fontSize}px`,
    fontWeight: style.fontWeight,
    lineHeight: `${style.lineHeight}px`,
  };
};

