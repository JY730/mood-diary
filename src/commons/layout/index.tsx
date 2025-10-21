'use client';

import React from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import useLinkRouting from './hooks/index.link.routing.hook';
import useArea from './hooks/index.area.hook';
import { useAuth } from '@/commons/providers/auth/auth.provider';
import { Button } from '@/commons/components/button';

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Layout Component
 * 
 * 애플리케이션의 전체 레이아웃을 담당하는 컴포넌트
 * 헤더, 네비게이션, 메인 콘텐츠, 푸터를 포함하며 라우팅 기능을 제공합니다.
 * 
 * @example
 * ```tsx
 * <Layout>
 *   <YourPageContent />
 * </Layout>
 * ```
 */
export default function Layout({ children }: LayoutProps) {
  const {
    handleLogoClick,
    handleDiariesClick,
    handlePicturesClick,
    isDiariesActive,
    isPicturesActive,
  } = useLinkRouting();

  const {
    showHeader,
    showLogo,
    showBanner,
    showNavigation,
    showFooter,
  } = useArea();

  const { isLoggedIn, user } = useAuth();

  return (
    <div className={styles.container}>
      {showHeader && (
        <header className={styles.header} data-testid="header">
          {showLogo && (
            <div className={styles.logo} onClick={handleLogoClick} data-testid="logo">
              <span className={styles.logoText}>민지의 다이어리</span>
            </div>
          )}
          {isLoggedIn && (
            <div className={styles.authStatus} data-testid="auth-status">
              <span className={styles.userName}>{user?.name || '사용자'}</span>
              <Button
                variant="secondary"
                size="small"
                theme="light"
                className={styles.logoutButton}
                data-testid="logout-button"
              >
                로그아웃
              </Button>
            </div>
          )}
        </header>
      )}
      
      {showHeader && <div className={styles.gap}></div>}
      
      {showBanner && (
        <section className={styles.banner} data-testid="banner">
          <Image
            src="/images/banner.png"
            alt="배너 이미지"
            width={1168}
            height={240}
            className={styles.bannerImage}
          />
        </section>
      )}
      
      {showBanner && <div className={styles.gap}></div>}
      
      {showNavigation && (
        <nav className={styles.navigation} data-testid="navigation">
          <div className={styles.tabContainer}>
            <div 
              className={isDiariesActive ? styles.tabActive : styles.tabInactive}
              onClick={handleDiariesClick}
              data-testid="diaries-tab"
            >
              <span className={isDiariesActive ? styles.tabActiveText : styles.tabInactiveText}>
                일기보관함
              </span>
            </div>
            <div 
              className={isPicturesActive ? styles.tabActive : styles.tabInactive}
              onClick={handlePicturesClick}
              data-testid="pictures-tab"
            >
              <span className={isPicturesActive ? styles.tabActiveText : styles.tabInactiveText}>
                사진보관함
              </span>
            </div>
          </div>
        </nav>
      )}
      
      <main className={styles.children}>
        {children}
      </main>
      
      {showFooter && (
        <footer className={styles.footer} data-testid="footer">
          <div className={styles.footerContent}>
            <div className={styles.footerTitle}>민지의 다이어리</div>
            <div className={styles.footerInfo}>대표 : {'{name}'}</div>
            <div className={styles.footerCopyright}>Copyright © 2024. {'{name}'} Co., Ltd.</div>
          </div>
        </footer>
      )}
    </div>
  );
}
