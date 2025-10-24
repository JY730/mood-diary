import { test, expect } from '@playwright/test';

test.describe('일기 필터 기능 테스트', () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지에 테스트 데이터 설정
    const testData = [
      {
        id: 1,
        title: '행복한 하루',
        content: '오늘은 정말 행복한 하루였어요!',
        emotion: 'HAPPY',
        createdAt: '2024-01-01T00:00:00.000Z'
      },
      {
        id: 2,
        title: '슬픈 하루',
        content: '오늘은 정말 슬픈 하루였어요.',
        emotion: 'SAD',
        createdAt: '2024-01-02T00:00:00.000Z'
      },
      {
        id: 3,
        title: '화난 하루',
        content: '오늘은 정말 화가 났어요.',
        emotion: 'ANGRY',
        createdAt: '2024-01-03T00:00:00.000Z'
      },
      {
        id: 4,
        title: '놀라운 하루',
        content: '오늘은 정말 놀라운 하루였어요!',
        emotion: 'SURPRISE',
        createdAt: '2024-01-04T00:00:00.000Z'
      },
      {
        id: 5,
        title: '기타 감정',
        content: '오늘은 복잡한 감정이었어요.',
        emotion: 'ETC',
        createdAt: '2024-01-05T00:00:00.000Z'
      }
    ];

    // 페이지로 이동
    await page.goto('/diaries');
    
    // 로컬스토리지에 데이터 설정 (페이지 로드 후)
    await page.evaluate((data) => {
      localStorage.setItem('diaries', JSON.stringify(data));
    }, testData);
    
    // 페이지 새로고침하여 데이터 로드
    await page.reload();
    
    // 페이지 로드 대기 (data-testid 사용)
    await page.waitForSelector('[data-testid="diaries-container"]', { timeout: 10000 });
  });

  test('필터 선택박스 클릭 시 메뉴 확인', async ({ page }) => {
    // 필터 선택박스 클릭 (role="combobox" 사용)
    const selectbox = page.locator('[role="combobox"]').first();
    await selectbox.click();

    // 선택 가능한 메뉴 확인 (드롭다운 내부의 옵션들)
    await expect(page.locator('#selectbox-dropdown .styles_optionText__xBAmI').filter({ hasText: '전체' })).toBeVisible();
    await expect(page.locator('#selectbox-dropdown .styles_optionText__xBAmI').filter({ hasText: '행복해요' })).toBeVisible();
    await expect(page.locator('#selectbox-dropdown .styles_optionText__xBAmI').filter({ hasText: '슬퍼요' })).toBeVisible();
    await expect(page.locator('#selectbox-dropdown .styles_optionText__xBAmI').filter({ hasText: '놀랐어요' })).toBeVisible();
    await expect(page.locator('#selectbox-dropdown .styles_optionText__xBAmI').filter({ hasText: '화나요' })).toBeVisible();
    await expect(page.locator('#selectbox-dropdown .styles_optionText__xBAmI').filter({ hasText: '기타' })).toBeVisible();
  });

  test('전체 필터 선택 시 모든 일기 카드 노출', async ({ page }) => {
    // 전체 필터 선택
    const selectbox = page.locator('[role="combobox"]').first();
    await selectbox.click();
    await page.locator('#selectbox-dropdown .styles_optionText__xBAmI').filter({ hasText: '전체' }).click();

    // 모든 일기 카드가 노출되는지 확인 (5개)
    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(5);
  });

  test('행복해요 필터 선택 시 해당 감정 일기만 노출', async ({ page }) => {
    // 행복해요 필터 선택
    const selectbox = page.locator('[role="combobox"]').first();
    await selectbox.click();
    await page.locator('#selectbox-dropdown .styles_optionText__xBAmI').filter({ hasText: '행복해요' }).click();

    // 행복한 감정의 일기만 노출되는지 확인
    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(1);
    
    const emotionText = page.locator('[data-testid="diary-card-emotion"]').first();
    await expect(emotionText).toHaveText('행복해요');
  });

  test('슬퍼요 필터 선택 시 해당 감정 일기만 노출', async ({ page }) => {
    // 슬퍼요 필터 선택
    const selectbox = page.locator('[role="combobox"]').first();
    await selectbox.click();
    await page.locator('#selectbox-dropdown .styles_optionText__xBAmI').filter({ hasText: '슬퍼요' }).click();

    // 슬픈 감정의 일기만 노출되는지 확인
    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(1);
    
    const emotionText = page.locator('[data-testid="diary-card-emotion"]').first();
    await expect(emotionText).toHaveText('슬퍼요');
  });

  test('놀랐어요 필터 선택 시 해당 감정 일기만 노출', async ({ page }) => {
    // 놀랐어요 필터 선택
    const selectbox = page.locator('[role="combobox"]').first();
    await selectbox.click();
    await page.locator('#selectbox-dropdown .styles_optionText__xBAmI').filter({ hasText: '놀랐어요' }).click();

    // 놀란 감정의 일기만 노출되는지 확인
    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(1);
    
    const emotionText = page.locator('[data-testid="diary-card-emotion"]').first();
    await expect(emotionText).toHaveText('놀랐어요');
  });

  test('화나요 필터 선택 시 해당 감정 일기만 노출', async ({ page }) => {
    // 화나요 필터 선택
    const selectbox = page.locator('[role="combobox"]').first();
    await selectbox.click();
    await page.locator('#selectbox-dropdown .styles_optionText__xBAmI').filter({ hasText: '화나요' }).click();

    // 화난 감정의 일기만 노출되는지 확인
    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(1);
    
    const emotionText = page.locator('[data-testid="diary-card-emotion"]').first();
    await expect(emotionText).toHaveText('화나요');
  });

  test('기타 필터 선택 시 해당 감정 일기만 노출', async ({ page }) => {
    // 기타 필터 선택
    const selectbox = page.locator('[role="combobox"]').first();
    await selectbox.click();
    await page.locator('#selectbox-dropdown .styles_optionText__xBAmI').filter({ hasText: '기타' }).click();

    // 기타 감정의 일기만 노출되는지 확인
    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(1);
    
    const emotionText = page.locator('[data-testid="diary-card-emotion"]').first();
    await expect(emotionText).toHaveText('기타');
  });

  test('검색 결과 필터하기 - 검색 후 필터 적용', async ({ page }) => {
    // 검색어 입력
    const searchInput = page.locator('input[placeholder*="검색어"]');
    await searchInput.fill('하루');
    await searchInput.press('Enter');

    // 검색 결과 대기
    await page.waitForTimeout(100);

    // 행복해요 필터 선택
    const selectbox = page.locator('[role="combobox"]').first();
    await selectbox.click();
    await page.locator('#selectbox-dropdown .styles_optionText__xBAmI').filter({ hasText: '행복해요' }).click();

    // 검색된 결과 중 행복한 감정의 일기만 노출되는지 확인
    const diaryCards = page.locator('[data-testid="diary-card"]');
    await expect(diaryCards).toHaveCount(1);
    
    const emotionText = page.locator('[data-testid="diary-card-emotion"]').first();
    await expect(emotionText).toHaveText('행복해요');
    
    const titleText = page.locator('[data-testid="diary-card-title"]').first();
    await expect(titleText).toHaveText('행복한 하루');
  });
});
