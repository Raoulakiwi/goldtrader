"use client";

import { useState, useEffect } from 'react';
import { useLocalStorage } from 'react-use';
import apiClient, { PriceData, MarketOverview, ApiCredentials, ApiError } from '../api/icmarkets';
import { 
  generateMockPriceData, 
  generateMockMarketOverview, 
  generateMockTechnicalIndicators,
  generateMockSentimentData,
  generateMockFundamentalData
} from '../api/mock-data';

export type TimeFrame = "1m" | "5m" | "15m" | "30m" | "1h" | "4h" | "1d" | "1w";

interface GoldDataState {
  priceData: PriceData[];
  marketOverview: MarketOverview;
  technicalIndicators: any;
  sentimentData: any;
  fundamentalData: any;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  isUsingLiveData: boolean;
}

export function useGoldData(timeframe: TimeFrame = "1h") {
  // Store API credentials in local storage
  const [credentials, setCredentials] = useLocalStorage<ApiCredentials | null>(
    'icmarkets-api-credentials',
    null
  );
  
  // State for gold data
  const [state, setState] = useState<GoldDataState>({
    priceData: [],
    marketOverview: {
      symbol: "XAUUSD",
      bid: 0,
      ask: 0,
      spread: 0,
      dailyChange: 0,
      dailyChangePercentage: 0,
      dailyHigh: 0,
      dailyLow: 0,
      volume: 0
    },
    technicalIndicators: {},
    sentimentData: {},
    fundamentalData: {},
    isLoading: true,
    isError: false,
    errorMessage: null,
    isUsingLiveData: false
  });

  // Set API credentials
  const updateCredentials = (newCredentials: ApiCredentials | null) => {
    setCredentials(newCredentials);
    if (newCredentials) {
      apiClient.setCredentials(newCredentials);
    }
  };

  // Fetch data based on timeframe
  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      if (!isMounted) return;
      
      setState(prev => ({ ...prev, isLoading: true, isError: false, errorMessage: null }));
      
      try {
        // Set credentials if available
        if (credentials) {
          apiClient.setCredentials(credentials);
        }
        
        // Calculate date range based on timeframe
        const to = new Date();
        let from = new Date();
        
        switch (timeframe) {
          case "1m":
            from.setHours(from.getHours() - 24);
            break;
          case "5m":
            from.setHours(from.getHours() - 24);
            break;
          case "15m":
            from.setDate(from.getDate() - 3);
            break;
          case "30m":
            from.setDate(from.getDate() - 7);
            break;
          case "1h":
            from.setDate(from.getDate() - 14);
            break;
          case "4h":
            from.setDate(from.getDate() - 30);
            break;
          case "1d":
            from.setDate(from.getDate() - 90);
            break;
          case "1w":
            from.setDate(from.getDate() - 365);
            break;
        }
        
        // Try to fetch live data if credentials are available
        if (apiClient.hasCredentials()) {
          try {
            const [priceData, marketOverview] = await Promise.all([
              apiClient.getHistoricalData(timeframe, from, to),
              apiClient.getMarketOverview()
            ]);
            
            if (isMounted) {
              setState(prev => ({
                ...prev,
                priceData,
                marketOverview,
                technicalIndicators: generateMockTechnicalIndicators(), // We'll still use mock data for these
                sentimentData: generateMockSentimentData(),
                fundamentalData: generateMockFundamentalData(),
                isLoading: false,
                isUsingLiveData: true
              }));
            }
            return;
          } catch (error) {
            console.error("Failed to fetch live data:", error);
            // Fall back to mock data
          }
        }
        
        // Use mock data as fallback
        if (isMounted) {
          setState(prev => ({
            ...prev,
            priceData: generateMockPriceData(timeframe, from, to),
            marketOverview: generateMockMarketOverview(),
            technicalIndicators: generateMockTechnicalIndicators(),
            sentimentData: generateMockSentimentData(),
            fundamentalData: generateMockFundamentalData(),
            isLoading: false,
            isUsingLiveData: false
          }));
        }
      } catch (error) {
        console.error("Error fetching gold data:", error);
        
        if (isMounted) {
          setState(prev => ({
            ...prev,
            isLoading: false,
            isError: true,
            errorMessage: error instanceof ApiError 
              ? error.message 
              : "An unexpected error occurred while fetching gold data",
            isUsingLiveData: false
          }));
        }
      }
    };
    
    fetchData();
    
    // Set up polling for real-time updates
    const intervalId = setInterval(fetchData, 60000); // Update every minute
    
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [timeframe, credentials]);
  
  return {
    ...state,
    updateCredentials,
    refreshData: () => setState(prev => ({ ...prev, isLoading: true }))
  };
}