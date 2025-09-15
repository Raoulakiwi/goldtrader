"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Newspaper, 
  Users, 
  MessageSquare, 
  Twitter, 
  Building2, 
  ShoppingCart,
  Activity,
  Globe,
  Calendar,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { sentimentService } from '@/lib/api/sentiment'
import { SentimentData } from '@/lib/types'

interface SentimentDashboardProps {
  className?: string
}

export default function SentimentDashboard({ className }: SentimentDashboardProps) {
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

  const getSentimentColor = (score: number) => {
    if (score > 60) return 'text-green-600 dark:text-green-400'
    if (score < 40) return 'text-red-600 dark:text-red-400'
    return 'text-amber-600 dark:text-amber-400'
  }

  const getSentimentBgColor = (score: number) => {
    if (score > 60) return 'bg-green-500'
    if (score < 40) return 'bg-red-500'
    return 'bg-amber-500'
  }

  const getSentimentIcon = (trend: string) => {
    switch (trend) {
      case 'bullish':
        return <TrendingUp className="h-5 w-5 text-green-500" />
      case 'bearish':
        return <TrendingDown className="h-5 w-5 text-red-500" />
      default:
        return <BarChart3 className="h-5 w-5 text-amber-500" />
    }
  }

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
      <div className={`space-y-6 ${className}`}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Market Sentiment Analysis</h2>
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Market Sentiment Analysis</h2>
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

  if (!sentimentData) return null

  return (
    <motion.div 
      ref={ref}
      className={`space-y-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <Activity className="mr-2 h-6 w-6 text-amber-500" />
            Market Sentiment Analysis
          </h2>
          {lastUpdated && (
            <p className="text-sm text-muted-foreground flex items-center mt-1">
              <Clock className="mr-1 h-3 w-3" />
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

      {/* Overall Sentiment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              {getSentimentIcon(sentimentData.overall.trend)}
              <span className="ml-2">Overall Market Sentiment</span>
            </span>
            <Badge variant={sentimentData.overall.trend === 'bullish' ? 'success' : sentimentData.overall.trend === 'bearish' ? 'destructive' : 'warning'}>
              {sentimentData.overall.trend.toUpperCase()}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getSentimentColor(sentimentData.overall.score)}`}>
                {sentimentData.overall.score}
              </div>
              <p className="text-sm text-muted-foreground">Sentiment Score</p>
              <Progress value={sentimentData.overall.score} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                {sentimentData.overall.confidence}%
              </div>
              <p className="text-sm text-muted-foreground">Confidence Level</p>
              <Progress value={sentimentData.overall.confidence} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                {sentimentData.sources.news.articles.length + 
                 sentimentData.sources.social.mentions + 
                 sentimentData.sources.reddit.posts.length + 
                 sentimentData.sources.twitter.tweets.length}
              </div>
              <p className="text-sm text-muted-foreground">Total Data Points</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Source Breakdown */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="news">News</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="reddit">Reddit</TabsTrigger>
          <TabsTrigger value="twitter">Twitter</TabsTrigger>
          <TabsTrigger value="institutional">Institutional</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* News Sentiment */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-sm">
                  <Newspaper className="mr-2 h-4 w-4 text-blue-500" />
                  News Sentiment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getSentimentColor(sentimentData.sources.news.score)}`}>
                  {sentimentData.sources.news.score}
                </div>
                <p className="text-xs text-muted-foreground">
                  {sentimentData.sources.news.articles.length} articles from {sentimentData.sources.news.sources.length} sources
                </p>
                <Progress value={sentimentData.sources.news.score} className="mt-2" />
              </CardContent>
            </Card>

            {/* Social Media Sentiment */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-sm">
                  <Users className="mr-2 h-4 w-4 text-green-500" />
                  Social Media
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getSentimentColor(sentimentData.sources.social.score)}`}>
                  {sentimentData.sources.social.score}
                </div>
                <p className="text-xs text-muted-foreground">
                  {sentimentData.sources.social.mentions.toLocaleString()} mentions
                </p>
                <Progress value={sentimentData.sources.social.score} className="mt-2" />
              </CardContent>
            </Card>

            {/* Reddit Sentiment */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-sm">
                  <MessageSquare className="mr-2 h-4 w-4 text-orange-500" />
                  Reddit Sentiment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getSentimentColor(sentimentData.sources.reddit.score)}`}>
                  {sentimentData.sources.reddit.score}
                </div>
                <p className="text-xs text-muted-foreground">
                  {sentimentData.sources.reddit.posts.length} posts across {sentimentData.sources.reddit.subreddits.length} subreddits
                </p>
                <Progress value={sentimentData.sources.reddit.score} className="mt-2" />
              </CardContent>
            </Card>

            {/* Twitter Sentiment */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-sm">
                  <Twitter className="mr-2 h-4 w-4 text-blue-400" />
                  Twitter Sentiment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getSentimentColor(sentimentData.sources.twitter.score)}`}>
                  {sentimentData.sources.twitter.score}
                </div>
                <p className="text-xs text-muted-foreground">
                  {sentimentData.sources.twitter.tweets.length} tweets, {sentimentData.sources.twitter.hashtags.length} hashtags
                </p>
                <Progress value={sentimentData.sources.twitter.score} className="mt-2" />
              </CardContent>
            </Card>

            {/* Institutional Sentiment */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-sm">
                  <Building2 className="mr-2 h-4 w-4 text-purple-500" />
                  Institutional
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getSentimentColor(sentimentData.sources.institutional.score)}`}>
                  {sentimentData.sources.institutional.score}
                </div>
                <p className="text-xs text-muted-foreground">
                  {sentimentData.sources.institutional.reports.length} reports, {sentimentData.sources.institutional.positions.length} positions
                </p>
                <Progress value={sentimentData.sources.institutional.score} className="mt-2" />
              </CardContent>
            </Card>

            {/* Retail Sentiment */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-sm">
                  <ShoppingCart className="mr-2 h-4 w-4 text-pink-500" />
                  Retail Sentiment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getSentimentColor(sentimentData.sources.retail.score)}`}>
                  {sentimentData.sources.retail.score}
                </div>
                <p className="text-xs text-muted-foreground">
                  {sentimentData.sources.retail.surveys.length} surveys across 4 platforms
                </p>
                <Progress value={sentimentData.sources.retail.score} className="mt-2" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="news" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Newspaper className="mr-2 h-5 w-5 text-blue-500" />
                Latest News Articles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sentimentData.sources.news.articles.slice(0, 5).map((article, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">{article.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{article.summary}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{article.source}</span>
                          <span>•</span>
                          <span>{formatTimeAgo(article.publishedAt)}</span>
                          <span>•</span>
                          <span>Relevance: {Math.round(article.relevance)}%</span>
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <Badge variant={article.sentiment > 60 ? 'success' : article.sentiment < 40 ? 'destructive' : 'warning'}>
                          {article.sentiment}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Platform Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(sentimentData.sources.social.platforms).map(([platform, mentions]) => (
                    <div key={platform} className="flex items-center justify-between">
                      <span className="text-sm capitalize">{platform}</span>
                      <span className="text-sm font-medium">{mentions.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Trending Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sentimentData.sources.social.trending.map((trend, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">#{trend.hashtag}</span>
                        <p className="text-xs text-muted-foreground">{trend.platform}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium">{trend.mentions}</span>
                        <p className="text-xs text-muted-foreground">+{trend.growth}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reddit" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Top Subreddits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sentimentData.sources.reddit.subreddits.slice(0, 5).map((subreddit, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">r/{subreddit.name}</span>
                        <p className="text-xs text-muted-foreground">
                          {subreddit.subscribers.toLocaleString()} subscribers
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={subreddit.sentiment > 60 ? 'success' : subreddit.sentiment < 40 ? 'destructive' : 'warning'}>
                          {subreddit.sentiment}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {subreddit.posts} posts
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Top Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sentimentData.sources.reddit.posts.slice(0, 3).map((post, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <h4 className="font-medium text-sm mb-1">{post.title}</h4>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>r/{post.subreddit}</span>
                        <div className="flex items-center gap-2">
                          <span>{post.score} ↑</span>
                          <span>{post.comments} 💬</span>
                          <Badge variant={post.sentiment > 60 ? 'success' : post.sentiment < 40 ? 'destructive' : 'warning'}>
                            {post.sentiment}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="twitter" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Top Tweets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sentimentData.sources.twitter.tweets.slice(0, 3).map((tweet, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <p className="text-sm mb-2">{tweet.text}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>@{tweet.author}</span>
                        <div className="flex items-center gap-2">
                          <span>{tweet.retweets} 🔄</span>
                          <span>{tweet.likes} ❤️</span>
                          <Badge variant={tweet.sentiment > 60 ? 'success' : tweet.sentiment < 40 ? 'destructive' : 'warning'}>
                            {tweet.sentiment}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Trending Hashtags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sentimentData.sources.twitter.hashtags.slice(0, 5).map((hashtag, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">#{hashtag.tag}</span>
                      <div className="text-right">
                        <span className="text-sm font-medium">{hashtag.mentions}</span>
                        <p className="text-xs text-muted-foreground">+{hashtag.trend}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="institutional" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Latest Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sentimentData.sources.institutional.reports.map((report, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <h4 className="font-medium text-sm mb-1">{report.title}</h4>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{report.institution}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant={report.recommendation === 'buy' ? 'success' : report.recommendation === 'sell' ? 'destructive' : 'warning'}>
                            {report.recommendation.toUpperCase()}
                          </Badge>
                          <span>{report.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Institutional Positions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sentimentData.sources.institutional.positions.map((position, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">{position.institution}</span>
                        <p className="text-xs text-muted-foreground">
                          {position.size.toLocaleString()} shares
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={position.position === 'long' ? 'success' : position.position === 'short' ? 'destructive' : 'warning'}>
                          {position.position.toUpperCase()}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {position.change > 0 ? '+' : ''}{position.change}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
