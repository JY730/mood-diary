/**
 * Color Design Tokens
 * 피그마 파운데이션(3459:1130)에서 추출한 컬러 토큰
 * 다크모드 지원을 위한 컬러 시스템
 */

// Blue Colors
export const BLUE = {
  BLUE_05: "#F0F7FF",
  BLUE_10: "#DBEEFF",
  BLUE_20: "#BDDBFF",
  BLUE_30: "#93BEFF",
  BLUE_40: "#6DA5FA", // System color
  BLUE_50: "#497CFF",
  BLUE_60: "#3A5CF3", // System color
  BLUE_70: "#274AE1",
  BLUE_80: "#1530A6",
  BLUE_90: "#0B2184",
} as const;

// Gray Colors
export const GRAY = {
  WHITE: "#FFFFFF",
  GRAY_05: "#F2F2F2",
  GRAY_10: "#E4E4E4",
  GRAY_20: "#D4D3D3",
  GRAY_30: "#C7C7C7",
  GRAY_40: "#ABABAB",
  GRAY_50: "#919191",
  GRAY_60: "#777777",
  GRAY_70: "#5F5F5F",
  GRAY_80: "#333333",
  GRAY_90: "#1C1C1C",
  BLACK: "#000000",
} as const;

// Red Colors (Error)
export const RED = {
  RED_05: "#FDD7DC",
  RED_10: "#F797A4",
  RED_20: "#F4677A",
  RED_30: "#F03851", // Error color
  RED_40: "#E4112E",
  RED_50: "#B40E24",
  RED_60: "#850A1B",
} as const;

// Green Colors (Success)
export const GREEN = {
  GREEN_05: "#D3F3E0",
  GREEN_10: "#92E6B9",
  GREEN_20: "#15D66F",
  GREEN_30: "#12B75F", // Success color
  GREEN_40: "#109C51",
  GREEN_50: "#0E723C",
  GREEN_60: "#084424",
} as const;


// Yellow Colors
export const YELLOW = {
  YELLOW_05: "#FFE499",
  YELLOW_10: "#FFD666",
  YELLOW_20: "#FFC933",
  YELLOW_30: "#FFB300",
  YELLOW_40: "#EBA500",
  YELLOW_50: "#D69600",
  YELLOW_60: "#B27D00",
} as const;

// Cool Gray Colors
export const COOL_GRAY = {
  COOL_GRAY_01: "#F8F8FA",
  COOL_GRAY_05: "#F6F6F9",
  COOL_GRAY_10: "#EDEEF2",
  COOL_GRAY_20: "#DDDFE5",
  COOL_GRAY_30: "#D2D4DD",
  COOL_GRAY_40: "#C7C9D5",
  COOL_GRAY_50: "#BBBECD",
  COOL_GRAY_60: "#B0B3C4",
} as const;


// Purple Colors
export const PURPLE = {
  PURPLE_05: "#F0E6FF",
  PURPLE_10: "#D9B8FF",
  PURPLE_20: "#C28AFF",
  PURPLE_30: "#AB5CFF",
  PURPLE_40: "#942EFF",
} as const;


// Gradient Colors
export const GRADIENT = {
  PRIMARY: "linear-gradient(135deg, #6DA5FA 0%, #92EAF5 100%)",
  SKELETON: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 48.5%, transparent 100%)",
} as const;

// Semantic Colors (라이트 모드)
export const SEMANTIC_LIGHT = {
  // Background
  BG_PRIMARY: GRAY.WHITE,
  BG_SECONDARY: GRAY.GRAY_05,
  BG_TERTIARY: GRAY.GRAY_10,
  
  // Text
  TEXT_PRIMARY: GRAY.BLACK,
  TEXT_SECONDARY: GRAY.GRAY_70,
  TEXT_TERTIARY: GRAY.GRAY_50,
  TEXT_DISABLED: GRAY.GRAY_40,
  
  // Border
  BORDER_PRIMARY: GRAY.GRAY_30,
  BORDER_SECONDARY: GRAY.GRAY_20,
  
  // Brand
  BRAND_PRIMARY: BLUE.BLUE_60,
  BRAND_SECONDARY: BLUE.BLUE_40,
  BRAND_HOVER: BLUE.BLUE_70,
  
  // Status
  SUCCESS: GREEN.GREEN_30,
  ERROR: RED.RED_30,
  WARNING: YELLOW.YELLOW_30,
  INFO: BLUE.BLUE_50,
} as const;

// Semantic Colors (다크 모드)
export const SEMANTIC_DARK = {
  // Background
  BG_PRIMARY: GRAY.BLACK,
  BG_SECONDARY: GRAY.GRAY_90,
  BG_TERTIARY: GRAY.GRAY_80,
  
  // Text
  TEXT_PRIMARY: GRAY.WHITE,
  TEXT_SECONDARY: GRAY.GRAY_40,
  TEXT_TERTIARY: GRAY.GRAY_50,
  TEXT_DISABLED: GRAY.GRAY_60,
  
  // Border
  BORDER_PRIMARY: GRAY.GRAY_70,
  BORDER_SECONDARY: GRAY.GRAY_80,
  
  // Brand
  BRAND_PRIMARY: BLUE.BLUE_50,
  BRAND_SECONDARY: BLUE.BLUE_40,
  BRAND_HOVER: BLUE.BLUE_60,
  
  // Status
  SUCCESS: GREEN.GREEN_20,
  ERROR: RED.RED_30,
  WARNING: YELLOW.YELLOW_30,
  INFO: BLUE.BLUE_40,
} as const;

// Export all colors
export const COLORS = {
  BLUE,
  GRAY,
  RED,
  GREEN,
  YELLOW,
  COOL_GRAY,
  GRADIENT,
  SEMANTIC_LIGHT,
  SEMANTIC_DARK,
} as const;

// Type definitions
export type BlueColor = typeof BLUE[keyof typeof BLUE];
export type GrayColor = typeof GRAY[keyof typeof GRAY];
export type RedColor = typeof RED[keyof typeof RED];
export type GreenColor = typeof GREEN[keyof typeof GREEN];
export type YellowColor = typeof YELLOW[keyof typeof YELLOW];
export type CoolGrayColor = typeof COOL_GRAY[keyof typeof COOL_GRAY];
export type SemanticLightColor = typeof SEMANTIC_LIGHT[keyof typeof SEMANTIC_LIGHT];
export type SemanticDarkColor = typeof SEMANTIC_DARK[keyof typeof SEMANTIC_DARK];

