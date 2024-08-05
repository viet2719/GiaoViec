import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import styles from './Chitiet.module.css';
import { POST } from '@/pages/api/auth';
import { convertTimestamp } from '@/utils/dataUtils';
import BtnEdit from './BtnEdit';
import { getCurrentID, getType } from '@/pages/api/auth';

interface GoogleDocsViewerProps {
  fileUrl: string;
  // isIframeFullscreen: boolean;
}

const GoogleDocsViewer: React.FC<GoogleDocsViewerProps> = ({ fileUrl }) => {
  const arrTail = ['doc', 'docx', 'xlsx']
  const tailUrl = fileUrl?.split('.').pop() || ''
  let newUrl
  if (arrTail.includes(tailUrl)){
    newUrl = `https://docs.google.com/viewer?embedded=true&url=${fileUrl}`
  } else {
    newUrl = fileUrl
  }
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        src={newUrl}
        // src={`${fileUrl}`}
        width="100%"
        height="95%"
        // frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

export default GoogleDocsViewer;
