"use client";

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, BarChart2, DollarSign, Activity } from 'lucide-react';
import { MarketOverview as MarketOverviewType } from '@/lib/api/icmarkets';

interface MarketOverviewProps {
  data: MarketOverviewType;
  isLoading: boolean;
  isUsingLiveData: boolean;
}

export default function MarketOverview({ data, isLoading, isUsingLiveData }: MarketOverviewProps) {
  const isPriceUp = data.dailyChange > 0;
  
  // Animation for counting up numbers
  const CountUp = ({ value, decimals = 2 }: { value: number, decimals?: number }) => {
    return (
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={value}
      >
        {value.toFixed(decimals)}
      </motion.span>
    );
  };
  
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
          <BarChart2 className="mr-2 h-5 w-5 text-amber-500" />
          Market Overview
        </h2>
        {isUsingLiveData ? (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 flex items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
            Live Data
          </span>
        ) : (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
            Simulated Data
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Current Price</span>
            <DollarSign className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline">
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {isLoading ? (
                <div className="h-8 w-24 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
              ) : (
                <>$<CountUp value={data.bid} /></>
              )}
            </span>
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">Bid</span>
          </div>
          <div className="mt-1">
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              {isLoading ? (
                <div className="h-6 w-20 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
              ) : (
                <>$<CountUp value={data.ask} /></>
              )}
            </span>
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">Ask</span>
          </div>
          <div className="mt-1">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Spread: {isLoading ? (
                <div className="inline-block h-4 w-12 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
              ) : (
                <CountUp value={data.spread} decimals={2} />
              )}
            </span>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Daily Change</span>
            {isPriceUp ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </div>
          <div className="mt-2">
            <span className={`text-2xl font-bold ${isPriceUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {isLoading ? (
                <div className="h-8 w-24 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
              ) : (
                <>
                  {isPriceUp ? '+' : ''}
                  <CountUp value={data.dailyChange} />
                </>
              )}
            </span>
            <span className={`ml-2 text-sm ${isPriceUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {isLoading ? (
                <div className="inline-block h-4 w-12 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
              ) : (
                <>({isPriceUp ? '+' : ''}<CountUp value={data.dailyChangePercentage} />%)</>
              )}
            </span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Daily High</span>
              <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                {isLoading ? (
                  <div className="h-5 w-16 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                ) : (
                  <>$<CountUp value={data.dailyHigh} /></>
                )}
              </div>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Daily Low</span>
              <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                {isLoading ? (
                  <div className="h-5 w-16 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                ) : (
                  <>$<CountUp value={data.dailyLow} /></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 dark:text-gray-400 text-sm">Volume</span>
          <Activity className="h-4 w-4 text-amber-500" />
        </div>
        <div className="mt-2">
          <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {isLoading ? (
              <div className="h-7 w-28 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
            ) : (
              <CountUp value={data.volume} decimals={0} />
            )}
          </span>
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">oz</span>
        </div>
      </div>
    </motion.div>
  );
}