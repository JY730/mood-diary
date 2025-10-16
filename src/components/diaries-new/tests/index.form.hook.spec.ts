import { test, expect } from '@playwright/test';

/**
 * 일기쓰기 폼 등록 기능 테스트
 * TDD 기반으로 작성된 Playwright 테스트
 * 
 * 테스트 시나리오:
 * 1. /diaries 페이지 로드 후 일기쓰기 버튼 클릭
 * 2. 폼 입력 (감정, 제목, 내용)
 * 3. 등록하기 버튼 활성화 확인
 * 4. 등록 후 로컬스토리지 확인
 * 5. 등록완료 모달 확인
 * 6. 상세페이지로 이동 확인
 */

test.describe('일기쓰기 폼 등록 기능', () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지 초기화
    await page.goto('/diaries');
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test('폼 입력 후 일기 등록 성공 - 로컬스토리지가 비어있는 경우 (id: 1)', async ({ page }) => {
    // 1. /diaries 페이지 로드 대기
    await page.goto('/diaries');
    await page.waitForSelector('[data-testid="diaries-container"]');

    // 2. 일기쓰기 버튼 클릭
    await page.click('[data-testid="diaries-write-button"]');

    // 3. 일기쓰기 모달 표시 확인
    await page.waitForSelector('[data-testid="diaries-new-form"]');

    // 4. 감정 선택 (SAD 선택)
    await page.click('[data-testid="emotion-radio-sad"]');

    // 5. 제목 입력
    const testTitle = '테스트 일기 제목';
    await page.fill('[data-testid="diaries-new-title-input"]', testTitle);

    // 6. 내용 입력
    const testContent = '테스트 일기 내용입니다.';
    await page.fill('[data-testid="diaries-new-content-textarea"]', testContent);

    // 7. 등록하기 버튼 클릭
    await page.click('[data-testid="diaries-new-submit-button"]');

    // 8. 로컬스토리지 확인
    const diaries = await page.evaluate(() => {
      const data = localStorage.getItem('diaries');
      return data ? JSON.parse(data) : null;
    });

    expect(diaries).not.toBeNull();
    expect(Array.isArray(diaries)).toBe(true);
    expect(diaries.length).toBe(1);
    expect(diaries[0].id).toBe(1);
    expect(diaries[0].title).toBe(testTitle);
    expect(diaries[0].content).toBe(testContent);
    expect(diaries[0].emotion).toBe('SAD');
    expect(diaries[0].createdAt).toBeDefined();

    // 9. 등록완료 모달 확인
    await page.waitForSelector('[data-testid="modal"]');
    const modalTitle = await page.textContent('[data-testid="modal-title"]');
    expect(modalTitle).toContain('등록');

    // 10. 모달 확인 버튼 클릭
    await page.click('[data-testid="modal-confirm-button"]');

    // 11. 상세페이지로 이동 확인
    await page.waitForURL('/diaries/1');
  });

  test('폼 입력 후 일기 등록 성공 - 로컬스토리지에 기존 데이터가 있는 경우 (id: 최대값+1)', async ({ page }) => {
    // 0. 기존 데이터 설정
    await page.goto('/diaries');
    await page.evaluate(() => {
      const existingData = [
        {
          id: 1,
          title: '기존 일기 1',
          content: '기존 내용 1',
          emotion: 'HAPPY',
          createdAt: new Date().toISOString(),
        },
        {
          id: 3,
          title: '기존 일기 3',
          content: '기존 내용 3',
          emotion: 'ANGRY',
          createdAt: new Date().toISOString(),
        },
      ];
      localStorage.setItem('diaries', JSON.stringify(existingData));
    });

    // 1. /diaries 페이지 로드 대기
    await page.waitForSelector('[data-testid="diaries-container"]');

    // 2. 일기쓰기 버튼 클릭
    await page.click('[data-testid="diaries-write-button"]');

    // 3. 일기쓰기 모달 표시 확인
    await page.waitForSelector('[data-testid="diaries-new-form"]');

    // 4. 감정 선택 (SURPRISE 선택)
    await page.click('[data-testid="emotion-radio-surprise"]');

    // 5. 제목 입력
    const testTitle = '새로운 일기 제목';
    await page.fill('[data-testid="diaries-new-title-input"]', testTitle);

    // 6. 내용 입력
    const testContent = '새로운 일기 내용입니다.';
    await page.fill('[data-testid="diaries-new-content-textarea"]', testContent);

    // 7. 등록하기 버튼 클릭
    await page.click('[data-testid="diaries-new-submit-button"]');

    // 8. 로컬스토리지 확인
    const diaries = await page.evaluate(() => {
      const data = localStorage.getItem('diaries');
      return data ? JSON.parse(data) : null;
    });

    expect(diaries).not.toBeNull();
    expect(Array.isArray(diaries)).toBe(true);
    expect(diaries.length).toBe(3);
    
    // 새로 추가된 일기 확인 (id는 최대값 3 + 1 = 4)
    const newDiary = diaries.find((d: { id: number; title: string; content: string; emotion: string; createdAt: string }) => d.id === 4);
    expect(newDiary).toBeDefined();
    expect(newDiary.title).toBe(testTitle);
    expect(newDiary.content).toBe(testContent);
    expect(newDiary.emotion).toBe('SURPRISE');
    expect(newDiary.createdAt).toBeDefined();

    // 9. 등록완료 모달 확인
    await page.waitForSelector('[data-testid="modal"]');
    const modalTitle = await page.textContent('[data-testid="modal-title"]');
    expect(modalTitle).toContain('등록');

    // 10. 모달 확인 버튼 클릭
    await page.click('[data-testid="modal-confirm-button"]');

    // 11. 상세페이지로 이동 확인 (id: 4)
    await page.waitForURL('/diaries/4');
  });

  test('모든 필드 입력 전에는 등록하기 버튼이 비활성화', async ({ page }) => {
    // 1. /diaries 페이지 로드 대기
    await page.goto('/diaries');
    await page.waitForSelector('[data-testid="diaries-container"]');

    // 2. 일기쓰기 버튼 클릭
    await page.click('[data-testid="diaries-write-button"]');

    // 3. 일기쓰기 모달 표시 확인
    await page.waitForSelector('[data-testid="diaries-new-form"]');

    // 4. 초기 상태에서 등록하기 버튼 비활성화 확인 (제목과 내용이 비어있음)
    const submitButton = page.locator('[data-testid="diaries-new-submit-button"]');
    await expect(submitButton).toBeDisabled();

    // 5. 제목만 입력
    await page.fill('[data-testid="diaries-new-title-input"]', '제목만 입력');
    await expect(submitButton).toBeDisabled();

    // 6. 내용 추가 입력
    await page.fill('[data-testid="diaries-new-content-textarea"]', '내용 입력');
    
    // 7. 모든 필드 입력 후 버튼 활성화 확인
    await expect(submitButton).toBeEnabled();
  });
});

