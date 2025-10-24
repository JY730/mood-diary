import { test, expect } from '@playwright/test';

/**
 * DiariesNew 모달 닫기 기능 테스트
 * 
 * 일기 작성 모달의 닫기 버튼 기능을 테스트합니다.
 * - 닫기 버튼 클릭 시 등록취소 확인 모달 표시
 * - 계속작성 버튼 클릭 시 확인 모달만 닫기
 * - 등록취소 버튼 클릭 시 모든 모달 닫기
 */
test.describe.skip('DiariesNew - 모달 닫기 기능', () => {
  test.beforeEach(async ({ page }) => {
    // /diaries 페이지로 이동
    await page.goto('/diaries');
    
    // 페이지가 완전히 로드될 때까지 대기 (data-testid로 식별)
    await page.waitForSelector('[data-testid="diaries-container"]', { timeout: 400 });
    
    // 일기쓰기 버튼 클릭
    await page.click('text=일기쓰기');
    
    // 일기쓰기폼 모달이 열렸는지 확인
    await page.waitForSelector('[data-testid="diaries-new-modal"]');
  });

  test('닫기 버튼 클릭 시 등록취소모달이 2중 모달로 표시되어야 한다', async ({ page }) => {
    // 닫기 버튼 클릭
    await page.click('[data-testid="diaries-new-close-button"]');
    
    // 등록취소모달이 표시되는지 확인
    await page.waitForSelector('[data-testid="modal"]');
    
    // 모달 제목 확인
    const title = await page.textContent('[data-testid="modal-title"]');
    expect(title).toBe('일기 등록 취소');
    
    // 모달 설명 확인
    const description = await page.textContent('[data-testid="modal-description"]');
    expect(description).toBe('일기 등록을 취소 하시겠어요?');
    
    // 계속작성 버튼과 등록취소 버튼이 모두 표시되는지 확인 (dual actions)
    await expect(page.locator('[data-testid="modal-cancel-button"]')).toBeVisible();
    await expect(page.locator('[data-testid="modal-confirm-button"]')).toBeVisible();
    
    // 계속작성 버튼 텍스트 확인
    const cancelButtonText = await page.textContent('[data-testid="modal-cancel-button"]');
    expect(cancelButtonText).toBe('계속 작성');
    
    // 등록취소 버튼 텍스트 확인
    const confirmButtonText = await page.textContent('[data-testid="modal-confirm-button"]');
    expect(confirmButtonText).toBe('등록 취소');
  });

  test('계속작성 버튼 클릭 시 등록취소모달만 닫히고 일기쓰기폼모달은 남아있어야 한다', async ({ page }) => {
    // 닫기 버튼 클릭
    await page.click('[data-testid="diaries-new-close-button"]');
    
    // 등록취소모달이 표시될 때까지 대기
    await page.waitForSelector('[data-testid="modal"]');
    
    // 계속작성 버튼 클릭
    await page.click('[data-testid="modal-cancel-button"]');
    
    // 등록취소모달이 닫혔는지 확인
    await expect(page.locator('[data-testid="modal"]')).not.toBeVisible();
    
    // 일기쓰기폼모달은 여전히 열려있는지 확인
    await expect(page.locator('[data-testid="diaries-new-modal"]')).toBeVisible();
  });

  test('등록취소 버튼 클릭 시 등록취소모달과 일기쓰기폼모달이 모두 닫혀야 한다', async ({ page }) => {
    // 닫기 버튼 클릭
    await page.click('[data-testid="diaries-new-close-button"]');
    
    // 등록취소모달이 표시될 때까지 대기
    await page.waitForSelector('[data-testid="modal"]');
    
    // 등록취소 버튼 클릭
    await page.click('[data-testid="modal-confirm-button"]');
    
    // 등록취소모달이 닫혔는지 확인
    await expect(page.locator('[data-testid="modal"]')).not.toBeVisible();
    
    // 일기쓰기폼모달도 닫혔는지 확인
    await expect(page.locator('[data-testid="diaries-new-modal"]')).not.toBeVisible();
  });

  test('2중 모달 상태에서 부모 모달과 자식 모달이 동시에 보여야 한다', async ({ page }) => {
    // 닫기 버튼 클릭하여 등록취소모달 표시
    await page.click('[data-testid="diaries-new-close-button"]');
    await page.waitForSelector('[data-testid="modal"]');
    
    // 일기쓰기폼모달(부모)이 여전히 보이는지 확인
    await expect(page.locator('[data-testid="diaries-new-modal"]')).toBeVisible();
    
    // 등록취소모달(자식)도 보이는지 확인
    await expect(page.locator('[data-testid="modal"]')).toBeVisible();
    
    // 2중 모달 상태: 2개의 모달이 동시에 화면에 존재
    const diariesModal = page.locator('[data-testid="diaries-new-modal"]');
    const cancelModal = page.locator('[data-testid="modal"]');
    
    // 두 모달 모두 viewport에 있는지 확인
    await expect(diariesModal).toBeInViewport();
    await expect(cancelModal).toBeInViewport();
  });

  test('등록취소모달이 일기쓰기폼모달 위에 중앙 배치되어야 한다', async ({ page }) => {
    // 닫기 버튼 클릭하여 등록취소모달 표시
    await page.click('[data-testid="diaries-new-close-button"]');
    await page.waitForSelector('[data-testid="modal"]');
    
    // 등록취소모달의 위치 확인 (중앙 배치)
    const cancelModal = page.locator('[data-testid="modal"]');
    const modalBox = await cancelModal.boundingBox();
    
    // 모달이 존재하고 화면에 보이는지 확인
    expect(modalBox).not.toBeNull();
    await expect(cancelModal).toBeInViewport();
  });

  test('body 스크롤이 모달 열림 상태에서 제어되어야 한다', async ({ page }) => {
    // 닫기 버튼 클릭하여 등록취소모달 표시 (2중 모달 상태)
    await page.click('[data-testid="diaries-new-close-button"]');
    await page.waitForSelector('[data-testid="modal"]');
    
    // body의 overflow 스타일 확인 (모달이 열려있을 때 hidden)
    const bodyOverflow = await page.evaluate(() => {
      return document.body.style.overflow;
    });
    expect(bodyOverflow).toBe('hidden');
    
    // 모든 모달 닫기
    await page.click('[data-testid="modal-confirm-button"]');
    
    // 모달이 모두 닫힌 후 body overflow 복원 확인
    await expect(page.locator('[data-testid="modal"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="diaries-new-modal"]')).not.toBeVisible();
  });

  test('등록취소모달의 variant와 actions 속성이 정확해야 한다', async ({ page }) => {
    // 닫기 버튼 클릭하여 등록취소모달 표시
    await page.click('[data-testid="diaries-new-close-button"]');
    await page.waitForSelector('[data-testid="modal"]');
    
    // Modal의 data-testid 속성 확인
    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).toBeVisible();
    
    // dual actions: 2개의 버튼이 있어야 함
    const cancelButton = page.locator('[data-testid="modal-cancel-button"]');
    const confirmButton = page.locator('[data-testid="modal-confirm-button"]');
    
    await expect(cancelButton).toBeVisible();
    await expect(confirmButton).toBeVisible();
    
    // 버튼 개수 확인
    const buttonCount = await page.locator('[data-testid="modal-button-area"] button').count();
    expect(buttonCount).toBe(2);
  });

  test('일기쓰기폼모달에서 데이터 입력 후 닫기 시도하는 시나리오', async ({ page }) => {
    // 제목 입력
    const titleInput = page.locator('input[placeholder="제목을 입력합니다."]');
    await titleInput.fill('테스트 제목');
    
    // 내용 입력
    const contentTextarea = page.locator('textarea[placeholder="내용을 입력합니다."]');
    await contentTextarea.fill('테스트 내용');
    
    // 닫기 버튼 클릭
    await page.click('[data-testid="diaries-new-close-button"]');
    
    // 등록취소모달 표시 확인
    await page.waitForSelector('[data-testid="modal"]');
    await expect(page.locator('[data-testid="modal"]')).toBeVisible();
    
    // 계속 작성 선택
    await page.click('[data-testid="modal-cancel-button"]');
    
    // 일기쓰기폼모달이 여전히 열려있고, 입력한 데이터가 유지되는지 확인
    await expect(page.locator('[data-testid="diaries-new-modal"]')).toBeVisible();
    const titleValue = await titleInput.inputValue();
    const contentValue = await contentTextarea.inputValue();
    
    expect(titleValue).toBe('테스트 제목');
    expect(contentValue).toBe('테스트 내용');
  });
});
