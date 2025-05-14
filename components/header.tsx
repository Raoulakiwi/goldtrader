"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { BarChart2, Bell, Menu, X } from "lucide-react"

import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 ${
      isScrolled ? "glassmorphism py-2" : "bg-background py-4"
    }`}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-7xl">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <BarChart2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">TradingPro</span>
          </Link>
          <div className="hidden md:flex">
            <MainNav />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="rounded-full relative">
            <Bell className="h-[1.2rem] w-[1.2rem]" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
              3
            </span>
          </Button>
          <ThemeToggle />
          <div className="block md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="px-2">
                  <Link href="/" className="flex items-center space-x-2 mb-8">
                    <BarChart2 className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold">TradingPro</span>
                  </Link>
                  <nav className="flex flex-col space-y-4">
                    <Link
                      href="/"
                      className="nav-link"
                    >
                      Home
                    </Link>
                    <Link
                      href="/dashboard"
                      className="nav-link"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/analysis/technical"
                      className="nav-link"
                    >
                      Technical Analysis
                    </Link>
                    <Link
                      href="/analysis/fundamental"
                      className="nav-link"
                    >
                      Fundamental Analysis
                    </Link>
                    <Link
                      href="/analysis/sentiment"
                      className="nav-link"
                    >
                      Sentiment Analysis
                    </Link>
                    <Link
                      href="/strategies/browse"
                      className="nav-link"
                    >
                      Strategies
                    </Link>
                    <Link
                      href="/platforms/ic-markets"
                      className="nav-link"
                    >
                      Platforms
                    </Link>
                    <Link
                      href="/research"
                      className="nav-link"
                    >
                      Research
                    </Link>
                    <Link
                      href="/settings"
                      className="nav-link"
                    >
                      Settings
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}