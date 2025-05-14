"use client";

import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { TimeFrame } from '@/lib/hooks/useGoldData';

interface TimeframeSelectorProps {
  selectedTimeframe: TimeFrame;
  onTimeframeChange: (timeframe: TimeFrame) => void;
}

export default function TimeframeSelector({ 
  selectedTimeframe, 
  onTimeframeChange 
}: TimeframeSelectorProps) {
  const timeframes: { value: TimeFrame; label: string }[] = [
    { value: "1m", label: "1m" },
    { value: "5m", label: "5m" },
    { value: "15m", label: "15m" },
    { value: "30m", label: "30m" },
    { value: "1h", label: "1h" },
    { value: "4h", label: "4h" },
    { value: "1d", label: "1D" },
    { value: "1w", label: "1W" }
  ];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center">
      <Clock className="h-5 w-5 text-amber-500 mr-3" />
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-4">Timeframe:</div>
      <div className="flex space-x-1 overflow-x-auto">
        {timeframes.map((tf) => (
          <motion.button
            key={tf.value}
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${
              selectedTimeframe === tf.value
                ? 'bg-amber-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            onClick={() => onTimeframeChange(tf.value)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tf.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}