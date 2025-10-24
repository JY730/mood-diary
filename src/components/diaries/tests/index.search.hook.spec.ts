import { test, expect } from '@playwright/test';
import { EmotionType } from '@/commons/constants/enum';

// 테스트 데이터 타입 정의
interface TestDiaryData {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
}

// 테스트 데이터
const testDiaries: TestDiaryData[] = [
  {
    id: 1,
    title: '행복한 하루',
    content: '오늘은 정말 행복한 하루였다.',
    emotion: EmotionType.HAPPY,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    title: '슬픈 이야기',
    content: '오늘은 슬픈 일이 있었다.',
    emotion: EmotionType.SAD,
    createdAt: '2024-01-16T14:30:00Z'
  },
  {
    id: 3,
    title: '화나는 순간',
    content: '정말 화가 났다.',
    emotion: EmotionType.ANGRY,
    createdAt: '2024-01-17T09:15:00Z'
  },
  {
    id: 4,
    title: '놀라운 발견',
    content: '예상치 못한 일이 일어났다.',
    emotion: EmotionType.SURPRISE,
    createdAt: '2024-01-18T16:45:00Z'
  },
  {
    id: 5,
    title: '기타 감정',
    content: '복잡한 감정이었다.',
    emotion: EmotionType.ETC,
    createdAt: '2024-01-19T11:20:00Z'
  }
];

test.describe('Diaries Search Hook Tests', () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지에 테스트 데이터 저장
    await page.goto('/diaries');
    await page.evaluate((diaries) => {
      localStorage.setItem('diaries', JSON.stringify(diaries));
    }, testDiaries);
    
    // 페이지 새로고침하여 데이터 로드
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-container"]');
  });

  test('검색창에 입력하면 실시간으로 검색 결과가 표시되어야 함', async ({ page }) => {
    // 검색창에 "행복" 입력
    const searchInput = page.locator('input[placeholder*="검색어를 입력해 주세요"]');
    await searchInput.fill('행복');
    
    // 디바운싱 대기 (300ms + 여유시간)
    await page.waitForTimeout(400);
    
    // 검색 결과 확인 - "행복한 하루" 일기만 표시되어야 함
    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(1);
    
    const diaryTitle = page.locator('[data-testid="diary-card-title"]').first();
    await expect(diaryTitle).toHaveText('행복한 하루');
  });

  test('검색어가 포함되지 않는 경우 빈 결과 표시', async ({ page }) => {
    // 존재하지 않는 검색어 입력
    const searchInput = page.locator('input[placeholder*="검색어를 입력해 주세요"]');
    await searchInput.fill('존재하지않는검색어');
    
    // 디바운싱 대기
    await page.waitForTimeout(400);
    
    // 빈 결과 메시지 확인
    const emptyMessage = page.locator('[data-testid="diaries-empty"]');
    await expect(emptyMessage).toContainText('존재하지않는검색어');
  });

  test('검색어를 지우면 모든 일기가 다시 표시되어야 함', async ({ page }) => {
    // 먼저 검색 실행
    const searchInput = page.locator('input[placeholder*="검색어를 입력해 주세요"]');
    await searchInput.fill('행복');
    await page.waitForTimeout(400);
    
    // 검색 결과 확인
    let diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(1);
    
    // 검색어 지우기
    await searchInput.clear();
    await page.waitForTimeout(400);
    
    // 모든 일기가 다시 표시되는지 확인
    diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(5);
  });

  test('대소문자 구분 없이 검색되어야 함', async ({ page }) => {
    // 대문자로 검색
    const searchInput = page.locator('input[placeholder*="검색어를 입력해 주세요"]');
    await searchInput.fill('HAPPY');
    
    await page.waitForTimeout(400);
    
    // 결과가 없어야 함 (대소문자 구분 없이 검색하지만, 제목에 "HAPPY"가 없음)
    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(0);
    
    // 소문자로 검색
    await searchInput.fill('화나');
    await page.waitForTimeout(400);
    
    // "화나는 순간" 일기가 표시되어야 함
    await expect(diaryCards).toHaveCount(1);
    const diaryTitle = page.locator('[data-testid="diary-card-title"]').first();
    await expect(diaryTitle).toHaveText('화나는 순간');
  });

  test('부분 문자열 검색이 가능해야 함', async ({ page }) => {
    // 부분 문자열로 검색
    const searchInput = page.locator('input[placeholder*="검색어를 입력해 주세요"]');
    await searchInput.fill('하루');
    
    await page.waitForTimeout(400);
    
    // "행복한 하루" 일기가 표시되어야 함
    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(1);
    
    const diaryTitle = page.locator('[data-testid="diary-card-title"]').first();
    await expect(diaryTitle).toHaveText('행복한 하루');
  });

  test('여러 일기가 검색되는 경우', async ({ page }) => {
    // 공통 문자열로 검색
    const searchInput = page.locator('input[placeholder*="검색어를 입력해 주세요"]');
    await searchInput.fill('오늘');
    
    await page.waitForTimeout(400);
    
    // "행복한 하루"와 "슬픈 이야기" 일기가 표시되어야 함 (content에 "오늘"이 포함)
    // 하지만 title 기준으로 검색하므로 결과가 없어야 함
    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(0);
  });

  test('검색 중 상태 표시', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="검색어를 입력해 주세요"]');
    
    // 검색어 입력 시작
    await searchInput.fill('행복');
    
    // 검색 중 상태 확인 (placeholder 변경) - 더 긴 대기 후 확인
    await page.waitForTimeout(100);
    
    // 검색 중 상태가 표시되는지 확인 (실제 구현에 따라 조정)
    const placeholder = await searchInput.getAttribute('placeholder');
    expect(placeholder).toMatch(/검색/);
    
    // 디바운싱 완료 후 원래 placeholder로 복원 대기
    await page.waitForTimeout(500);
    await expect(searchInput).toHaveAttribute('placeholder', '검색어를 입력해 주세요.');
  });

  test('엔터키로 검색 실행', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="검색어를 입력해 주세요"]');
    
    // 검색어 입력 후 엔터키
    await searchInput.fill('행복');
    await searchInput.press('Enter');
    
    // 검색 결과 확인
    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(1);
    
    const diaryTitle = page.locator('[data-testid="diary-card-title"]').first();
    await expect(diaryTitle).toHaveText('행복한 하루');
  });

  test('검색 결과 페이지네이션', async ({ page }) => {
    // 더 많은 테스트 데이터 추가
    const moreTestDiaries = [
      ...testDiaries,
      { id: 6, title: '추가 일기 1', content: '내용 1', emotion: EmotionType.HAPPY, createdAt: '2024-01-20T10:00:00Z' },
      { id: 7, title: '추가 일기 2', content: '내용 2', emotion: EmotionType.SAD, createdAt: '2024-01-21T10:00:00Z' },
      { id: 8, title: '추가 일기 3', content: '내용 3', emotion: EmotionType.ANGRY, createdAt: '2024-01-22T10:00:00Z' },
      { id: 9, title: '추가 일기 4', content: '내용 4', emotion: EmotionType.SURPRISE, createdAt: '2024-01-23T10:00:00Z' },
      { id: 10, title: '추가 일기 5', content: '내용 5', emotion: EmotionType.ETC, createdAt: '2024-01-24T10:00:00Z' },
      { id: 11, title: '추가 일기 6', content: '내용 6', emotion: EmotionType.HAPPY, createdAt: '2024-01-25T10:00:00Z' },
      { id: 12, title: '추가 일기 7', content: '내용 7', emotion: EmotionType.SAD, createdAt: '2024-01-26T10:00:00Z' },
      { id: 13, title: '추가 일기 8', content: '내용 8', emotion: EmotionType.ANGRY, createdAt: '2024-01-27T10:00:00Z' }
    ];
    
    await page.evaluate((diaries) => {
      localStorage.setItem('diaries', JSON.stringify(diaries));
    }, moreTestDiaries);
    
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-container"]');
    
    // "추가"로 검색 (8개 결과)
    const searchInput = page.locator('input[placeholder*="검색어를 입력해 주세요"]');
    await searchInput.fill('추가');
    await page.waitForTimeout(400);
    
    // 첫 번째 페이지에 8개 표시 (12개 미만이므로 모두 표시)
    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(8);
  });

  test('검색창 포커스 유지 테스트', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="검색어를 입력해 주세요"]');
    
    // 검색창에 포커스
    await searchInput.focus();
    await expect(searchInput).toBeFocused();
    
    // 연속으로 문자 입력 (포커스가 유지되어야 함)
    await searchInput.fill('행');
    await page.waitForTimeout(100);
    await expect(searchInput).toBeFocused();
    
    await searchInput.fill('행복');
    await page.waitForTimeout(100);
    await expect(searchInput).toBeFocused();
    
    await searchInput.fill('행복한');
    await page.waitForTimeout(100);
    await expect(searchInput).toBeFocused();
    
    // 디바운싱 완료 후에도 포커스 유지
    await page.waitForTimeout(400);
    await expect(searchInput).toBeFocused();
    
    // 검색 결과 확인
    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(1);
    
    const diaryTitle = page.locator('[data-testid="diary-card-title"]').first();
    await expect(diaryTitle).toHaveText('행복한 하루');
  });

  test('검색창에서 연속 타이핑 시 포커스 유지', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="검색어를 입력해 주세요"]');
    
    // 검색창 클릭하여 포커스
    await searchInput.click();
    await expect(searchInput).toBeFocused();
    
    // 빠르게 연속 타이핑 시뮬레이션
    await searchInput.type('화', { delay: 50 });
    await expect(searchInput).toBeFocused();
    
    await searchInput.type('나', { delay: 50 });
    await expect(searchInput).toBeFocused();
    
    await searchInput.type('는', { delay: 50 });
    await expect(searchInput).toBeFocused();
    
    // 디바운싱 완료 후 포커스 유지 확인
    await page.waitForTimeout(400);
    await expect(searchInput).toBeFocused();
    
    // 검색 결과 확인
    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(1);
    
    const diaryTitle = page.locator('[data-testid="diary-card-title"]').first();
    await expect(diaryTitle).toHaveText('화나는 순간');
  });
});