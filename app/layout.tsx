import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import "leaflet/dist/leaflet.css"
import LiveChat from "@/components/LiveChat"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Libya Booking - Your Dream Vacation Starts Here",
  description: "Find the best deals on hotels and vacation packages in Libya and Tunisia.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow w-full transition-all duration-500 ease-in-out relative">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-50/30 to-transparent rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-50/20 to-transparent rounded-tr-full"></div>
            <div className="hidden md:block absolute top-1/4 left-10 w-24 h-24 bg-blue-50/30 rounded-full blur-xl"></div>
            <div className="hidden md:block absolute bottom-1/3 right-10 w-32 h-32 bg-blue-50/20 rounded-full blur-xl"></div>
          </div>

          {/* Main content with improved spacing */}
          <div className="relative z-10">{children}</div>

          {/* Subtle top wave decoration */}
          <div className="absolute top-0 left-0 right-0 w-full h-12 overflow-hidden z-0 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
              <path
                fill="#0099ff"
                fillOpacity="1"
                d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
              ></path>
            </svg>
          </div>
        </main>
        <Footer />
        <LiveChat />
      </body>
    </html>
  )
}



import './globals.css'