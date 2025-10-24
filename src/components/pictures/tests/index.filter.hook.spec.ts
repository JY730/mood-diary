import { test, expect } from '@playwright/test';

test.describe.skip('강아지 사진 필터 기능', () => {
  test.beforeEach(async ({ page }) => {
    // /pictures 페이지로 이동
    await page.goto('/pictures');
    
    // 페이지가 완전히 로드될 때까지 대기 (data-testid 기반)
    await page.waitForSelector('[data-testid="pictures-container"]', { timeout: 10000 });
    
    // 이미지 로딩 대기
    await page.waitForSelector('[data-testid="dog-image"]', { timeout: 10000 });
    
    // 필터 선택 요소 대기
    await page.waitForSelector('[data-testid="driver-select"]', { timeout: 10000 });
  });

  test('기본 필터가 선택되어 있고 이미지 크기가 640x640인지 확인', async ({ page }) => {
    // 필터 선택박스가 기본값으로 설정되어 있는지 확인
    const filterSelect = page.locator('[data-testid="driver-select"]');
    await expect(filterSelect).toHaveValue('default');

    // 이미지 카드들의 크기가 640x640인지 확인
    const imageCards = page.locator('[data-testid="dog-image"]').first();
    await expect(imageCards).toHaveCSS('width', '640px');
    await expect(imageCards).toHaveCSS('height', '640px');
  });

  test('가로형 필터 선택 시 이미지 크기가 640x480으로 변경되는지 확인', async ({ page }) => {
    // 필터를 가로형으로 변경
    const filterSelect = page.locator('[data-testid="driver-select"]');
    await filterSelect.selectOption('horizontal');

    // 이미지 카드들의 크기가 640x480으로 변경되었는지 확인
    const imageCards = page.locator('[data-testid="dog-image"]').first();
    await expect(imageCards).toHaveCSS('width', '640px');
    await expect(imageCards).toHaveCSS('height', '480px');
  });

  test('세로형 필터 선택 시 이미지 크기가 480x640으로 변경되는지 확인', async ({ page }) => {
    // 필터를 세로형으로 변경
    const filterSelect = page.locator('[data-testid="driver-select"]');
    await filterSelect.selectOption('vertical');

    // 이미지 카드들의 크기가 480x640으로 변경되었는지 확인
    const imageCards = page.locator('[data-testid="dog-image"]').first();
    await expect(imageCards).toHaveCSS('width', '480px');
    await expect(imageCards).toHaveCSS('height', '640px');
  });

  test('필터 변경 시 모든 이미지가 동일한 크기로 변경되는지 확인', async ({ page }) => {
    // 가로형 필터로 변경
    const filterSelect = page.locator('[data-testid="driver-select"]');
    await filterSelect.selectOption('horizontal');

    // 모든 이미지 카드들의 크기가 640x480인지 확인
    const imageCards = page.locator('[data-testid="dog-image"]');
    const count = await imageCards.count();
    
    for (let i = 0; i < count; i++) {
      const image = imageCards.nth(i);
      await expect(image).toHaveCSS('width', '640px');
      await expect(image).toHaveCSS('height', '480px');
    }
  });

  test('필터 옵션이 올바르게 표시되는지 확인', async ({ page }) => {
    const filterSelect = page.locator('[data-testid="driver-select"]');
    
    // 옵션들이 올바르게 표시되는지 확인
    await expect(filterSelect.locator('option[value="default"]')).toHaveText('기본');
    await expect(filterSelect.locator('option[value="horizontal"]')).toHaveText('가로형');
    await expect(filterSelect.locator('option[value="vertical"]')).toHaveText('세로형');
  });

  test('필터 변경 시 UI 반응성이 빠른지 확인', async ({ page }) => {
    const filterSelect = page.locator('[data-testid="driver-select"]');
    
    // 필터 변경 시간 측정
    const startTime = Date.now();
    await filterSelect.selectOption('horizontal');
    const endTime = Date.now();
    
    // 필터 변경이 500ms 이내에 완료되는지 확인
    expect(endTime - startTime).toBeLessThan(500);
    
    // 변경된 이미지 크기가 즉시 반영되는지 확인
    const imageCards = page.locator('[data-testid="dog-image"]').first();
    await expect(imageCards).toHaveCSS('width', '640px');
    await expect(imageCards).toHaveCSS('height', '480px');
  });

  test('필터 변경 시 무한스크롤이 정상 동작하는지 확인', async ({ page }) => {
    // 가로형 필터로 변경
    const filterSelect = page.locator('[data-testid="driver-select"]');
    await filterSelect.selectOption('horizontal');
    
    // 스크롤하여 추가 이미지 로딩 확인
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    
    // 추가 이미지가 로드될 때까지 대기
    await page.waitForTimeout(1000);
    
    // 이미지 개수가 증가했는지 확인
    const imageCount = await page.locator('[data-testid="dog-image"]').count();
    expect(imageCount).toBeGreaterThan(6); // 초기 6개보다 많아야 함
  });

  test.skip('키보드 네비게이션으로 필터 선택이 가능한지 확인', async ({ page }) => {
    const filterSelect = page.locator('[data-testid="driver-select"]');
    
    // 필터 선택박스에 포커스
    await filterSelect.focus();
    
    // Tab 키로 다음 옵션으로 이동
    await page.keyboard.press('Tab');
    
    // Enter 키로 드롭다운 열기
    await page.keyboard.press('Enter');
    
    // Arrow Down으로 다음 옵션 선택
    await page.keyboard.press('ArrowDown');
    
    // Enter로 선택 확인
    await page.keyboard.press('Enter');
    
    // 선택된 값 확인
    await expect(filterSelect).toHaveValue('horizontal');
  });

  test.skip('필터 변경 후 스크롤 위치가 유지되는지 확인', async ({ page }) => {
    // 페이지 중간으로 스크롤
    await page.evaluate(() => {
      window.scrollTo(0, 500);
    });
    
    const scrollPosition = await page.evaluate(() => window.scrollY);
    
    // 필터 변경
    const filterSelect = page.locator('[data-testid="driver-select"]');
    await filterSelect.selectOption('vertical');
    
    // 스크롤 위치가 유지되는지 확인
    const newScrollPosition = await page.evaluate(() => window.scrollY);
    expect(newScrollPosition).toBeCloseTo(scrollPosition, 0);
  });
});
