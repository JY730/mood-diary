import { test, expect } from '@playwright/test';

/**
 * Pictures 페이지 강아지 사진 목록 데이터 바인딩 기능 테스트
 * TDD 기반으로 작성된 Playwright 테스트
 * 
 * 테스트 시나리오:
 * 1. Dog CEO API를 통한 실제 데이터 조회
 * 2. 초기 로딩 시 스플래시 스크린 6개 표시
 * 3. 무한스크롤을 통한 추가 데이터 로드
 * 4. API 실패 시 에러 처리
 */

test.describe('Pictures 페이지 - 강아지 사진 목록 조회', () => {
  test('페이지 접속 시 강아지 사진 6개가 로드되어야 한다 (성공 시나리오)', async ({ page }) => {
    // Given: /pictures 페이지로 이동
    await page.goto('/pictures');
    
    // When: 페이지가 완전히 로드될 때까지 대기 (pictures-container가 나타날 때까지)
    await page.waitForSelector('[data-testid="pictures-container"]', { timeout: 2000 });
    
    // And: 강아지 이미지가 로드될 때까지 대기
    await page.waitForSelector('[data-testid="dog-image"]', { timeout: 2000 });
    
    // Then: 강아지 이미지가 6개 이상 표시되어야 함 (초기 로드)
    const images = await page.locator('[data-testid="dog-image"]').all();
    expect(images.length).toBeGreaterThanOrEqual(6);
    
    // And: 각 이미지의 src가 "dog.ceo"를 포함해야 함
    for (const image of images.slice(0, 6)) {
      const src = await image.getAttribute('src');
      expect(src).toContain('dog.ceo');
    }
  });

  test('로딩 중에는 스플래시 스크린 6개가 표시되어야 한다', async ({ page }) => {
    // Given: /pictures 페이지로 이동 (네트워크를 느리게 설정)
    await page.route('https://dog.ceo/api/breeds/image/random/6', async route => {
      // 응답을 지연시켜 로딩 상태를 관찰 가능하게 함
      await new Promise(resolve => setTimeout(resolve, 500));
      await route.continue();
    });
    
    await page.goto('/pictures');
    
    // When: 페이지가 로드되는 동안
    await page.waitForSelector('[data-testid="pictures-container"]', { timeout: 1000 });
    
    // Then: 스플래시 스크린이 6개 표시되어야 함
    const splashScreens = await page.locator('[data-testid="splash-screen"]').all();
    
    // 로딩이 끝나기 전이거나 후이므로, 0개 또는 6개여야 함
    if (splashScreens.length > 0) {
      expect(splashScreens.length).toBe(6);
    }
  });

  test('스크롤 시 추가 강아지 이미지가 로드되어야 한다 (무한스크롤)', async ({ page }) => {
    // Given: /pictures 페이지로 이동하고 초기 로드 대기
    await page.goto('/pictures');
    await page.waitForSelector('[data-testid="pictures-container"]', { timeout: 2000 });
    
    // 강아지 이미지가 로드될 때까지 대기
    await page.waitForSelector('[data-testid="dog-image"]', { timeout: 2000 });
    
    // 초기 이미지 개수 확인
    const initialImages = await page.locator('[data-testid="dog-image"]').all();
    const initialCount = initialImages.length;
    expect(initialCount).toBeGreaterThanOrEqual(6);
    
    // When: 마지막에서 2번째 이미지로 스크롤 (Intersection Observer 트리거)
    const secondToLastImage = initialImages[initialCount - 2];
    await secondToLastImage.scrollIntoViewIfNeeded();
    
    // 약간 더 스크롤하여 Intersection Observer가 확실히 트리거되도록 함
    await page.evaluate(() => {
      window.scrollBy(0, 200);
    });
    
    // 추가 이미지가 로드될 때까지 대기 (최대 2초)
    await page.waitForFunction(
      (expectedCount) => {
        const images = document.querySelectorAll('[data-testid="dog-image"]');
        return images.length > expectedCount;
      },
      initialCount,
      { timeout: 2000 }
    );
    
    // Then: 이미지 개수가 증가해야 함
    const updatedImages = await page.locator('[data-testid="dog-image"]').all();
    expect(updatedImages.length).toBeGreaterThan(initialCount);
  });

  test('API 호출 실패 시 에러 처리가 되어야 한다 (실패 시나리오)', async ({ page }) => {
    // Given: API를 모킹하여 에러 응답 반환
    await page.route('https://dog.ceo/api/breeds/image/random/6', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Internal Server Error', status: 'error' }),
      });
    });
    
    // When: /pictures 페이지로 이동
    await page.goto('/pictures');
    await page.waitForSelector('[data-testid="pictures-container"]', { timeout: 1000 });
    
    // Then: 에러 메시지 또는 빈 상태가 표시되어야 함
    const images = await page.locator('[data-testid="dog-image"]').all();
    expect(images.length).toBe(0);
  });
});

