import React, { useState } from 'react';
import { FlightQueryParams } from '../../types/flight';
import { Search, Plane, Calendar } from 'lucide-react';

interface SearchFormProps {
  onSubmit: (params: FlightQueryParams) => void;
  loading?: boolean;
}

const popularCities = [
  { code: 'PEK', name: '北京' },
  { code: 'SHA', name: '上海' },
  { code: 'CAN', name: '广州' },
  { code: 'SZX', name: '深圳' },
  { code: 'CTU', name: '成都' },
  { code: 'XIY', name: '西安' },
];

export const SearchForm: React.FC<SearchFormProps> = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState<FlightQueryParams>({
    dcity: '',
    acity: '',
    date: new Date().toISOString().split('T')[0],
    type: 'oneway',
  });

  const [showReturnDate, setShowReturnDate] = useState(false);

  const handleInputChange = (field: keyof FlightQueryParams, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value.toUpperCase(),
    }));
  };

  const handleFlightTypeChange = (type: 'oneway' | 'roundtrip') => {
    setFormData(prev => ({
      ...prev,
      type,
    }));
    setShowReturnDate(type === 'roundtrip');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.dcity && formData.acity && formData.date) {
      onSubmit(formData);
    }
  };

  const swapCities = () => {
    setFormData(prev => ({
      ...prev,
      dcity: prev.acity,
      acity: prev.dcity,
    }));
  };

  const selectPopularCity = (field: 'dcity' | 'acity', code: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: code,
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <div className="flex items-center mb-6">
        <Plane className="h-8 w-8 text-primary-600 mr-3" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">航班查询</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Flight Type Toggle */}
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => handleFlightTypeChange('oneway')}
            className={`flex-1 py-3 px-4 rounded-lg border-2 text-center font-medium transition-colors ${
              formData.type === 'oneway'
                ? 'border-primary-600 bg-primary-50 text-primary-700'
                : 'border-gray-300 text-gray-600 hover:border-gray-400'
            }`}
          >
            单程
          </button>
          <button
            type="button"
            onClick={() => handleFlightTypeChange('roundtrip')}
            className={`flex-1 py-3 px-4 rounded-lg border-2 text-center font-medium transition-colors ${
              formData.type === 'roundtrip'
                ? 'border-primary-600 bg-primary-50 text-primary-700'
                : 'border-gray-300 text-gray-600 hover:border-gray-400'
            }`}
          >
            往返
          </button>
        </div>

        {/* Cities Input */}
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              出发城市
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.dcity}
                onChange={(e) => handleInputChange('dcity', e.target.value)}
                placeholder="输入城市三字码 (如: PEK)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                maxLength={3}
                required
              />
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {popularCities.map(city => (
                <button
                  key={city.code}
                  type="button"
                  onClick={() => selectPopularCity('dcity', city.code)}
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  {city.name} ({city.code})
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={swapCities}
            className="mt-6 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            title="交换出发和到达城市"
          >
            <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              到达城市
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.acity}
                onChange={(e) => handleInputChange('acity', e.target.value)}
                placeholder="输入城市三字码 (如: SHA)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                maxLength={3}
                required
              />
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {popularCities.map(city => (
                <button
                  key={city.code}
                  type="button"
                  onClick={() => selectPopularCity('acity', city.code)}
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  {city.name} ({city.code})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="space-y-4">
          {/* Departure Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              出发日期
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Return Date */}
          {showReturnDate && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                返程日期
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  value={formData.returnDate || ''}
                  onChange={(e) => handleInputChange('returnDate', e.target.value)}
                  min={formData.date}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !formData.dcity || !formData.acity || !formData.date}
          className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              搜索中...
            </>
          ) : (
            <>
              <Search className="h-5 w-5 mr-2" />
              搜索航班
            </>
          )}
        </button>
      </form>
    </div>
  );
};