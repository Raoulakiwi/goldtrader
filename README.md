# Gold Trading Analysis with IC Markets API Integration

This application provides comprehensive gold trading analysis with real-time data from the IC Markets API. It features technical analysis, fundamental analysis, sentiment analysis, and a trading interface for gold (XAUUSD) trading.

## Features

- **Real-time Gold Price Data**: Integration with IC Markets API for live XAUUSD price data
- **Technical Analysis**: RSI, MACD, Moving Averages, Bollinger Bands, and more
- **Fundamental Analysis**: Economic indicators affecting gold prices
- **Sentiment Analysis**: Market sentiment indicators for gold trading
- **Trading Interface**: Simulated trading interface with risk management tools
- **Multiple Timeframes**: Analyze gold price movements across various timeframes
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gold-trading-analysis.git
cd gold-trading-analysis
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## IC Markets API Integration

The application supports integration with the IC Markets API for real-time gold price data. To use this feature:

1. Obtain API credentials from IC Markets
2. Click on "Connect to IC Markets API" in the dashboard
3. Enter your API Key and API Secret
4. Your credentials are stored locally in your browser and never sent to our servers

If you don't have IC Markets API credentials, the application will use simulated data.

## API Client

The application includes a client for the IC Markets API with the following features:

- Authentication with API credentials
- Real-time price data for Gold (XAUUSD)
- Historical price data across multiple timeframes
- Market overview information
- Error handling and fallback to simulated data

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion for animations
- Recharts for data visualization
- Lucide React for icons

## License

This project is licensed under the MIT License - see the LICENSE file for details.