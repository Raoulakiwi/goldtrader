"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGoldData, TimeFrame } from '@/lib/hooks/useGoldData';
import PriceChart from '@/components/ui/price-chart';
import MarketOverview from '@/components/ui/market-overview';
import TechnicalAnalysis from '@/components/ui/technical-analysis';
import FundamentalAnalysis from '@/components/ui/fundamental-analysis';
import SentimentAnalysis from '@/components/ui/sentiment-analysis';
import TradingInterface from '@/components/ui/trading-interface';
import ApiCredentialsForm from '@/components/ui/api-credentials-form';
import TimeframeSelector from '@/components/ui/timeframe-selector';
import { 
  BarChart4, 
  RefreshCw, 
  Info, 
  X,
  Coins
} from 'lucide-react';

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState<TimeFrame>("1h");
  const [showInfoBanner, setShowInfoBanner] = useState(true);
  
  const { 
    priceData, 
    marketOverview, 
    technicalIndicators, 
    sentimentData, 
    fundamentalData,
    isLoading, 
    isError, 
    errorMessage,
    isUsingLiveData,
    updateCredentials,
    refreshData
  } = useGoldData(timeframe);
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pb-12">
      {/* Header */}
      <header className="sticky top-0 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Coins className="h-8 w-8 text-amber-500" />
              <h1 className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                Gold Trading Analysis
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <ApiCredentialsForm 
                onSave={updateCredentials} 
                currentCredentials={null} 
                isUsingLiveData={isUsingLiveData}
              />
              <button
                onClick={refreshData}
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Info Banner */}
        {showInfoBanner && (
          <motion.div 
            className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800/50 flex items-center justify-between"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center">
              <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
              <p className="text-sm text-blue-700 dark:text-blue-300">
                This application now supports integration with IC Markets API for real-time Gold (XAUUSD) price data. 
                Click "Connect to IC Markets API" to add your credentials.
              </p>
            </div>
            <button 
              onClick={() => setShowInfoBanner(false)}
              className="ml-4 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}
        
        {/* Timeframe Selector */}
        <div className="mb-6">
          <TimeframeSelector 
            selectedTimeframe={timeframe} 
            onTimeframeChange={setTimeframe} 
          />
        </div>
        
        {/* Price Chart and Market Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <PriceChart 
              data={priceData} 
              isLoading={isLoading} 
              isError={isError} 
              errorMessage={errorMessage}
              timeframe={timeframe}
            />
          </div>
          <div>
            <MarketOverview 
              data={marketOverview} 
              isLoading={isLoading}
              isUsingLiveData={isUsingLiveData}
            />
          </div>
        </div>
        
        {/* Technical Analysis */}
        <div className="mb-6">
          <TechnicalAnalysis 
            data={technicalIndicators} 
            isLoading={isLoading} 
          />
        </div>
        
        {/* Trading Interface */}
        <div className="mb-6">
          <TradingInterface 
            marketData={marketOverview} 
            isLoading={isLoading}
            isUsingLiveData={isUsingLiveData}
          />
        </div>
        
        {/* Fundamental and Sentiment Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FundamentalAnalysis 
            data={fundamentalData} 
            isLoading={isLoading} 
          />
          <SentimentAnalysis 
            data={sentimentData} 
            isLoading={isLoading} 
          />
        </div>
      </main>
    </div>
  );
}