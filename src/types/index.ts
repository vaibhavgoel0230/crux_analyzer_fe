export interface MetricData {
  p75?: number | string | null;
  p90?: number | string | null;
  p99?: number | string | null;
  distribution?: any[];
  status: 'available' | 'unavailable';
}

export interface Metrics {
  lcp?: MetricData;
  fcp?: MetricData;
  cls?: MetricData;
}

export interface CollectionPeriod {
  firstDate: {
    year: number;
    month: number;
    day: number;
  };
  lastDate: {
    year: number;
    month: number;
    day: number;
  };
}

export interface UrlResult {
  url: string;
  fetchTime: string;
  metrics: Metrics;
  collectionPeriod: CollectionPeriod;
}

export interface SummaryStats {
  avg: number;
  min: number;
  max: number;
  count: number;
}

export interface Summary {
  [key: string]: SummaryStats;
}

export interface ErrorResult {
  url: string;
  error: string;
}

export interface AnalysisResult {
  results: UrlResult[];
  summary: Summary;
  errors: ErrorResult[];
  successCount: number;
  totalUrls: number;
  timestamp: string;
}

export interface SortConfig {
  field: string;
  direction: 'asc' | 'desc';
}

export interface Filters {
  [key: string]: number;
}
