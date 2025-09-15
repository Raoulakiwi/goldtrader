export type Expense = {
  id: string
  amount: number
  category: string
  description: string
  date: Date
}

export type ExpenseFormData = Omit<Expense, 'id' | 'date'> & {
  date: string
}

export const EXPENSE_CATEGORIES = [
  'Food',
  'Transportation',
  'Housing',
  'Utilities',
  'Entertainment',
  'Healthcare',
  'Shopping',
  'Education',
  'Other'
] as const

export type DateRange = {
  from: Date | undefined
  to: Date | undefined
}

// Sentiment Analysis Types
export interface SentimentData {
  overall: {
    score: number; // -100 to 100
    trend: 'bullish' | 'bearish' | 'neutral';
    confidence: number; // 0 to 100
    lastUpdated: Date;
  };
  sources: {
    news: NewsSentiment;
    social: SocialSentiment;
    reddit: RedditSentiment;
    twitter: TwitterSentiment;
    institutional: InstitutionalSentiment;
    retail: RetailSentiment;
  };
  historical: SentimentHistory[];
}

export interface NewsSentiment {
  score: number;
  articles: NewsArticle[];
  sources: string[];
  lastUpdated: Date;
}

export interface NewsArticle {
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: Date;
  sentiment: number;
  relevance: number;
  keywords: string[];
}

export interface SocialSentiment {
  score: number;
  mentions: number;
  platforms: {
    twitter: number;
    facebook: number;
    instagram: number;
    tiktok: number;
    youtube: number;
  };
  trending: SocialTrend[];
  lastUpdated: Date;
}

export interface SocialTrend {
  platform: string;
  hashtag: string;
  mentions: number;
  sentiment: number;
  growth: number;
}

export interface RedditSentiment {
  score: number;
  subreddits: RedditSubreddit[];
  posts: RedditPost[];
  lastUpdated: Date;
}

export interface RedditSubreddit {
  name: string;
  sentiment: number;
  posts: number;
  comments: number;
  subscribers: number;
}

export interface RedditPost {
  title: string;
  content: string;
  subreddit: string;
  score: number;
  comments: number;
  sentiment: number;
  url: string;
  createdAt: Date;
}

export interface TwitterSentiment {
  score: number;
  tweets: TwitterTweet[];
  hashtags: TwitterHashtag[];
  influencers: TwitterInfluencer[];
  lastUpdated: Date;
}

export interface TwitterTweet {
  id: string;
  text: string;
  author: string;
  followers: number;
  sentiment: number;
  retweets: number;
  likes: number;
  createdAt: Date;
}

export interface TwitterHashtag {
  tag: string;
  mentions: number;
  sentiment: number;
  trend: number;
}

export interface TwitterInfluencer {
  username: string;
  followers: number;
  sentiment: number;
  influence: number;
  recentTweets: number;
}

export interface InstitutionalSentiment {
  score: number;
  reports: InstitutionalReport[];
  positions: InstitutionalPosition[];
  lastUpdated: Date;
}

export interface InstitutionalReport {
  institution: string;
  title: string;
  recommendation: 'buy' | 'sell' | 'hold';
  targetPrice?: number;
  confidence: number;
  publishedAt: Date;
  url?: string;
}

export interface InstitutionalPosition {
  institution: string;
  position: 'long' | 'short' | 'neutral';
  size: number;
  change: number;
  lastUpdated: Date;
}

export interface RetailSentiment {
  score: number;
  platforms: {
    robinhood: number;
    webull: number;
    etoro: number;
    trading212: number;
  };
  surveys: RetailSurvey[];
  lastUpdated: Date;
}

export interface RetailSurvey {
  source: string;
  bullish: number;
  bearish: number;
  neutral: number;
  sampleSize: number;
  conductedAt: Date;
}

export interface SentimentHistory {
  timestamp: Date;
  score: number;
  sources: {
    news: number;
    social: number;
    reddit: number;
    twitter: number;
    institutional: number;
    retail: number;
  };
}