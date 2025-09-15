"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { LineChart, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import dynamic from "next/dynamic"

const DynamicChart = dynamic(
  () => import("./performance-chart-internal"),
  { ssr: false, loading: () => <div className="h-[300px] w-full flex items-center justify-center">Loading chart...</div> }
)

// Mock data for the performance chart
const performanceData = {
  "1W": [
    { date: "Mon", value: 10000 },
    { date: "Tue", value: 10120 },
    { date: "Wed", value: 10050 },
    { date: "Thu", value: 10200 },
    { date: "Fri", value: 10350 },
    { date: "Sat", value: 10380 },
    { date: "Sun", value: 10450 },
  ],
  "1M": [
    { date: "Week 1", value: 10000 },
    { date: "Week 2", value: 10250 },
    { date: "Week 3", value: 10180 },
    { date: "Week 4", value: 10450 },
  ],
  "3M": [
    { date: "Jan", value: 10000 },
    { date: "Feb", value: 10350 },
    { date: "Mar", value: 10750 },
  ],
  "1Y": [
    { date: "Q1", value: 10000 },
    { date: "Q2", value: 10450 },
    { date: "Q3", value: 10850 },
    { date: "Q4", value: 11200 },
  ],
}

export function PerformanceChart() {
  const [activeTab, setActiveTab] = useState("1W")
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const data = performanceData[activeTab as keyof typeof performanceData]
  const initialValue = data[0].value
  const currentValue = data[data.length - 1].value
  const percentChange = ((currentValue - initialValue) / initialValue) * 100

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-medium flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Portfolio Performance
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${percentChange >= 0 ? 'text-success' : 'text-destructive'}`}>
              {percentChange >= 0 ? '+' : ''}{percentChange.toFixed(2)}%
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="1W" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="1W">1W</TabsTrigger>
              <TabsTrigger value="1M">1M</TabsTrigger>
              <TabsTrigger value="3M">3M</TabsTrigger>
              <TabsTrigger value="1Y">1Y</TabsTrigger>
            </TabsList>
            
            {Object.keys(performanceData).map((key) => (
              <TabsContent key={key} value={key} className="h-[300px]">
                <DynamicChart data={performanceData[key as keyof typeof performanceData]} />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}