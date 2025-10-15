import React from 'react';
import DiariesDetail from '@/components/diaries-detail';

interface DiaryDetailPageProps {
  params: {
    id: string;
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DiaryDetailPage: React.FC<DiaryDetailPageProps> = ({ params }) => {
  return <DiariesDetail />;
};

export default DiaryDetailPage;
