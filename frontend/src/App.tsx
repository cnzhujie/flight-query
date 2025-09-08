import React, { useState } from 'react';
import { SearchForm } from './components/SearchForm/SearchForm';
import { FlightList } from './components/FlightList/FlightList';
import { Loading } from './components/Loading/Loading';
import { useFlights } from './hooks/useFlights';
import { useSearchHistory } from './hooks/useSearchHistory';
import { useToast } from './contexts/ToastContext';
import { FlightQueryParams } from './types/flight';
import { AlertCircle, History } from 'lucide-react';

function App() {
  const { flights, loading, error, total, searchFlights, clearFlights } = useFlights();
  const { history, addToHistory } = useSearchHistory();
  const { showToast } = useToast();
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (params: FlightQueryParams) => {
    // Check if departure and arrival cities are the same
    if (params.dcity && params.acity && params.dcity.toUpperCase() === params.acity.toUpperCase()) {
      showToast('出发城市和到达城市不能相同，请重新输入！', 'error');
      return;
    }
    
    setHasSearched(true);
    // Ensure type is always defined with default value
    const historyItem = {
      ...params,
      type: params.type || 'oneway' as const,
    };
    addToHistory(historyItem);
    await searchFlights(params);
  };

  const handleClearSearch = () => {
    setHasSearched(false);
    clearFlights();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            智慧航班查询
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            实时查询国内外航班信息，支持多条件筛选，为您提供最优质的出行选择
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <SearchForm onSubmit={handleSearch} loading={loading} />
            
            {/* Search History */}
            {history.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <History className="h-5 w-5 text-gray-600 mr-2" />
                  <h3 className="font-medium text-gray-900">搜索历史</h3>
                </div>
                <div className="space-y-2">
                  {history.slice(0, 5).map((item) => (
                    <div
                      key={item.id}
                      className="text-sm text-gray-600 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                      onClick={() => handleSearch(item)}
                    >
                      {item.dcity} → {item.acity} • {item.date}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
                  <div>
                    <h3 className="font-medium text-red-800">搜索失败</h3>
                    <p className="text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {hasSearched && !loading && flights.length === 0 && !error && (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">未找到航班</h3>
                <p className="text-gray-600 mb-4">请尝试调整搜索条件或选择其他日期</p>
                <button
                  onClick={handleClearSearch}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  重新搜索
                </button>
              </div>
            )}

            {loading && <Loading message="正在搜索航班..." />}

            {hasSearched && !loading && flights.length > 0 && (
              <FlightList flights={flights} total={total} />
            )}

            {!hasSearched && (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="text-primary-400 mb-4">
                  <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">开始搜索航班</h3>
                <p className="text-gray-600">输入出发地、目的地和日期来查询可用航班</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600">
            © 2025 智慧航班查询系统 • 数据来源: 聚合数据
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
