"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  Percent, 
  AlertCircle,
  BarChart4,
  Settings,
  RefreshCw
} from 'lucide-react';
import { MarketOverview } from '@/lib/api/icmarkets';

interface TradingInterfaceProps {
  marketData: MarketOverview;
  isLoading: boolean;
  isUsingLiveData: boolean;
}

export default function TradingInterface({ 
  marketData, 
  isLoading, 
  isUsingLiveData 
}: TradingInterfaceProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [lotSize, setLotSize] = useState<number>(0.01);
  const [leverage, setLeverage] = useState<number>(100);
  const [stopLoss, setStopLoss] = useState<number | null>(null);
  const [takeProfit, setTakeProfit] = useState<number | null>(null);
  
  // Calculate trade details
  const calculateTradeDetails = () => {
    if (isLoading || !marketData) return null;
    
    const price = orderType === 'buy' ? marketData.ask : marketData.bid;
    const contractSize = 100; // 1 lot = 100 oz for Gold
    const positionSize = lotSize * contractSize;
    const positionValue = positionSize * price;
    const margin = positionValue / leverage;
    
    // Calculate potential profit/loss
    let potentialProfit = null;
    let potentialLoss = null;
    
    if (takeProfit) {
      const priceDifference = orderType === 'buy' 
        ? takeProfit - price 
        : price - takeProfit;
      potentialProfit = priceDifference * positionSize;
    }
    
    if (stopLoss) {
      const priceDifference = orderType === 'buy' 
        ? price - stopLoss 
        : stopLoss - price;
      potentialLoss = priceDifference * positionSize;
    }
    
    return {
      price,
      positionSize,
      positionValue,
      margin,
      potentialProfit,
      potentialLoss
    };
  };
  
  const tradeDetails = calculateTradeDetails();
  
  // Handle order submission
  const handleSubmitOrder = () => {
    // In a real implementation, this would submit the order to the API
    alert(`Order submitted: ${orderType.toUpperCase()} ${lotSize} lots of XAUUSD`);
  };
  
  return (
    <motion.div 
      ref={ref}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
          <BarChart4 className="mr-2 h-5 w-5 text-amber-500" />
          Trading Interface
        </h2>
        <div className="flex items-center space-x-2">
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
          <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
            <Settings className="h-4 w-4" />
          </button>
          <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {!isUsingLiveData && (
        <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800/50 flex items-center">
          <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
          <p className="text-sm text-amber-700 dark:text-amber-300">
            Using simulated data. Connect to IC Markets API for live trading data.
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Order Type</h3>
            <div className="flex rounded-md overflow-hidden">
              <button
                className={`flex-1 py-2 px-4 flex justify-center items-center ${
                  orderType === 'buy' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => setOrderType('buy')}
              >
                <ArrowUpRight className={`h-4 w-4 mr-1 ${orderType === 'buy' ? 'text-white' : 'text-green-500'}`} />
                Buy
              </button>
              <button
                className={`flex-1 py-2 px-4 flex justify-center items-center ${
                  orderType === 'sell' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => setOrderType('sell')}
              >
                <ArrowDownRight className={`h-4 w-4 mr-1 ${orderType === 'sell' ? 'text-white' : 'text-red-500'}`} />
                Sell
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              Lot Size
            </label>
            <div className="flex items-center">
              <input
                type="number"
                min="0.01"
                max="100"
                step="0.01"
                value={lotSize}
                onChange={(e) => setLotSize(parseFloat(e.target.value))}
                className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <div className="ml-2 flex">
                <button 
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-l border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  onClick={() => setLotSize(Math.max(0.01, lotSize - 0.01))}
                >
                  -
                </button>
                <button 
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-r border-t border-r border-b border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  onClick={() => setLotSize(Math.min(100, lotSize + 0.01))}
                >
                  +
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              1 lot = 100 oz of Gold
            </p>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              Leverage
            </label>
            <div className="flex items-center">
              <input
                type="number"
                min="1"
                max="500"
                step="1"
                value={leverage}
                onChange={(e) => setLeverage(parseInt(e.target.value))}
                className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <span className="ml-2 text-gray-600 dark:text-gray-300">x</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                Stop Loss
              </label>
              <input
                type="number"
                placeholder="Optional"
                value={stopLoss || ''}
                onChange={(e) => setStopLoss(e.target.value ? parseFloat(e.target.value) : null)}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                Take Profit
              </label>
              <input
                type="number"
                placeholder="Optional"
                value={takeProfit || ''}
                onChange={(e) => setTakeProfit(e.target.value ? parseFloat(e.target.value) : null)}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">Order Summary</h3>
          
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-4">
            <div className="grid grid-cols-2 gap-y-2">
              <div className="text-sm text-gray-500 dark:text-gray-400">Symbol</div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-200">XAUUSD (Gold)</div>
              
              <div className="text-sm text-gray-500 dark:text-gray-400">Type</div>
              <div className={`text-sm font-medium ${
                orderType === 'buy' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {orderType === 'buy' ? 'Buy (Long)' : 'Sell (Short)'}
              </div>
              
              <div className="text-sm text-gray-500 dark:text-gray-400">Price</div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {isLoading ? (
                  <div className="h-4 w-16 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                ) : (
                  `$${(orderType === 'buy' ? marketData.ask : marketData.bid).toFixed(2)}`
                )}
              </div>
              
              <div className="text-sm text-gray-500 dark:text-gray-400">Lot Size</div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-200">{lotSize.toFixed(2)}</div>
              
              <div className="text-sm text-gray-500 dark:text-gray-400">Position Size</div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {(lotSize * 100).toFixed(2)} oz
              </div>
              
              <div className="text-sm text-gray-500 dark:text-gray-400">Leverage</div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-200">{leverage}x</div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-4">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 flex items-center">
              <DollarSign className="h-4 w-4 text-amber-500 mr-1" />
              Financial Details
            </h4>
            
            <div className="grid grid-cols-2 gap-y-2">
              <div className="text-sm text-gray-500 dark:text-gray-400">Position Value</div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {isLoading || !tradeDetails ? (
                  <div className="h-4 w-20 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                ) : (
                  `$${tradeDetails.positionValue.toFixed(2)}`
                )}
              </div>
              
              <div className="text-sm text-gray-500 dark:text-gray-400">Required Margin</div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {isLoading || !tradeDetails ? (
                  <div className="h-4 w-16 bg-gray-200 dark:bg-gray-600 rounded animate-pulse inline-block"></div>
                ) : (
                  `$${tradeDetails.margin.toFixed(2)}`
                )}
              </div>
              
              {stopLoss && tradeDetails?.potentialLoss && (
                <>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Potential Loss</div>
                  <div className="text-sm font-medium text-red-600 dark:text-red-400">
                    -${tradeDetails.potentialLoss.toFixed(2)}
                  </div>
                </>
              )}
              
              {takeProfit && tradeDetails?.potentialProfit && (
                <>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Potential Profit</div>
                  <div className="text-sm font-medium text-green-600 dark:text-green-400">
                    +${tradeDetails.potentialProfit.toFixed(2)}
                  </div>
                </>
              )}
            </div>
          </div>
          
          <button
            onClick={handleSubmitOrder}
            className={`w-full py-3 px-4 rounded-md font-medium text-white flex items-center justify-center ${
              orderType === 'buy' 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-red-600 hover:bg-red-700'
            }`}
            disabled={isLoading}
          >
            {orderType === 'buy' ? (
              <>
                <ArrowUpRight className="h-5 w-5 mr-2" />
                Place Buy Order
              </>
            ) : (
              <>
                <ArrowDownRight className="h-5 w-5 mr-2" />
                Place Sell Order
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}