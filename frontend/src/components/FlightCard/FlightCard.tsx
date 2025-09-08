import React from 'react';
import { Flight } from '../../types/flight';
import { Clock, MapPin, TrendingUp } from 'lucide-react';

interface FlightCardProps {
  flight: Flight;
}

export const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  const formatTime = (time: string) => {
    return new Date(time).toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDuration = (departure: string, arrival: string) => {
    const dep = new Date(departure);
    const arr = new Date(arrival);
    const duration = arr.getTime() - dep.getTime();
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}小时${minutes}分钟`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-primary-600 font-bold text-sm">
              {flight.airline.substring(0, 2)}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{flight.flightNo}</h3>
            <p className="text-sm text-gray-600">{flight.airline}</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-primary-600">
            ¥{flight.price}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900">
            {formatTime(flight.departureTime)}
          </div>
          <div className="text-sm text-gray-600">{flight.departure}</div>
        </div>

        <div className="flex-1 mx-4">
          <div className="relative">
            <div className="h-px bg-gray-300"></div>
          </div>
          <div className="text-center text-xs text-gray-500 mt-1">
            {formatDuration(flight.departureTime, flight.arrivalTime)}
          </div>
        </div>

        <div className="text-center">
          <div className="text-xl font-bold text-gray-900">
            {formatTime(flight.arrivalTime)}
          </div>
          <div className="text-sm text-gray-600">{flight.arrival}</div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <div>
          <span>{flight.plane}</span>
        </div>
        
        {flight.punctuality && (
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>准点率: {flight.punctuality}</span>
          </div>
        )}
      </div>

      <button className="w-full mt-4 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
        选择航班
      </button>
    </div>
  );
};