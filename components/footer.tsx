import Link from "next/link"
import { BarChart2, Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <BarChart2 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">TradingPro</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              A comprehensive trading platform for technical, fundamental, and sentiment analysis with automated strategy backtesting.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/analysis/technical" className="text-muted-foreground hover:text-primary">
                  Technical Analysis
                </Link>
              </li>
              <li>
                <Link href="/analysis/fundamental" className="text-muted-foreground hover:text-primary">
                  Fundamental Analysis
                </Link>
              </li>
              <li>
                <Link href="/analysis/sentiment" className="text-muted-foreground hover:text-primary">
                  Sentiment Analysis
                </Link>
              </li>
              <li>
                <Link href="/strategies/browse" className="text-muted-foreground hover:text-primary">
                  Strategies
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/research" className="text-muted-foreground hover:text-primary">
                  Research
                </Link>
              </li>
              <li>
                <Link href="/research/ic-markets" className="text-muted-foreground hover:text-primary">
                  IC Markets API
                </Link>
              </li>
              <li>
                <Link href="/research/gold-analysis" className="text-muted-foreground hover:text-primary">
                  Gold Analysis
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TradingPro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}