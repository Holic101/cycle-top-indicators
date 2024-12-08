import React, { useState } from 'react';
import { useHistoricalData } from '../../hooks/useHistoricalData';
import TimeframeSelector from './TimeframeSelector';
import ChartContainer from './ChartContainer';
import { LineChart } from 'lucide-react';

const PriceChart: React.FC = () => {
  const [timeframe, setTimeframe] = useState('1d');
  const { data, loading, error } = useHistoricalData('btc-mag7', timeframe);

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-red-500 text-center p-4">
          Error loading chart data: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">BTC/MAG7 Ratio</h2>
        <TimeframeSelector
          timeframe={timeframe}
          onTimeframeChange={setTimeframe}
        />
      </div>

      {loading ? (
        <div className="h-[400px] flex items-center justify-center">
          <div className="animate-spin text-blue-500">
            <LineChart size={48} />
          </div>
        </div>
      ) : (
        <ChartContainer data={data} />
      )}
    </div>
  );
};

export default PriceChart;