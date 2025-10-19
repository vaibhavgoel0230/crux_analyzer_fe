# Chrome UX Report Analyzer

A modern React TypeScript application for analyzing Chrome User Experience Report (CrUX) data. This tool allows you to input multiple URLs and get comprehensive performance metrics including Core Web Vitals and other user experience indicators.

## 🚀 Features

- **Multi-URL Analysis**: Analyze performance metrics for multiple URLs simultaneously
- **Core Web Vitals**: Display LCP, FCP and CLS metrics
- **Real-time Validation**: Smart URL validation with comprehensive protocol, domain, and TLD checking
- **Interactive Data Table**: Sortable and filterable metrics table with color-coded performance indicators
- **Summary Statistics**: Aggregated statistics showing average, min, max, and count for each metric
- **Error Handling**: Custom error messages for different failure scenarios (404, network issues, etc.)
- **Responsive Design**: Modern UI built with Tailwind CSS that works on all devices
- **TypeScript**: Full type safety and enhanced developer experience

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Build Tool**: Create React App
- **Package Manager**: npm

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 14.0 or higher)
- **npm** (version 6.0 or higher)
- **Backend API** running on `http://localhost:8000` (or configure different URL)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd crux_analyzer_fe
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration (Optional)
Create a `.env` file in the root directory to configure the API URL:
```env
REACT_APP_API_URL=http://localhost:8000
```

### 4. Start Development Server
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

### 5. Build for Production
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Dashboard.tsx    # Main dashboard container
│   ├── UrlInput.tsx     # URL input form with validation
│   ├── MetricsTable.tsx # Data table with sorting/filtering
│   └── SummaryStats.tsx # Statistics summary cards
├── services/            # API service layer
│   └── api.ts          # API calls and data fetching
├── types/              # TypeScript type definitions
│   └── index.ts        # All interface definitions
├── utils/              # Utility functions
│   └── index.ts        # Helper functions for formatting
├── App.tsx             # Main app component with routing
├── index.tsx           # Application entry point
└── index.css           # Tailwind CSS imports
```

## How to Use

### 1. Enter URLs
- Input one or more URLs in the textarea (one per line)

### 2. Analyze Performance
- Click "Search" button
- The app validates URLs and sends them to the backend API
- Results are displayed in an interactive table

### 3. View Results
- **CRUX Data Table**: Shows performance metrics for each URL
- **Summary Statistics**: Aggregated data across all analyzed URLs
- **Failed URLs**: Any URLs that couldn't be analyzed with error messages

### 4. Filter and Sort
- **Sort**: Click column headers to sort by any metric
- **Filter**: Use threshold inputs to filter URLs by performance criteria
- **Color Coding**: Green (good), Red (poor), Gray (unavailable)

## Configuration

### Environment Variables
- `REACT_APP_API_URL`: Backend API base URL (default: `http://localhost:8000`)

### Customization
- **Thresholds**: Modify performance thresholds in `MetricsTable.tsx`
- **Styling**: Update Tailwind classes or add custom CSS
- **Validation**: Enhance URL validation logic in `UrlInput.tsx`

## UI Components

### Dashboard
Main container component that orchestrates the entire application flow.

### UrlInput
- Multi-URL input with validation
- Real-time error feedback
- Support for multiple URL formats

### MetricsTable
- Sortable columns for all metrics
- Threshold-based filtering
- Color-coded performance indicators
- Responsive design

### SummaryStats
- Aggregated statistics cards
- Visual representation of overall performance
- Count, average, min, max values

## Performance Metrics

| Metric | Description | Good Threshold | Unit |
|--------|-------------|----------------|------|
| **LCP** | Largest Contentful Paint | ≤ 2.5s | ms |
| **FCP** | First Contentful Paint | ≤ 1.8s | ms |
| **CLS** | Cumulative Layout Shift | ≤ 0.1 | score |

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend has proper CORS configuration
   - Check that API URL is correct in environment variables

2. **Build Failures**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Check TypeScript errors: `npm run build`

3. **API Connection Issues**
   - Verify backend is running on correct port
   - Check network connectivity
   - Validate API endpoint responses

### Development Tips

- Use browser DevTools to inspect API calls
- Check console for TypeScript errors
- Use React DevTools for component debugging

## Available Scripts

### `npm start`
Runs the app in development mode on [http://localhost:3000](http://localhost:3000)

### `npm run build`
Builds the app for production to the `build` folder


## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
