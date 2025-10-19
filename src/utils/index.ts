export const formatValue = (value: number | string | null | undefined): string => {
  if (value === null || value === undefined) return 'N/A';
  if (typeof value === 'string') {
    const numValue = parseFloat(value);
    return isNaN(numValue) ? value : numValue.toFixed(2);
  }
  return typeof value === 'number' ? value.toFixed(2) : String(value);
};

export const getStatusClass = (value: number | string | null | undefined, threshold: number): string => {
  if (value === null || value === undefined) return 'text-gray-500';
  
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(numericValue)) return 'text-gray-500';
  
  return numericValue <= threshold ? 'text-green-600' : 'text-red-600';
};
