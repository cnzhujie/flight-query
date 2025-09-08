import React from 'react';

interface Filters {
  airlines: string[];
  minPrice: number;
  maxPrice: number;
  timeRange: { start: string; end: string };
}

interface FilterPanelProps {
  airlines: string[];
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  airlines,
  filters,
  onFiltersChange,
}) => {
  const handleAirlinesChange = (airline: string) => {
    const newAirlines = filters.airlines.includes(airline)
      ? filters.airlines.filter(a => a !== airline)
      : [...filters.airlines, airline];
    
    onFiltersChange({
      ...filters,
      airlines: newAirlines,
    });
  };

  const handlePriceChange = (field: 'minPrice' | 'maxPrice', value: string) => {
    const numValue = value === '' ? 0 : parseInt(value);
    onFiltersChange({
      ...filters,
      [field]: numValue,
    });
  };

  const handleTimeRangeChange = (field: 'start' | 'end', value: string) => {
    onFiltersChange({
      ...filters,
      timeRange: {
        ...filters.timeRange,
        [field]: value,
      },
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      airlines: [],
      minPrice: 0,
      maxPrice: 10000,
      timeRange: { start: '00:00', end: '23:59' },
    });
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900">筛选条件</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          清除所有
        </button>
      </div>

      {/* Airlines Filter */}
      <div>
        <h4 className="font-medium text-gray-700 mb-3">航空公司</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {airlines.map(airline => (
            <label key={airline} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.airlines.includes(airline)}
                onChange={() => handleAirlinesChange(airline)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">{airline}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <h4 className="font-medium text-gray-700 mb-3">价格范围</h4>
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">最低价</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">¥</span>
              <input
                type="number"
                value={filters.minPrice}
                onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                className="pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-24"
                min="0"
                max="10000"
              />
            </div>
          </div>
          
          <div className="text-gray-400">-</div>
          
          <div>
            <label className="block text-sm text-gray-600 mb-1">最高价</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">¥</span>
              <input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                className="pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-24"
                min="0"
                max="10000"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Time Range Filter */}
      <div>
        <h4 className="font-medium text-gray-700 mb-3">出发时间</h4>
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">开始时间</label>
            <input
              type="time"
              value={filters.timeRange.start}
              onChange={(e) => handleTimeRangeChange('start', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <div className="text-gray-400">-</div>
          
          <div>
            <label className="block text-sm text-gray-600 mb-1">结束时间</label>
            <input
              type="time"
              value={filters.timeRange.end}
              onChange={(e) => handleTimeRangeChange('end', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};