'use client';

import React from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  // Remove the mounting check - it's breaking interactivity
  return <>{children}</>;
}