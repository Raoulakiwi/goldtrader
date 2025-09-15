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
  Gauge,
  Newspaper,
  Twitter,
  Globe
} from 'lucide-react';
import { SentimentData } from '@/lib/types';

interface SentimentAnalysisProps {
  data: SentimentData | null;
  isLoading: boolean;
}

export default function SentimentAnalysis({ data, isLoading }: SentimentAnalysisProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Determine overall sentiment
  const determineSentiment = () => {
    if (!data || !data.overall) return 'neutral';
    
    if (data.overall.trend === 'bullish') return 'bullish';
    if (data.overall.trend === 'bearish') return 'bearish';
    
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
            Overall Sentiment
          </h3>
          
          <div className="mt-3 space-y-3">
            <div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Score</span>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  {isLoading ? (
                    <div className="h-4 w-10 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                  ) : (
                    `${data?.overall.score || 0}`
                  )}
                </span>
              </div>
              {!isLoading && data && (
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                  <motion.div 
                    className="h-2 rounded-full bg-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${data.overall.score}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                  ></motion.div>
                </div>
              )}
            </div>
            
            <div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Confidence</span>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {isLoading ? (
                    <div className="h-4 w-10 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                  ) : (
                    `${data?.overall.confidence || 0}%`
                  )}
                </span>
              </div>
              {!isLoading && data && (
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                  <motion.div 
                    className="h-2 rounded-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${data.overall.confidence}%` }}
                    transition={{ duration: 1, delay: 0.4 }}
                  ></motion.div>
                </div>
              )}
            </div>
            
            <div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Data Sources</span>
                <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                  {isLoading ? (
                    <div className="h-4 w-10 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                  ) : (
                    `${data ? Object.keys(data.sources).length : 0}`
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center">
            <Newspaper className="mr-1 h-4 w-4 text-blue-500" />
            News Sentiment
          </h3>
          
          <div className="mt-3 space-y-3">
            <div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Score</span>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {isLoading ? (
                    <div className="h-4 w-10 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                  ) : (
                    `${data?.sources.news.score || 0}`
                  )}
                </span>
              </div>
              {!isLoading && data && (
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                  <motion.div 
                    className="h-2 rounded-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${data.sources.news.score}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                  ></motion.div>
                </div>
              )}
            </div>
            
            <div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Articles</span>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {isLoading ? (
                    <div className="h-4 w-10 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                  ) : (
                    `${data?.sources.news.articles.length || 0}`
                  )}
                </span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Sources</span>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {isLoading ? (
                    <div className="h-4 w-10 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                  ) : (
                    `${data?.sources.news.sources.length || 0}`
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center">
            <Twitter className="mr-1 h-4 w-4 text-blue-400" />
            Social Media Sentiment
          </h3>
          
          <div className="mt-3 space-y-3">
            <div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Score</span>
                <span className="text-sm font-medium text-blue-400">
                  {isLoading ? (
                    <div className="h-4 w-10 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                  ) : (
                    `${data?.sources.social.score || 0}`
                  )}
                </span>
              </div>
              {!isLoading && data && (
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                  <motion.div 
                    className="h-2 rounded-full bg-blue-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${data.sources.social.score}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                  ></motion.div>
                </div>
              )}
            </div>
            
            <div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Mentions</span>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {isLoading ? (
                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                  ) : (
                    `${data?.sources.social.mentions.toLocaleString() || 0}`
                  )}
                </span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Platforms</span>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {isLoading ? (
                    <div className="h-4 w-10 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                  ) : (
                    `${Object.keys(data?.sources.social.platforms || {}).length}`
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center">
            <Globe className="mr-1 h-4 w-4 text-green-500" />
            Multi-Source Overview
          </h3>
          
          <div className="mt-3 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Reddit</span>
              <span className="text-sm font-medium text-orange-500">
                {isLoading ? (
                  <div className="h-4 w-10 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                ) : (
                  `${data?.sources.reddit.score || 0}`
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Twitter</span>
              <span className="text-sm font-medium text-blue-400">
                {isLoading ? (
                  <div className="h-4 w-10 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                ) : (
                  `${data?.sources.twitter.score || 0}`
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Institutional</span>
              <span className="text-sm font-medium text-purple-500">
                {isLoading ? (
                  <div className="h-4 w-10 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                ) : (
                  `${data?.sources.institutional.score || 0}`
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Retail</span>
              <span className="text-sm font-medium text-pink-500">
                {isLoading ? (
                  <div className="h-4 w-10 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                ) : (
                  `${data?.sources.retail.score || 0}`
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}