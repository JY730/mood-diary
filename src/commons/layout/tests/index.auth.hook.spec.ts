import { test, expect } from '@playwright/test';

/**
 * Layout Auth Hook Tests
 * 
 * Layout 컴포넌트의 인증 기능을 테스트합니다.
 * - 비로그인 유저: 로그인 버튼 노출 및 클릭 시 로그인 페이지로 이동
 * - 로그인 유저: 유저 이름, 로그아웃 버튼 노출 및 로그아웃 기능
 * 
 * TDD 기반 Playwright 테스트
 */
test.describe('Layout Auth Hook - 비로그인 유저', () => {
  test.beforeEach(async ({ page }) => {
    // 테스트 전에 localStorage 클리어하여 비로그인 상태 만들기
    await page.goto('/diaries');
    await page.evaluate(() => localStorage.clear());
    
    // 페이지 새로고침하여 비로그인 상태 반영
    await page.reload();
    
    // 페이지 로드 완료 대기 (data-testid 기반)
    await page.waitForSelector('[data-testid="header"]', { timeout: 400 });
  });

  test('비회원으로 /diaries에 접속하여 페이지 로드 확인', async ({ page }) => {
    // URL 확인
    await expect(page).toHaveURL('/diaries');
    
    // 헤더가 표시되는지 확인
    const header = page.locator('[data-testid="header"]');
    await expect(header).toBeVisible();
    
    // 로고가 표시되는지 확인
    const logo = page.locator('[data-testid="logo"]');
    await expect(logo).toBeVisible();
  });

  test('layout의 로그인버튼 노출여부 확인', async ({ page }) => {
    // 로그인 버튼이 표시되는지 확인
    const loginButton = page.locator('[data-testid="login-button"]');
    await expect(loginButton).toBeVisible();
    
    // 로그인 버튼 텍스트 확인
    await expect(loginButton).toContainText('로그인');
    
    // 로그아웃 버튼이 표시되지 않는지 확인
    const logoutButton = page.locator('[data-testid="logout-button"]');
    await expect(logoutButton).not.toBeVisible();
    
    // 유저 이름이 표시되지 않는지 확인
    const userName = page.locator('[data-testid="user-name"]');
    await expect(userName).not.toBeVisible();
  });

  test('로그인버튼 클릭하여 /auth/login 페이지로 이동', async ({ page }) => {
    // 로그인 버튼 클릭
    const loginButton = page.locator('[data-testid="login-button"]');
    await loginButton.click();
    
    // 로그인 페이지로 이동했는지 확인
    await page.waitForURL('/auth/login', { timeout: 3000 });
    await expect(page).toHaveURL('/auth/login');
    
    // 로그인 페이지의 컨테이너가 로드되었는지 확인
    await page.waitForSelector('[data-testid="auth-login-container"]', { timeout: 2000 });
  });
});

test.describe('Layout Auth Hook - 로그인 유저', () => {
  test.beforeEach(async ({ page }) => {
    // 테스트 전에 localStorage 클리어
    await page.goto('/auth/login');
    await page.evaluate(() => localStorage.clear());
    
    // 페이지 로드 완료 대기
    await page.waitForSelector('[data-testid="auth-login-container"]', { timeout: 2000 });
  });

  test('비회원으로 /auth/login에 접속하여 페이지 로드 확인', async ({ page }) => {
    // URL 확인
    await expect(page).toHaveURL('/auth/login');
    
    // 이메일, 비밀번호 입력 필드 확인
    const emailInput = page.locator('[data-testid="auth-login-email-input"]');
    const passwordInput = page.locator('[data-testid="auth-login-password-input"]');
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });

  test('로그인 성공 후, 완료 모달 클릭하여 /diaries 페이지 로드 확인', async ({ page }) => {
    // 로그인 정보 입력
    const emailInput = page.locator('[data-testid="auth-login-email-input"]');
    const passwordInput = page.locator('[data-testid="auth-login-password-input"]');
    const submitButton = page.locator('[data-testid="auth-login-submit-button"]');
    
    await emailInput.fill('a@c.com');
    await passwordInput.fill('1234qwer');
    
    // 로그인 버튼 클릭
    await submitButton.click();
    
    // 성공 모달 대기
    await page.waitForSelector('[data-testid="modal"]', { timeout: 2000 });
    
    // 확인 버튼 클릭
    const confirmButton = page.locator('[data-testid="modal-confirm-button"]');
    await confirmButton.click();
    
    // /diaries 페이지로 이동했는지 확인
    await page.waitForURL('/diaries', { timeout: 2000 });
    await expect(page).toHaveURL('/diaries');
    
    // 헤더가 로드되었는지 확인
    await page.waitForSelector('[data-testid="header"]', { timeout: 400 });
  });

  test('layout에서 유저이름, 로그아웃버튼 노출여부 확인', async ({ page }) => {
    // 로그인 정보 입력
    const emailInput = page.locator('[data-testid="auth-login-email-input"]');
    const passwordInput = page.locator('[data-testid="auth-login-password-input"]');
    const submitButton = page.locator('[data-testid="auth-login-submit-button"]');
    
    await emailInput.fill('a@c.com');
    await passwordInput.fill('1234qwer');
    await submitButton.click();
    
    // 모달 확인 버튼 클릭
    await page.waitForSelector('[data-testid="modal"]', { timeout: 2000 });
    const confirmButton = page.locator('[data-testid="modal-confirm-button"]');
    await confirmButton.click();
    
    // /diaries 페이지로 이동
    await page.waitForURL('/diaries', { timeout: 2000 });
    await page.waitForSelector('[data-testid="header"]', { timeout: 400 });
    
    // auth-status 영역이 표시되는지 확인
    const authStatus = page.locator('[data-testid="auth-status"]');
    await expect(authStatus).toBeVisible();
    
    // 유저 이름이 표시되는지 확인
    const userName = page.locator('[data-testid="user-name"]');
    await expect(userName).toBeVisible();
    
    // 로그아웃 버튼이 표시되는지 확인
    const logoutButton = page.locator('[data-testid="logout-button"]');
    await expect(logoutButton).toBeVisible();
    await expect(logoutButton).toContainText('로그아웃');
    
    // 로그인 버튼이 표시되지 않는지 확인
    const loginButton = page.locator('[data-testid="login-button"]');
    await expect(loginButton).not.toBeVisible();
  });

  test('로그아웃버튼 클릭하여 /auth/login 페이지 로드 확인', async ({ page }) => {
    // 로그인 정보 입력
    const emailInput = page.locator('[data-testid="auth-login-email-input"]');
    const passwordInput = page.locator('[data-testid="auth-login-password-input"]');
    const submitButton = page.locator('[data-testid="auth-login-submit-button"]');
    
    await emailInput.fill('a@c.com');
    await passwordInput.fill('1234qwer');
    await submitButton.click();
    
    // 모달 확인
    await page.waitForSelector('[data-testid="modal"]', { timeout: 2000 });
    const confirmButton = page.locator('[data-testid="modal-confirm-button"]');
    await confirmButton.click();
    
    // /diaries 페이지 로드
    await page.waitForURL('/diaries', { timeout: 2000 });
    await page.waitForSelector('[data-testid="header"]', { timeout: 400 });
    
    // 로그아웃 버튼 클릭
    const logoutButton = page.locator('[data-testid="logout-button"]');
    await logoutButton.click();
    
    // 로그인 페이지로 이동했는지 확인
    await page.waitForURL('/auth/login', { timeout: 3000 });
    await expect(page).toHaveURL('/auth/login');
    
    // 로그인 페이지 로드 확인
    await page.waitForSelector('[data-testid="auth-login-container"]', { timeout: 2000 });
  });

  test('/diaries에 접속하여 페이지 로드 확인 및 로그인버튼 노출여부 확인', async ({ page }) => {
    // 로그인 정보 입력
    const emailInput = page.locator('[data-testid="auth-login-email-input"]');
    const passwordInput = page.locator('[data-testid="auth-login-password-input"]');
    const submitButton = page.locator('[data-testid="auth-login-submit-button"]');
    
    await emailInput.fill('a@c.com');
    await passwordInput.fill('1234qwer');
    await submitButton.click();
    
    // 모달 확인
    await page.waitForSelector('[data-testid="modal"]', { timeout: 2000 });
    const confirmButton = page.locator('[data-testid="modal-confirm-button"]');
    await confirmButton.click();
    
    // /diaries 페이지 로드
    await page.waitForURL('/diaries', { timeout: 2000 });
    await page.waitForSelector('[data-testid="header"]', { timeout: 400 });
    
    // 로그아웃
    const logoutButton = page.locator('[data-testid="logout-button"]');
    await logoutButton.click();
    
    // 로그인 페이지로 이동
    await page.waitForURL('/auth/login', { timeout: 2000 });
    
    // 다시 /diaries에 접속
    await page.goto('/diaries');
    await page.waitForSelector('[data-testid="header"]', { timeout: 400 });
    
    // 로그인 버튼이 표시되는지 확인
    const loginButton = page.locator('[data-testid="login-button"]');
    await expect(loginButton).toBeVisible();
    
    // 로그아웃 버튼이 표시되지 않는지 확인
    await expect(logoutButton).not.toBeVisible();
  });

  test('localStorage에서 accessToken과 user 제거 확인', async ({ page }) => {
    // 로그인 정보 입력
    const emailInput = page.locator('[data-testid="auth-login-email-input"]');
    const passwordInput = page.locator('[data-testid="auth-login-password-input"]');
    const submitButton = page.locator('[data-testid="auth-login-submit-button"]');
    
    await emailInput.fill('a@c.com');
    await passwordInput.fill('1234qwer');
    await submitButton.click();
    
    // 모달 확인
    await page.waitForSelector('[data-testid="modal"]', { timeout: 2000 });
    const confirmButton = page.locator('[data-testid="modal-confirm-button"]');
    await confirmButton.click();
    
    // /diaries 페이지 로드
    await page.waitForURL('/diaries', { timeout: 2000 });
    await page.waitForSelector('[data-testid="header"]', { timeout: 400 });
    
    // localStorage에 accessToken과 user가 저장되어 있는지 확인
    let accessToken = await page.evaluate(() => localStorage.getItem('accessToken'));
    let user = await page.evaluate(() => localStorage.getItem('user'));
    expect(accessToken).toBeTruthy();
    expect(user).toBeTruthy();
    
    // 로그아웃
    const logoutButton = page.locator('[data-testid="logout-button"]');
    await logoutButton.click();
    
    // 로그인 페이지로 이동
    await page.waitForURL('/auth/login', { timeout: 2000 });
    
    // localStorage에서 accessToken과 user가 제거되었는지 확인
    accessToken = await page.evaluate(() => localStorage.getItem('accessToken'));
    user = await page.evaluate(() => localStorage.getItem('user'));
    expect(accessToken).toBeFalsy();
    expect(user).toBeFalsy();
  });
});

