import axios from 'axios';
import { FlightQueryParams, FlightResponse } from '../types/flight';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const flightApi = {
  async searchFlights(params: FlightQueryParams): Promise<FlightResponse> {
    const { dcity, acity, date, type = 'oneway', returnDate } = params;
    
    const queryParams = new URLSearchParams({
      dcity,
      acity,
      date,
      flight_type: type,
      ...(returnDate && { return_date: returnDate }),
    });

    const response = await api.get(`/flights?${queryParams}`);
    return response.data;
  },

  async healthCheck(): Promise<{ status: string; service: string }> {
    const response = await api.get('/health');
    return response.data;
  },
};

export default flightApi;