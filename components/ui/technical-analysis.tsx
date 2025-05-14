"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  BarChart, 
  LineChart, 
  ArrowUpRight, 
  ArrowDownRight,
  Gauge
} from 'lucide-react';

interface TechnicalAnalysisProps {
  data: any;
  isLoading: boolean;
}

export default function TechnicalAnalysis({ data, isLoading }: TechnicalAnalysisProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Determine overall signal
  const determineSignal = () => {
    if (!data || !data.rsi) return 'neutral';
    
    // Simple logic for demonstration
    if (data.rsi > 70) return 'overbought';
    if (data.rsi < 30) return 'oversold';
    
    const macdSignal = data.macd.value > data.macd.signal ? 'bullish' : 'bearish';
    const maSignal = data.movingAverages.sma50 > data.movingAverages.sma200 ? 'bullish' : 'bearish';
    
    if (macdSignal === 'bullish' && maSignal === 'bullish') return 'bullish';
    if (macdSignal === 'bearish' && maSignal === 'bearish') return 'bearish';
    
    return 'neutral';
  };
  
  const signal = determineSignal();
  
  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'bullish':
        return 'text-green-600 dark:text-green-400';
      case 'bearish':
        return 'text-red-600 dark:text-red-400';
      case 'overbought':
        return 'text-orange-600 dark:text-orange-400';
      case 'oversold':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };
  
  const getSignalIcon = (signal: string) => {
    switch (signal) {
      case 'bullish':
        return <ArrowUpRight className="h-5 w-5 text-green-500" />;
      case 'bearish':
        return <ArrowDownRight className="h-5 w-5 text-red-500" />;
      case 'overbought':
        return <Gauge className="h-5 w-5 text-orange-500" />;
      case 'oversold':
        return <Gauge className="h-5 w-5 text-blue-500" />;
      default:
        return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <motion.div 
      ref={ref}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
          <LineChart className="mr-2 h-5 w-5 text-amber-500" />
          Technical Analysis
        </h2>
        <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getSignalColor(signal)} bg-opacity-10 bg-current`}>
          {getSignalIcon(signal)}
          <span className="ml-1 capitalize">{signal}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center">
            <Activity className="mr-1 h-4 w-4 text-amber-500" />
            Momentum Indicators
          </h3>
          
          <div className="mt-3 space-y-3">
            <div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">RSI (14)</span>
                <span className={`text-sm font-medium ${
                  isLoading ? 'text-gray-400' : 
                  data.rsi > 70 ? 'text-red-500' : 
                  data.rsi < 30 ? 'text-green-500' : 
                  'text-gray-600 dark:text-gray-300'
                }`}>
                  {isLoading ? (
                    <div className="h-4 w-10 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                  ) : (
                    data.rsi.toFixed(2)
                  )}
                </span>
              </div>
              {!isLoading && (
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                  <motion.div 
                    className={`h-2 rounded-full ${
                      data.rsi > 70 ? 'bg-red-500' : 
                      data.rsi < 30 ? 'bg-green-500' : 
                      'bg-amber-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${data.rsi}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                  ></motion.div>
                </div>
              )}
            </div>
            
            <div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">MACD</span>
                <span className={`text-sm font-medium ${
                  isLoading ? 'text-gray-400' : 
                  data.macd.value > data.macd.signal ? 'text-green-500' : 
                  'text-red-500'
                }`}>
                  {isLoading ? (
                    <div className="h-4 w-10 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                  ) : (
                    data.macd.value.toFixed(2)
                  )}
                </span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">Signal</span>
                <span className="text-xs text-gray-600 dark:text-gray-300">
                  {isLoading ? (
                    <div className="h-3 w-8 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                  ) : (
                    data.macd.signal.toFixed(2)
                  )}
                </span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">Histogram</span>
                <span className={`text-xs ${
                  isLoading ? 'text-gray-400' : 
                  data.macd.histogram > 0 ? 'text-green-500' : 
                  'text-red-500'
                }`}>
                  {isLoading ? (
                    <div className="h-3 w-8 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                  ) : (
                    data.macd.histogram.toFixed(2)
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center">
            <TrendingUp className="mr-1 h-4 w-4 text-amber-500" />
            Moving Averages
          </h3>
          
          <div className="mt-3 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">SMA (20)</span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {isLoading ? (
                  <div className="h-4 w-16 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                ) : (
                  `$${data.movingAverages.sma20.toFixed(2)}`
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">SMA (50)</span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {isLoading ? (
                  <div className="h-4 w-16 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                ) : (
                  `$${data.movingAverages.sma50.toFixed(2)}`
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">SMA (200)</span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {isLoading ? (
                  <div className="h-4 w-16 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                ) : (
                  `$${data.movingAverages.sma200.toFixed(2)}`
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">EMA (20)</span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {isLoading ? (
                  <div className="h-4 w-16 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                ) : (
                  `$${data.movingAverages.ema20.toFixed(2)}`
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center">
          <BarChart className="mr-1 h-4 w-4 text-amber-500" />
          Bollinger Bands
        </h3>
        
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">Upper Band</span>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {isLoading ? (
                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
              ) : (
                `$${data.bollingerBands.upper.toFixed(2)}`
              )}
            </div>
          </div>
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">Middle Band</span>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {isLoading ? (
                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
              ) : (
                `$${data.bollingerBands.middle.toFixed(2)}`
              )}
            </div>
          </div>
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">Lower Band</span>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {isLoading ? (
                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
              ) : (
                `$${data.bollingerBands.lower.toFixed(2)}`
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}