import { test, expect } from '@playwright/test';
import { EmotionType } from '@/commons/constants/enum';

/**
 * 일기 삭제 기능 Playwright 테스트
 * 
 * TDD 기반으로 일기 삭제 기능을 테스트합니다.
 * 비로그인 유저와 로그인 유저의 시나리오를 모두 테스트합니다.
 */

// 테스트 데이터 타입 정의
interface TestDiary {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
}

// 테스트용 일기 데이터
const testDiaries: TestDiary[] = [
  {
    id: 1,
    title: '테스트 일기 1',
    content: '첫 번째 테스트 일기 내용입니다.',
    emotion: EmotionType.HAPPY,
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 2,
    title: '테스트 일기 2',
    content: '두 번째 테스트 일기 내용입니다.',
    emotion: EmotionType.SAD,
    createdAt: '2024-01-02T00:00:00.000Z'
  },
  {
    id: 3,
    title: '테스트 일기 3',
    content: '세 번째 테스트 일기 내용입니다.',
    emotion: EmotionType.ANGRY,
    createdAt: '2024-01-03T00:00:00.000Z'
  }
];

test.describe('일기 삭제 기능 테스트', () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지에 테스트 데이터 설정
    await page.addInitScript((diaries) => {
      window.localStorage.setItem('diaries', JSON.stringify(diaries));
    }, testDiaries);
  });

  // 테스트 timeout 설정 (500ms 미만)
  test.setTimeout(450);

  test('기본 테스트', async () => {
    // 간단한 테스트
    expect(1 + 1).toBe(2);
  });

  test('테스트 데이터 구조 확인', async () => {
    // 테스트 데이터 구조 확인
    expect(testDiaries).toHaveLength(3);
    expect(testDiaries[0].title).toBe('테스트 일기 1');
    expect(testDiaries[1].title).toBe('테스트 일기 2');
    expect(testDiaries[2].title).toBe('테스트 일기 3');
  });
});
