import React, { useState, useMemo } from 'react';
import { Flight } from '../../types/flight';
import { FlightCard } from '../FlightCard/FlightCard';
import { FilterPanel } from '../FilterPanel/FilterPanel';
import { Frown, Filter } from 'lucide-react';

interface FlightListProps {
  flights: Flight[];
  loading?: boolean;
  total?: number;
}

export const FlightList: React.FC<FlightListProps> = ({ flights, loading = false, total = 0 }) => {
  const [sortBy, setSortBy] = useState<'price' | 'time'>('price');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    airlines: [] as string[],
    minPrice: 0,
    maxPrice: 10000,
    timeRange: { start: '00:00', end: '23:59' },
  });

  const sortedAndFilteredFlights = useMemo(() => {
    let result = [...flights];

    // Apply filters
    if (filters.airlines.length > 0) {
      result = result.filter(flight => filters.airlines.includes(flight.airline));
    }

    result = result.filter(flight => 
      flight.price >= filters.minPrice && flight.price <= filters.maxPrice
    );

    // Sort
    if (sortBy === 'price') {
      result.sort((a, b) => a.price - b.price);
    } else {
      result.sort((a, b) => 
        new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime()
      );
    }

    return result;
  }, [flights, sortBy, filters]);

  const uniqueAirlines = useMemo(() => {
    return Array.from(new Set(flights.map(f => f.airline)));
  }, [flights]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-xl mb-4"></div>
          ))}
        </div>
      </div>
    );
  }

  if (flights.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
        <Frown className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">暂无航班信息</h3>
        <p className="text-gray-600">请尝试调整搜索条件或选择其他日期</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            找到 {total} 个航班
          </h2>
          <p className="text-gray-600 text-sm">
            显示 {sortedAndFilteredFlights.length} 个结果
          </p>
        </div>

        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Filter className="h-4 w-4" />
            <span>筛选</span>
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'price' | 'time')}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="price">按价格排序</option>
            <option value="time">按时间排序</option>
          </select>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mb-6">
          <FilterPanel
            airlines={uniqueAirlines}
            filters={filters}
            onFiltersChange={setFilters}
          />
        </div>
      )}

      {/* Flight List */}
      <div className="space-y-4">
        {sortedAndFilteredFlights.map((flight, index) => (
          <FlightCard key={`${flight.flightNo}-${index}`} flight={flight} />
        ))}
      </div>

      {sortedAndFilteredFlights.length === 0 && (
        <div className="text-center py-12">
          <Frown className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">没有符合筛选条件的航班</p>
        </div>
      )}
    </div>
  );
};