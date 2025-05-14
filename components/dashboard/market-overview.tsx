"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowDown, ArrowUp, BarChart2, LineChart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for the market overview
const marketData = {
  forex: [
    { symbol: "EUR/USD", price: 1.0921, change: 0.15, recommendation: "BUY" },
    { symbol: "GBP/USD", price: 1.2654, change: -0.22, recommendation: "SELL" },
    { symbol: "USD/JPY", price: 151.43, change: 0.31, recommendation: "STRONG_BUY" },
    { symbol: "AUD/USD", price: 0.6587, change: -0.18, recommendation: "NEUTRAL" },
  ],
  cfd: [
    { symbol: "XAUUSD", price: 2324.56, change: 0.85, recommendation: "STRONG_BUY" },
    { symbol: "XAGUSD", price: 27.32, change: 0.42, recommendation: "BUY" },
    { symbol: "US30", price: 38245.67, change: -0.35, recommendation: "NEUTRAL" },
    { symbol: "US500", price: 5123.45, change: -0.28, recommendation: "SELL" },
  ],
  crypto: [
    { symbol: "BTC/USD", price: 61245.78, change: 2.35, recommendation: "BUY" },
    { symbol: "ETH/USD", price: 3456.89, change: 1.87, recommendation: "BUY" },
    { symbol: "XRP/USD", price: 0.5432, change: -1.23, recommendation: "SELL" },
    { symbol: "SOL/USD", price: 143.21, change: 3.45, recommendation: "STRONG_BUY" },
  ],
}

export function MarketOverview() {
  const [activeTab, setActiveTab] = useState("forex")
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case "STRONG_BUY":
        return "text-success";
      case "BUY":
        return "text-success/80";
      case "NEUTRAL":
        return "text-muted-foreground";
      case "SELL":
        return "text-destructive/80";
      case "STRONG_SELL":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  }

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
            <BarChart2 className="h-5 w-5 text-primary" />
            Market Overview
          </CardTitle>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="forex" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="forex" className="flex items-center gap-1">
                <LineChart className="h-4 w-4" />
                Forex
              </TabsTrigger>
              <TabsTrigger value="cfd" className="flex items-center gap-1">
                <BarChart2 className="h-4 w-4" />
                CFDs
              </TabsTrigger>
              <TabsTrigger value="crypto" className="flex items-center gap-1">
                <LineChart className="h-4 w-4" />
                Crypto
              </TabsTrigger>
            </TabsList>
            
            {Object.entries(marketData).map(([key, instruments]) => (
              <TabsContent key={key} value={key} className="space-y-0">
                <div className="grid grid-cols-1 gap-2">
                  {instruments.map((instrument, index) => (
                    <motion.div
                      key={instrument.symbol}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <Badge variant={key === "cfd" ? "gold" : key === "crypto" ? "warning" : "default"} className="w-20 justify-center">
                          {instrument.symbol}
                        </Badge>
                        <span className="font-medium">${instrument.price.toFixed(key === "crypto" && instrument.price < 1 ? 4 : 2)}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className={`flex items-center ${instrument.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                          {instrument.change >= 0 ? (
                            <ArrowUp className="h-3 w-3 mr-1" />
                          ) : (
                            <ArrowDown className="h-3 w-3 mr-1" />
                          )}
                          <span>{Math.abs(instrument.change).toFixed(2)}%</span>
                        </div>
                        <span className={getRecommendationColor(instrument.recommendation)}>
                          {instrument.recommendation.replace("_", " ")}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}