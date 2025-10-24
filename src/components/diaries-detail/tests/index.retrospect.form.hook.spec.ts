import { test, expect } from '@playwright/test';

test.describe.skip('회고쓰기 폼 등록 기능', () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지 초기화 및 테스트 데이터 설정
    await page.goto('http://localhost:3001/diaries/1');
    await page.evaluate(() => {
      localStorage.clear();
      // 테스트용 일기 데이터 설정
      const testDiary = {
        id: 1,
        title: '테스트 일기',
        content: '테스트 일기 내용입니다.',
        emotion: 'happy',
        createdAt: '2024-01-01T00:00:00.000Z'
      };
      localStorage.setItem('diaries', JSON.stringify([testDiary]));
    });
    // 페이지 새로고침하여 데이터 적용
    await page.reload();
  });

  test('회고 등록 인풋이 입력되면 입력버튼이 활성화되어야 함', async ({ page }) => {
    // 페이지 로드 대기
    await page.waitForTimeout(2000);
    
    // 회고 입력 필드 찾기
    const retrospectInput = page.locator('input[placeholder="회고를 남겨보세요."]');
    const submitButton = page.locator('button:has-text("입력")');
    
    // 초기 상태: 버튼이 비활성화되어야 함
    await expect(submitButton).toBeDisabled();
    
    // 회고 내용 입력
    await retrospectInput.fill('테스트 회고 내용');
    
    // 입력 후: 버튼이 활성화되어야 함
    await expect(submitButton).toBeEnabled();
  });

  test('회고 등록 시 로컬스토리지에 데이터가 저장되어야 함', async ({ page }) => {
    // 페이지 로드 대기
    await page.waitForTimeout(2000);
    
    // 회고 내용 입력 및 등록
    await page.fill('input[placeholder="회고를 남겨보세요."]', '첫 번째 회고');
    await page.click('button:has-text("입력")');
    
    // 로컬스토리지 확인
    const storedData = await page.evaluate(() => {
      return localStorage.getItem('retrospects');
    });
    
    expect(storedData).toBeTruthy();
    
    const retrospects = JSON.parse(storedData!);
    expect(retrospects).toHaveLength(1);
    expect(retrospects[0]).toMatchObject({
      id: 1,
      content: '첫 번째 회고',
      diaryId: 1,
      createdAt: expect.any(String),
    });
  });

  test('기존 회고 데이터가 있을 때 새 회고는 기존 데이터에 추가되어야 함', async ({ page }) => {
    // 기존 회고 데이터 설정
    await page.evaluate(() => {
      const existingRetrospects = [
        {
          id: 1,
          content: '기존 회고 1',
          diaryId: 1,
          createdAt: '2024-01-01T00:00:00.000Z',
        },
        {
          id: 2,
          content: '기존 회고 2',
          diaryId: 1,
          createdAt: '2024-01-02T00:00:00.000Z',
        },
      ];
      localStorage.setItem('retrospects', JSON.stringify(existingRetrospects));
    });
    
    // 페이지 로드 대기
    await page.waitForTimeout(2000);
    
    // 새 회고 등록
    await page.fill('input[placeholder="회고를 남겨보세요."]', '새로운 회고');
    await page.click('button:has-text("입력")');
    
    // 로컬스토리지 확인
    const storedData = await page.evaluate(() => {
      return localStorage.getItem('retrospects');
    });
    
    const retrospects = JSON.parse(storedData!);
    expect(retrospects).toHaveLength(3);
    expect(retrospects[2]).toMatchObject({
      id: 3, // 기존 최대 ID(2) + 1
      content: '새로운 회고',
      diaryId: 1,
      createdAt: expect.any(String),
    });
  });

  test('회고 등록 후 페이지가 새로고침되어야 함', async ({ page }) => {
    // 페이지 로드 대기
    await page.waitForTimeout(2000);
    
    // 회고 등록
    await page.fill('input[placeholder="회고를 남겨보세요."]', '새로고침 테스트');
    await page.click('button:has-text("입력")');
    
    // 페이지 새로고침 확인 (페이지가 다시 로드되는 것을 확인)
    await page.waitForSelector('[data-testid="diary-detail-container"]');
    
    // 입력 필드가 비어있는지 확인 (새로고침으로 인한 상태 초기화)
    const retrospectInput = page.locator('input[placeholder="회고를 남겨보세요."]');
    await expect(retrospectInput).toHaveValue('');
  });

  test('빈 내용으로 회고 등록 시도 시 등록되지 않아야 함', async ({ page }) => {
    // 페이지 로드 대기
    await page.waitForTimeout(2000);
    
    // 빈 내용 입력
    await page.fill('input[placeholder="회고를 남겨보세요."]', '   '); // 공백만 입력
    await page.click('button:has-text("입력")');
    
    // 로컬스토리지에 데이터가 저장되지 않았는지 확인
    const storedData = await page.evaluate(() => {
      return localStorage.getItem('retrospects');
    });
    
    expect(storedData).toBeNull();
  });

  test('회고 등록 후 입력 필드가 초기화되어야 함', async ({ page }) => {
    // 페이지 로드 대기
    await page.waitForTimeout(2000);
    
    // 회고 등록
    await page.fill('input[placeholder="회고를 남겨보세요."]', '초기화 테스트');
    await page.click('button:has-text("입력")');
    
    // 페이지 새로고침 대기
    await page.waitForSelector('[data-testid="diary-detail-container"]');
    
    // 입력 필드가 비어있는지 확인
    const retrospectInput = page.locator('input[placeholder="회고를 남겨보세요."]');
    await expect(retrospectInput).toHaveValue('');
  });
});
