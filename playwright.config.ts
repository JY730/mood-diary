import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  /* Test timeout 설정 - 적절한 시간으로 증가 */
  timeout: 60000, // 전체 테스트 timeout (60초)
  expect: {
    timeout: 5000, // expect timeout (5초)
  },
  
  /* 테스트 병렬 실행 활성화 */
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  
  /* 실패 시 재시도 설정 */
  retries: process.env.CI ? 2 : 1,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: `http://localhost:${3000 + (process.env.AGENT_INDEX ? parseInt(process.env.AGENT_INDEX) : 0)}`,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    
    /* Test timeout 설정 - 적절한 시간으로 증가 */
    actionTimeout: 10000, // 10초
    navigationTimeout: 30000, // 30초
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: `npm run dev -- --port ${3000 + (process.env.AGENT_INDEX ? parseInt(process.env.AGENT_INDEX) : 0)}`,
    url: `http://localhost:${3000 + (process.env.AGENT_INDEX ? parseInt(process.env.AGENT_INDEX) : 0)}`,
    reuseExistingServer: !process.env.CI,
    timeout: 180000, // 웹서버 시작 timeout (3분)
    stdout: 'pipe',
    stderr: 'pipe',
    env: {
      NEXT_PUBLIC_TEST_ENV: 'test',
    }
  },
});
