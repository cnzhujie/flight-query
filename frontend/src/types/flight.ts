export interface FlightQueryParams {
  dcity: string;
  acity: string;
  date: string;
  type?: 'oneway' | 'roundtrip';
  returnDate?: string;
}

export interface Flight {
  airline: string;
  flightNo: string;
  plane: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  punctuality: string;
  price: number;
  discount: number;
}

export interface FlightResponse {
  reason: string;
  result: {
    list: Flight[];
    page: number;
    total: number;
  };
  error_code: number;
}

export interface SearchHistoryItem {
  id: string;
  dcity: string;
  acity: string;
  date: string;
  type: 'oneway' | 'roundtrip';
  returnDate?: string;
  timestamp: number;
}