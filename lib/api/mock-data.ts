/**
 * Mock data generator for Gold trading analysis
 * Used as a fallback when the IC Markets API is not available
 */

import { PriceData, MarketOverview } from './icmarkets';

// Generate mock price data
export function generateMockPriceData(
  timeframe: "1m" | "5m" | "15m" | "30m" | "1h" | "4h" | "1d" | "1w",
  from: Date,
  to: Date,
  limit: number = 1000
): PriceData[] {
  const data: PriceData[] = [];
  const interval = (to.getTime() - from.getTime()) / limit;
  
  // Base price and trend
  let basePrice = 2300;
  const trendDirection = Math.random() > 0.5 ? 1 : -1;
  const trendStrength = Math.random() * 0.2;
  
  for (let i = 0; i < limit; i++) {
    const timestamp = from.getTime() + i * interval;
    
    // Add some randomness and trend
    basePrice += trendDirection * trendStrength * basePrice * 0.01 * Math.random();
    
    // Add some volatility
    const volatility = basePrice * 0.005;
    const open = basePrice;
    const close = basePrice + (Math.random() * volatility * 2 - volatility);
    const high = Math.max(open, close) + Math.random() * volatility;
    const low = Math.min(open, close) - Math.random() * volatility;
    
    data.push({
      timestamp,
      open,
      high,
      low,
      close,
      volume: Math.floor(Math.random() * 1000 + 500)
    });
  }
  
  return data;
}

// Generate mock market overview
export function generateMockMarketOverview(): MarketOverview {
  const bid = 2345.67 + (Math.random() * 10 - 5);
  const spread = 0.2 + Math.random() * 0.1;
  const ask = bid + spread;
  const dailyChange = Math.random() * 20 - 10;
  const dailyChangePercentage = (dailyChange / bid) * 100;
  
  return {
    symbol: "XAUUSD",
    bid,
    ask,
    spread,
    dailyChange,
    dailyChangePercentage,
    dailyHigh: bid + Math.random() * 15,
    dailyLow: bid - Math.random() * 15,
    volume: Math.floor(Math.random() * 25000 + 15000)
  };
}

// Generate mock technical indicators
export function generateMockTechnicalIndicators() {
  return {
    rsi: Math.floor(Math.random() * 100),
    macd: {
      value: Math.random() * 10 - 5,
      signal: Math.random() * 10 - 5,
      histogram: Math.random() * 2 - 1
    },
    movingAverages: {
      sma20: 2340 + Math.random() * 20 - 10,
      sma50: 2330 + Math.random() * 20 - 10,
      sma200: 2320 + Math.random() * 20 - 10,
      ema20: 2345 + Math.random() * 20 - 10,
      ema50: 2335 + Math.random() * 20 - 10,
      ema200: 2325 + Math.random() * 20 - 10
    },
    bollingerBands: {
      upper: 2360 + Math.random() * 10,
      middle: 2345 + Math.random() * 10,
      lower: 2330 + Math.random() * 10
    }
  };
}

// Generate mock sentiment data
export function generateMockSentimentData() {
  return {
    bullishPercentage: Math.floor(Math.random() * 100),
    bearishPercentage: 100 - Math.floor(Math.random() * 100),
    neutralPercentage: Math.floor(Math.random() * 30),
    retailSentiment: {
      long: 40 + Math.floor(Math.random() * 30),
      short: 60 - Math.floor(Math.random() * 30)
    },
    institutionalSentiment: {
      long: 45 + Math.floor(Math.random() * 30),
      short: 55 - Math.floor(Math.random() * 30)
    },
    socialMediaMentions: Math.floor(Math.random() * 10000 + 5000),
    sentimentScore: Math.floor(Math.random() * 100)
  };
}

// Generate mock fundamental data
export function generateMockFundamentalData() {
  return {
    usdIndex: 90 + Math.random() * 10,
    treasuryYields: {
      tenYear: 1.5 + Math.random(),
      twoYear: 0.5 + Math.random()
    },
    inflation: {
      cpi: 2 + Math.random() * 3,
      ppi: 2.5 + Math.random() * 3
    },
    interestRates: {
      fed: 0.25 + Math.random() * 0.5,
      ecb: 0 + Math.random() * 0.25
    },
    economicIndicators: {
      gdp: 2 + Math.random() * 2,
      unemployment: 3.5 + Math.random() * 2
    }
  };
}