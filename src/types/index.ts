export interface StockPrice {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  timestamp: string;
}

export interface MAG7Data {
  prices: StockPrice[];
  index: number;
  indexChange: number;
}

export interface BTCData {
  price: number;
  change: number;
  changePercent: number;
  marketCap: number;
  volume: number;
}

export interface Indicator {
  value: number;
  timestamp: string;
  change: number;
}

export interface ChartData {
  timestamp: string;
  value: number;
  [key: string]: any;
}