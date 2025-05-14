"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  BarChart4, 
  Percent, 
  Building2,
  LineChart
} from 'lucide-react';

interface FundamentalAnalysisProps {
  data: any;
  isLoading: boolean;
}

export default function FundamentalAnalysis({ data, isLoading }: FundamentalAnalysisProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <motion.div 
      ref={ref}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
          <BarChart4 className="mr-2 h-5 w-5 text-amber-500" />
          Fundamental Analysis
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center">
            <DollarSign className="mr-1 h-4 w-4 text-amber-500" />
            Currency Strength
          </h3>
          
          <div className="mt-3 space-y-3">
            <div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">USD Index</span>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {isLoading ? (
                    <div className="h-4 w-12 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                  ) : (
                    data.usdIndex.toFixed(2)
                  )}
                </span>
              </div>
              {!isLoading && (
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                  <motion.div 
                    className="h-2 rounded-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(data.usdIndex - 80) * 5}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                  ></motion.div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center">
            <LineChart className="mr-1 h-4 w-4 text-amber-500" />
            Treasury Yields
          </h3>
          
          <div className="mt-3 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">10-Year Treasury</span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {isLoading ? (
                  <div className="h-4 w-12 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                ) : (
                  `${data.treasuryYields.tenYear.toFixed(2)}%`
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">2-Year Treasury</span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {isLoading ? (
                  <div className="h-4 w-12 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                ) : (
                  `${data.treasuryYields.twoYear.toFixed(2)}%`
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Yield Spread</span>
              <span className={`text-sm font-medium ${
                isLoading ? 'text-gray-400' : 
                data.treasuryYields.tenYear - data.treasuryYields.twoYear > 0 ? 'text-green-500' : 
                'text-red-500'
              }`}>
                {isLoading ? (
                  <div className="h-4 w-12 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                ) : (
                  `${(data.treasuryYields.tenYear - data.treasuryYields.twoYear).toFixed(2)}%`
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center">
            <Percent className="mr-1 h-4 w-4 text-amber-500" />
            Inflation Data
          </h3>
          
          <div className="mt-3 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">CPI (YoY)</span>
              <span className={`text-sm font-medium ${
                isLoading ? 'text-gray-400' : 
                data.inflation.cpi > 3 ? 'text-red-500' : 
                'text-green-500'
              }`}>
                {isLoading ? (
                  <div className="h-4 w-12 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                ) : (
                  `${data.inflation.cpi.toFixed(1)}%`
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">PPI (YoY)</span>
              <span className={`text-sm font-medium ${
                isLoading ? 'text-gray-400' : 
                data.inflation.ppi > 3 ? 'text-red-500' : 
                'text-green-500'
              }`}>
                {isLoading ? (
                  <div className="h-4 w-12 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                ) : (
                  `${data.inflation.ppi.toFixed(1)}%`
                )}
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center">
            <Building2 className="mr-1 h-4 w-4 text-amber-500" />
            Interest Rates
          </h3>
          
          <div className="mt-3 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Fed Funds Rate</span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {isLoading ? (
                  <div className="h-4 w-12 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                ) : (
                  `${data.interestRates.fed.toFixed(2)}%`
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">ECB Rate</span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {isLoading ? (
                  <div className="h-4 w-12 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                ) : (
                  `${data.interestRates.ecb.toFixed(2)}%`
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center">
          <TrendingUp className="mr-1 h-4 w-4 text-amber-500" />
          Economic Indicators
        </h3>
        
        <div className="mt-3 grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">GDP Growth (YoY)</span>
            <div className={`text-base font-medium ${
              isLoading ? 'text-gray-400' : 
              data.economicIndicators.gdp > 0 ? 'text-green-500' : 
              'text-red-500'
            }`}>
              {isLoading ? (
                <div className="h-5 w-12 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
              ) : (
                `${data.economicIndicators.gdp.toFixed(1)}%`
              )}
            </div>
          </div>
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Unemployment Rate</span>
            <div className={`text-base font-medium ${
              isLoading ? 'text-gray-400' : 
              data.economicIndicators.unemployment > 5 ? 'text-red-500' : 
              'text-green-500'
            }`}>
              {isLoading ? (
                <div className="h-5 w-12 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
              ) : (
                `${data.economicIndicators.unemployment.toFixed(1)}%`
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}