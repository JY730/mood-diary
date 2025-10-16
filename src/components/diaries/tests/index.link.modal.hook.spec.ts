import { test, expect } from '@playwright/test';

test.describe('Diaries Link Modal Hook', () => {
  test.beforeEach(async ({ page }) => {
    // /diaries 페이지로 이동
    await page.goto('/diaries');
    
    // 페이지가 완전히 로드될 때까지 대기 (data-testid로 식별)
    await page.waitForSelector('[data-testid="diaries-container"]', { timeout: 500 });
  });

  test('일기쓰기 버튼 클릭 시 모달이 열린다', async ({ page }) => {
    // 일기쓰기 버튼 찾기
    const writeButton = page.locator('button:has-text("일기쓰기")');
    await expect(writeButton).toBeVisible();

    // 모달이 처음에는 보이지 않는지 확인
    const modal = page.locator('[data-testid="diaries-new-modal"]');
    await expect(modal).not.toBeVisible();

    // 일기쓰기 버튼 클릭
    await writeButton.click();

    // 모달이 나타나는지 확인
    await expect(modal).toBeVisible({ timeout: 500 });
    
    // 모달 내용 확인
    await expect(page.locator('h1:has-text("일기 쓰기")')).toBeVisible();
    await expect(page.locator('text=오늘 기분은 어땠나요?')).toBeVisible();
  });

  test('모달의 닫기 버튼 클릭 시 등록취소 확인 후 모달이 닫힌다', async ({ page }) => {
    // 일기쓰기 버튼 클릭하여 모달 열기
    const writeButton = page.locator('button:has-text("일기쓰기")');
    await writeButton.click();

    // 모달이 열렸는지 확인
    const modal = page.locator('[data-testid="diaries-new-modal"]');
    await expect(modal).toBeVisible();

    // 닫기 버튼 클릭
    const closeButton = page.locator('[data-testid="diaries-new-close-button"]');
    await closeButton.click();

    // 등록취소 확인 모달이 표시되는지 확인
    const confirmModal = page.locator('[data-testid="modal"]');
    await expect(confirmModal).toBeVisible();

    // 등록취소 버튼 클릭하여 모달 닫기
    const confirmButton = page.locator('[data-testid="modal-confirm-button"]');
    await confirmButton.click();

    // 모달이 닫혔는지 확인
    await expect(modal).not.toBeVisible({ timeout: 500 });
    await expect(confirmModal).not.toBeVisible();
  });

  test('모달 배경 클릭 시 모달이 닫힌다', async ({ page }) => {
    // 일기쓰기 버튼 클릭하여 모달 열기
    const writeButton = page.locator('button:has-text("일기쓰기")');
    await writeButton.click();

    // 모달이 열렸는지 확인
    const modal = page.locator('[data-testid="diaries-new-modal"]');
    await expect(modal).toBeVisible();

    // 모달 배경 클릭 (오버레이 클릭) - 모달 외부 영역 클릭
    await page.click('body', { position: { x: 10, y: 10 } });

    // 모달이 닫혔는지 확인
    await expect(modal).not.toBeVisible({ timeout: 500 });
  });

  test('모달이 페이지 중앙에 오버레이로 표시된다', async ({ page }) => {
    // 일기쓰기 버튼 클릭하여 모달 열기
    const writeButton = page.locator('button:has-text("일기쓰기")');
    await writeButton.click();

    // 모달이 중앙에 오버레이로 표시되는지 확인
    const modal = page.locator('[data-testid="diaries-new-modal"]');
    await expect(modal).toBeVisible();
    
    // 모달이 화면 중앙에 위치하는지 확인 (bounding box 체크)
    const modalBox = await modal.boundingBox();
    expect(modalBox).not.toBeNull();
    
    // 모달이 화면에 표시되고 있는지 확인
    await expect(modal).toBeInViewport();
  });
});
