"use client";

import { useState, useEffect } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { format } from 'date-fns';
import { PriceData } from '@/lib/api/icmarkets';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle } from 'lucide-react';

interface PriceChartProps {
  data: PriceData[];
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string | null;
  timeframe: string;
}

export default function PriceChart({ 
  data, 
  isLoading, 
  isError, 
  errorMessage = null,
  timeframe 
}: PriceChartProps) {
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    if (data && data.length > 0) {
      // Format data for the chart
      const formattedData = data.map(item => ({
        timestamp: item.timestamp,
        date: new Date(item.timestamp),
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
        volume: item.volume
      }));
      
      setChartData(formattedData);
    }
  }, [data]);
  
  // Format date based on timeframe
  const formatXAxis = (timestamp: number) => {
    const date = new Date(timestamp);
    
    switch (timeframe) {
      case '1m':
      case '5m':
      case '15m':
      case '30m':
        return format(date, 'HH:mm');
      case '1h':
      case '4h':
        return format(date, 'dd MMM HH:mm');
      case '1d':
        return format(date, 'dd MMM');
      case '1w':
        return format(date, 'dd MMM yyyy');
      default:
        return format(date, 'dd MMM yyyy');
    }
  };
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-800 dark:text-gray-200">
            {format(new Date(data.timestamp), 'PPpp')}
          </p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Open</p>
              <p className="font-medium">${data.open.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Close</p>
              <p className="font-medium">${data.close.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">High</p>
              <p className="font-medium text-green-600">${data.high.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Low</p>
              <p className="font-medium text-red-600">${data.low.toFixed(2)}</p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-80 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
        <Loader2 className="h-8 w-8 text-amber-500 animate-spin" />
        <span className="ml-2 text-gray-600 dark:text-gray-400">Loading price data...</span>
      </div>
    );
  }
  
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-80 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800/50">
        <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
        <h3 className="text-lg font-semibold text-red-700 dark:text-red-400">Failed to load price data</h3>
        {errorMessage && <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errorMessage}</p>}
      </div>
    );
  }
  
  if (!chartData || chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-80 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
        <AlertCircle className="h-8 w-8 text-amber-500" />
        <span className="ml-2 text-gray-600 dark:text-gray-400">No price data available</span>
      </div>
    );
  }
  
  return (
    <motion.div 
      className="w-full h-80 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorGold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={formatXAxis} 
            tick={{ fill: '#6B7280' }}
            stroke="#6B7280"
          />
          <YAxis 
            domain={['auto', 'auto']}
            tick={{ fill: '#6B7280' }}
            stroke="#6B7280"
            tickFormatter={(value) => `$${value.toFixed(0)}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="close" 
            stroke="#F59E0B" 
            fillOpacity={1} 
            fill="url(#colorGold)" 
            name="Gold Price"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}