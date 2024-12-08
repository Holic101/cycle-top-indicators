import React from 'react';

interface TimeframeSelectorProps {
  timeframe: string;
  onTimeframeChange: (timeframe: string) => void;
}

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({
  timeframe,
  onTimeframeChange,
}) => {
  return (
    <div className="flex space-x-2">
      {['1d', '1w', '1m'].map((tf) => (
        <button
          key={tf}
          onClick={() => onTimeframeChange(tf)}
          className={`px-3 py-1 rounded ${
            timeframe === tf
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {tf.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default TimeframeSelector;