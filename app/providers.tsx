'use client';

import React from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until client-side
  if (!mounted) {
    return (
      <div className="min-h-screen bg-black">
        <div className="flex items-center justify-center h-screen">
          <div className="text-cyan-400 animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}