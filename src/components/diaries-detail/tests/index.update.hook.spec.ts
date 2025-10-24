import { test, expect } from '@playwright/test';
import { EmotionType } from '@/commons/constants/enum';

/**
 * 일기상세 수정 기능 테스트
 * 
 * 일기상세 페이지의 수정 기능을 테스트합니다.
 * - 수정 모드 진입/종료
 * - 폼 유효성 검사
 * - 데이터 업데이트
 * - 에러 처리
 * - 접근성
 */
test.describe('일기상세 수정 기능 테스트', () => {
  // 테스트 데이터 설정
  const testDiaryData = {
    id: 1,
    title: '테스트 일기 제목',
    content: '테스트 일기 내용입니다.',
    emotion: EmotionType.HAPPY,
    createdAt: '2024-01-15T10:30:00.000Z'
  };

  test.beforeEach(async ({ page }) => {
    // 로컬스토리지에 테스트 데이터 설정
    await page.goto('/diaries/1', { waitUntil: 'domcontentloaded' });
    await page.evaluate((data) => {
      localStorage.setItem('diaries', JSON.stringify([data]));
    }, testDiaryData);
    
    // 페이지 새로고침하여 데이터 로드
    await page.reload();
    // 페이지 로드 완료 대기 (data-testid 기반, timeout 500ms 미만)
    await page.waitForSelector('[data-testid="diary-detail-container"]', { timeout: 400 });
  });

  test.describe('페이지 로드 및 기본 상태', () => {
    test('일기상세 페이지 로드 확인', async ({ page }) => {
      // 페이지 로드 확인
      await expect(page.locator('[data-testid="diary-detail-container"]')).toBeVisible();
      await expect(page.locator('[data-testid="diary-detail-title"]')).toHaveText(testDiaryData.title);
      await expect(page.locator('[data-testid="diary-detail-content"]')).toHaveText(testDiaryData.content);
      await expect(page.locator('[data-testid="diary-detail-emotion-text"]')).toHaveText('행복해요');
    });

    test('일기 데이터가 없는 경우 처리', async ({ page }) => {
      // 로컬스토리지에서 데이터 제거
      await page.evaluate(() => {
        localStorage.removeItem('diaries');
      });
      await page.reload();
      
      // 에러 메시지 표시 확인
      await expect(page.locator('[data-testid="diary-detail-not-found"]')).toBeVisible();
    });
  });

  test.describe('수정 모드 진입/종료', () => {
    test('수정 버튼 클릭 시 수정 모드로 전환', async ({ page }) => {
      // 수정 버튼 클릭
      await page.click('button:has-text("수정")');
      
      // 수정 모드 UI 확인 (수정중 상태)
      await expect(page.locator('[data-testid="diary-edit-form"]')).toBeVisible();
      await expect(page.locator('[data-testid="diary-edit-title"]')).toHaveValue(testDiaryData.title);
      await expect(page.locator('[data-testid="diary-edit-content"]')).toHaveValue(testDiaryData.content);
      
      // 회고 입력창이 비활성화되었는지 확인
      await expect(page.locator('[data-testid="retrospect-input"]')).toBeDisabled();
    });

    test('수정 중 회고 입력창 비활성화 확인', async ({ page }) => {
      // 수정 버튼 클릭하여 수정 모드 진입
      await page.click('button:has-text("수정")');
      
      // 회고 입력창이 비활성화되었는지 확인
      await expect(page.locator('[data-testid="retrospect-input"]')).toBeDisabled();
      await expect(page.locator('button:has-text("입력")')).toBeDisabled();
    });

    test('수정 취소 기능', async ({ page }) => {
      // 수정 버튼 클릭
      await page.click('button:has-text("수정")');
      
      // 수정 폼에 값 변경
      await page.fill('[data-testid="diary-edit-title"]', '변경된 제목');
      
      // 취소 버튼 클릭
      await page.click('button:has-text("취소")');
      
      // 원래 화면으로 돌아가는지 확인
      await expect(page.locator('[data-testid="diary-detail-container"]')).toBeVisible();
      await expect(page.locator('[data-testid="diary-detail-title"]')).toHaveText(testDiaryData.title);
    });
  });

  test.describe('데이터 수정 및 저장', () => {
    test('일기 수정 완료', async ({ page }) => {
      const newTitle = '수정된 일기 제목';
      const newContent = '수정된 일기 내용입니다.';
      const newEmotion = EmotionType.SAD;

      // 수정 버튼 클릭
      await page.click('button:has-text("수정")');
      
      // 수정 폼에 새로운 값 입력
      await page.fill('[data-testid="diary-edit-title"]', newTitle);
      await page.fill('[data-testid="diary-edit-content"]', newContent);
      await page.check(`[data-testid="diary-edit-emotion-${newEmotion.toLowerCase()}"]`);
      
      // 수정하기 버튼 클릭
      await page.click('button:has-text("수정하기")');
      
      // 수정 완료 후 원래 화면으로 돌아가는지 확인
      await expect(page.locator('[data-testid="diary-detail-container"]')).toBeVisible();
      await expect(page.locator('[data-testid="diary-detail-title"]')).toHaveText(newTitle);
      await expect(page.locator('[data-testid="diary-detail-content"]')).toHaveText(newContent);
      await expect(page.locator('[data-testid="diary-detail-emotion-text"]')).toHaveText('슬퍼요');
      
      // 회고 입력창이 다시 활성화되었는지 확인
      await expect(page.locator('[data-testid="retrospect-input"]')).toBeEnabled();
    });

    test('로컬스토리지 데이터 업데이트 확인', async ({ page }) => {
      const newTitle = '로컬스토리지 테스트 제목';
      
      // 수정 버튼 클릭
      await page.click('button:has-text("수정")');
      
      // 제목 수정
      await page.fill('[data-testid="diary-edit-title"]', newTitle);
      await page.click('button:has-text("수정하기")');
      
      // 로컬스토리지에서 데이터 확인
      const storedData = await page.evaluate(() => {
        const data = localStorage.getItem('diaries');
        return data ? JSON.parse(data) : null;
      });
      
      expect(storedData).toBeTruthy();
      expect(storedData[0].title).toBe(newTitle);
    });
  });

  test.describe('폼 유효성 검사', () => {
    test('수정 폼 유효성 검사', async ({ page }) => {
      // 수정 버튼 클릭
      await page.click('button:has-text("수정")');
      
      // 제목을 빈 값으로 설정
      await page.fill('[data-testid="diary-edit-title"]', '');
      
      // 수정하기 버튼이 비활성화되었는지 확인
      await expect(page.locator('button:has-text("수정하기")')).toBeDisabled();
      
      // 제목을 다시 입력
      await page.fill('[data-testid="diary-edit-title"]', '새로운 제목');
      
      // 수정하기 버튼이 활성화되었는지 확인
      await expect(page.locator('button:has-text("수정하기")')).toBeEnabled();
    });

    test('내용 필드 유효성 검사', async ({ page }) => {
      // 수정 버튼 클릭
      await page.click('button:has-text("수정")');
      
      // 내용을 빈 값으로 설정
      await page.fill('[data-testid="diary-edit-content"]', '');
      
      // 수정하기 버튼이 비활성화되었는지 확인
      await expect(page.locator('button:has-text("수정하기")')).toBeDisabled();
    });
  });

  test.describe('접근성 테스트', () => {
    test('키보드 네비게이션 테스트', async ({ page }) => {
      // 수정 버튼 클릭
      await page.click('button:has-text("수정")');
      
      // Tab 키로 폼 요소들 간 이동 (라디오버튼이 먼저 나오므로)
      await page.keyboard.press('Tab');
      await expect(page.locator('[data-testid="diary-edit-emotion-happy"]')).toBeFocused();
      
      await page.keyboard.press('Tab');
      await expect(page.locator('[data-testid="diary-edit-title"]')).toBeFocused();
      
      await page.keyboard.press('Tab');
      await expect(page.locator('[data-testid="diary-edit-content"]')).toBeFocused();
    });

    test('라벨과 입력 필드 연결 확인', async ({ page }) => {
      // 수정 버튼 클릭
      await page.click('button:has-text("수정")');
      
      // 라벨과 입력 필드의 연결 확인
      const titleLabel = page.locator('label[for="diary-edit-title"]');
      const titleInput = page.locator('#diary-edit-title');
      await expect(titleLabel).toBeVisible();
      await expect(titleInput).toBeVisible();
      
      // 라디오버튼 그룹 확인
      const emotionRadioItems = page.locator('[data-testid^="diary-edit-emotion-"]');
      await expect(emotionRadioItems).toHaveCount(5);
      
      const contentLabel = page.locator('label[for="diary-edit-content"]');
      const contentTextarea = page.locator('#diary-edit-content');
      await expect(contentLabel).toBeVisible();
      await expect(contentTextarea).toBeVisible();
    });
  });
});
