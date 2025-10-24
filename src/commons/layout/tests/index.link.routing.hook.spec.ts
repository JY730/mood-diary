import { test, expect } from '@playwright/test';

/**
 * Layout Link Routing Tests
 * 
 * Layout 컴포넌트의 링크 라우팅 기능을 테스트합니다.
 * - 로고 및 네비게이션 탭 클릭 시 페이지 이동
 * - 현재 경로에 따른 액티브 상태 관리
 * - CSS 스타일 적용 확인
 */
test.describe('Layout Link Routing', () => {
  test.beforeEach(async ({ page }) => {
    // 일기목록 페이지로 이동하여 테스트 시작
    await page.goto('/diaries');
    // 페이지 로드 완료 대기 (data-testid 기반, timeout 500ms 미만)
    await page.waitForSelector('[data-testid="logo"]', { timeout: 400 });
  });

  test('로고 클릭시 일기목록 페이지로 이동', async ({ page }) => {
    // 다른 페이지로 이동 후 로고 클릭 테스트를 위해 임시 페이지로 이동
    await page.goto('/temp');
    await page.waitForSelector('[data-testid="logo"]', { timeout: 400 });
    
    // 로고 클릭
    await page.click('[data-testid="logo"]');
    
    // URL이 /diaries로 변경되었는지 확인
    await expect(page).toHaveURL('/diaries');
  });

  test('일기보관함 탭 클릭시 일기목록 페이지로 이동', async ({ page }) => {
    // 일기보관함 탭 클릭
    await page.click('[data-testid="diaries-tab"]');
    
    // URL이 /diaries로 변경되었는지 확인
    await expect(page).toHaveURL('/diaries');
  });

  test('일기목록 페이지에서 일기보관함 탭이 활성화 상태', async ({ page }) => {
    // 일기보관함 탭이 활성화 상태인지 확인
    const diariesTab = page.locator('[data-testid="diaries-tab"]');
    await expect(diariesTab).toHaveClass(/tabActive/);
    
    // 사진보관함 탭이 비활성화 상태인지 확인
    const picturesTab = page.locator('[data-testid="pictures-tab"]');
    await expect(picturesTab).toHaveClass(/tabInactive/);
  });

  test('일기 상세 페이지에서는 navigation이 숨겨짐 (area hook 적용)', async ({ page }) => {
    // 테스트 데이터 설정
    await page.goto('/diaries');
    await page.evaluate(() => {
      const testDiaries = [
        {
          id: 1,
          title: '테스트 일기',
          content: '테스트 내용',
          emotion: 'HAPPY',
          createdAt: '2024-01-15T10:00:00Z'
        }
      ];
      localStorage.setItem('diaries', JSON.stringify(testDiaries));
    });
    
    // 일기 상세 페이지로 이동 (예시 ID: 1)
    await page.goto('/diaries/1');
    await page.waitForSelector('[data-testid="diary-detail-container"], [data-testid="diary-detail-not-found"]', { timeout: 10000 });
    
    // navigation 영역이 숨겨져 있는지 확인 (area hook에 의해)
    const navigation = page.locator('[data-testid="navigation"]');
    await expect(navigation).toBeHidden();
    
    // 따라서 navigation 내부의 탭들도 존재하지 않음
    const diariesTab = page.locator('[data-testid="diaries-tab"]');
    await expect(diariesTab).not.toBeVisible();
    
    const picturesTab = page.locator('[data-testid="pictures-tab"]');
    await expect(picturesTab).not.toBeVisible();
  });

  // /pictures 경로는 테스트 skip 대상이므로 테스트하지 않음
  test.skip('사진보관함 탭 관련 테스트는 skip', async () => {
    // 이 테스트는 요구사항에 따라 skip
  });

  test('네비게이션 탭들이 클릭 가능한 상태 (cursor: pointer)', async ({ page }) => {
    // 일기보관함 탭의 cursor 스타일 확인
    const diariesTab = page.locator('[data-testid="diaries-tab"]');
    const diariesCursor = await diariesTab.evaluate(el => getComputedStyle(el).cursor);
    expect(diariesCursor).toBe('pointer');
    
    // 사진보관함 탭의 cursor 스타일 확인
    const picturesTab = page.locator('[data-testid="pictures-tab"]');
    const picturesCursor = await picturesTab.evaluate(el => getComputedStyle(el).cursor);
    expect(picturesCursor).toBe('pointer');
    
    // 로고의 cursor 스타일 확인
    const logo = page.locator('[data-testid="logo"]');
    const logoCursor = await logo.evaluate(el => getComputedStyle(el).cursor);
    expect(logoCursor).toBe('pointer');
  });

  test('URL 상수를 통한 라우팅 확인', async ({ page }) => {
    // 일기보관함 클릭 후 정확한 경로로 이동하는지 확인
    await page.click('[data-testid="diaries-tab"]');
    await expect(page).toHaveURL('/diaries');
    
    // 로고 클릭 후 정확한 경로로 이동하는지 확인
    await page.goto('/temp');
    await page.waitForSelector('[data-testid="logo"]', { timeout: 400 });
    await page.click('[data-testid="logo"]');
    await expect(page).toHaveURL('/diaries');
  });

  test('액티브 상태 변경 시 CSS 클래스 전환 테스트', async ({ page }) => {
    // 초기 상태: 일기보관함 탭이 활성화
    const diariesTab = page.locator('[data-testid="diaries-tab"]');
    const picturesTab = page.locator('[data-testid="pictures-tab"]');
    
    await expect(diariesTab).toHaveClass(/tabActive/);
    await expect(picturesTab).toHaveClass(/tabInactive/);
    
    // 일기보관함 탭 텍스트가 활성화 상태인지 확인
    const diariesTabText = diariesTab.locator('span');
    await expect(diariesTabText).toHaveClass(/tabActiveText/);
    
    // 사진보관함 탭 텍스트가 비활성화 상태인지 확인
    const picturesTabText = picturesTab.locator('span');
    await expect(picturesTabText).toHaveClass(/tabInactiveText/);
  });

  test('페이지 로드 후 초기 액티브 상태 확인', async ({ page }) => {
    // 홈페이지로 이동 후 일기 페이지로 이동
    await page.goto('/');
    await page.goto('/diaries');
    await page.waitForSelector('[data-testid="logo"]', { timeout: 400 });
    
    // 페이지 로드 후 즉시 액티브 상태 확인
    const diariesTab = page.locator('[data-testid="diaries-tab"]');
    const picturesTab = page.locator('[data-testid="pictures-tab"]');
    
    // 일기보관함이 활성화, 사진보관함이 비활성화 상태여야 함
    await expect(diariesTab).toHaveClass(/tabActive/);
    await expect(picturesTab).toHaveClass(/tabInactive/);
  });

  test('다양한 경로에서의 액티브 상태 테스트', async ({ page }) => {
    // 루트 경로에서 테스트
    await page.goto('/');
    await page.waitForSelector('[data-testid="logo"]', { timeout: 10000 });
    
    const diariesTab = page.locator('[data-testid="diaries-tab"]');
    const picturesTab = page.locator('[data-testid="pictures-tab"]');
    
    // 루트에서는 일기보관함이 비활성화 상태여야 함
    await expect(diariesTab).toHaveClass(/tabInactive/);
    await expect(picturesTab).toHaveClass(/tabInactive/);
    
    // 일기 목록으로 이동
    await page.goto('/diaries');
    await page.waitForSelector('[data-testid="logo"]', { timeout: 400 });
    
    // 일기 페이지에서는 일기보관함이 활성화
    await expect(diariesTab).toHaveClass(/tabActive/);
    await expect(picturesTab).toHaveClass(/tabInactive/);
  });

  test('네비게이션 상태 변경의 실시간 반영 테스트', async ({ page }) => {
    // 임시 페이지에서 시작
    await page.goto('/temp');
    await page.waitForSelector('[data-testid="logo"]', { timeout: 400 });
    
    const diariesTab = page.locator('[data-testid="diaries-tab"]');
    const picturesTab = page.locator('[data-testid="pictures-tab"]');
    
    // 초기 상태 확인 (temp 페이지에서는 모두 비활성화)
    await expect(diariesTab).toHaveClass(/tabInactive/);
    await expect(picturesTab).toHaveClass(/tabInactive/);
    
    // 일기보관함 클릭 시 즉시 상태 변경 확인
    await page.click('[data-testid="diaries-tab"]');
    
    // URL 변경과 동시에 액티브 상태도 변경되어야 함
    await expect(page).toHaveURL('/diaries');
    await expect(diariesTab).toHaveClass(/tabActive/);
    await expect(picturesTab).toHaveClass(/tabInactive/);
  });
});
