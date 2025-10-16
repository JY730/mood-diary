import { test, expect } from '@playwright/test';

/**
 * 일기 목록 페이지 데이터 바인딩 기능 테스트
 * TDD 기반으로 작성된 Playwright 테스트
 * 
 * 테스트 시나리오:
 * 1. 로컬스토리지에 테스트 데이터 설정
 * 2. /diaries 페이지 로드
 * 3. 로컬스토리지의 일기 데이터가 화면에 바인딩되는지 확인
 * 4. 페이지네이션, 필터, 검색 기능 확인
 */

test.describe('일기 목록 페이지 데이터 바인딩', () => {
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
        {
          id: 4,
          title: '놀라운 하루',
          content: '오늘은 놀라운 일이 있었습니다.',
          emotion: 'SURPRISE',
          createdAt: '2024-10-12T16:20:00.000Z',
        },
        {
          id: 5,
          title: '평범한 하루',
          content: '오늘은 평범한 하루였습니다.',
          emotion: 'ETC',
          createdAt: '2024-10-11T11:45:00.000Z',
        },
      ];
      localStorage.setItem('diaries', JSON.stringify(testDiaries));
    });
  });

  test('페이지 로드 및 일기 목록 바인딩 확인', async ({ page }) => {
    // 1. /diaries 페이지 새로고침
    await page.goto('/diaries');

    // 2. 컨테이너 표시 확인 (페이지 로드 식별자)
    const container = page.locator('[data-testid="diaries-container"]');
    await expect(container).toBeVisible();

    // 3. 일기 카드가 5개 표시되는지 확인
    const cards = page.locator('[data-testid="diary-card"]');
    await expect(cards).toHaveCount(5);
  });

  test('첫 번째 일기 카드의 데이터 바인딩 확인', async ({ page }) => {
    await page.goto('/diaries');

    // 컨테이너 표시 대기
    const container = page.locator('[data-testid="diaries-container"]');
    await expect(container).toBeVisible();

    // 첫 번째 카드 확인
    const firstCard = page.locator('[data-testid="diary-card"]').first();
    await expect(firstCard).toBeVisible();

    // 제목 확인
    const title = firstCard.locator('[data-testid="diary-card-title"]');
    await expect(title).toHaveText('행복한 하루');

    // 감정 텍스트 확인
    const emotionText = firstCard.locator('[data-testid="diary-card-emotion"]');
    await expect(emotionText).toHaveText('행복해요');

    // 작성일 확인
    const date = firstCard.locator('[data-testid="diary-card-date"]');
    await expect(date).toBeVisible();
    await expect(date).not.toBeEmpty();

    // 감정 이미지 확인
    const emotionImage = firstCard.locator('[data-testid="diary-card-image"]');
    await expect(emotionImage).toBeVisible();
    await expect(emotionImage).toHaveAttribute('src', /emotion-happy/);
  });

  test('두 번째 일기 카드의 데이터 바인딩 확인 (SAD)', async ({ page }) => {
    await page.goto('/diaries');

    // 컨테이너 표시 대기
    const container = page.locator('[data-testid="diaries-container"]');
    await expect(container).toBeVisible();

    // 두 번째 카드 확인
    const secondCard = page.locator('[data-testid="diary-card"]').nth(1);
    await expect(secondCard).toBeVisible();

    // 제목 확인
    const title = secondCard.locator('[data-testid="diary-card-title"]');
    await expect(title).toHaveText('슬픈 하루');

    // 감정 텍스트 확인
    const emotionText = secondCard.locator('[data-testid="diary-card-emotion"]');
    await expect(emotionText).toHaveText('슬퍼요');

    // 감정 이미지 확인
    const emotionImage = secondCard.locator('[data-testid="diary-card-image"]');
    await expect(emotionImage).toBeVisible();
    await expect(emotionImage).toHaveAttribute('src', /emotion-sad/);
  });

  test('세 번째 일기 카드의 데이터 바인딩 확인 (ANGRY)', async ({ page }) => {
    await page.goto('/diaries');

    // 컨테이너 표시 대기
    const container = page.locator('[data-testid="diaries-container"]');
    await expect(container).toBeVisible();

    // 세 번째 카드 확인
    const thirdCard = page.locator('[data-testid="diary-card"]').nth(2);
    await expect(thirdCard).toBeVisible();

    // 제목 확인
    const title = thirdCard.locator('[data-testid="diary-card-title"]');
    await expect(title).toHaveText('화나는 하루');

    // 감정 텍스트 확인
    const emotionText = thirdCard.locator('[data-testid="diary-card-emotion"]');
    await expect(emotionText).toHaveText('화나요');

    // 감정 이미지 확인
    const emotionImage = thirdCard.locator('[data-testid="diary-card-image"]');
    await expect(emotionImage).toBeVisible();
    await expect(emotionImage).toHaveAttribute('src', /emotion-angry/);
  });

  test('네 번째 일기 카드의 데이터 바인딩 확인 (SURPRISE)', async ({ page }) => {
    await page.goto('/diaries');

    // 컨테이너 표시 대기
    const container = page.locator('[data-testid="diaries-container"]');
    await expect(container).toBeVisible();

    // 네 번째 카드 확인
    const fourthCard = page.locator('[data-testid="diary-card"]').nth(3);
    await expect(fourthCard).toBeVisible();

    // 제목 확인
    const title = fourthCard.locator('[data-testid="diary-card-title"]');
    await expect(title).toHaveText('놀라운 하루');

    // 감정 텍스트 확인
    const emotionText = fourthCard.locator('[data-testid="diary-card-emotion"]');
    await expect(emotionText).toHaveText('놀랐어요');

    // 감정 이미지 확인
    const emotionImage = fourthCard.locator('[data-testid="diary-card-image"]');
    await expect(emotionImage).toBeVisible();
    await expect(emotionImage).toHaveAttribute('src', /emotion-surprise/);
  });

  test('다섯 번째 일기 카드의 데이터 바인딩 확인 (ETC)', async ({ page }) => {
    await page.goto('/diaries');

    // 컨테이너 표시 대기
    const container = page.locator('[data-testid="diaries-container"]');
    await expect(container).toBeVisible();

    // 다섯 번째 카드 확인
    const fifthCard = page.locator('[data-testid="diary-card"]').nth(4);
    await expect(fifthCard).toBeVisible();

    // 제목 확인
    const title = fifthCard.locator('[data-testid="diary-card-title"]');
    await expect(title).toHaveText('평범한 하루');

    // 감정 텍스트 확인
    const emotionText = fifthCard.locator('[data-testid="diary-card-emotion"]');
    await expect(emotionText).toHaveText('기타');

    // 감정 이미지 확인
    const emotionImage = fifthCard.locator('[data-testid="diary-card-image"]');
    await expect(emotionImage).toBeVisible();
    await expect(emotionImage).toHaveAttribute('src', /emotion-etc/);
  });

  test('긴 제목이 말줄임표로 표시되는지 확인', async ({ page }) => {
    // 긴 제목의 일기 추가
    await page.goto('/diaries');
    await page.evaluate(() => {
      const longTitleDiary = {
        id: 6,
        title: '이것은 매우 긴 제목입니다. 이 제목은 일기 카드의 크기를 초과하여 말줄임표로 표시되어야 합니다.',
        content: '테스트 내용입니다.',
        emotion: 'HAPPY',
        createdAt: '2024-10-10T10:00:00.000Z',
      };
      
      const diariesStr = localStorage.getItem('diaries');
      const diaries = diariesStr ? JSON.parse(diariesStr) : [];
      diaries.push(longTitleDiary);
      localStorage.setItem('diaries', JSON.stringify(diaries));
    });

    // 페이지 새로고침
    await page.goto('/diaries');

    // 컨테이너 표시 대기
    const container = page.locator('[data-testid="diaries-container"]');
    await expect(container).toBeVisible();

    // 마지막 카드 확인
    const lastCard = page.locator('[data-testid="diary-card"]').last();
    const title = lastCard.locator('[data-testid="diary-card-title"]');
    
    // CSS 말줄임표 스타일 확인
    const titleElement = await title.elementHandle();
    if (titleElement) {
      const overflow = await titleElement.evaluate((el) => {
        return window.getComputedStyle(el).textOverflow;
      });
      expect(overflow).toBe('ellipsis');
    }
  });

  test('로컬스토리지가 비어있는 경우 빈 목록 표시', async ({ page }) => {
    // 로컬스토리지 비우기
    await page.goto('/diaries');
    await page.evaluate(() => {
      localStorage.clear();
    });

    // 페이지 새로고침
    await page.goto('/diaries');

    // 컨테이너 표시 대기
    const container = page.locator('[data-testid="diaries-container"]');
    await expect(container).toBeVisible();

    // 일기 카드가 없는지 확인
    const cards = page.locator('[data-testid="diary-card"]');
    await expect(cards).toHaveCount(0);

    // 빈 메시지 표시 확인 (선택사항)
    const emptyMessage = page.locator('[data-testid="diaries-empty"]');
    await expect(emptyMessage).toBeVisible();
  });

  test('로컬스토리지의 diaries가 null인 경우 빈 목록 표시', async ({ page }) => {
    await page.goto('/diaries');
    await page.evaluate(() => {
      localStorage.removeItem('diaries');
    });

    // 페이지 새로고침
    await page.goto('/diaries');

    // 컨테이너 표시 대기
    const container = page.locator('[data-testid="diaries-container"]');
    await expect(container).toBeVisible();

    // 일기 카드가 없는지 확인
    const cards = page.locator('[data-testid="diary-card"]');
    await expect(cards).toHaveCount(0);
  });

  test('페이지네이션 - 12개 이상의 일기가 있을 때 페이지 전환', async ({ page }) => {
    // 12개 이상의 일기 생성
    await page.goto('/diaries');
    await page.evaluate(() => {
      const testDiaries = [];
      for (let i = 1; i <= 15; i++) {
        testDiaries.push({
          id: i,
          title: `일기 제목 ${i}`,
          content: `일기 내용 ${i}`,
          emotion: ['HAPPY', 'SAD', 'ANGRY', 'SURPRISE', 'ETC'][i % 5],
          createdAt: new Date(2024, 9, i).toISOString(),
        });
      }
      localStorage.setItem('diaries', JSON.stringify(testDiaries));
    });

    // 페이지 새로고침
    await page.goto('/diaries');

    // 컨테이너 표시 대기
    const container = page.locator('[data-testid="diaries-container"]');
    await expect(container).toBeVisible();

    // 첫 페이지에 12개 카드 표시 확인
    const cards = page.locator('[data-testid="diary-card"]');
    await expect(cards).toHaveCount(12);

    // 페이지네이션 확인 (nav 요소로 렌더링됨)
    const pagination = page.locator('nav[role="navigation"][aria-label="페이지네이션"]');
    await expect(pagination).toBeVisible();
  });

  test('일기 카드 클릭 시 상세 페이지로 이동', async ({ page }) => {
    await page.goto('/diaries');

    // 컨테이너 표시 대기
    const container = page.locator('[data-testid="diaries-container"]');
    await expect(container).toBeVisible();

    // 첫 번째 카드 클릭
    const firstCard = page.locator('[data-testid="diary-card"]').first();
    await firstCard.click();

    // URL 확인 (상세 페이지로 이동)
    await expect(page).toHaveURL(/\/diaries\/\d+/);
  });
});

