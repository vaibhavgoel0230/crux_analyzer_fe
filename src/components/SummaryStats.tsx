import React from 'react';
import { Summary } from '../types';
import { formatValue } from '../utils';

interface SummaryStatsProps {
  summary: Summary;
}

const SummaryStats: React.FC<SummaryStatsProps> = ({ summary }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Summary Statistics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(summary).map(([metric, stats]) => (
          <div key={metric} className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-4 border border-blue-200">
            <h4 className="text-sm font-semibold text-indigo-800 mb-3 uppercase tracking-wide">
              {metric}
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg:</span>
                <span className="text-sm font-medium text-gray-900">{formatValue(stats.avg)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Count:</span>
                <span className="text-sm font-medium text-blue-600">{stats.count}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Min:</span>
                <span className="text-sm font-medium text-green-600">{formatValue(stats.min)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Max:</span>
                <span className="text-sm font-medium text-red-600">{formatValue(stats.max)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryStats;
