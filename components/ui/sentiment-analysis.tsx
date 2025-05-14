"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Users, 
  TrendingUp, 
  TrendingDown, 
  BarChart2, 
  Building, 
  MessageSquare,
  Gauge
} from 'lucide-react';

interface SentimentAnalysisProps {
  data: any;
  isLoading: boolean;
}

export default function SentimentAnalysis({ data, isLoading }: SentimentAnalysisProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Determine overall sentiment
  const determineSentiment = () => {
    if (!data || !data.bullishPercentage) return 'neutral';
    
    if (data.bullishPercentage > 60) return 'bullish';
    if (data.bearishPercentage > 60) return 'bearish';
    
    return 'neutral';
  };
  
  const sentiment = determineSentiment();
  
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish':
        return 'text-green-600 dark:text-green-400';
      case 'bearish':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-amber-600 dark:text-amber-400';
    }
  };
  
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'bearish':
        return <TrendingDown className="h-5 w-5 text-red-500" />;
      default:
        return <BarChart2 className="h-5 w-5 text-amber-500" />;
    }
  };
  
  return (
    <motion.div 
      ref={ref}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
          <Users className="mr-2 h-5 w-5 text-amber-500" />
          Sentiment Analysis
        </h2>
        <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getSentimentColor(sentiment)} bg-opacity-10 bg-current`}>
          {getSentimentIcon(sentiment)}
          <span className="ml-1 capitalize">{sentiment}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center">
            <Gauge className="mr-1 h-4 w-4 text-amber-500" />
            Market Sentiment
          </h3>
          
          <div className="mt-3 space-y-3">
            <div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Bullish</span>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  {isLoading ? (
                    <div className="h-4 w-10 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                  ) : (
                    `${data.bullishPercentage}%`
                  )}
                </span>
              </div>
              {!isLoading && (
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                  <motion.div 
                    className="h-2 rounded-full bg-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${data.bullishPercentage}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                  ></motion.div>
                </div>
              )}
            </div>
            
            <div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Bearish</span>
                <span className="text-sm font-medium text-red-600 dark:text-red-400">
                  {isLoading ? (
                    <div className="h-4 w-10 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                  ) : (
                    `${data.bearishPercentage}%`
                  )}
                </span>
              </div>
              {!isLoading && (
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                  <motion.div 
                    className="h-2 rounded-full bg-red-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${data.bearishPercentage}%` }}
                    transition={{ duration: 1, delay: 0.4 }}
                  ></motion.div>
                </div>
              )}
            </div>
            
            <div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Neutral</span>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {isLoading ? (
                    <div className="h-4 w-10 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                  ) : (
                    `${data.neutralPercentage}%`
                  )}
                </span>
              </div>
              {!isLoading && (
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                  <motion.div 
                    className="h-2 rounded-full bg-gray-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${data.neutralPercentage}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  ></motion.div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center">
            <Users className="mr-1 h-4 w-4 text-amber-500" />
            Retail Sentiment
          </h3>
          
          <div className="mt-3 space-y-3">
            <div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Long</span>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  {isLoading ? (
                    <div className="h-4 w-10 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                  ) : (
                    `${data.retailSentiment.long}%`
                  )}
                </span>
              </div>
              {!isLoading && (
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                  <motion.div 
                    className="h-2 rounded-full bg-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${data.retailSentiment.long}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                  ></motion.div>
                </div>
              )}
            </div>
            
            <div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Short</span>
                <span className="text-sm font-medium text-red-600 dark:text-red-400">
                  {isLoading ? (
                    <div className="h-4 w-10 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                  ) : (
                    `${data.retailSentiment.short}%`
                  )}
                </span>
              </div>
              {!isLoading && (
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                  <motion.div 
                    className="h-2 rounded-full bg-red-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${data.retailSentiment.short}%` }}
                    transition={{ duration: 1, delay: 0.4 }}
                  ></motion.div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center">
            <Building className="mr-1 h-4 w-4 text-amber-500" />
            Institutional Sentiment
          </h3>
          
          <div className="mt-3 space-y-3">
            <div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Long</span>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  {isLoading ? (
                    <div className="h-4 w-10 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                  ) : (
                    `${data.institutionalSentiment.long}%`
                  )}
                </span>
              </div>
              {!isLoading && (
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                  <motion.div 
                    className="h-2 rounded-full bg-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${data.institutionalSentiment.long}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                  ></motion.div>
                </div>
              )}
            </div>
            
            <div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Short</span>
                <span className="text-sm font-medium text-red-600 dark:text-red-400">
                  {isLoading ? (
                    <div className="h-4 w-10 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                  ) : (
                    `${data.institutionalSentiment.short}%`
                  )}
                </span>
              </div>
              {!isLoading && (
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                  <motion.div 
                    className="h-2 rounded-full bg-red-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${data.institutionalSentiment.short}%` }}
                    transition={{ duration: 1, delay: 0.4 }}
                  ></motion.div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center">
            <MessageSquare className="mr-1 h-4 w-4 text-amber-500" />
            Social Media Sentiment
          </h3>
          
          <div className="mt-3 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Mentions</span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {isLoading ? (
                  <div className="h-4 w-16 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                ) : (
                  data.socialMediaMentions.toLocaleString()
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Sentiment Score</span>
              <span className={`text-sm font-medium ${
                isLoading ? 'text-gray-400' : 
                data.sentimentScore > 60 ? 'text-green-500' : 
                data.sentimentScore < 40 ? 'text-red-500' : 
                'text-amber-500'
              }`}>
                {isLoading ? (
                  <div className="h-4 w-10 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                ) : (
                  data.sentimentScore
                )}
              </span>
            </div>
            {!isLoading && (
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-2">
                <motion.div 
                  className={`h-2 rounded-full ${
                    data.sentimentScore > 60 ? 'bg-green-500' : 
                    data.sentimentScore < 40 ? 'bg-red-500' : 
                    'bg-amber-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${data.sentimentScore}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                ></motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}