import { test, expect } from '@playwright/test';

test.describe('회고 데이터 바인딩 테스트', () => {
  test.beforeEach(async ({ page }) => {
    // 인증 상태 모킹
    await page.addInitScript(() => {
      // 로그인 상태를 모킹
      localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, user: { id: 1, name: 'Test User' } }));
    });
    // 테스트용 실제 데이터 설정
    const testDiaries = [
      {
        id: 1,
        title: '테스트 일기 1',
        content: '테스트 내용 1',
        emotion: 'happy',
        createdAt: '2024-01-01T00:00:00.000Z'
      }
    ];

    const testRetrospects = [
      {
        id: 1,
        content: '첫 번째 회고',
        diaryId: 1,
        createdAt: '2024-01-01T10:00:00.000Z'
      },
      {
        id: 2,
        content: '두 번째 회고',
        diaryId: 1,
        createdAt: '2024-01-01T11:00:00.000Z'
      },
      {
        id: 3,
        content: '다른 일기의 회고',
        diaryId: 2,
        createdAt: '2024-01-01T12:00:00.000Z'
      }
    ];

    // 로컬스토리지에 테스트 데이터 설정
    await page.addInitScript((data: { diaries: any[], retrospects: any[] }) => {
      localStorage.setItem('diaries', JSON.stringify(data.diaries));
      localStorage.setItem('retrospects', JSON.stringify(data.retrospects));
    }, { diaries: testDiaries, retrospects: testRetrospects });
  });

  test('일기 상세 페이지에서 해당 일기의 회고 데이터가 올바르게 바인딩되는지 확인', async ({ page }) => {
    // /diaries/1 페이지로 이동
    await page.goto('/diaries/1');

    // 페이지 로드 대기
    await page.waitForLoadState('networkidle');

    // 페이지 내용을 확인
    const pageContent = await page.textContent('body');
    console.log('Page content:', pageContent);

    // 페이지에 어떤 요소가 있는지 확인
    const elements = await page.$$('[data-testid]');
    console.log('Elements with data-testid:', elements.length);

    // diary-detail-container 또는 diary-detail-not-found 중 하나가 나타날 때까지 대기
    try {
      await page.waitForSelector('[data-testid="diary-detail-container"], [data-testid="diary-detail-not-found"]', { timeout: 2000 });
    } catch (error) {
      console.log('No data-testid elements found, checking page structure...');
      const allElements = await page.$$('*');
      console.log('Total elements on page:', allElements.length);
    }

    // 일기 제목이 올바르게 표시되는지 확인
    await expect(page.getByTestId('diary-detail-title')).toHaveText('테스트 일기 1');

    // 일기 내용이 올바르게 표시되는지 확인
    await expect(page.getByTestId('diary-detail-content')).toHaveText('테스트 내용 1');

    // 회고 리스트가 올바르게 표시되는지 확인
    await expect(page.getByTestId('retrospect-list')).toBeVisible();
    
    // 회고 내용들이 올바르게 표시되는지 확인
    await expect(page.getByTestId('retrospect-content-0')).toHaveText('두 번째 회고');
    await expect(page.getByTestId('retrospect-content-1')).toHaveText('첫 번째 회고');
    
    // 회고 날짜들이 올바르게 표시되는지 확인
    await expect(page.getByTestId('retrospect-date-0')).toHaveText('2024. 01. 01');
    await expect(page.getByTestId('retrospect-date-1')).toHaveText('2024. 01. 01');
  });

  test('존재하지 않는 일기 ID로 접근 시 적절한 처리가 되는지 확인', async ({ page }) => {
    // 존재하지 않는 일기 ID로 접근
    await page.goto('/diaries/999');

    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForSelector('[data-testid="diary-detail-not-found"]', { timeout: 500 });

    // "일기를 찾을 수 없습니다" 메시지가 표시되는지 확인
    await expect(page.getByTestId('diary-detail-not-found')).toHaveText('일기를 찾을 수 없습니다.');
  });

  test('회고 데이터가 없는 경우 빈 배열이 반환되는지 확인', async ({ page }) => {
    // 회고 데이터가 없는 상태로 설정
    await page.addInitScript(() => {
      localStorage.removeItem('retrospects');
    });

    await page.goto('/diaries/1');

    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForSelector('[data-testid="diary-detail-container"], [data-testid="diary-detail-not-found"]', { timeout: 2000 });

    // 일기는 정상적으로 표시되어야 함
    await expect(page.getByTestId('diary-detail-title')).toHaveText('테스트 일기 1');
    
    // 회고 리스트가 표시되지 않아야 함
    await expect(page.getByTestId('retrospect-list')).not.toBeVisible();
  });

  test('잘못된 JSON 데이터가 있을 때 오류 처리가 되는지 확인', async ({ page }) => {
    // 잘못된 JSON 데이터 설정
    await page.addInitScript(() => {
      localStorage.setItem('retrospects', 'invalid json data');
    });

    await page.goto('/diaries/1');

    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForSelector('[data-testid="diary-detail-container"], [data-testid="diary-detail-not-found"]', { timeout: 2000 });

    // 일기는 정상적으로 표시되어야 함 (오류가 발생해도 기본 동작은 유지)
    await expect(page.getByTestId('diary-detail-title')).toHaveText('테스트 일기 1');
  });
});
