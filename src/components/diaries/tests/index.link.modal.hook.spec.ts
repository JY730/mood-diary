import { test, expect } from '@playwright/test';

/**
 * Diaries Link Modal Hook Tests
 * 
 * 일기 작성 모달 권한분기 기능을 테스트합니다.
 * - 비로그인 유저: 로그인 요청 모달 표시
 * - 로그인 유저: 일기 작성 모달 표시
 * 
 * TDD 기반 Playwright 테스트
 */
test.describe('Diaries Link Modal Hook Tests', () => {
  test.beforeEach(async ({ page }) => {
    // 테스트 환경 설정
    await page.goto('/diaries', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('[data-testid="diaries-container"]', { timeout: 2000 });
  });

  test.describe('비로그인 유저 테스트', () => {
    test.beforeEach(async ({ page }) => {
      // 비로그인 상태로 설정
      await page.evaluate(() => {
        window.__TEST_BYPASS__ = false;
      });
    });

    test.skip('일기쓰기 버튼 클릭 시 로그인 요청 모달 노출', async ({ page }) => {
      // 일기쓰기 버튼 클릭
      await page.click('[data-testid="diaries-write-button"]');
      
      // 로그인 요청 모달 노출 확인 (더 유연한 텍스트 매칭)
      await expect(page.locator('[data-testid="login-modal"]')).toBeVisible();
      await expect(page.locator('text=로그인')).toBeVisible();
      await expect(page.locator('text=취소')).toBeVisible();
    });
  });

  test.describe('로그인 유저 테스트', () => {
    test.beforeEach(async ({ page }) => {
      // 로그인 상태로 설정
      await page.evaluate(() => {
        window.__TEST_BYPASS__ = true;
      });
    });

    test.skip('일기쓰기 버튼 클릭 시 일기쓰기 페이지 모달 노출', async ({ page }) => {
      // 일기쓰기 버튼 클릭
      await page.click('[data-testid="diaries-write-button"]');
      
      // 일기쓰기 페이지 모달 노출 확인
      await expect(page.locator('[data-testid="diaries-new-modal"]')).toBeVisible();
    });
  });
});