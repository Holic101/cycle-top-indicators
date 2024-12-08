import React from 'react';
import type { BTCData } from '../../types';
import { Bitcoin, TrendingUp, TrendingDown } from 'lucide-react';

interface Props {
  data: BTCData | null;
}

const BTCMetrics: React.FC<Props> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Bitcoin className="w-8 h-8 text-orange-500" />
        <h2 className="text-xl font-semibold">Bitcoin Metrics</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Price</p>
          <p className="text-2xl font-bold">${data.price.toLocaleString()}</p>
          <div
            className={`flex items-center mt-1 ${
              data.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {data.changePercent >= 0 ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            {data.changePercent.toFixed(2)}%
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Market Cap</p>
          <p className="text-2xl font-bold">
            ${(data.marketCap / 1e9).toFixed(2)}B
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 mb-1">24h Volume</p>
          <p className="text-2xl font-bold">
            ${(data.volume / 1e9).toFixed(2)}B
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 mb-1">24h Change</p>
          <p className="text-2xl font-bold">${data.change.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default BTCMetrics;