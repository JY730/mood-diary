import { test, expect } from '@playwright/test';
import { EmotionType } from '@/commons/constants/enum';

// 테스트 데이터 타입 정의
interface DiaryData {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
}

test.describe('일기 삭제 기능', () => {
  // 테스트용 일기 데이터
  const testDiary: DiaryData = {
    id: 1,
    title: '테스트 일기',
    content: '테스트 내용입니다.',
    emotion: EmotionType.HAPPY,
    createdAt: '2024-01-01T00:00:00.000Z'
  };

  test.beforeEach(async ({ page }) => {
    // 로컬스토리지에 테스트 데이터 설정
    await page.addInitScript((diary) => {
      localStorage.setItem('diaries', JSON.stringify([diary]));
    }, testDiary);
  });

  test('일기 삭제 모달 표시 및 취소', async ({ page }) => {
    // /diaries/1 페이지로 이동
    await page.goto('/diaries/1', { waitUntil: 'domcontentloaded' });
    
    // 페이지 로드 확인
    await expect(page.getByTestId('diary-detail-container')).toBeVisible();
    
    // 삭제 버튼 클릭
    await page.getByRole('button', { name: '삭제' }).click();
    
    // 삭제 모달 표시 확인
    await expect(page.getByTestId('modal')).toBeVisible();
    await expect(page.getByTestId('modal-title')).toHaveText('일기 삭제');
    await expect(page.getByTestId('modal-description')).toContainText('테스트 일기');
    
    // 취소 버튼 클릭
    await page.getByTestId('modal-cancel-button').click();
    
    // 모달 닫힘 확인
    await expect(page.getByTestId('modal')).not.toBeVisible();
    
    // 일기 상세 페이지가 여전히 표시되는지 확인
    await expect(page.getByTestId('diary-detail-container')).toBeVisible();
  });

  test('일기 삭제 확인 및 페이지 이동', async ({ page }) => {
    // /diaries/1 페이지로 이동
    await page.goto('/diaries/1', { waitUntil: 'domcontentloaded' });
    
    // 페이지 로드 확인
    await expect(page.getByTestId('diary-detail-container')).toBeVisible();
    
    // 삭제 버튼 클릭
    await page.getByRole('button', { name: '삭제' }).click();
    
    // 삭제 모달 표시 확인
    await expect(page.getByTestId('modal')).toBeVisible();
    
    // 삭제 확인 버튼 클릭
    await page.getByTestId('modal-confirm-button').click();
    
    // /diaries 페이지로 이동 확인
    await expect(page).toHaveURL('/diaries');
    
    // 로컬스토리지에서 일기가 삭제되었는지 확인
    const diaries = await page.evaluate(() => {
      const diariesJson = localStorage.getItem('diaries');
      return diariesJson ? JSON.parse(diariesJson) : [];
    });
    
    expect(diaries).toHaveLength(0);
  });

  test('삭제 후 일기 목록에서 해당 일기가 사라짐', async ({ page }) => {
    // /diaries/1 페이지로 이동
    await page.goto('/diaries/1', { waitUntil: 'domcontentloaded' });
    
    // 삭제 버튼 클릭
    await page.getByRole('button', { name: '삭제' }).click();
    
    // 삭제 확인
    await page.getByTestId('modal-confirm-button').click();
    
    // /diaries 페이지로 이동 확인
    await expect(page).toHaveURL('/diaries');
    
    // 일기 목록에서 해당 일기가 없는지 확인
    await expect(page.getByText('테스트 일기')).not.toBeVisible();
  });

  test('삭제 모달 오버레이 클릭으로 닫기', async ({ page }) => {
    // /diaries/1 페이지로 이동
    await page.goto('/diaries/1', { waitUntil: 'domcontentloaded' });
    
    // 삭제 버튼 클릭
    await page.getByRole('button', { name: '삭제' }).click();
    
    // 모달 표시 확인
    await expect(page.getByTestId('modal')).toBeVisible();
    
    // 오버레이 클릭 (모달 외부 영역 클릭)
    await page.locator('[data-testid="modal"]').locator('..').locator('..').click({ position: { x: 10, y: 10 } });
    
    // 모달 닫힘 확인
    await expect(page.getByTestId('modal')).not.toBeVisible();
  });
});