'use client';

import React, { useEffect } from 'react';
import { initGA, GA_MEASUREMENT_ID, ANALYTICS_ENABLED } from '@/lib/analytics/google-analytics';

const GoogleAnalytics: React.FC = () => {
  useEffect(() => {
    if (ANALYTICS_ENABLED && GA_MEASUREMENT_ID) {
      initGA();
    }
  }, []);

  if (!ANALYTICS_ENABLED || !GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      {/* Google Analytics Script */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
