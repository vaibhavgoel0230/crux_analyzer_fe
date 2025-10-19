import React, { useState } from 'react';
import { AnalysisResult } from '../types';
import { ApiService } from '../services/api';
import UrlInput from './UrlInput';
import SummaryStats from './SummaryStats';
import MetricsTable from './MetricsTable';

const Dashboard: React.FC = () => {
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const formatErrorMessage = (url: string, errorMessage: string): string => {
    // Check if the error message contains "404" or indicates data not available
    if (errorMessage.includes('404') || 
        errorMessage.toLowerCase().includes('not found') ||
        errorMessage.toLowerCase().includes('no data') ||
        errorMessage.toLowerCase().includes('not available')) {
      return `CrUX data is not available for ${url}`;
    }
    
    // Return original error message for other types of errors
    return errorMessage;
  };

  const handleAnalyze = async (urls: string[]) => {
    setLoading(true);

    try {
      const data = await ApiService.analyzeUrls(urls);
      setResults(data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl text-center mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center">
            Chrome UX Report Analyzer
          </h1>
          <p className="mt-2 text-gray-600">Analyze page performance metrics across multiple URLs</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <UrlInput onAnalyze={handleAnalyze} loading={loading} />


        {results && (
          <div className="space-y-6">

            {results.results.length > 0 && (
              <>
                <MetricsTable data={results.results} />
                <SummaryStats summary={results.summary} />
              </>
            )}

            {results.errors.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Failed URLs</h3>
                <div className="space-y-3">
                  {results.errors.map((err, idx) => (
                    <div key={idx} className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="font-medium text-red-800">{err.url}</div>
                      <div className="text-red-600 text-sm mt-1">{formatErrorMessage(err.url, err.error)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
