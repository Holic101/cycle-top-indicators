import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchMarketData } from '../../store/slices/marketDataSlice';
import MAG7Table from './MAG7Table';
import BTCMetrics from './BTCMetrics';
import PriceChart from './PriceChart';
import { LineChart } from 'lucide-react';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { mag7, btc, loading, error } = useSelector(
    (state: RootState) => state.marketData
  );

  useEffect(() => {
    dispatch(fetchMarketData());
    const interval = setInterval(() => {
      dispatch(fetchMarketData());
    }, 60000);
    return () => clearInterval(interval);
  }, [dispatch]);

  if (loading && !mag7 && !btc) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin text-blue-500">
          <LineChart size={48} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Crypto Market Cycles Dashboard
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BTCMetrics data={btc} />
          <PriceChart />
        </div>

        <MAG7Table data={mag7} />
      </div>
    </div>
  );
};

export default Dashboard;