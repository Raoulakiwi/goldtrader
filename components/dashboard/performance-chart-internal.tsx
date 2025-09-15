"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface PerformanceChartInternalProps {
  data: Array<{ date: string; value: number }>
}

export default function PerformanceChartInternal({ data }: PerformanceChartInternalProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis 
          dataKey="date" 
          stroke="var(--muted-foreground)"
          tick={{ fill: 'var(--muted-foreground)' }}
        />
        <YAxis 
          stroke="var(--muted-foreground)"
          tick={{ fill: 'var(--muted-foreground)' }}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
        />
        <Tooltip 
          formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
          contentStyle={{ 
            backgroundColor: 'var(--card)',
            borderColor: 'var(--border)',
            color: 'var(--card-foreground)'
          }}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="value" 
          name="Portfolio Value"
          stroke="var(--primary)" 
          activeDot={{ r: 8 }}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
