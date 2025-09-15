"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { TrendingUp, TrendingDown, BarChart3, Calendar, Filter } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { sentimentService } from '@/lib/api/sentiment'
import { SentimentHistory } from '@/lib/types'
import dynamic from 'next/dynamic'

// Dynamically import chart components to avoid SSR issues
const SentimentChartInternal = dynamic(
  () => import('./sentiment-chart-internal'),
  { ssr: false, loading: () => <div className="h-[400px] w-full flex items-center justify-center">Loading chart...</div> }
)

interface SentimentChartProps {
  className?: string
}

type TimeRange = '1D' | '7D' | '30D' | '90D'
type ChartType = 'line' | 'area' | 'bar'

export default function SentimentChart({ className }: SentimentChartProps) {
  const [historicalData, setHistoricalData] = useState<SentimentHistory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<TimeRange>('30D')
  const [chartType, setChartType] = useState<ChartType>('line')
  const [selectedSources, setSelectedSources] = useState<string[]>(['overall', 'news', 'social', 'reddit', 'twitter', 'institutional', 'retail'])

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const sourceOptions = [
    { value: 'overall', label: 'Overall', color: '#8B5CF6' },
    { value: 'news', label: 'News', color: '#3B82F6' },
    { value: 'social', label: 'Social', color: '#10B981' },
    { value: 'reddit', label: 'Reddit', color: '#F59E0B' },
    { value: 'twitter', label: 'Twitter', color: '#06B6D4' },
    { value: 'institutional', label: 'Institutional', color: '#8B5CF6' },
    { value: 'retail', label: 'Retail', color: '#EC4899' }
  ]

  useEffect(() => {
    fetchHistoricalData()
  }, [timeRange])

  const fetchHistoricalData = async () => {
    try {
      setIsLoading(true)
      const data = await sentimentService.getComprehensiveSentiment()
      setHistoricalData(data.historical)
    } catch (error) {
      console.error('Error fetching historical data:', error)
      // Generate mock historical data
      setHistoricalData(generateMockHistoricalData())
    } finally {
      setIsLoading(false)
    }
  }

  const generateMockHistoricalData = (): SentimentHistory[] => {
    const data: SentimentHistory[] = []
    const now = new Date()
    const days = timeRange === '1D' ? 1 : timeRange === '7D' ? 7 : timeRange === '30D' ? 30 : 90
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      const baseScore = 50 + Math.sin(i * 0.1) * 20 + Math.random() * 10 - 5
      
      data.push({
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
      })
    }
    
    return data
  }

  const getTimeRangeLabel = () => {
    switch (timeRange) {
      case '1D': return 'Last 24 Hours'
      case '7D': return 'Last 7 Days'
      case '30D': return 'Last 30 Days'
      case '90D': return 'Last 90 Days'
      default: return 'Last 30 Days'
    }
  }

  const getSentimentTrend = () => {
    if (historicalData.length < 2) return { trend: 'neutral', change: 0 }
    
    const latest = historicalData[historicalData.length - 1]
    const previous = historicalData[historicalData.length - 2]
    const change = latest.score - previous.score
    
    if (change > 5) return { trend: 'bullish', change }
    if (change < -5) return { trend: 'bearish', change }
    return { trend: 'neutral', change }
  }

  const toggleSource = (source: string) => {
    setSelectedSources(prev => 
      prev.includes(source) 
        ? prev.filter(s => s !== source)
        : [...prev, source]
    )
  }

  const trend = getSentimentTrend()

  return (
    <motion.div 
      ref={ref}
      className={`space-y-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-amber-500" />
              Sentiment Trends
            </CardTitle>
            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={(value: TimeRange) => setTimeRange(value)}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1D">1D</SelectItem>
                  <SelectItem value="7D">7D</SelectItem>
                  <SelectItem value="30D">30D</SelectItem>
                  <SelectItem value="90D">90D</SelectItem>
                </SelectContent>
              </Select>
              <Select value={chartType} onValueChange={(value: ChartType) => setChartType(value)}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="line">Line</SelectItem>
                  <SelectItem value="area">Area</SelectItem>
                  <SelectItem value="bar">Bar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Trend Summary */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              {trend.trend === 'bullish' ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : trend.trend === 'bearish' ? (
                <TrendingDown className="h-4 w-4 text-red-500" />
              ) : (
                <BarChart3 className="h-4 w-4 text-amber-500" />
              )}
              <span className="text-sm font-medium capitalize">{trend.trend}</span>
              <Badge variant={trend.trend === 'bullish' ? 'success' : trend.trend === 'bearish' ? 'destructive' : 'warning'}>
                {trend.change > 0 ? '+' : ''}{trend.change.toFixed(1)}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              {getTimeRangeLabel()}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Source Filter */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Data Sources:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {sourceOptions.map((source) => (
                <Button
                  key={source.value}
                  variant={selectedSources.includes(source.value) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleSource(source.value)}
                  className="h-8"
                >
                  <div 
                    className="w-2 h-2 rounded-full mr-2" 
                    style={{ backgroundColor: source.color }}
                  />
                  {source.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="h-[400px]">
            {isLoading ? (
              <div className="h-full w-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
              </div>
            ) : (
              <SentimentChartInternal 
                data={historicalData}
                chartType={chartType}
                selectedSources={selectedSources}
                sourceOptions={sourceOptions}
              />
            )}
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {historicalData.length > 0 ? historicalData[historicalData.length - 1].score : 0}
              </div>
              <p className="text-xs text-muted-foreground">Current Score</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {historicalData.length > 0 ? Math.max(...historicalData.map(d => d.score)) : 0}
              </div>
              <p className="text-xs text-muted-foreground">Highest Score</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {historicalData.length > 0 ? Math.min(...historicalData.map(d => d.score)) : 0}
              </div>
              <p className="text-xs text-muted-foreground">Lowest Score</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {historicalData.length > 0 ? 
                  Math.round(historicalData.reduce((sum, d) => sum + d.score, 0) / historicalData.length) : 0
                }
              </div>
              <p className="text-xs text-muted-foreground">Average Score</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
