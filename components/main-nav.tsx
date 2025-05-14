"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  BarChart2, 
  BarChartHorizontal, 
  Bitcoin, 
  BookOpen, 
  BrainCircuit, 
  Briefcase, 
  ChevronDown, 
  Cog, 
  Compass, 
  Cpu, 
  CreditCard, 
  Database, 
  Gauge, 
  Globe, 
  Home, 
  LineChart, 
  List, 
  MessageSquare, 
  Settings, 
  TrendingUp, 
  Users 
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link
        href="/"
        className={cn(
          "nav-link",
          pathname === "/" ? "active" : ""
        )}
      >
        <Home className="h-4 w-4" />
        <span>Home</span>
      </Link>
      <Link
        href="/dashboard"
        className={cn(
          "nav-link",
          pathname === "/dashboard" ? "active" : ""
        )}
      >
        <Gauge className="h-4 w-4" />
        <span>Dashboard</span>
      </Link>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="nav-link">
            <BarChart2 className="h-4 w-4" />
            <span>Analysis</span>
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href="/analysis/technical" className="flex items-center">
              <LineChart className="h-4 w-4 mr-2" />
              Technical
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/analysis/fundamental" className="flex items-center">
              <BarChartHorizontal className="h-4 w-4 mr-2" />
              Fundamental
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/analysis/sentiment" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Sentiment
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/analysis/combined" className="flex items-center">
              <BrainCircuit className="h-4 w-4 mr-2" />
              Combined
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="nav-link">
            <Cpu className="h-4 w-4" />
            <span>Strategies</span>
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href="/strategies/browse" className="flex items-center">
              <List className="h-4 w-4 mr-2" />
              Browse
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/strategies/create" className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Create
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/strategies/backtest" className="flex items-center">
              <Compass className="h-4 w-4 mr-2" />
              Backtest
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/strategies/deployed" className="flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              Deployed
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="nav-link">
            <Database className="h-4 w-4" />
            <span>Platforms</span>
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href="/platforms/ic-markets" className="flex items-center">
              <CreditCard className="h-4 w-4 mr-2" />
              IC Markets
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/platforms/binance" className="flex items-center">
              <Bitcoin className="h-4 w-4 mr-2" />
              Binance
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/platforms/connect" className="flex items-center">
              <Cog className="h-4 w-4 mr-2" />
              Connect New
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Link
        href="/research"
        className={cn(
          "nav-link",
          pathname === "/research" ? "active" : ""
        )}
      >
        <BookOpen className="h-4 w-4" />
        <span>Research</span>
      </Link>
      
      <Link
        href="/settings"
        className={cn(
          "nav-link",
          pathname === "/settings" ? "active" : ""
        )}
      >
        <Settings className="h-4 w-4" />
        <span>Settings</span>
      </Link>
    </nav>
  )
}