"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Newspaper, 
  ExternalLink, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  BarChart3,
  Filter,
  Search,
  RefreshCw,
  AlertCircle
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { sentimentService } from '@/lib/api/sentiment'
import { NewsArticle } from '@/lib/types'

interface SentimentNewsFeedProps {
  className?: string
}

type SortBy = 'relevance' | 'sentiment' | 'date'
type FilterBy = 'all' | 'positive' | 'negative' | 'neutral'

export default function SentimentNewsFeed({ className }: SentimentNewsFeedProps) {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortBy>('relevance')
  const [filterBy, setFilterBy] = useState<FilterBy>('all')
  const [refreshing, setRefreshing] = useState(false)

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async (showRefresh = false) => {
    try {
      if (showRefresh) setRefreshing(true)
      else setIsLoading(true)
      
      setError(null)
      const data = await sentimentService.getComprehensiveSentiment()
      setArticles(data.sources.news.articles)
    } catch (err) {
      setError('Failed to fetch news articles. Please try again.')
      console.error('Error fetching news:', err)
    } finally {
      setIsLoading(false)
      setRefreshing(false)
    }
  }

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 60) return 'text-green-600 dark:text-green-400'
    if (sentiment < 40) return 'text-red-600 dark:text-red-400'
    return 'text-amber-600 dark:text-amber-400'
  }

  const getSentimentBadgeVariant = (sentiment: number) => {
    if (sentiment > 60) return 'success' as const
    if (sentiment < 40) return 'destructive' as const
    return 'warning' as const
  }

  const getSentimentIcon = (sentiment: number) => {
    if (sentiment > 60) return <TrendingUp className="h-3 w-3" />
    if (sentiment < 40) return <TrendingDown className="h-3 w-3" />
    return <BarChart3 className="h-3 w-3" />
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

  const filteredAndSortedArticles = articles
    .filter(article => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        if (!article.title.toLowerCase().includes(query) && 
            !article.summary.toLowerCase().includes(query) &&
            !article.keywords.some(keyword => keyword.toLowerCase().includes(query))) {
          return false
        }
      }

      // Sentiment filter
      if (filterBy === 'positive' && article.sentiment <= 60) return false
      if (filterBy === 'negative' && article.sentiment >= 40) return false
      if (filterBy === 'neutral' && (article.sentiment > 60 || article.sentiment < 40)) return false

      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'relevance':
          return b.relevance - a.relevance
        case 'sentiment':
          return Math.abs(b.sentiment - 50) - Math.abs(a.sentiment - 50)
        case 'date':
          return b.publishedAt.getTime() - a.publishedAt.getTime()
        default:
          return 0
      }
    })

  if (isLoading && articles.length === 0) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">News Sentiment Feed</h2>
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">News Sentiment Feed</h2>
          <Button onClick={() => fetchNews()} variant="outline" size="sm">
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
      className={`space-y-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center">
          <Newspaper className="mr-2 h-6 w-6 text-blue-500" />
          News Sentiment Feed
        </h2>
        <Button 
          onClick={() => fetchNews(true)} 
          variant="outline" 
          size="sm"
          disabled={refreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={(value: SortBy) => setSortBy(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="sentiment">Sentiment</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterBy} onValueChange={(value: FilterBy) => setFilterBy(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="positive">Positive</SelectItem>
                  <SelectItem value="negative">Negative</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Articles */}
      <div className="space-y-4">
        {filteredAndSortedArticles.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Newspaper className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No articles found</h3>
                <p className="text-muted-foreground">
                  {searchQuery ? 'Try adjusting your search terms or filters.' : 'No news articles available at the moment.'}
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredAndSortedArticles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {article.source}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {formatTimeAgo(article.publishedAt)}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Filter className="h-3 w-3" />
                          {Math.round(article.relevance)}% relevant
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
                        {article.summary}
                      </p>
                      
                      <div className="flex items-center gap-2 flex-wrap">
                        {article.keywords.slice(0, 3).map((keyword, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                        {article.keywords.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{article.keywords.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-3">
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getSentimentColor(article.sentiment)}`}>
                          {article.sentiment}
                        </div>
                        <p className="text-xs text-muted-foreground">Sentiment</p>
                      </div>
                      
                      <Badge 
                        variant={getSentimentBadgeVariant(article.sentiment)}
                        className="flex items-center gap-1"
                      >
                        {getSentimentIcon(article.sentiment)}
                        {article.sentiment > 60 ? 'Positive' : article.sentiment < 40 ? 'Negative' : 'Neutral'}
                      </Badge>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(article.url, '_blank')}
                        className="flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Read
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Load More */}
      {filteredAndSortedArticles.length > 0 && (
        <div className="text-center">
          <Button variant="outline" onClick={() => fetchNews(true)}>
            Load More Articles
          </Button>
        </div>
      )}
    </motion.div>
  )
}
