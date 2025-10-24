import { test, expect } from '@playwright/test';

/**
 * Layout Area Hook Tests
 * 
 * Layout 컴포넌트의 UI 영역 노출 제어 기능을 테스트합니다.
 * - URL 기반 UI 컴포넌트 노출 여부 제어
 * - header, banner, navigation, footer 영역 표시 상태 관리
 * - 경로별 UI 영역 노출 규칙 확인
 */
test.describe('Layout Area Hook - UI Components Visibility', () => {
  test('diaries 페이지에서 모든 영역이 노출되어야 함', async ({ page }) => {
    await page.goto('/diaries', { waitUntil: 'domcontentloaded' });
    
    // 페이지 로딩 대기
    await page.waitForSelector('[data-testid="diaries-container"]', { timeout: 10000 });
    
    // header 영역 확인 (timeout 없이 직접 확인)
    const header = page.locator('[data-testid="header"]');
    await expect(header).toBeVisible();
    
    // header 내 로고 확인
    const logo = page.locator('[data-testid="logo"]');
    await expect(logo).toBeVisible();

    // banner 영역 확인
    const banner = page.locator('[data-testid="banner"]');
    await expect(banner).toBeVisible();

    // navigation 영역 확인
    const navigation = page.locator('[data-testid="navigation"]');
    await expect(navigation).toBeVisible();

    // footer 영역 확인
    const footer = page.locator('[data-testid="footer"]');
    await expect(footer).toBeVisible();
  });

  test('diaries/[id] 페이지에서 header, footer만 노출되어야 함', async ({ page }) => {
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
    
    await page.goto('/diaries/1', { waitUntil: 'domcontentloaded' });
    
    // 페이지 로딩 대기 - diary-detail-container 또는 not-found 메시지가 로드될 때까지 대기
    await page.waitForSelector('[data-testid="diary-detail-container"], [data-testid="diary-detail-not-found"]', { timeout: 10000 });
    
    // header 영역 확인
    const header = page.locator('[data-testid="header"]');
    await expect(header).toBeVisible();
    
    // header 내 로고 확인
    const logo = page.locator('[data-testid="logo"]');
    await expect(logo).toBeVisible();

    // banner 영역 숨김 확인
    const banner = page.locator('[data-testid="banner"]');
    await expect(banner).toBeHidden();

    // navigation 영역 숨김 확인
    const navigation = page.locator('[data-testid="navigation"]');
    await expect(navigation).toBeHidden();

    // footer 영역 확인
    const footer = page.locator('[data-testid="footer"]');
    await expect(footer).toBeVisible();
  });

  test.skip('pictures 페이지에서 모든 영역이 노출되어야 함', async ({ page }) => {
    await page.goto('/pictures');

    // header 영역 확인
    const header = page.locator('[data-testid="header"]');
    await expect(header).toBeVisible();
    
    // header 내 로고 확인
    const logo = page.locator('[data-testid="logo"]');
    await expect(logo).toBeVisible();

    // banner 영역 확인
    const banner = page.locator('[data-testid="banner"]');
    await expect(banner).toBeVisible();

    // navigation 영역 확인
    const navigation = page.locator('[data-testid="navigation"]');
    await expect(navigation).toBeVisible();

    // footer 영역 확인
    const footer = page.locator('[data-testid="footer"]');
    await expect(footer).toBeVisible();
  });

  test('홈 페이지(/)에서 모든 영역이 노출되어야 함', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // header 영역 확인 (timeout 없이 직접 확인)
    const header = page.locator('[data-testid="header"]');
    await expect(header).toBeVisible();
    
    // header 내 로고 확인
    const logo = page.locator('[data-testid="logo"]');
    await expect(logo).toBeVisible();

    // banner 영역 확인
    const banner = page.locator('[data-testid="banner"]');
    await expect(banner).toBeVisible();

    // navigation 영역 확인
    const navigation = page.locator('[data-testid="navigation"]');
    await expect(navigation).toBeVisible();

    // footer 영역 확인
    const footer = page.locator('[data-testid="footer"]');
    await expect(footer).toBeVisible();
  });

  test('/auth/login 페이지 테스트는 skip 대상', async () => {
    // 이 테스트는 요구사항에 따라 skip 처리됨
    // /auth/login 경로는 테스트 제외 대상
  });

  test('/auth/signup 페이지 테스트는 skip 대상', async () => {
    // 이 테스트는 요구사항에 따라 skip 처리됨
    // /auth/signup 경로는 테스트 제외 대상
  });

  test('존재하지 않는 경로에서 기본 설정 적용 확인', async ({ page }) => {
    await page.goto('/nonexistent');
    
    // 기본 설정으로 모든 영역이 노출되어야 함
    const header = page.locator('[data-testid="header"]');
    await expect(header).toBeVisible();
    
    const logo = page.locator('[data-testid="logo"]');
    await expect(logo).toBeVisible();

    const banner = page.locator('[data-testid="banner"]');
    await expect(banner).toBeVisible();

    const navigation = page.locator('[data-testid="navigation"]');
    await expect(navigation).toBeVisible();

    const footer = page.locator('[data-testid="footer"]');
    await expect(footer).toBeVisible();
  });

  test('URL 상수 기반 경로 설정 확인', async ({ page }) => {
    // /diaries 경로에서 URL 상수 기반 설정이 올바르게 적용되는지 확인
    await page.goto('/diaries');
    
    // URL 상수에 정의된 DIARIES_LIST 설정에 따른 UI 노출 확인
    const header = page.locator('[data-testid="header"]');
    const banner = page.locator('[data-testid="banner"]');
    const navigation = page.locator('[data-testid="navigation"]');
    const footer = page.locator('[data-testid="footer"]');
    
    // 모든 영역이 노출되어야 함 (PAGE_CONFIGS.DIARIES_LIST 설정)
    await expect(header).toBeVisible();
    await expect(banner).toBeVisible();
    await expect(navigation).toBeVisible();
    await expect(footer).toBeVisible();
  });
});
