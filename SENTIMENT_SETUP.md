# Market Sentiment Analysis Setup

This document explains how to set up the comprehensive market sentiment analysis feature in your GoldTrader platform.

## Overview

The sentiment analysis system aggregates data from multiple sources to provide a comprehensive view of market sentiment:

- **News Sources**: Reuters, Bloomberg, CNBC, MarketWatch, Investing.com, Kitco, World Gold Council
- **Social Media**: Twitter, Facebook, Instagram, TikTok, YouTube
- **Reddit**: r/Gold, r/Silverbugs, r/investing, r/stocks, r/SecurityAnalysis
- **Institutional**: Goldman Sachs, JP Morgan, BlackRock, Vanguard reports
- **Retail**: Robinhood, Webull, eToro, Trading212 sentiment data

## API Keys Setup

### Required API Keys

1. **News API** (Recommended)
   - Sign up at [NewsAPI.org](https://newsapi.org/)
   - Get your free API key
   - Add to environment variables: `NEWS_API_KEY=your-key-here`

### Optional API Keys (for enhanced data)

2. **Reddit API**
   - Create app at [Reddit Apps](https://www.reddit.com/prefs/apps)
   - Get client ID and secret
   - Add to environment: `REDDIT_CLIENT_ID=your-id` and `REDDIT_CLIENT_SECRET=your-secret`

3. **Twitter API**
   - Apply at [Twitter Developer Portal](https://developer.twitter.com/)
   - Get bearer token
   - Add to environment: `TWITTER_BEARER_TOKEN=your-token`

4. **Alpha Vantage**
   - Get free key from [Alpha Vantage](https://www.alphavantage.co/)
   - Add to environment: `ALPHA_VANTAGE_KEY=your-key`

5. **Finnhub**
   - Get free key from [Finnhub](https://finnhub.io/)
   - Add to environment: `FINNHUB_KEY=your-key`

## Environment Variables

Create a `.env.local` file in your project root:

```bash
# Database
DATABASE_URL="file:./dev.db"

# Next.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Sentiment Analysis API Keys
NEWS_API_KEY="your-news-api-key"
REDDIT_CLIENT_ID="your-reddit-client-id"
REDDIT_CLIENT_SECRET="your-reddit-client-secret"
TWITTER_BEARER_TOKEN="your-twitter-bearer-token"
ALPHA_VANTAGE_KEY="your-alpha-vantage-key"
FINNHUB_KEY="your-finnhub-key"
```

## Features

### 1. Comprehensive Dashboard
- Overall sentiment score and trend
- Source breakdown (News, Social, Reddit, Twitter, Institutional, Retail)
- Real-time data updates every 5 minutes
- Historical tracking and trend analysis

### 2. Interactive Charts
- Multiple chart types (Line, Area, Bar)
- Time range selection (1D, 7D, 30D, 90D)
- Source filtering and comparison
- Trend analysis and statistics

### 3. News Feed
- Real-time news articles with sentiment scoring
- Search and filtering capabilities
- Source attribution and relevance scoring
- Keyword extraction and trending topics

### 4. Multi-Source Analysis
- News sentiment from major financial publications
- Social media mentions across platforms
- Reddit community sentiment
- Twitter hashtag and influencer tracking
- Institutional reports and positions
- Retail trading platform sentiment

## Usage

1. **Access the Sentiment Page**
   - Navigate to Analysis → Sentiment in the main menu
   - Or go directly to `/sentiment`

2. **View Dashboard**
   - See overall sentiment score and trend
   - Check individual source performance
   - Monitor data freshness and confidence levels

3. **Analyze Trends**
   - Switch to Charts tab for historical analysis
   - Select different time ranges
   - Compare multiple data sources
   - View trend statistics

4. **Read News**
   - Switch to News Feed tab
   - Search for specific topics
   - Filter by sentiment (positive, negative, neutral)
   - Sort by relevance, sentiment, or date

5. **Detailed Analysis**
   - Switch to Analysis tab for comprehensive breakdown
   - View source-specific metrics
   - Monitor confidence levels
   - Track data point counts

## Data Sources

### News Sources
- Reuters
- Bloomberg
- CNBC
- MarketWatch
- Investing.com
- Kitco
- World Gold Council
- BullionVault
- GoldPrice.org

### Reddit Communities
- r/Gold
- r/Silverbugs
- r/investing
- r/stocks
- r/SecurityAnalysis
- r/ValueInvesting
- r/Commodities
- r/PreciousMetals
- r/Goldbugs
- r/WallStreetBets

### Social Media Platforms
- Twitter/X
- Facebook
- Instagram
- TikTok
- YouTube

### Institutional Sources
- Goldman Sachs
- JP Morgan
- BlackRock
- Vanguard
- Morgan Stanley
- Credit Suisse

### Retail Platforms
- Robinhood
- Webull
- eToro
- Trading212

## Technical Details

### Sentiment Scoring
- Scale: 0-100 (0 = very negative, 100 = very positive)
- Weighted aggregation across sources
- Confidence scoring based on data quality
- Real-time updates with 5-minute refresh

### Data Processing
- Natural language processing for sentiment analysis
- Keyword extraction and relevance scoring
- Trend detection and change analysis
- Historical data storage and retrieval

### Caching
- 5-minute cache for API responses
- Efficient data aggregation
- Fallback to mock data when APIs unavailable
- Error handling and retry logic

## Troubleshooting

### No Data Showing
1. Check if API keys are properly set in environment variables
2. Verify internet connection
3. Check browser console for errors
4. Try refreshing the page

### API Rate Limits
- Free API keys have rate limits
- System automatically falls back to mock data
- Consider upgrading to paid plans for higher limits

### Slow Loading
- Data aggregation takes time
- Large datasets may cause delays
- Consider reducing time range for faster loading

## Future Enhancements

- Machine learning sentiment analysis
- Custom sentiment models
- Additional data sources
- Real-time notifications
- Sentiment alerts and triggers
- Advanced filtering and search
- Export capabilities
- API for external integrations

## Support

For issues or questions:
1. Check the browser console for errors
2. Verify API key configuration
3. Test with mock data first
4. Review the troubleshooting section above
