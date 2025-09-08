import { useState, useCallback } from 'react';
import { FlightQueryParams, Flight, FlightResponse } from '../types/flight';
import { flightApi } from '../services/flightApi';

export const useFlights = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const searchFlights = useCallback(async (params: FlightQueryParams) => {
    setLoading(true);
    setError(null);
    
    try {
      const response: FlightResponse = await flightApi.searchFlights(params);
      
      if (response.error_code === 0) {
        setFlights(response.result.list || []);
        setTotal(response.result.total || 0);
      } else {
        setError(response.reason || 'Unknown error occurred');
        setFlights([]);
        setTotal(0);
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'Failed to search flights');
      setFlights([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearFlights = useCallback(() => {
    setFlights([]);
    setTotal(0);
    setError(null);
  }, []);

  return {
    flights,
    loading,
    error,
    total,
    searchFlights,
    clearFlights,
  };
};