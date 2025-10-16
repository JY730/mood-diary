import { test, expect } from '@playwright/test';
import { EmotionType } from '@/commons/constants/enum';

test.describe('Diaries Link Routing Hook', () => {
  test.beforeEach(async ({ page, context }) => {
    // 테스트 데이터 준비 (실제 데이터)
    const testDiaries = [
      {
        id: 1,
        title: '즐거운 하루',
        content: '오늘은 정말 즐거운 하루였다.',
        emotion: EmotionType.HAPPY,
        createdAt: '2024-01-15T10:30:00.000Z'
      },
      {
        id: 2,
        title: '슬픈 하루',
        content: '오늘은 슬픈 일이 있었다.',
        emotion: EmotionType.SAD,
        createdAt: '2024-01-14T09:20:00.000Z'
      },
      {
        id: 3,
        title: '화나는 하루',
        content: '오늘은 화나는 일이 있었다.',
        emotion: EmotionType.ANGRY,
        createdAt: '2024-01-13T14:15:00.000Z'
      }
    ];

    // 로컬스토리지에 실제 데이터 저장
    await context.addInitScript((diaries) => {
      localStorage.setItem('diaries', JSON.stringify(diaries));
    }, testDiaries);

    // /diaries 페이지로 이동
    await page.goto('/diaries');
    
    // 페이지가 완전히 로드될 때까지 대기 (data-testid로 식별)
    await page.waitForSelector('[data-testid="diaries-container"]');
  });

  test('일기 카드 클릭 시 해당 일기의 상세 페이지로 이동한다', async ({ page }) => {
    // 첫 번째 일기 카드 찾기
    const firstCard = page.locator('[data-testid="diary-card"]').first();
    await expect(firstCard).toBeVisible();

    // 일기 카드가 pointer cursor를 가지는지 확인
    const cursorStyle = await firstCard.evaluate((el) => {
      return window.getComputedStyle(el).cursor;
    });
    expect(cursorStyle).toBe('pointer');

    // 일기 카드 클릭
    await firstCard.click();

    // URL이 /diaries/1로 변경되었는지 확인
    await page.waitForURL('**/diaries/1');
    expect(page.url()).toContain('/diaries/1');
  });

  test('두 번째 일기 카드 클릭 시 해당 일기의 상세 페이지로 이동한다', async ({ page }) => {
    // 두 번째 일기 카드 찾기
    const secondCard = page.locator('[data-testid="diary-card"]').nth(1);
    await expect(secondCard).toBeVisible();

    // 일기 카드 클릭
    await secondCard.click();

    // URL이 /diaries/2로 변경되었는지 확인
    await page.waitForURL('**/diaries/2');
    expect(page.url()).toContain('/diaries/2');
  });

  test('세 번째 일기 카드 클릭 시 해당 일기의 상세 페이지로 이동한다', async ({ page }) => {
    // 세 번째 일기 카드 찾기
    const thirdCard = page.locator('[data-testid="diary-card"]').nth(2);
    await expect(thirdCard).toBeVisible();

    // 일기 카드 클릭
    await thirdCard.click();

    // URL이 /diaries/3으로 변경되었는지 확인
    await page.waitForURL('**/diaries/3');
    expect(page.url()).toContain('/diaries/3');
  });

  test('삭제 아이콘 클릭 시 페이지 이동하지 않는다', async ({ page }) => {
    // 첫 번째 일기 카드의 삭제 버튼 찾기
    const firstCard = page.locator('[data-testid="diary-card"]').first();
    const deleteButton = firstCard.locator('button').first();
    
    await expect(deleteButton).toBeVisible();

    // 현재 URL 저장
    const currentUrl = page.url();

    // URL 변경 이벤트를 감지하는 Promise 생성
    const urlChangedPromise = page.waitForURL((url) => url.href !== currentUrl, { timeout: 500 })
      .then(() => true)
      .catch(() => false);

    // 삭제 버튼 클릭
    await deleteButton.click();

    // URL이 변경되지 않았는지 확인
    const urlChanged = await urlChangedPromise;
    expect(urlChanged).toBe(false);
    expect(page.url()).toBe(currentUrl);
    expect(page.url()).toContain('/diaries');
    expect(page.url()).not.toContain('/diaries/');
  });

  test('여러 일기 카드를 순차적으로 클릭하여 이동할 수 있다', async ({ page }) => {
    // 첫 번째 카드 클릭
    const firstCard = page.locator('[data-testid="diary-card"]').first();
    await firstCard.click();
    await page.waitForURL('**/diaries/1');
    expect(page.url()).toContain('/diaries/1');

    // 목록 페이지로 돌아가기
    await page.goto('/diaries');
    await page.waitForSelector('[data-testid="diaries-container"]');

    // 두 번째 카드 클릭
    const secondCard = page.locator('[data-testid="diary-card"]').nth(1);
    await secondCard.click();
    await page.waitForURL('**/diaries/2');
    expect(page.url()).toContain('/diaries/2');
  });

  test('일기 카드가 없을 때 에러가 발생하지 않는다', async ({ page, context }) => {
    // 빈 데이터로 로컬스토리지 설정
    await context.addInitScript(() => {
      localStorage.setItem('diaries', JSON.stringify([]));
    });

    // /diaries 페이지로 다시 이동
    await page.goto('/diaries');
    await page.waitForSelector('[data-testid="diaries-container"]');

    // 빈 상태 메시지 확인
    const emptyMessage = page.locator('[data-testid="diaries-empty"]');
    await expect(emptyMessage).toBeVisible();

    // 일기 카드가 없는지 확인
    const cards = page.locator('[data-testid="diary-card"]');
    await expect(cards).toHaveCount(0);
  });
});

