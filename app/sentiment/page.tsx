"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  TrendingUp, 
  BarChart3, 
  Newspaper, 
  Users, 
  MessageSquare, 
  Twitter,
  Globe,
  Activity,
  RefreshCw,
  AlertCircle
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SentimentDashboard from '@/components/sentiment/sentiment-dashboard'
import SentimentChart from '@/components/sentiment/sentiment-chart'
import SentimentNewsFeed from '@/components/sentiment/sentiment-news-feed'
import SentimentAnalysis from '@/components/ui/sentiment-analysis'
import { sentimentService } from '@/lib/api/sentiment'
import { SentimentData } from '@/lib/types'

export default function SentimentPage() {
  const [sentimentData, setSentimentData] = useState<SentimentData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const fetchSentimentData = async (showRefresh = false) => {
    try {
      if (showRefresh) setRefreshing(true)
      else setIsLoading(true)
      
      setError(null)
      const data = await sentimentService.getComprehensiveSentiment()
      setSentimentData(data)
      setLastUpdated(new Date())
    } catch (err) {
      setError('Failed to fetch sentiment data. Please try again.')
      console.error('Error fetching sentiment data:', err)
    } finally {
      setIsLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchSentimentData()
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      fetchSentimentData(true)
    }, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    
    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  if (isLoading && !sentimentData) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Market Sentiment Analysis</h1>
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Market Sentiment Analysis</h1>
          <Button onClick={() => fetchSentimentData()} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <motion.div 
      ref={ref}
      className="container mx-auto px-4 py-8 space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Activity className="mr-3 h-8 w-8 text-amber-500" />
            Market Sentiment Analysis
          </h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive sentiment analysis from news, social media, Reddit, Twitter, institutional reports, and retail data
          </p>
          {lastUpdated && (
            <p className="text-sm text-muted-foreground mt-1">
              Last updated: {formatTimeAgo(lastUpdated)}
            </p>
          )}
        </div>
        <Button 
          onClick={() => fetchSentimentData(true)} 
          variant="outline" 
          size="sm"
          disabled={refreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Quick Stats */}
      {sentimentData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-sm">
                <TrendingUp className="mr-2 h-4 w-4 text-green-500" />
                Overall Sentiment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {sentimentData.overall.score}
              </div>
              <p className="text-xs text-muted-foreground capitalize">
                {sentimentData.overall.trend} • {sentimentData.overall.confidence}% confidence
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-sm">
                <Newspaper className="mr-2 h-4 w-4 text-blue-500" />
                News Articles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {sentimentData.sources.news.articles.length}
              </div>
              <p className="text-xs text-muted-foreground">
                {sentimentData.sources.news.sources.length} sources
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-sm">
                <Users className="mr-2 h-4 w-4 text-green-500" />
                Social Mentions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {sentimentData.sources.social.mentions.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Across {Object.keys(sentimentData.sources.social.platforms).length} platforms
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-sm">
                <MessageSquare className="mr-2 h-4 w-4 text-orange-500" />
                Reddit Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {sentimentData.sources.reddit.posts.length}
              </div>
              <p className="text-xs text-muted-foreground">
                {sentimentData.sources.reddit.subreddits.length} subreddits
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="news">News Feed</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <SentimentDashboard />
        </TabsContent>

        <TabsContent value="charts" className="space-y-6">
          <SentimentChart />
        </TabsContent>

        <TabsContent value="news" className="space-y-6">
          <SentimentNewsFeed />
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <SentimentAnalysis data={sentimentData} isLoading={isLoading} />
        </TabsContent>
      </Tabs>

      {/* Data Sources Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="mr-2 h-5 w-5 text-blue-500" />
            Data Sources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium flex items-center">
                <Newspaper className="mr-2 h-4 w-4 text-blue-500" />
                News Sources
              </h4>
              <p className="text-sm text-muted-foreground">
                Reuters, Bloomberg, CNBC, MarketWatch, Investing.com, Kitco, World Gold Council, and more
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium flex items-center">
                <Twitter className="mr-2 h-4 w-4 text-blue-400" />
                Social Media
              </h4>
              <p className="text-sm text-muted-foreground">
                Twitter, Facebook, Instagram, TikTok, YouTube mentions and sentiment analysis
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium flex items-center">
                <MessageSquare className="mr-2 h-4 w-4 text-orange-500" />
                Reddit Communities
              </h4>
              <p className="text-sm text-muted-foreground">
                r/Gold, r/Silverbugs, r/investing, r/stocks, r/SecurityAnalysis, and more
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium flex items-center">
                <BarChart3 className="mr-2 h-4 w-4 text-purple-500" />
                Institutional Data
              </h4>
              <p className="text-sm text-muted-foreground">
                Goldman Sachs, JP Morgan, BlackRock, Vanguard reports and positions
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium flex items-center">
                <Users className="mr-2 h-4 w-4 text-pink-500" />
                Retail Platforms
              </h4>
              <p className="text-sm text-muted-foreground">
                Robinhood, Webull, eToro, Trading212 sentiment and survey data
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium flex items-center">
                <Activity className="mr-2 h-4 w-4 text-green-500" />
                Real-time Updates
              </h4>
              <p className="text-sm text-muted-foreground">
                Data refreshes every 5 minutes with historical tracking and trend analysis
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
