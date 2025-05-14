"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Activity, ArrowRight, Cpu, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Mock data for recent strategies
const recentStrategies = [
  {
    id: "1",
    name: "Gold Breakout Strategy",
    type: "BREAKOUT",
    instrument: "XAUUSD",
    performance: 8.5,
    isActive: true,
  },
  {
    id: "2",
    name: "EUR/USD Trend Following",
    type: "TREND_FOLLOWING",
    instrument: "EURUSD",
    performance: -2.3,
    isActive: false,
  },
  {
    id: "3",
    name: "S&P 500 Volatility Strategy",
    type: "VOLATILITY_BASED",
    instrument: "US500",
    performance: 5.7,
    isActive: true,
  },
]

export function RecentStrategies() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const getStrategyIcon = (type: string) => {
    switch (type) {
      case "TREND_FOLLOWING":
        return <TrendingUp className="h-4 w-4" />;
      case "BREAKOUT":
        return <ArrowRight className="h-4 w-4" />;
      case "VOLATILITY_BASED":
        return <Activity className="h-4 w-4" />;
      default:
        return <Cpu className="h-4 w-4" />;
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
            <Cpu className="h-5 w-5 text-primary" />
            Recent Strategies
          </CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <a href="/strategies/browse">View All</a>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentStrategies.map((strategy, index) => (
              <motion.div
                key={strategy.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-md bg-card border border-border hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    {getStrategyIcon(strategy.type)}
                  </div>
                  <div>
                    <h3 className="font-medium">{strategy.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{strategy.instrument}</span>
                      <span>•</span>
                      <span>{strategy.type.replace("_", " ")}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`font-medium ${strategy.performance >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {strategy.performance >= 0 ? '+' : ''}{strategy.performance}%
                  </span>
                  <Badge variant={strategy.isActive ? "success" : "secondary"}>
                    {strategy.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}