'use client';

import { useState, useEffect } from 'react';
import { 
  loadPortfolioData, 
  getDefaultPortfolioData, 
  PortfolioStoreData 
} from '@/lib/portfolioStorage';

export function usePortfolio(): PortfolioStoreData {
  const [data, setData] = useState<PortfolioStoreData>(getDefaultPortfolioData);

  useEffect(() => {
    // Read from storage on client mount
    setData(loadPortfolioData());

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<PortfolioStoreData>;
      if (customEvent.detail) {
        setData(customEvent.detail);
      }
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'portfolio_admin_data_v1') {
        setData(loadPortfolioData());
      }
    };

    window.addEventListener('portfolioDataUpdated', handleUpdate);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('portfolioDataUpdated', handleUpdate);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return data;
}
