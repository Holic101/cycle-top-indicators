import { useState, useEffect } from 'react';
import { getHistoricalData } from '../services/api';
import { ChartData } from '../types';
import { format } from 'date-fns';

export const useHistoricalData = (indicator: string, timeframe: string) => {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const historicalData = await getHistoricalData(indicator, timeframe);
        
        if (mounted) {
          const formattedData = historicalData.map((item) => ({
            timestamp: format(new Date(item.timestamp), 'MMM dd HH:mm'),
            value: item.value,
          }));
          setData(formattedData);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch data');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [indicator, timeframe]);

  return { data, loading, error };
};