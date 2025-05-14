"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { 
  BarChart2, 
  BookOpen, 
  ChevronRight, 
  CreditCard, 
  Database, 
  FileText, 
  LineChart, 
  Search 
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ResearchPage() {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const [icMarketsRef, icMarketsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const [goldAnalysisRef, goldAnalysisInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Research</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mb-8">
            Explore our comprehensive research on trading platforms, instruments, and analysis methodologies.
          </p>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search research documents..."
              className="w-full rounded-md border border-input bg-background py-3 pl-10 pr-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
        </motion.div>

        {/* IC Markets API Research */}
        <motion.section
          ref={icMarketsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={icMarketsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">IC Markets API Research</h2>
            <Button variant="outline" size="sm" asChild>
              <Link href="/research/ic-markets">
                View Full Research
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 card-hover">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <CardTitle>IC Markets API Overview</CardTitle>
                </div>
                <CardDescription>
                  Comprehensive overview of IC Markets API solutions for traders and developers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  IC Markets offers several API solutions for traders and developers to connect to their trading infrastructure, including FIX API, cTrader Open API, and MetaTrader 4/5 API.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-card p-4 rounded-lg border border-border">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <Database className="h-4 w-4 text-primary" />
                      FIX API
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Industry-standard FIX 4.4 protocol for sophisticated electronic trading with direct market access.
                    </p>
                  </div>
                  
                  <div className="bg-card p-4 rounded-lg border border-border">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <Database className="h-4 w-4 text-primary" />
                      cTrader Open API
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Flexible solution for trading automation with support for JSON and Protocol Buffers.
                    </p>
                  </div>
                  
                  <div className="bg-card p-4 rounded-lg border border-border">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <Database className="h-4 w-4 text-primary" />
                      MetaTrader API
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Standard MT4/MT5 APIs for developing Expert Advisors, custom indicators, and scripts.
                    </p>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/research/ic-markets#authentication">
                      Authentication Methods
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="ml-2" asChild>
                    <Link href="/research/ic-markets#endpoints">
                      API Endpoints
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-gold" />
                  <CardTitle>Gold CFD Specifications</CardTitle>
                </div>
                <CardDescription>
                  Detailed specifications for trading Gold CFDs on IC Markets
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Contract Size:</span>
                    <span className="font-medium">100 oz (standard)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Min Lot Size:</span>
                    <span className="font-medium">0.01 (1 oz)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Max Lot Size:</span>
                    <span className="font-medium">100 (10,000 oz)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Spreads:</span>
                    <span className="font-medium">From 0.00 pips</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg Spread:</span>
                    <span className="font-medium">0.63 pips</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Max Leverage:</span>
                    <span className="font-medium">Up to 1:500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Trading Hours:</span>
                    <span className="font-medium">01:02 - 23:59</span>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/research/ic-markets#gold-specifications">
                    View Full Specifications
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Gold Analysis Methodologies */}
        <motion.section
          ref={goldAnalysisRef}
          initial={{ opacity: 0, y: 20 }}
          animate={goldAnalysisInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Gold Trading Analysis Methodologies</h2>
            <Button variant="outline" size="sm" asChild>
              <Link href="/research/gold-analysis">
                View Full Research
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="card-hover">
              <div className="aspect-video relative">
                <Image 
                  src="https://www.sunshineprofits.com/media/cms_page_media/2020/1/16/gold-analysis.png" 
                  alt="Gold technical analysis" 
                  fill
                  className="object-cover rounded-t-lg"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="gold">Technical Analysis</Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-primary" />
                  <CardTitle>Technical Analysis for Gold</CardTitle>
                </div>
                <CardDescription>
                  Key technical indicators and chart patterns for analyzing gold price movements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Gold has unique characteristics as a tradeable asset, and certain technical indicators have proven particularly effective for analyzing its price movements.
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <BarChart2 className="h-4 w-4 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium text-sm">Moving Averages</h4>
                      <p className="text-xs text-muted-foreground">50-day and 200-day periods</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <BarChart2 className="h-4 w-4 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium text-sm">RSI</h4>
                      <p className="text-xs text-muted-foreground">Consistent level respect</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <BarChart2 className="h-4 w-4 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium text-sm">Bollinger Bands</h4>
                      <p className="text-xs text-muted-foreground">Volatility measurement</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <BarChart2 className="h-4 w-4 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium text-sm">Fibonacci Retracement</h4>
                      <p className="text-xs text-muted-foreground">Key levels: 38.2%, 50%, 61.8%</p>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/research/gold-analysis#technical">
                    Explore Technical Analysis
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card className="card-hover">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <BarChart2 className="h-5 w-5 text-info" />
                    <CardTitle>Fundamental Analysis for Gold</CardTitle>
                  </div>
                  <CardDescription>
                    Major economic factors influencing gold prices
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Gold prices are influenced by a complex interplay of macroeconomic factors that our platform analyzes in real-time.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-start gap-2">
                      <FileText className="h-4 w-4 text-info mt-1" />
                      <div>
                        <h4 className="font-medium text-sm">Inflation</h4>
                        <p className="text-xs text-muted-foreground">Traditional inflation hedge</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <FileText className="h-4 w-4 text-info mt-1" />
                      <div>
                        <h4 className="font-medium text-sm">Interest Rates</h4>
                        <p className="text-xs text-muted-foreground">Inverse relationship</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <FileText className="h-4 w-4 text-info mt-1" />
                      <div>
                        <h4 className="font-medium text-sm">USD Strength</h4>
                        <p className="text-xs text-muted-foreground">Inverse correlation</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <FileText className="h-4 w-4 text-info mt-1" />
                      <div>
                        <h4 className="font-medium text-sm">Geopolitical Factors</h4>
                        <p className="text-xs text-muted-foreground">Safe-haven asset</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/research/gold-analysis#fundamental">
                      Explore Fundamental Analysis
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <BarChart2 className="h-5 w-5 text-warning" />
                    <CardTitle>Sentiment Analysis for Gold</CardTitle>
                  </div>
                  <CardDescription>
                    Sources of sentiment data for gold markets
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Several specialized sources provide sentiment data specifically for gold markets, which our platform analyzes using Grok.
                  </p>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-start gap-2">
                      <FileText className="h-4 w-4 text-warning mt-1" />
                      <div>
                        <h4 className="font-medium text-sm">Social Media Sentiment</h4>
                        <p className="text-xs text-muted-foreground">Analysis of influential accounts on X (Twitter)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <FileText className="h-4 w-4 text-warning mt-1" />
                      <div>
                        <h4 className="font-medium text-sm">Commitments of Traders (COT) Report</h4>
                        <p className="text-xs text-muted-foreground">Weekly CFTC data on positioning</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <FileText className="h-4 w-4 text-warning mt-1" />
                      <div>
                        <h4 className="font-medium text-sm">Gold Sentiment Indices</h4>
                        <p className="text-xs text-muted-foreground">Specialized gold sentiment metrics</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/research/gold-analysis#sentiment">
                      Explore Sentiment Analysis
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}