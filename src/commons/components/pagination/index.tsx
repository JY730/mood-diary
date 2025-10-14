import React from 'react';
import styles from './styles.module.css';

export interface PaginationProps {
  /**
   * 페이지네이션의 시각적 스타일 변형
   */
  variant?: 'primary' | 'secondary' | 'tertiary';
  
  /**
   * 페이지네이션의 크기
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * 테마 모드
   */
  theme?: 'light' | 'dark';
  
  /**
   * 현재 페이지 번호 (1부터 시작)
   */
  currentPage: number;
  
  /**
   * 전체 페이지 수
   */
  totalPages: number;
  
  /**
   * 표시할 페이지 번호 개수 (기본값: 5)
   */
  visiblePages?: number;
  
  /**
   * 페이지 변경 시 호출되는 콜백 함수
   */
  onPageChange: (page: number) => void;
  
  /**
   * 이전/다음 버튼 비활성화 여부
   */
  disabled?: boolean;
  
  /**
   * 추가 CSS 클래스명
   */
  className?: string;
  
  /**
   * 이전 버튼 라벨
   */
  prevLabel?: string;
  
  /**
   * 다음 버튼 라벨
   */
  nextLabel?: string;
  
  /**
   * 페이지 번호 숨김 여부
   */
  hidePageNumbers?: boolean;
  
  /**
   * 경계 페이지 표시 여부 (첫 페이지, 마지막 페이지)
   */
  showBoundaries?: boolean;
}

/**
 * Pagination 컴포넌트
 * 
 * 다양한 variant, size, theme을 지원하는 페이지네이션 컴포넌트입니다.
 * Figma 디자인 시스템을 기반으로 구현되었습니다.
 * 
 * @example
 * ```tsx
 * <Pagination 
 *   variant="primary" 
 *   size="medium" 
 *   theme="light"
 *   currentPage={1}
 *   totalPages={10}
 *   onPageChange={(page) => console.log(page)}
 * />
 * ```
 */
export const Pagination: React.FC<PaginationProps> = ({
  variant = 'primary',
  size = 'medium',
  theme = 'light',
  currentPage,
  totalPages,
  visiblePages = 5,
  onPageChange,
  disabled = false,
  className,
  prevLabel,
  nextLabel,
  hidePageNumbers = false,
  showBoundaries = false,
}) => {
  // 페이지네이션 컨테이너 클래스
  const paginationClasses = [
    styles.pagination,
    styles[`pagination--${variant}`],
    styles[`pagination--${size}`],
    styles[`pagination--${theme}`],
    disabled && styles['pagination--disabled'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // 표시할 페이지 번호 계산
  const getVisiblePageNumbers = (): number[] => {
    if (totalPages <= visiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(visiblePages / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + visiblePages - 1);

    if (end - start + 1 < visiblePages) {
      start = Math.max(1, end - visiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // 이전 페이지로 이동
  const handlePrevPage = () => {
    if (!disabled && currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // 다음 페이지로 이동
  const handleNextPage = () => {
    if (!disabled && currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // 특정 페이지로 이동
  const handlePageClick = (page: number) => {
    if (!disabled && page !== currentPage) {
      onPageChange(page);
    }
  };

  // 이전 버튼 비활성화 여부
  const isPrevDisabled = disabled || currentPage <= 1;
  
  // 다음 버튼 비활성화 여부
  const isNextDisabled = disabled || currentPage >= totalPages;

  const visiblePageNumbers = getVisiblePageNumbers();

  return (
    <nav className={paginationClasses} role="navigation" aria-label="페이지네이션">
      {/* 이전 페이지 버튼 */}
      <button
        className={[
          styles.pageButton,
          styles.navButton,
          isPrevDisabled && styles['pageButton--disabled'],
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={handlePrevPage}
        disabled={isPrevDisabled}
        aria-label={prevLabel || '이전 페이지'}
        type="button"
      >
        <svg
          className={styles.navIcon}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
            fill="currentColor"
          />
        </svg>
      </button>

      {/* 페이지 번호들 */}
      {!hidePageNumbers && (
        <div className={styles.pageNumbers}>
          {/* 첫 페이지 표시 (경계 표시 옵션이 켜져있고, 현재 표시되는 페이지에 1이 없을 때) */}
          {showBoundaries && visiblePageNumbers[0] > 1 && (
            <>
              <button
                className={[
                  styles.pageButton,
                  styles.pageNumber,
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => handlePageClick(1)}
                disabled={disabled}
                aria-label="1페이지로 이동"
                type="button"
              >
                1
              </button>
              {visiblePageNumbers[0] > 2 && (
                <span className={styles.ellipsis} aria-hidden="true">
                  ...
                </span>
              )}
            </>
          )}

          {/* 표시되는 페이지 번호들 */}
          {visiblePageNumbers.map((page) => (
            <button
              key={page}
              className={[
                styles.pageButton,
                styles.pageNumber,
                page === currentPage && styles['pageButton--active'],
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => handlePageClick(page)}
              disabled={disabled}
              aria-label={`${page}페이지로 이동`}
              aria-current={page === currentPage ? 'page' : undefined}
              type="button"
            >
              {page}
            </button>
          ))}

          {/* 마지막 페이지 표시 (경계 표시 옵션이 켜져있고, 현재 표시되는 페이지에 마지막 페이지가 없을 때) */}
          {showBoundaries && visiblePageNumbers[visiblePageNumbers.length - 1] < totalPages && (
            <>
              {visiblePageNumbers[visiblePageNumbers.length - 1] < totalPages - 1 && (
                <span className={styles.ellipsis} aria-hidden="true">
                  ...
                </span>
              )}
              <button
                className={[
                  styles.pageButton,
                  styles.pageNumber,
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => handlePageClick(totalPages)}
                disabled={disabled}
                aria-label={`${totalPages}페이지로 이동`}
                type="button"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>
      )}

      {/* 다음 페이지 버튼 */}
      <button
        className={[
          styles.pageButton,
          styles.navButton,
          isNextDisabled && styles['pageButton--disabled'],
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={handleNextPage}
        disabled={isNextDisabled}
        aria-label={nextLabel || '다음 페이지'}
        type="button"
      >
        <svg
          className={styles.navIcon}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"
            fill="currentColor"
          />
        </svg>
      </button>
    </nav>
  );
};

export default Pagination;
