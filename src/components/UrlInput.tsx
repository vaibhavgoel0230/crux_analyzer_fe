import React, { useState } from 'react';

interface UrlInputProps {
  onAnalyze: (urls: string[]) => void;
  loading: boolean;
}

const UrlInput: React.FC<UrlInputProps> = ({ onAnalyze, loading }) => {
  const [urls, setUrls] = useState('');
  const [error, setError] = useState('');

  function validURL(str: string): boolean {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

  const handleAnalyze = () => {
    setError(''); // Clear previous errors
    
    const urlList = urls.split('\n')
      .map(u => u.trim())
      .filter(u => u !== '');

    if (urlList.length === 0) {
      setError('Please enter a valid URL (e.g. https://example.com)');
      return;
    }

    const validUrls = urlList.filter(validURL);
    console.log(validUrls);
    if (validUrls.length !== urlList.length) {
      setError('Please enter valid URLs (e.g. https://example.com)');
      return;
    }

    onAnalyze(validUrls);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="space-y-4 md:space-x-10 md:flex md:flex-row md:items-center md:justify-center">
        <div className="md:text-center">
          URL:
        </div>
        <textarea
          placeholder="Enter URLs (one per line)&#10;e.g., https://example.com&#10;https://example.org"
          value={urls}
          onChange={e => {
            setUrls(e.target.value);
            if (error) setError(''); // Clear error when user starts typing
          }}
          className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        <button 
          onClick={handleAnalyze} 
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching...
            </>
          ) : (
            <>
              Search
            </>
          )}
        </button>
      </div>
      {error && (
        <div className="pt-4 text-red-600 text-sm font-medium">
          {error}
        </div>
      )}
    </div>
  );
};

export default UrlInput;
