import React, { useState } from 'react';
import { UrlResult, SortConfig, Filters } from '../types';
import { formatValue, getStatusClass } from '../utils';

interface MetricsTableProps {
  data: UrlResult[];
  onSort?: (field: string) => void;
  onFilter?: (filters: Filters) => void;
}

const MetricsTable: React.FC<MetricsTableProps> = ({ data }) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ field: 'url', direction: 'asc' });
  const [filters, setFilters] = useState<Filters>({});

  const handleSort = (field: string) => {
    const newDirection = sortConfig.field === field && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ field, direction: newDirection });
  };

  const handleFilterChange = (metric: string, value: string) => {
    setFilters({ ...filters, [metric]: parseFloat(value) || 0 });
  };

  const filteredData = data.filter(item => {
    return Object.entries(filters).every(([metric, threshold]) => {
      const metricData = item.metrics[metric as keyof typeof item.metrics];
      const value = metricData?.p75;
      if (!threshold || value === null || value === undefined) return true;
      
      const numericValue = typeof value === 'string' ? parseFloat(value) : value;
      return !isNaN(numericValue) ? numericValue <= threshold : true;
    });
  });

  const sortedData = [...filteredData].sort((a, b) => {
    const field = sortConfig.field;
    let aVal = field === 'url' ? a.url : a.metrics[field as keyof typeof a.metrics]?.p75;
    let bVal = field === 'url' ? b.url : b.metrics[field as keyof typeof b.metrics]?.p75;

    // Handle URL sorting (string comparison)
    if (field === 'url' && typeof aVal === 'string' && typeof bVal === 'string') {
      return sortConfig.direction === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }

    // Convert string values to numbers for metric sorting
    let aNumVal = aVal === null || aVal === undefined ? null : (typeof aVal === 'string' ? parseFloat(aVal) : aVal);
    let bNumVal = bVal === null || bVal === undefined ? null : (typeof bVal === 'string' ? parseFloat(bVal) : bVal);

    // Handle null values - put them at the end
    if (aNumVal === null || isNaN(aNumVal as number)) aNumVal = sortConfig.direction === 'asc' ? Infinity : -Infinity;
    if (bNumVal === null || isNaN(bNumVal as number)) bNumVal = sortConfig.direction === 'asc' ? Infinity : -Infinity;

    return sortConfig.direction === 'asc' ? (aNumVal as number) - (bNumVal as number) : (bNumVal as number) - (aNumVal as number);
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 text-center border-b pb-3">CRUX Data</h2>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter by Threshold (ms/score)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['lcp', 'fcp', 'cls'].map(metric => (
            <div key={metric} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                {metric.toUpperCase()}:
              </label>
              <input
                type="number"
                placeholder={`Max ${metric} value`}
                onChange={e => handleFilterChange(metric, e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th 
                onClick={() => handleSort('url')} 
                className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 border-b"
              >
                URL {sortConfig.field === 'url' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              {['lcp', 'fcp', 'cls'].map(metric => (
                <th 
                  key={metric} 
                  onClick={() => handleSort(metric)} 
                  className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 border-b"
                >
                  {metric.toUpperCase()} (p75)
                  {sortConfig.field === metric && (sortConfig.direction === 'asc' ? ' ↑' : ' ↓')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900 border-b max-w-xs truncate">
                  {item.url}
                </td>
                <td className={`px-4 py-3 text-sm border-b font-medium ${item.metrics.lcp?.status === 'available' && item.metrics.lcp?.p75 !== null ? getStatusClass(item.metrics.lcp?.p75, 2500) : 'text-gray-500'}`}>
                  {item.metrics.lcp?.status === 'available' && item.metrics.lcp?.p75 !== null ? `${formatValue(item.metrics.lcp?.p75)} ms` : 'N/A'}
                </td>
                <td className={`px-4 py-3 text-sm border-b font-medium ${item.metrics.fcp?.status === 'available' && item.metrics.fcp?.p75 !== null ? getStatusClass(item.metrics.fcp?.p75, 1800) : 'text-gray-500'}`}>
                  {item.metrics.fcp?.status === 'available' && item.metrics.fcp?.p75 !== null ? `${formatValue(item.metrics.fcp?.p75)} ms` : 'N/A'}
                </td>
                <td className={`px-4 py-3 text-sm border-b font-medium ${item.metrics.cls?.status === 'available' && item.metrics.cls?.p75 !== null ? getStatusClass(item.metrics.cls?.p75, 0.1) : 'text-gray-500'}`}>
                  {item.metrics.cls?.status === 'available' && item.metrics.cls?.p75 !== null ? formatValue(item.metrics.cls?.p75) : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MetricsTable;
