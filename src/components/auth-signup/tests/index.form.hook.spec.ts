import { test, expect } from '@playwright/test';

/**
 * 회원가입 폼 Playwright 테스트
 * 
 * TDD 기반으로 작성된 E2E 테스트
 * - 실제 API 호출을 사용 (성공 시나리오)
 * - 모킹된 API 사용 (실패 시나리오)
 * - data-testid를 사용하여 요소 식별
 */

test.describe('회원가입 폼 기능 테스트', () => {
  test.beforeEach(async ({ page }) => {
    // 회원가입 페이지로 이동
    await page.goto('/auth/signup');
    
    // 페이지가 완전히 로드될 때까지 대기 (data-testid 기반)
    await page.waitForSelector('[data-testid="auth-signup-container"]');
  });

  test('모든 입력 필드가 채워지면 회원가입 버튼이 활성화되어야 한다', async ({ page }) => {
    // 회원가입 버튼 찾기
    const submitButton = page.locator('[data-testid="auth-signup-submit-button"]');
    
    // 초기 상태: 버튼이 비활성화되어 있어야 함
    await expect(submitButton).toBeDisabled();

    // 모든 필드 입력
    await page.locator('[data-testid="auth-signup-email-input"]').fill('test@example.com');
    await page.locator('[data-testid="auth-signup-password-input"]').fill('test1234');
    await page.locator('[data-testid="auth-signup-password-confirm-input"]').fill('test1234');
    await page.locator('[data-testid="auth-signup-name-input"]').fill('테스트');

    // 버튼이 활성화되어야 함
    await expect(submitButton).toBeEnabled();
  });

  test('이메일에 @ 기호가 없으면 검증 에러가 발생해야 한다', async ({ page }) => {
    // 잘못된 이메일 입력
    await page.locator('[data-testid="auth-signup-email-input"]').fill('invalidemail');
    await page.locator('[data-testid="auth-signup-password-input"]').fill('test1234');
    await page.locator('[data-testid="auth-signup-password-confirm-input"]').fill('test1234');
    await page.locator('[data-testid="auth-signup-name-input"]').fill('테스트');

    // 버튼이 비활성화되어야 함
    const submitButton = page.locator('[data-testid="auth-signup-submit-button"]');
    await expect(submitButton).toBeDisabled();
  });

  test('비밀번호가 8자 미만이면 검증 에러가 발생해야 한다', async ({ page }) => {
    // 짧은 비밀번호 입력
    await page.locator('[data-testid="auth-signup-email-input"]').fill('test@example.com');
    await page.locator('[data-testid="auth-signup-password-input"]').fill('test12'); // 6자
    await page.locator('[data-testid="auth-signup-password-confirm-input"]').fill('test12');
    await page.locator('[data-testid="auth-signup-name-input"]').fill('테스트');

    // 버튼이 비활성화되어야 함
    const submitButton = page.locator('[data-testid="auth-signup-submit-button"]');
    await expect(submitButton).toBeDisabled();
  });

  test('비밀번호에 영문과 숫자가 모두 포함되지 않으면 검증 에러가 발생해야 한다', async ({ page }) => {
    // 숫자만 있는 비밀번호
    await page.locator('[data-testid="auth-signup-email-input"]').fill('test@example.com');
    await page.locator('[data-testid="auth-signup-password-input"]').fill('12345678');
    await page.locator('[data-testid="auth-signup-password-confirm-input"]').fill('12345678');
    await page.locator('[data-testid="auth-signup-name-input"]').fill('테스트');

    // 버튼이 비활성화되어야 함
    const submitButton = page.locator('[data-testid="auth-signup-submit-button"]');
    await expect(submitButton).toBeDisabled();
  });

  test('비밀번호 확인이 비밀번호와 다르면 검증 에러가 발생해야 한다', async ({ page }) => {
    // 비밀번호와 비밀번호 확인이 다름
    await page.locator('[data-testid="auth-signup-email-input"]').fill('test@example.com');
    await page.locator('[data-testid="auth-signup-password-input"]').fill('test1234');
    await page.locator('[data-testid="auth-signup-password-confirm-input"]').fill('test5678');
    await page.locator('[data-testid="auth-signup-name-input"]').fill('테스트');

    // 버튼이 비활성화되어야 함
    const submitButton = page.locator('[data-testid="auth-signup-submit-button"]');
    await expect(submitButton).toBeDisabled();
  });

  test('이름이 비어있으면 검증 에러가 발생해야 한다', async ({ page }) => {
    // 이름 없이 입력
    await page.locator('[data-testid="auth-signup-email-input"]').fill('test@example.com');
    await page.locator('[data-testid="auth-signup-password-input"]').fill('test1234');
    await page.locator('[data-testid="auth-signup-password-confirm-input"]').fill('test1234');
    await page.locator('[data-testid="auth-signup-name-input"]').fill('');

    // 버튼이 비활성화되어야 함
    const submitButton = page.locator('[data-testid="auth-signup-submit-button"]');
    await expect(submitButton).toBeDisabled();
  });

  test('유효한 데이터로 회원가입 성공 시 가입완료 모달이 표시되어야 한다', async ({ page }) => {
    // 타임스탬프를 포함한 유니크한 이메일 생성 (중복 방지)
    const timestamp = Date.now();
    const uniqueEmail = `test${timestamp}@example.com`;

    // 모든 필드에 유효한 데이터 입력
    await page.locator('[data-testid="auth-signup-email-input"]').fill(uniqueEmail);
    await page.locator('[data-testid="auth-signup-password-input"]').fill('test1234');
    await page.locator('[data-testid="auth-signup-password-confirm-input"]').fill('test1234');
    await page.locator('[data-testid="auth-signup-name-input"]').fill('테스트유저');

    // 회원가입 버튼 클릭
    const submitButton = page.locator('[data-testid="auth-signup-submit-button"]');
    await submitButton.click();

    // 가입완료 모달이 표시될 때까지 대기 (timeout: 2000ms)
    await page.waitForSelector('[data-testid="modal"]', { timeout: 2000 });
    
    // 모달 내용 확인
    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).toBeVisible();
    
    // 모달 제목과 설명 확인
    const modalTitle = page.locator('[data-testid="modal-title"]');
    const modalDescription = page.locator('[data-testid="modal-description"]');
    await expect(modalTitle).toContainText('가입 완료');
    await expect(modalDescription).toBeVisible();
  });

  test('회원가입 성공 시 API 응답에서 _id가 정상적으로 반환되어야 한다', async ({ page }) => {
    // 타임스탬프를 포함한 유니크한 이메일 생성
    const timestamp = Date.now();
    const uniqueEmail = `test${timestamp}@example.com`;

    // GraphQL 응답 캡처
    let responseData: { _id: string } | null = null;
    page.on('response', async (response) => {
      if (response.url().includes('graphql')) {
        try {
          const json = await response.json();
          if (json.data?.createUser) {
            responseData = json.data.createUser;
          }
        } catch {
          // JSON 파싱 실패 시 무시
        }
      }
    });

    // 유효한 데이터로 회원가입
    await page.locator('[data-testid="auth-signup-email-input"]').fill(uniqueEmail);
    await page.locator('[data-testid="auth-signup-password-input"]').fill('test1234');
    await page.locator('[data-testid="auth-signup-password-confirm-input"]').fill('test1234');
    await page.locator('[data-testid="auth-signup-name-input"]').fill('테스트유저');
    
    await page.locator('[data-testid="auth-signup-submit-button"]').click();

    // 모달이 표시될 때까지 대기 (API 응답 완료 후)
    await page.waitForSelector('[data-testid="modal"]', { timeout: 2000 });

    // _id가 반환되었는지 확인
    expect(responseData).not.toBeNull();
    expect(responseData).toHaveProperty('_id');
    expect(typeof responseData._id).toBe('string');
    expect(responseData._id.length).toBeGreaterThan(0);
  });

  test('회원가입 성공 후 모달의 확인 버튼 클릭 시 로그인 페이지로 이동해야 한다', async ({ page }) => {
    // 타임스탬프를 포함한 유니크한 이메일 생성
    const timestamp = Date.now();
    const uniqueEmail = `test${timestamp}@example.com`;

    // 유효한 데이터로 회원가입
    await page.locator('[data-testid="auth-signup-email-input"]').fill(uniqueEmail);
    await page.locator('[data-testid="auth-signup-password-input"]').fill('test1234');
    await page.locator('[data-testid="auth-signup-password-confirm-input"]').fill('test1234');
    await page.locator('[data-testid="auth-signup-name-input"]').fill('테스트유저');
    
    await page.locator('[data-testid="auth-signup-submit-button"]').click();

    // 모달 대기
    await page.waitForSelector('[data-testid="modal"]', { timeout: 2000 });

    // 확인 버튼 클릭
    const confirmButton = page.locator('[data-testid="modal-confirm-button"]');
    await confirmButton.click();

    // 로그인 페이지로 이동했는지 확인
    await page.waitForURL('/auth/login', { timeout: 1000 });
    expect(page.url()).toContain('/auth/login');
  });

  test('회원가입 실패 시 (모킹) 실패 모달이 표시되어야 한다', async ({ page }) => {
    // API를 모킹하여 실패 응답 반환
    await page.route('**/graphql', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          errors: [
            {
              message: '이미 존재하는 이메일입니다.',
            },
          ],
        }),
      });
    });

    // 회원가입 시도
    await page.locator('[data-testid="auth-signup-email-input"]').fill('existing@example.com');
    await page.locator('[data-testid="auth-signup-password-input"]').fill('test1234');
    await page.locator('[data-testid="auth-signup-password-confirm-input"]').fill('test1234');
    await page.locator('[data-testid="auth-signup-name-input"]').fill('테스트');
    
    await page.locator('[data-testid="auth-signup-submit-button"]').click();

    // 실패 모달 대기 (timeout: 2000ms)
    await page.waitForSelector('[data-testid="modal"]', { timeout: 2000 });

    // 모달이 danger variant인지 확인
    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).toBeVisible();
    
    const modalTitle = page.locator('[data-testid="modal-title"]');
    await expect(modalTitle).toContainText('실패');
  });

  test('회원가입 실패 후 모달의 확인 버튼 클릭 시 모달이 닫혀야 한다', async ({ page }) => {
    // API 모킹
    await page.route('**/graphql', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          errors: [
            {
              message: '회원가입에 실패했습니다.',
            },
          ],
        }),
      });
    });

    // 회원가입 시도
    await page.locator('[data-testid="auth-signup-email-input"]').fill('test@example.com');
    await page.locator('[data-testid="auth-signup-password-input"]').fill('test1234');
    await page.locator('[data-testid="auth-signup-password-confirm-input"]').fill('test1234');
    await page.locator('[data-testid="auth-signup-name-input"]').fill('테스트');
    
    await page.locator('[data-testid="auth-signup-submit-button"]').click();

    // 모달 대기
    await page.waitForSelector('[data-testid="modal"]', { timeout: 2000 });

    // 확인 버튼 클릭
    const confirmButton = page.locator('[data-testid="modal-confirm-button"]');
    await confirmButton.click();

    // 모달이 닫혔는지 확인
    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).not.toBeVisible();
    
    // 여전히 회원가입 페이지에 있는지 확인
    expect(page.url()).toContain('/auth/signup');
  });
});

