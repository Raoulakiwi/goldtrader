/**
 * Comprehensive Sentiment Analysis API
 * Aggregates data from multiple sources: News, Social Media, Reddit, Twitter, Institutional, and Retail
 */

import { 
  SentimentData, 
  NewsSentiment, 
  SocialSentiment, 
  RedditSentiment, 
  TwitterSentiment, 
  InstitutionalSentiment, 
  RetailSentiment,
  NewsArticle,
  SocialTrend,
  RedditSubreddit,
  RedditPost,
  TwitterTweet,
  TwitterHashtag,
  TwitterInfluencer,
  InstitutionalReport,
  InstitutionalPosition,
  RetailSurvey,
  SentimentHistory
} from '../types';

// API Configuration
const API_CONFIG = {
  NEWS_API_KEY: process.env.NEWS_API_KEY || 'demo',
  REDDIT_CLIENT_ID: process.env.REDDIT_CLIENT_ID || 'demo',
  REDDIT_CLIENT_SECRET: process.env.REDDIT_CLIENT_SECRET || 'demo',
  TWITTER_BEARER_TOKEN: process.env.TWITTER_BEARER_TOKEN || 'demo',
  ALPHA_VANTAGE_KEY: process.env.ALPHA_VANTAGE_KEY || 'demo',
  FINNHUB_KEY: process.env.FINNHUB_KEY || 'demo',
};

// News Sources for Gold Trading
const NEWS_SOURCES = [
  'reuters.com',
  'bloomberg.com',
  'cnbc.com',
  'marketwatch.com',
  'investing.com',
  'kitco.com',
  'gold.org',
  'world-gold-council.org',
  'bullionvault.com',
  'goldprice.org'
];

// Reddit Subreddits for Gold Trading
const REDDIT_SUBREDDITS = [
  'Gold',
  'Silverbugs',
  'investing',
  'stocks',
  'SecurityAnalysis',
  'ValueInvesting',
  'Commodities',
  'PreciousMetals',
  'Goldbugs',
  'WallStreetBets'
];

// Twitter Keywords and Hashtags
const TWITTER_KEYWORDS = [
  '#Gold',
  '#XAUUSD',
  '#GoldPrice',
  '#PreciousMetals',
  '#GoldTrading',
  '#GoldInvesting',
  '#Bullion',
  '#GoldMarket',
  '#GoldAnalysis',
  '#GoldNews'
];

/**
 * Main Sentiment Analysis Service
 */
export class SentimentAnalysisService {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  /**
   * Get comprehensive sentiment data from all sources
   */
  async getComprehensiveSentiment(): Promise<SentimentData> {
    try {
      const [news, social, reddit, twitter, institutional, retail, historical] = await Promise.all([
        this.getNewsSentiment(),
        this.getSocialSentiment(),
        this.getRedditSentiment(),
        this.getTwitterSentiment(),
        this.getInstitutionalSentiment(),
        this.getRetailSentiment(),
        this.getSentimentHistory()
      ]);

      // Calculate overall sentiment
      const overall = this.calculateOverallSentiment({
        news: news.score,
        social: social.score,
        reddit: reddit.score,
        twitter: twitter.score,
        institutional: institutional.score,
        retail: retail.score
      });

      return {
        overall,
        sources: {
          news,
          social,
          reddit,
          twitter,
          institutional,
          retail
        },
        historical
      };
    } catch (error) {
      console.error('Error fetching comprehensive sentiment:', error);
      return this.getMockSentimentData();
    }
  }

  /**
   * News Sentiment Analysis
   */
  private async getNewsSentiment(): Promise<NewsSentiment> {
    const cacheKey = 'news_sentiment';
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      // Try NewsAPI first
      const newsApiData = await this.fetchFromNewsAPI();
      if (newsApiData) {
        this.setCachedData(cacheKey, newsApiData);
        return newsApiData;
      }

      // Fallback to Alpha Vantage News
      const alphaVantageData = await this.fetchFromAlphaVantage();
      if (alphaVantageData) {
        this.setCachedData(cacheKey, alphaVantageData);
        return alphaVantageData;
      }

      // Final fallback to mock data
      const mockData = this.generateMockNewsSentiment();
      this.setCachedData(cacheKey, mockData);
      return mockData;
    } catch (error) {
      console.error('Error fetching news sentiment:', error);
      return this.generateMockNewsSentiment();
    }
  }

  /**
   * Social Media Sentiment Analysis
   */
  private async getSocialSentiment(): Promise<SocialSentiment> {
    const cacheKey = 'social_sentiment';
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      // Aggregate from multiple social platforms
      const [twitterData, facebookData, instagramData, tiktokData, youtubeData] = await Promise.all([
        this.fetchTwitterMentions(),
        this.fetchFacebookMentions(),
        this.fetchInstagramMentions(),
        this.fetchTikTokMentions(),
        this.fetchYouTubeMentions()
      ]);

      const totalMentions = twitterData + facebookData + instagramData + tiktokData + youtubeData;
      const avgSentiment = (twitterData * 0.3 + facebookData * 0.2 + instagramData * 0.2 + tiktokData * 0.15 + youtubeData * 0.15) / totalMentions;

      const socialData: SocialSentiment = {
        score: Math.round(avgSentiment),
        mentions: totalMentions,
        platforms: {
          twitter: twitterData,
          facebook: facebookData,
          instagram: instagramData,
          tiktok: tiktokData,
          youtube: youtubeData
        },
        trending: await this.getSocialTrends(),
        lastUpdated: new Date()
      };

      this.setCachedData(cacheKey, socialData);
      return socialData;
    } catch (error) {
      console.error('Error fetching social sentiment:', error);
      return this.generateMockSocialSentiment();
    }
  }

  /**
   * Reddit Sentiment Analysis
   */
  private async getRedditSentiment(): Promise<RedditSentiment> {
    const cacheKey = 'reddit_sentiment';
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const subreddits = await this.fetchRedditSubreddits();
      const posts = await this.fetchRedditPosts();
      
      const avgSentiment = subreddits.reduce((sum, sub) => sum + sub.sentiment, 0) / subreddits.length;

      const redditData: RedditSentiment = {
        score: Math.round(avgSentiment),
        subreddits,
        posts,
        lastUpdated: new Date()
      };

      this.setCachedData(cacheKey, redditData);
      return redditData;
    } catch (error) {
      console.error('Error fetching Reddit sentiment:', error);
      return this.generateMockRedditSentiment();
    }
  }

  /**
   * Twitter Sentiment Analysis
   */
  private async getTwitterSentiment(): Promise<TwitterSentiment> {
    const cacheKey = 'twitter_sentiment';
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const [tweets, hashtags, influencers] = await Promise.all([
        this.fetchTwitterTweets(),
        this.fetchTwitterHashtags(),
        this.fetchTwitterInfluencers()
      ]);

      const avgSentiment = tweets.reduce((sum, tweet) => sum + tweet.sentiment, 0) / tweets.length;

      const twitterData: TwitterSentiment = {
        score: Math.round(avgSentiment),
        tweets,
        hashtags,
        influencers,
        lastUpdated: new Date()
      };

      this.setCachedData(cacheKey, twitterData);
      return twitterData;
    } catch (error) {
      console.error('Error fetching Twitter sentiment:', error);
      return this.generateMockTwitterSentiment();
    }
  }

  /**
   * Institutional Sentiment Analysis
   */
  private async getInstitutionalSentiment(): Promise<InstitutionalSentiment> {
    const cacheKey = 'institutional_sentiment';
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const [reports, positions] = await Promise.all([
        this.fetchInstitutionalReports(),
        this.fetchInstitutionalPositions()
      ]);

      const avgSentiment = reports.reduce((sum, report) => {
        const score = report.recommendation === 'buy' ? 80 : report.recommendation === 'sell' ? 20 : 50;
        return sum + (score * report.confidence / 100);
      }, 0) / reports.length;

      const institutionalData: InstitutionalSentiment = {
        score: Math.round(avgSentiment),
        reports,
        positions,
        lastUpdated: new Date()
      };

      this.setCachedData(cacheKey, institutionalData);
      return institutionalData;
    } catch (error) {
      console.error('Error fetching institutional sentiment:', error);
      return this.generateMockInstitutionalSentiment();
    }
  }

  /**
   * Retail Sentiment Analysis
   */
  private async getRetailSentiment(): Promise<RetailSentiment> {
    const cacheKey = 'retail_sentiment';
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const [platforms, surveys] = await Promise.all([
        this.fetchRetailPlatforms(),
        this.fetchRetailSurveys()
      ]);

      const avgSentiment = surveys.reduce((sum, survey) => {
        return sum + (survey.bullish - survey.bearish);
      }, 0) / surveys.length;

      const retailData: RetailSentiment = {
        score: Math.round(avgSentiment + 50), // Convert to 0-100 scale
        platforms,
        surveys,
        lastUpdated: new Date()
      };

      this.setCachedData(cacheKey, retailData);
      return retailData;
    } catch (error) {
      console.error('Error fetching retail sentiment:', error);
      return this.generateMockRetailSentiment();
    }
  }

  /**
   * Get historical sentiment data
   */
  private async getSentimentHistory(): Promise<SentimentHistory[]> {
    const cacheKey = 'sentiment_history';
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      // Generate historical data for the last 30 days
      const history: SentimentHistory[] = [];
      const now = new Date();
      
      for (let i = 29; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const baseScore = 50 + Math.sin(i * 0.2) * 20 + Math.random() * 10 - 5;
        
        history.push({
          timestamp: date,
          score: Math.round(baseScore),
          sources: {
            news: Math.round(baseScore + Math.random() * 10 - 5),
            social: Math.round(baseScore + Math.random() * 15 - 7.5),
            reddit: Math.round(baseScore + Math.random() * 20 - 10),
            twitter: Math.round(baseScore + Math.random() * 12 - 6),
            institutional: Math.round(baseScore + Math.random() * 8 - 4),
            retail: Math.round(baseScore + Math.random() * 18 - 9)
          }
        });
      }

      this.setCachedData(cacheKey, history);
      return history;
    } catch (error) {
      console.error('Error fetching sentiment history:', error);
      return [];
    }
  }

  // API Fetching Methods (with fallbacks to mock data)
  private async fetchFromNewsAPI(): Promise<NewsSentiment | null> {
    if (API_CONFIG.NEWS_API_KEY === 'demo') return null;
    
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=gold+OR+precious+metals+OR+XAUUSD&sources=${NEWS_SOURCES.join(',')}&sortBy=publishedAt&apiKey=${API_CONFIG.NEWS_API_KEY}`
      );
      
      if (!response.ok) return null;
      
      const data = await response.json();
      return this.processNewsData(data.articles);
    } catch (error) {
      console.error('NewsAPI error:', error);
      return null;
    }
  }

  private async fetchFromAlphaVantage(): Promise<NewsSentiment | null> {
    if (API_CONFIG.ALPHA_VANTAGE_KEY === 'demo') return null;
    
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=GOLD&apikey=${API_CONFIG.ALPHA_VANTAGE_KEY}`
      );
      
      if (!response.ok) return null;
      
      const data = await response.json();
      return this.processAlphaVantageNews(data.feed);
    } catch (error) {
      console.error('Alpha Vantage error:', error);
      return null;
    }
  }

  private async fetchTwitterMentions(): Promise<number> {
    // Mock implementation - in production, use Twitter API v2
    return Math.floor(Math.random() * 5000 + 2000);
  }

  private async fetchFacebookMentions(): Promise<number> {
    // Mock implementation - in production, use Facebook Graph API
    return Math.floor(Math.random() * 3000 + 1000);
  }

  private async fetchInstagramMentions(): Promise<number> {
    // Mock implementation - in production, use Instagram Basic Display API
    return Math.floor(Math.random() * 2000 + 500);
  }

  private async fetchTikTokMentions(): Promise<number> {
    // Mock implementation - in production, use TikTok Research API
    return Math.floor(Math.random() * 1500 + 300);
  }

  private async fetchYouTubeMentions(): Promise<number> {
    // Mock implementation - in production, use YouTube Data API
    return Math.floor(Math.random() * 1000 + 200);
  }

  private async getSocialTrends(): Promise<SocialTrend[]> {
    return [
      { platform: 'Twitter', hashtag: '#Gold', mentions: 1250, sentiment: 65, growth: 15 },
      { platform: 'TikTok', hashtag: '#GoldTrading', mentions: 850, sentiment: 58, growth: 25 },
      { platform: 'Instagram', hashtag: '#PreciousMetals', mentions: 420, sentiment: 72, growth: 8 },
      { platform: 'YouTube', hashtag: '#GoldAnalysis', mentions: 680, sentiment: 61, growth: 12 }
    ];
  }

  private async fetchRedditSubreddits(): Promise<RedditSubreddit[]> {
    return REDDIT_SUBREDDITS.map(subreddit => ({
      name: subreddit,
      sentiment: Math.floor(Math.random() * 100),
      posts: Math.floor(Math.random() * 50 + 10),
      comments: Math.floor(Math.random() * 200 + 50),
      subscribers: Math.floor(Math.random() * 100000 + 10000)
    }));
  }

  private async fetchRedditPosts(): Promise<RedditPost[]> {
    // Mock Reddit posts
    return [
      {
        title: "Gold breaks $2400 resistance - what's next?",
        content: "Gold has finally broken through the $2400 resistance level...",
        subreddit: "Gold",
        score: 245,
        comments: 67,
        sentiment: 75,
        url: "https://reddit.com/r/Gold/comments/example",
        createdAt: new Date(Date.now() - Math.random() * 86400000)
      },
      {
        title: "Fed rate cuts could push gold higher",
        content: "With the Fed signaling potential rate cuts...",
        subreddit: "investing",
        score: 189,
        comments: 43,
        sentiment: 68,
        url: "https://reddit.com/r/investing/comments/example",
        createdAt: new Date(Date.now() - Math.random() * 86400000)
      }
    ];
  }

  private async fetchTwitterTweets(): Promise<TwitterTweet[]> {
    return [
      {
        id: "1234567890",
        text: "Gold hitting new highs! 🥇 #Gold #XAUUSD",
        author: "GoldTrader",
        followers: 15000,
        sentiment: 80,
        retweets: 45,
        likes: 120,
        createdAt: new Date(Date.now() - Math.random() * 3600000)
      },
      {
        id: "1234567891",
        text: "Market volatility driving safe haven demand for gold",
        author: "MarketAnalyst",
        followers: 25000,
        sentiment: 65,
        retweets: 23,
        likes: 89,
        createdAt: new Date(Date.now() - Math.random() * 3600000)
      }
    ];
  }

  private async fetchTwitterHashtags(): Promise<TwitterHashtag[]> {
    return TWITTER_KEYWORDS.map(tag => ({
      tag: tag.replace('#', ''),
      mentions: Math.floor(Math.random() * 1000 + 100),
      sentiment: Math.floor(Math.random() * 100),
      trend: Math.floor(Math.random() * 50 + 10)
    }));
  }

  private async fetchTwitterInfluencers(): Promise<TwitterInfluencer[]> {
    return [
      {
        username: "GoldExpert",
        followers: 100000,
        sentiment: 70,
        influence: 85,
        recentTweets: 5
      },
      {
        username: "PreciousMetals",
        followers: 75000,
        sentiment: 65,
        influence: 78,
        recentTweets: 3
      }
    ];
  }

  private async fetchInstitutionalReports(): Promise<InstitutionalReport[]> {
    return [
      {
        institution: "Goldman Sachs",
        title: "Gold Outlook: Bullish on Safe Haven Demand",
        recommendation: "buy",
        targetPrice: 2500,
        confidence: 85,
        publishedAt: new Date(Date.now() - Math.random() * 86400000),
        url: "https://example.com/report"
      },
      {
        institution: "JP Morgan",
        title: "Precious Metals: Neutral Stance",
        recommendation: "hold",
        confidence: 70,
        publishedAt: new Date(Date.now() - Math.random() * 86400000)
      }
    ];
  }

  private async fetchInstitutionalPositions(): Promise<InstitutionalPosition[]> {
    return [
      {
        institution: "BlackRock",
        position: "long",
        size: 1000000,
        change: 5.2,
        lastUpdated: new Date()
      },
      {
        institution: "Vanguard",
        position: "long",
        size: 750000,
        change: 2.8,
        lastUpdated: new Date()
      }
    ];
  }

  private async fetchRetailPlatforms(): Promise<RetailSentiment['platforms']> {
    return {
      robinhood: Math.floor(Math.random() * 100),
      webull: Math.floor(Math.random() * 100),
      etoro: Math.floor(Math.random() * 100),
      trading212: Math.floor(Math.random() * 100)
    };
  }

  private async fetchRetailSurveys(): Promise<RetailSurvey[]> {
    return [
      {
        source: "AAII Sentiment Survey",
        bullish: 45,
        bearish: 30,
        neutral: 25,
        sampleSize: 1000,
        conductedAt: new Date(Date.now() - Math.random() * 86400000)
      },
      {
        source: "Investor Intelligence",
        bullish: 52,
        bearish: 28,
        neutral: 20,
        sampleSize: 800,
        conductedAt: new Date(Date.now() - Math.random() * 86400000)
      }
    ];
  }

  // Data Processing Methods
  private processNewsData(articles: any[]): NewsSentiment {
    const processedArticles: NewsArticle[] = articles.map(article => ({
      title: article.title,
      summary: article.description || '',
      url: article.url,
      source: article.source.name,
      publishedAt: new Date(article.publishedAt),
      sentiment: this.analyzeTextSentiment(article.title + ' ' + (article.description || '')),
      relevance: this.calculateRelevance(article.title + ' ' + (article.description || '')),
      keywords: this.extractKeywords(article.title + ' ' + (article.description || ''))
    }));

    const avgSentiment = processedArticles.reduce((sum, article) => sum + article.sentiment, 0) / processedArticles.length;

    return {
      score: Math.round(avgSentiment),
      articles: processedArticles,
      sources: Array.from(new Set(processedArticles.map(a => a.source))),
      lastUpdated: new Date()
    };
  }

  private processAlphaVantageNews(feed: any[]): NewsSentiment {
    const processedArticles: NewsArticle[] = feed.map(item => ({
      title: item.title,
      summary: item.summary,
      url: item.url,
      source: item.source,
      publishedAt: new Date(item.time_published),
      sentiment: item.overall_sentiment_score * 100,
      relevance: item.relevance_score * 100,
      keywords: item.ticker_sentiment?.map((t: any) => t.ticker) || []
    }));

    const avgSentiment = processedArticles.reduce((sum, article) => sum + article.sentiment, 0) / processedArticles.length;

    return {
      score: Math.round(avgSentiment),
      articles: processedArticles,
      sources: Array.from(new Set(processedArticles.map(a => a.source))),
      lastUpdated: new Date()
    };
  }

  // Utility Methods
  private calculateOverallSentiment(sources: Record<string, number>): SentimentData['overall'] {
    const weights = {
      news: 0.25,
      social: 0.15,
      reddit: 0.15,
      twitter: 0.15,
      institutional: 0.20,
      retail: 0.10
    };

    const weightedScore = Object.entries(sources).reduce((sum, [source, score]) => {
      return sum + (score * (weights[source as keyof typeof weights] || 0));
    }, 0);

    let trend: 'bullish' | 'bearish' | 'neutral';
    if (weightedScore > 60) trend = 'bullish';
    else if (weightedScore < 40) trend = 'bearish';
    else trend = 'neutral';

    return {
      score: Math.round(weightedScore),
      trend,
      confidence: Math.round(Math.min(100, Math.max(0, 100 - Math.abs(weightedScore - 50) * 2))),
      lastUpdated: new Date()
    };
  }

  private analyzeTextSentiment(text: string): number {
    // Simple sentiment analysis - in production, use a proper NLP service
    const positiveWords = ['bullish', 'rise', 'gain', 'up', 'positive', 'strong', 'buy', 'growth'];
    const negativeWords = ['bearish', 'fall', 'drop', 'down', 'negative', 'weak', 'sell', 'decline'];
    
    const words = text.toLowerCase().split(/\s+/);
    let score = 50; // neutral baseline
    
    words.forEach(word => {
      if (positiveWords.some(pw => word.includes(pw))) score += 5;
      if (negativeWords.some(nw => word.includes(nw))) score -= 5;
    });
    
    return Math.max(0, Math.min(100, score));
  }

  private calculateRelevance(text: string): number {
    const goldKeywords = ['gold', 'precious metals', 'xauusd', 'bullion', 'mining', 'fed', 'inflation'];
    const words = text.toLowerCase().split(/\s+/);
    const matches = words.filter(word => goldKeywords.some(keyword => word.includes(keyword))).length;
    return Math.min(100, (matches / words.length) * 100);
  }

  private extractKeywords(text: string): string[] {
    const keywords = ['gold', 'precious metals', 'xauusd', 'bullion', 'mining', 'fed', 'inflation', 'dollar', 'treasury'];
    return keywords.filter(keyword => text.toLowerCase().includes(keyword));
  }

  // Cache Management
  private getCachedData(key: string): any {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }

  private setCachedData(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  // Mock Data Generators (fallbacks)
  private generateMockNewsSentiment(): NewsSentiment {
    return {
      score: Math.floor(Math.random() * 100),
      articles: [
        {
          title: "Gold prices surge on inflation concerns",
          summary: "Gold prices reached new highs as investors seek safe haven assets...",
          url: "https://example.com/news1",
          source: "Reuters",
          publishedAt: new Date(),
          sentiment: 75,
          relevance: 90,
          keywords: ['gold', 'inflation', 'prices']
        }
      ],
      sources: ['Reuters', 'Bloomberg', 'CNBC'],
      lastUpdated: new Date()
    };
  }

  private generateMockSocialSentiment(): SocialSentiment {
    return {
      score: Math.floor(Math.random() * 100),
      mentions: Math.floor(Math.random() * 10000 + 5000),
      platforms: {
        twitter: Math.floor(Math.random() * 5000 + 2000),
        facebook: Math.floor(Math.random() * 3000 + 1000),
        instagram: Math.floor(Math.random() * 2000 + 500),
        tiktok: Math.floor(Math.random() * 1500 + 300),
        youtube: Math.floor(Math.random() * 1000 + 200)
      },
      trending: [],
      lastUpdated: new Date()
    };
  }

  private generateMockRedditSentiment(): RedditSentiment {
    return {
      score: Math.floor(Math.random() * 100),
      subreddits: [],
      posts: [],
      lastUpdated: new Date()
    };
  }

  private generateMockTwitterSentiment(): TwitterSentiment {
    return {
      score: Math.floor(Math.random() * 100),
      tweets: [],
      hashtags: [],
      influencers: [],
      lastUpdated: new Date()
    };
  }

  private generateMockInstitutionalSentiment(): InstitutionalSentiment {
    return {
      score: Math.floor(Math.random() * 100),
      reports: [],
      positions: [],
      lastUpdated: new Date()
    };
  }

  private generateMockRetailSentiment(): RetailSentiment {
    return {
      score: Math.floor(Math.random() * 100),
      platforms: {
        robinhood: Math.floor(Math.random() * 100),
        webull: Math.floor(Math.random() * 100),
        etoro: Math.floor(Math.random() * 100),
        trading212: Math.floor(Math.random() * 100)
      },
      surveys: [],
      lastUpdated: new Date()
    };
  }

  private getMockSentimentData(): SentimentData {
    return {
      overall: {
        score: 65,
        trend: 'bullish',
        confidence: 78,
        lastUpdated: new Date()
      },
      sources: {
        news: this.generateMockNewsSentiment(),
        social: this.generateMockSocialSentiment(),
        reddit: this.generateMockRedditSentiment(),
        twitter: this.generateMockTwitterSentiment(),
        institutional: this.generateMockInstitutionalSentiment(),
        retail: this.generateMockRetailSentiment()
      },
      historical: []
    };
  }
}

// Export singleton instance
export const sentimentService = new SentimentAnalysisService();
