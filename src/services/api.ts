import { AnalysisResult } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export class ApiService {
  static async analyzeUrls(urls: string[]): Promise<AnalysisResult> {
    const response = await fetch(`${API_URL}/api/analyze-url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ urls }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze URLs');
    }

    return response.json();
  }
}

export default ApiService;
