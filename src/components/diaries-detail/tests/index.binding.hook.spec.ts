import { test, expect } from '@playwright/test';

/**
 * 일기 상세 페이지 데이터 바인딩 기능 테스트
 * TDD 기반으로 작성된 Playwright 테스트
 * 
 * 테스트 시나리오:
 * 1. 로컬스토리지에 테스트 데이터 설정
 * 2. /diaries/[id] 페이지 로드
 * 3. URL의 [id]와 일치하는 일기 데이터가 화면에 바인딩되는지 확인
 */

test.describe.skip('일기 상세 페이지 데이터 바인딩', () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지 초기화 및 테스트 데이터 설정
    await page.goto('/diaries');
    await page.evaluate(() => {
      localStorage.clear();
      const testDiaries = [
        {
          id: 1,
          title: '행복한 하루',
          content: '오늘은 정말 행복한 하루였습니다.',
          emotion: 'HAPPY',
          createdAt: '2024-10-15T10:00:00.000Z',
        },
        {
          id: 2,
          title: '슬픈 하루',
          content: '오늘은 슬픈 일이 있었습니다.',
          emotion: 'SAD',
          createdAt: '2024-10-14T14:30:00.000Z',
        },
        {
          id: 3,
          title: '화나는 하루',
          content: '오늘은 정말 화가 났습니다.',
          emotion: 'ANGRY',
          createdAt: '2024-10-13T09:15:00.000Z',
        },
      ];
      localStorage.setItem('diaries', JSON.stringify(testDiaries));
    });
  });

  test('id가 1인 일기 상세 페이지 로드 및 데이터 바인딩 확인', async ({ page }) => {
    // 1. /diaries/1 페이지 로드
    await page.goto('/diaries/1');

    // 2. 컨테이너 표시 확인
    const container = page.locator('[data-testid="diary-detail-container"]');
    await expect(container).toBeVisible();

    // 3. 제목 바인딩 확인
    const title = page.locator('[data-testid="diary-detail-title"]');
    await expect(title).toHaveText('행복한 하루');

    // 4. 내용 바인딩 확인
    const content = page.locator('[data-testid="diary-detail-content"]');
    await expect(content).toHaveText('오늘은 정말 행복한 하루였습니다.');

    // 5. 감정 텍스트 바인딩 확인
    const emotionText = page.locator('[data-testid="diary-detail-emotion-text"]');
    await expect(emotionText).toHaveText('행복해요');

    // 6. 감정 이미지 확인
    const emotionImage = page.locator('[data-testid="diary-detail-emotion-image"]');
    await expect(emotionImage).toBeVisible();
    await expect(emotionImage).toHaveAttribute('src', /emotion-happy/);

    // 7. 작성일 확인
    const createdAt = page.locator('[data-testid="diary-detail-created-at"]');
    await expect(createdAt).toBeVisible();
    await expect(createdAt).not.toBeEmpty();
  });

  test('id가 2인 일기 상세 페이지 로드 및 데이터 바인딩 확인', async ({ page }) => {
    // 1. /diaries/2 페이지 로드
    await page.goto('/diaries/2');

    // 2. 컨테이너 표시 확인
    const container = page.locator('[data-testid="diary-detail-container"]');
    await expect(container).toBeVisible();

    // 3. 제목 바인딩 확인
    const title = page.locator('[data-testid="diary-detail-title"]');
    await expect(title).toHaveText('슬픈 하루');

    // 4. 내용 바인딩 확인
    const content = page.locator('[data-testid="diary-detail-content"]');
    await expect(content).toHaveText('오늘은 슬픈 일이 있었습니다.');

    // 5. 감정 텍스트 바인딩 확인
    const emotionText = page.locator('[data-testid="diary-detail-emotion-text"]');
    await expect(emotionText).toHaveText('슬퍼요');

    // 6. 감정 이미지 확인
    const emotionImage = page.locator('[data-testid="diary-detail-emotion-image"]');
    await expect(emotionImage).toBeVisible();
    await expect(emotionImage).toHaveAttribute('src', /emotion-sad/);
  });

  test('id가 3인 일기 상세 페이지 로드 및 데이터 바인딩 확인 (ANGRY)', async ({ page }) => {
    // 1. /diaries/3 페이지 로드
    await page.goto('/diaries/3');

    // 2. 컨테이너 표시 확인
    const container = page.locator('[data-testid="diary-detail-container"]');
    await expect(container).toBeVisible();

    // 3. 제목 바인딩 확인
    const title = page.locator('[data-testid="diary-detail-title"]');
    await expect(title).toHaveText('화나는 하루');

    // 4. 내용 바인딩 확인
    const content = page.locator('[data-testid="diary-detail-content"]');
    await expect(content).toHaveText('오늘은 정말 화가 났습니다.');

    // 5. 감정 텍스트 바인딩 확인
    const emotionText = page.locator('[data-testid="diary-detail-emotion-text"]');
    await expect(emotionText).toHaveText('화나요');

    // 6. 감정 이미지 확인
    const emotionImage = page.locator('[data-testid="diary-detail-emotion-image"]');
    await expect(emotionImage).toBeVisible();
    await expect(emotionImage).toHaveAttribute('src', /emotion-angry/);
  });

  test('존재하지 않는 id로 접근 시 데이터가 없는 경우 처리', async ({ page }) => {
    // 1. /diaries/999 페이지 로드 (존재하지 않는 id)
    await page.goto('/diaries/999');
    
    // 2. 일기가 없는 경우 메시지 표시 확인
    const notFoundMessage = page.locator('[data-testid="diary-detail-not-found"]');
    await expect(notFoundMessage).toBeVisible();
    await expect(notFoundMessage).toHaveText('일기를 찾을 수 없습니다.');
    
    // 3. 컨테이너는 표시되지 않음
    const container = page.locator('[data-testid="diary-detail-container"]');
    await expect(container).not.toBeVisible();
  });

  test('로컬스토리지가 비어있는 경우 처리', async ({ page }) => {
    // 1. 로컬스토리지 비우기
    await page.goto('/diaries');
    await page.evaluate(() => {
      localStorage.clear();
    });

    // 2. /diaries/1 페이지 로드
    await page.goto('/diaries/1');

    // 3. 일기가 없는 경우 메시지 표시 확인
    const notFoundMessage = page.locator('[data-testid="diary-detail-not-found"]');
    await expect(notFoundMessage).toBeVisible();
    await expect(notFoundMessage).toHaveText('일기를 찾을 수 없습니다.');
    
    // 4. 컨테이너는 표시되지 않음
    const container = page.locator('[data-testid="diary-detail-container"]');
    await expect(container).not.toBeVisible();
  });
});

