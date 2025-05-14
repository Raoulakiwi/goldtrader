"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { BarChart2, BrainCircuit, LineChart, MessageSquare } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data for analysis summary
const analysisSummary = {
  technical: {
    recommendation: "BUY",
    confidence: 75,
    keyIndicators: [
      { name: "Moving Averages", signal: "Bullish" },
      { name: "RSI", signal: "Neutral" },
      { name: "MACD", signal: "Bullish" },
    ],
  },
  fundamental: {
    recommendation: "NEUTRAL",
    confidence: 60,
    keyFactors: [
      { name: "Inflation", impact: "Positive" },
      { name: "Interest Rates", impact: "Negative" },
      { name: "USD Strength", impact: "Negative" },
    ],
  },
  sentiment: {
    recommendation: "STRONG_BUY",
    confidence: 85,
    sources: [
      { name: "Social Media", sentiment: "Bullish" },
      { name: "News Analysis", sentiment: "Very Bullish" },
      { name: "Market Positioning", sentiment: "Bullish" },
    ],
  },
  combined: {
    recommendation: "BUY",
    confidence: 70,
  },
}

export function AnalysisSummary() {
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

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-success";
    if (confidence >= 60) return "text-success/80";
    if (confidence >= 40) return "text-warning";
    if (confidence >= 20) return "text-destructive/80";
    return "text-destructive";
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
            <BrainCircuit className="h-5 w-5 text-primary" />
            XAUUSD Analysis Summary
          </CardTitle>
          <Badge variant="gold">Gold</Badge>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="p-4 rounded-md bg-card border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <LineChart className="h-4 w-4 text-primary" />
                  <h3 className="font-medium">Technical Analysis</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className={getRecommendationColor(analysisSummary.technical.recommendation)}>
                    {analysisSummary.technical.recommendation.replace("_", " ")}
                  </span>
                  <span className={`text-sm ${getConfidenceColor(analysisSummary.technical.confidence)}`}>
                    ({analysisSummary.technical.confidence}%)
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                {analysisSummary.technical.keyIndicators.map((indicator, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{indicator.name}</span>
                    <span className={indicator.signal === "Bullish" ? "text-success" : indicator.signal === "Bearish" ? "text-destructive" : "text-muted-foreground"}>
                      {indicator.signal}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="p-4 rounded-md bg-card border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <BarChart2 className="h-4 w-4 text-info" />
                  <h3 className="font-medium">Fundamental Analysis</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className={getRecommendationColor(analysisSummary.fundamental.recommendation)}>
                    {analysisSummary.fundamental.recommendation.replace("_", " ")}
                  </span>
                  <span className={`text-sm ${getConfidenceColor(analysisSummary.fundamental.confidence)}`}>
                    ({analysisSummary.fundamental.confidence}%)
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                {analysisSummary.fundamental.keyFactors.map((factor, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{factor.name}</span>
                    <span className={factor.impact === "Positive" ? "text-success" : factor.impact === "Negative" ? "text-destructive" : "text-muted-foreground"}>
                      {factor.impact}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="p-4 rounded-md bg-card border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-warning" />
                  <h3 className="font-medium">Sentiment Analysis</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className={getRecommendationColor(analysisSummary.sentiment.recommendation)}>
                    {analysisSummary.sentiment.recommendation.replace("_", " ")}
                  </span>
                  <span className={`text-sm ${getConfidenceColor(analysisSummary.sentiment.confidence)}`}>
                    ({analysisSummary.sentiment.confidence}%)
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                {analysisSummary.sentiment.sources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{source.name}</span>
                    <span className={source.sentiment.includes("Bullish") ? "text-success" : source.sentiment.includes("Bearish") ? "text-destructive" : "text-muted-foreground"}>
                      {source.sentiment}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="p-4 rounded-md bg-card border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-4 w-4 text-gold" />
                  <h3 className="font-medium">Combined Analysis</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className={getRecommendationColor(analysisSummary.combined.recommendation)}>
                    {analysisSummary.combined.recommendation.replace("_", " ")}
                  </span>
                  <span className={`text-sm ${getConfidenceColor(analysisSummary.combined.confidence)}`}>
                    ({analysisSummary.combined.confidence}%)
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${analysisSummary.combined.confidence}%` }}
                  ></div>
                </div>
              </div>
              <div className="mt-4 text-sm text-center text-muted-foreground">
                Based on weighted analysis of technical, fundamental, and sentiment factors
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}