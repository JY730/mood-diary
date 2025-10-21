import { test, expect } from '@playwright/test';

/**
 * 로그인 폼 등록 기능 테스트
 * TDD 기반으로 작성된 Playwright 테스트
 * 
 * 테스트 시나리오:
 * 1. 모든 인풋 입력 시 버튼 활성화 확인
 * 2. 성공 시나리오:
 *    - localStorage에 accessToken과 사용자 정보 저장 확인
 *    - loginUser API가 accessToken 정상 반환 확인
 *    - fetchUserLoggedIn API가 _id와 name 정상 반환 확인
 *    - 모달 확인 후 일기 목록 페이지 이동 확인
 * 3. 실패 시나리오:
 *    - API 모킹하여 에러 모달 표시 확인
 *    - 모달 확인 후 로그인 페이지 유지 확인
 * 4. 이메일 검증: @ 포함 확인
 * 5. 비밀번호 검증: 최소 1글자 이상 확인
 */

test.describe('로그인 폼 등록 기능', () => {
  test.beforeEach(async ({ page }) => {
    // 테스트 전에 localStorage 클리어
    await page.goto('/auth/login');
    await page.evaluate(() => localStorage.clear());
    
    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForSelector('[data-testid="auth-login-container"]');
  });

  test('모든 인풋이 입력되면 로그인 버튼이 활성화되어야 함', async ({ page }) => {
    const emailInput = page.locator('[data-testid="auth-login-email-input"]');
    const passwordInput = page.locator('[data-testid="auth-login-password-input"]');
    const submitButton = page.locator('[data-testid="auth-login-submit-button"]');

    // 초기 상태: 버튼 비활성화
    await expect(submitButton).toBeDisabled();

    // 이메일만 입력
    await emailInput.fill('a@c.com');
    await expect(submitButton).toBeDisabled();

    // 비밀번호도 입력
    await passwordInput.fill('1234qwer');
    await expect(submitButton).toBeEnabled();
  });

  test('성공 시나리오: 로그인 성공 시 localStorage에 accessToken과 사용자 정보가 저장되어야 함', async ({ page }) => {
    const emailInput = page.locator('[data-testid="auth-login-email-input"]');
    const passwordInput = page.locator('[data-testid="auth-login-password-input"]');
    const submitButton = page.locator('[data-testid="auth-login-submit-button"]');

    // 실제 데이터로 입력
    await emailInput.fill('a@c.com');
    await passwordInput.fill('1234qwer');

    // 로그인 버튼 클릭
    await submitButton.click();

    // 성공 모달이 나타날 때까지 대기 (2초 이내)
    await page.waitForSelector('[data-testid="modal"]', { timeout: 2000 });
    
    // 성공 모달 확인
    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).toBeVisible();
    
    const modalTitle = page.locator('[data-testid="modal-title"]');
    await expect(modalTitle).toContainText('로그인 완료');

    // localStorage에 저장된 데이터 확인
    const accessToken = await page.evaluate(() => localStorage.getItem('accessToken'));
    const userStr = await page.evaluate(() => localStorage.getItem('user'));

    expect(accessToken).toBeTruthy();
    expect(userStr).toBeTruthy();

    if (userStr) {
      const user = JSON.parse(userStr);
      expect(user._id).toBeTruthy();
      expect(user.name).toBeTruthy();
    }
  });

  test('성공 시나리오: loginUser API가 accessToken을 정상적으로 반환해야 함', async ({ page }) => {
    // GraphQL 응답 캡처
    let loginResponse: { accessToken: string } | null = null;
    page.on('response', async (response) => {
      if (response.url().includes('graphql')) {
        try {
          const json = await response.json();
          if (json.data?.loginUser) {
            loginResponse = json.data.loginUser;
          }
        } catch {
          // JSON 파싱 실패 시 무시
        }
      }
    });

    const emailInput = page.locator('[data-testid="auth-login-email-input"]');
    const passwordInput = page.locator('[data-testid="auth-login-password-input"]');
    const submitButton = page.locator('[data-testid="auth-login-submit-button"]');

    // 실제 데이터로 입력
    await emailInput.fill('a@c.com');
    await passwordInput.fill('1234qwer');

    // 로그인 버튼 클릭
    await submitButton.click();

    // 모달이 표시될 때까지 대기 (API 응답 완료 후)
    await page.waitForSelector('[data-testid="modal"]', { timeout: 2000 });

    // accessToken이 반환되었는지 확인
    expect(loginResponse).not.toBeNull();
    expect(loginResponse).toHaveProperty('accessToken');
    if (loginResponse && 'accessToken' in loginResponse) {
      expect(typeof loginResponse.accessToken).toBe('string');
      expect(loginResponse.accessToken.length).toBeGreaterThan(0);
    }
  });

  test('성공 시나리오: fetchUserLoggedIn API가 _id와 name을 정상적으로 반환해야 함', async ({ page }) => {
    // GraphQL 응답 캡처
    let userResponse: { _id: string; name: string } | null = null;
    page.on('response', async (response) => {
      if (response.url().includes('graphql')) {
        try {
          const json = await response.json();
          if (json.data?.fetchUserLoggedIn) {
            userResponse = json.data.fetchUserLoggedIn;
          }
        } catch {
          // JSON 파싱 실패 시 무시
        }
      }
    });

    const emailInput = page.locator('[data-testid="auth-login-email-input"]');
    const passwordInput = page.locator('[data-testid="auth-login-password-input"]');
    const submitButton = page.locator('[data-testid="auth-login-submit-button"]');

    // 실제 데이터로 입력
    await emailInput.fill('a@c.com');
    await passwordInput.fill('1234qwer');

    // 로그인 버튼 클릭
    await submitButton.click();

    // 모달이 표시될 때까지 대기 (API 응답 완료 후)
    await page.waitForSelector('[data-testid="modal"]', { timeout: 2000 });

    // 사용자 정보가 반환되었는지 확인
    expect(userResponse).not.toBeNull();
    expect(userResponse).toHaveProperty('_id');
    expect(userResponse).toHaveProperty('name');
    if (userResponse && '_id' in userResponse && 'name' in userResponse) {
      expect(typeof userResponse._id).toBe('string');
      expect(typeof userResponse.name).toBe('string');
      expect(userResponse._id.length).toBeGreaterThan(0);
      expect(userResponse.name.length).toBeGreaterThan(0);
    }
  });

  test('성공 시나리오: 모달의 확인 버튼 클릭 시 일기 목록 페이지로 이동해야 함', async ({ page }) => {
    const emailInput = page.locator('[data-testid="auth-login-email-input"]');
    const passwordInput = page.locator('[data-testid="auth-login-password-input"]');
    const submitButton = page.locator('[data-testid="auth-login-submit-button"]');

    // 실제 데이터로 입력
    await emailInput.fill('a@c.com');
    await passwordInput.fill('1234qwer');

    // 로그인 버튼 클릭
    await submitButton.click();

    // 성공 모달이 나타날 때까지 대기
    await page.waitForSelector('[data-testid="modal"]', { timeout: 2000 });

    // 확인 버튼 클릭
    const confirmButton = page.locator('[data-testid="modal-confirm-button"]');
    await confirmButton.click();

    // 모달이 닫히고 일기 목록 페이지로 이동
    await page.waitForURL('/diaries', { timeout: 2000 });
    expect(page.url()).toContain('/diaries');
  });

  test('실패 시나리오: 잘못된 정보로 로그인 시 에러 모달이 나타나야 함', async ({ page }) => {
    // API 모킹을 위한 route 설정
    await page.route('**/api/graphql', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          errors: [
            {
              message: '로그인 실패',
            },
          ],
        }),
      });
    });

    const emailInput = page.locator('[data-testid="auth-login-email-input"]');
    const passwordInput = page.locator('[data-testid="auth-login-password-input"]');
    const submitButton = page.locator('[data-testid="auth-login-submit-button"]');

    // 잘못된 정보로 입력
    await emailInput.fill('wrong@example.com');
    await passwordInput.fill('wrongpassword');

    // 로그인 버튼 클릭
    await submitButton.click();

    // 실패 모달이 나타날 때까지 대기
    await page.waitForSelector('[data-testid="modal"]', { timeout: 2000 });
    
    // 실패 모달 확인
    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).toBeVisible();
    
    const modalTitle = page.locator('[data-testid="modal-title"]');
    await expect(modalTitle).toContainText('로그인 실패');

    // localStorage에 데이터가 저장되지 않았는지 확인
    const accessToken = await page.evaluate(() => localStorage.getItem('accessToken'));
    expect(accessToken).toBeFalsy();
  });

  test('실패 시나리오: 실패 모달의 확인 버튼 클릭 시 모달이 닫혀야 함', async ({ page }) => {
    // API 모킹
    await page.route('**/api/graphql', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          errors: [
            {
              message: '로그인에 실패했습니다',
            },
          ],
        }),
      });
    });

    const emailInput = page.locator('[data-testid="auth-login-email-input"]');
    const passwordInput = page.locator('[data-testid="auth-login-password-input"]');
    const submitButton = page.locator('[data-testid="auth-login-submit-button"]');

    // 잘못된 정보로 입력
    await emailInput.fill('fail@example.com');
    await passwordInput.fill('failpass');

    // 로그인 버튼 클릭
    await submitButton.click();

    // 모달 대기
    await page.waitForSelector('[data-testid="modal"]', { timeout: 2000 });

    // 확인 버튼 클릭
    const confirmButton = page.locator('[data-testid="modal-confirm-button"]');
    await confirmButton.click();

    // 모달이 닫혔는지 확인
    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).not.toBeVisible();
    
    // 여전히 로그인 페이지에 있는지 확인
    expect(page.url()).toContain('/auth/login');
  });

  test('이메일 검증: @ 포함 필수', async ({ page }) => {
    const emailInput = page.locator('[data-testid="auth-login-email-input"]');
    const passwordInput = page.locator('[data-testid="auth-login-password-input"]');
    const submitButton = page.locator('[data-testid="auth-login-submit-button"]');

    // @ 없는 이메일
    await emailInput.fill('invalidemail');
    await passwordInput.fill('1234qwer');

    // 버튼 비활성화 상태여야 함
    await expect(submitButton).toBeDisabled();
  });

  test('비밀번호 검증: 최소 1글자 이상', async ({ page }) => {
    const emailInput = page.locator('[data-testid="auth-login-email-input"]');
    const passwordInput = page.locator('[data-testid="auth-login-password-input"]');
    const submitButton = page.locator('[data-testid="auth-login-submit-button"]');

    // 빈 비밀번호
    await emailInput.fill('test@example.com');
    await passwordInput.fill('');

    // 버튼 비활성화 상태여야 함
    await expect(submitButton).toBeDisabled();

    // 1글자 이상 입력
    await passwordInput.fill('1');
    await expect(submitButton).toBeEnabled();
  });
});

