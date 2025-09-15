"use client";

import { useState, useEffect } from 'react';
import { useGoldData, TimeFrame } from '@/lib/hooks/useGoldData';
import TimeframeSelector from '@/components/ui/timeframe-selector';
import MarketOverview from '@/components/ui/market-overview';
import PriceChart from '@/components/ui/price-chart';
import TechnicalAnalysis from '@/components/ui/technical-analysis';
import TradingInterface from '@/components/ui/trading-interface';
import FundamentalAnalysis from '@/components/ui/fundamental-analysis';
import SentimentAnalysis from '@/components/ui/sentiment-analysis';
import { Coins } from 'lucide-react';

export default function Dashboard() {
  const [isMounted, setIsMounted] = useState(false);
  const [timeframe, setTimeframe] = useState<TimeFrame>("1h");

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
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

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Coins className="h-12 w-12 text-amber-500 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600 dark:text-gray-400">Loading Dashboard...</p>
        </div>
      </div>
    );
  }
  
  // Show error state if there's an error
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <Coins className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{errorMessage}</p>
          <button
            onClick={refreshData}
            className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 flex items-center">
          <Coins className="h-8 w-8 text-amber-500 mr-3" />
          Gold Trading Dashboard - Debug Mode
        </h1>
        
        {/* Timeframe Selector */}
        <div className="mb-6">
          <TimeframeSelector 
            selectedTimeframe={timeframe} 
            onTimeframeChange={setTimeframe} 
          />
        </div>
        
        {/* Price Chart */}
        <div className="mb-6">
          <PriceChart 
            data={priceData} 
            isLoading={isLoading} 
            isError={isError} 
            errorMessage={errorMessage}
            timeframe={timeframe}
          />
        </div>
        
        {/* Market Overview */}
        <div className="mb-6">
          <MarketOverview 
            data={marketOverview} 
            isLoading={isLoading}
            isUsingLiveData={isUsingLiveData}
          />
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <FundamentalAnalysis 
            data={fundamentalData} 
            isLoading={isLoading} 
          />
          <SentimentAnalysis 
            data={sentimentData} 
            isLoading={isLoading} 
          />
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Dashboard Status
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="text-green-800 dark:text-green-200 font-medium">
                Component Mounted: {isMounted ? 'Yes' : 'No'}
              </span>
              <span className="text-green-600 dark:text-green-400">✓</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <span className="text-blue-800 dark:text-blue-200 font-medium">
                React Hooks Working
              </span>
              <span className="text-blue-600 dark:text-blue-400">✓</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <span className="text-purple-800 dark:text-purple-200 font-medium">
                Tailwind CSS Working
              </span>
              <span className="text-purple-600 dark:text-purple-400">✓</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <span className="text-amber-800 dark:text-amber-200 font-medium">
                useGoldData Hook Working
              </span>
              <span className="text-amber-600 dark:text-amber-400">✓</span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
              Hook Data Status
            </h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
              <div>Error: {isError ? 'Yes' : 'No'}</div>
              <div>Using Live Data: {isUsingLiveData ? 'Yes' : 'No'}</div>
              <div>Price Data Length: {priceData?.length || 0}</div>
              <div>Market Overview: {marketOverview ? 'Available' : 'Not Available'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}