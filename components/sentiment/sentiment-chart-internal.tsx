"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts'
import { SentimentHistory } from '@/lib/types'

interface SentimentChartInternalProps {
  data: SentimentHistory[]
  chartType: 'line' | 'area' | 'bar'
  selectedSources: string[]
  sourceOptions: Array<{ value: string; label: string; color: string }>
}

export default function SentimentChartInternal({ 
  data, 
  chartType, 
  selectedSources, 
  sourceOptions 
}: SentimentChartInternalProps) {
  
  // Transform data for chart
  const chartData = data.map(item => {
    const transformed: any = {
      timestamp: item.timestamp,
      overall: item.score,
      news: item.sources.news,
      social: item.sources.social,
      reddit: item.sources.reddit,
      twitter: item.sources.twitter,
      institutional: item.sources.institutional,
      retail: item.sources.retail,
      // Format timestamp for display
      time: new Date(item.timestamp).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        ...(data.length > 7 ? {} : { hour: '2-digit', minute: '2-digit' })
      })
    }
    return transformed
  })

  const renderChart = () => {
    const commonProps = {
      data: chartData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    }

    switch (chartType) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis 
              dataKey="time" 
              stroke="var(--muted-foreground)"
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
            />
            <YAxis 
              stroke="var(--muted-foreground)"
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                color: 'var(--card-foreground)',
                borderRadius: '8px'
              }}
              formatter={(value: number, name: string) => [
                `${value}`, 
                sourceOptions.find(s => s.value === name)?.label || name
              ]}
            />
            <Legend />
            {selectedSources.map((source) => {
              const sourceConfig = sourceOptions.find(s => s.value === source)
              if (!sourceConfig) return null
              
              return (
                <Area
                  key={source}
                  type="monotone"
                  dataKey={source}
                  stackId="1"
                  stroke={sourceConfig.color}
                  fill={sourceConfig.color}
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              )
            })}
          </AreaChart>
        )

      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis 
              dataKey="time" 
              stroke="var(--muted-foreground)"
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
            />
            <YAxis 
              stroke="var(--muted-foreground)"
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                color: 'var(--card-foreground)',
                borderRadius: '8px'
              }}
              formatter={(value: number, name: string) => [
                `${value}`, 
                sourceOptions.find(s => s.value === name)?.label || name
              ]}
            />
            <Legend />
            {selectedSources.map((source) => {
              const sourceConfig = sourceOptions.find(s => s.value === source)
              if (!sourceConfig) return null
              
              return (
                <Bar
                  key={source}
                  dataKey={source}
                  fill={sourceConfig.color}
                  fillOpacity={0.8}
                />
              )
            })}
          </BarChart>
        )

      default: // line
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis 
              dataKey="time" 
              stroke="var(--muted-foreground)"
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
            />
            <YAxis 
              stroke="var(--muted-foreground)"
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                color: 'var(--card-foreground)',
                borderRadius: '8px'
              }}
              formatter={(value: number, name: string) => [
                `${value}`, 
                sourceOptions.find(s => s.value === name)?.label || name
              ]}
            />
            <Legend />
            {selectedSources.map((source) => {
              const sourceConfig = sourceOptions.find(s => s.value === source)
              if (!sourceConfig) return null
              
              return (
                <Line
                  key={source}
                  type="monotone"
                  dataKey={source}
                  stroke={sourceConfig.color}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              )
            })}
          </LineChart>
        )
    }
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      {renderChart()}
    </ResponsiveContainer>
  )
}
