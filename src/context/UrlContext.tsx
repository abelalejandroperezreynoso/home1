import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UrlContextType {
  urls: {
    personal: string;
  };
  updateUrls: (newUrls: Partial<UrlContextType['urls']>) => void;
}

const defaultUrls = {
  personal: 'https://velvety-haupia-a28310.netlify.app',
};

const UrlContext = createContext<UrlContextType | undefined>(undefined);

export function UrlProvider({ children }: { children: ReactNode }) {
  const [urls, setUrls] = useState(defaultUrls);

  const updateUrls = (newUrls: Partial<UrlContextType['urls']>) => {
    setUrls(prev => ({ ...prev, ...newUrls }));
  };

  return (
    <UrlContext.Provider value={{ urls, updateUrls }}>
      {children}
    </UrlContext.Provider>
  );
}

export function useUrls() {
  const context = useContext(UrlContext);
  if (context === undefined) {
    throw new Error('useUrls must be used within a UrlProvider');
  }
  return context;
}