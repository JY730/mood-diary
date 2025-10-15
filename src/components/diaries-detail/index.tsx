import React from 'react';
import styles from './styles.module.css';

const DiariesDetail: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.gap64}></div>
      
      <div className={styles.detailTitle}>
        detail-title (1168 * 84)
      </div>
      
      <div className={styles.gap24}></div>
      
      <div className={styles.detailContent}>
        detail-content (1168 * 169)
      </div>
      
      <div className={styles.gap24}></div>
      
      <div className={styles.detailFooter}>
        detail-footer (1168 * 56)
      </div>
      
      <div className={styles.gap24}></div>
      
      <div className={styles.retrospectInput}>
        retrospect-input (1168 * 85)
      </div>
      
      <div className={styles.gap16}></div>
      
      <div className={styles.retrospectList}>
        retrospect-list (1168 * 72)
      </div>
    </div>
  );
};

export default DiariesDetail;
