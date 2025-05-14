"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { 
  BarChart4, 
  LineChart, 
  TrendingUp, 
  Users, 
  ArrowRight, 
  CheckCircle2,
  Coins,
  Layers,
  Zap,
  Lock
} from 'lucide-react';

export default function Home() {
  const { ref: featuresRef, inView: featuresInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const { ref: apiRef, inView: apiInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const { ref: ctaRef, inView: ctaInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Coins className="h-8 w-8 text-amber-500" />
              <h1 className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                Gold Trading Analysis
              </h1>
            </div>
            <div>
              <Link href="/dashboard" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-amber-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Advanced Gold Trading Analysis with Real-Time Data
              </h1>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                Harness the power of IC Markets API integration for real-time Gold (XAUUSD) price data, comprehensive technical analysis, and advanced trading tools.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/dashboard" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                  Launch Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <a href="#features" className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                  Learn More
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative aspect-video rounded-xl overflow-hidden shadow-xl"
            >
              <div className="absolute inset-0 bg-amber-500/10 dark:bg-amber-500/5 z-0"></div>
              <div className="relative z-10 p-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <div className="p-4 bg-amber-500 text-white flex items-center">
                    <BarChart4 className="h-5 w-5 mr-2" />
                    <h3 className="font-medium">Gold Price Analysis</h3>
                  </div>
                  <div className="p-4">
                    <div className="h-48 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center">
                      <LineChart className="h-12 w-12 text-amber-500 opacity-50" />
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md h-10"></div>
                      <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md h-10"></div>
                      <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md h-10"></div>
                      <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md h-10"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" ref={featuresRef} className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Comprehensive Gold Trading Analysis
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform provides all the tools you need to make informed gold trading decisions
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <LineChart className="h-6 w-6 text-amber-500" />,
                title: "Technical Analysis",
                description: "Advanced technical indicators including RSI, MACD, Bollinger Bands, and moving averages."
              },
              {
                icon: <BarChart4 className="h-6 w-6 text-amber-500" />,
                title: "Fundamental Analysis",
                description: "Track key economic indicators that influence gold prices, including inflation, interest rates, and USD strength."
              },
              {
                icon: <Users className="h-6 w-6 text-amber-500" />,
                title: "Sentiment Analysis",
                description: "Gauge market sentiment through retail and institutional positioning data and social media trends."
              },
              {
                icon: <TrendingUp className="h-6 w-6 text-amber-500" />,
                title: "Trading Interface",
                description: "Execute trades with precision using our intuitive trading interface with risk management tools."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="bg-amber-100 dark:bg-amber-900/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* API Integration Section */}
      <section ref={apiRef} className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={apiInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                IC Markets API Integration
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Our platform now integrates with IC Markets API to provide real-time Gold (XAUUSD) price data and enhanced trading capabilities.
              </p>
              
              <div className="mt-8 space-y-4">
                {[
                  {
                    icon: <Zap className="h-5 w-5 text-amber-500" />,
                    title: "Real-Time Price Data",
                    description: "Access up-to-the-second price data for more accurate analysis and trading decisions."
                  },
                  {
                    icon: <Layers className="h-5 w-5 text-amber-500" />,
                    title: "Multiple Timeframes",
                    description: "Analyze gold price movements across various timeframes from 1-minute to weekly charts."
                  },
                  {
                    icon: <Lock className="h-5 w-5 text-amber-500" />,
                    title: "Secure Authentication",
                    description: "Your API credentials are stored locally and never sent to our servers for maximum security."
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={apiInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 bg-amber-100 dark:bg-amber-900/30 rounded-full p-1">
                      <div className="bg-white dark:bg-gray-800 rounded-full p-1">
                        {feature.icon}
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={apiInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden shadow-xl bg-white dark:bg-gray-800 p-6"
            >
              <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-amber-500 rounded-full p-2 shadow-lg">
                <Coins className="h-6 w-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                API Features
              </h3>
              
              <div className="space-y-3">
                {[
                  "Real-time XAUUSD price data",
                  "Historical price data across multiple timeframes",
                  "Market depth information",
                  "Order placement and management",
                  "Position tracking",
                  "Account information"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Supported API Types
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white dark:bg-gray-600 p-2 rounded border border-gray-200 dark:border-gray-500 text-sm text-center">
                    FIX API
                  </div>
                  <div className="bg-white dark:bg-gray-600 p-2 rounded border border-gray-200 dark:border-gray-500 text-sm text-center">
                    cTrader Open API
                  </div>
                  <div className="bg-white dark:bg-gray-600 p-2 rounded border border-gray-200 dark:border-gray-500 text-sm text-center">
                    MetaTrader 4 API
                  </div>
                  <div className="bg-white dark:bg-gray-600 p-2 rounded border border-gray-200 dark:border-gray-500 text-sm text-center">
                    MetaTrader 5 API
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section ref={ctaRef} className="py-16 bg-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white">
              Ready to Elevate Your Gold Trading?
            </h2>
            <p className="mt-4 text-xl text-amber-100 max-w-3xl mx-auto">
              Access our comprehensive gold trading analysis platform with IC Markets API integration
            </p>
            <div className="mt-8">
              <Link href="/dashboard" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-amber-600 bg-white hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                Launch Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Coins className="h-8 w-8 text-amber-500" />
              <span className="ml-2 text-xl font-bold text-white">Gold Trading Analysis</span>
            </div>
            <div className="text-sm">
              &copy; {new Date().getFullYear()} Gold Trading Analysis. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}