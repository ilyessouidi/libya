"use client"

import { useState, createContext } from "react"
import OmraSearch from "@/components/OmraSearch"
import OmraFilters from "@/components/OmraFilters"
import OmraPackageList from "@/components/OmraPackageList"

// Create a context to share filter state between components
export const OmraFilterContext = createContext({
  filters: {
    priceRange: [1000, 5000] as [number, number],
    duration: [] as number[],
    accommodationType: [] as string[],
    transportationType: [] as string[],
    query: "" as string,
  },
  setFilters: (filters: any) => {},
  applyPresetFilter: (preset: string) => {},
})

export default function OmraPackagesClientPage() {
  // Initialize filter state
  const [filters, setFilters] = useState({
    priceRange: [1000, 5000] as [number, number],
    duration: [] as number[],
    accommodationType: [] as string[],
    transportationType: [] as string[],
    query: "" as string,
  })

  // Function to apply preset filters
  const applyPresetFilter = (preset: string) => {
    switch (preset) {
      case "premium-10-day":
        setFilters((prev) => ({
          ...prev,
          duration: [10],
          accommodationType: ["5-star"],
        }))
        break
      case "budget":
        setFilters((prev) => ({
          ...prev,
          priceRange: [1000, 2000] as [number, number],
        }))
        break
      case "family":
        setFilters((prev) => ({
          ...prev,
          accommodationType: ["family"],
        }))
        break
      case "7-day":
        setFilters((prev) => ({
          ...prev,
          duration: [7],
        }))
        break
      case "10-day":
        setFilters((prev) => ({
          ...prev,
          duration: [10],
        }))
        break
      case "14-day":
        setFilters((prev) => ({
          ...prev,
          duration: [14],
        }))
        break
      case "5-star":
        setFilters((prev) => ({
          ...prev,
          accommodationType: ["5-star"],
        }))
        break
      default:
        break
    }
  }

  return (
    <OmraFilterContext.Provider value={{ filters, setFilters, applyPresetFilter }}>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
        {/* Hero Section */}
        <div className="relative bg-blue-900 text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/70 z-10"></div>
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-50"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(101,163,255,0.2),transparent_70%)]"></div>
          </div>

          <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 bg-blue-700 text-blue-100 rounded-full text-sm font-medium mb-4 animate-fade-in">
                Sacred Journey
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight animate-fade-in [animation-delay:200ms]">
                Discover Our <span className="text-blue-300">Omra Packages</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl animate-fade-in [animation-delay:400ms]">
                Embark on a spiritual journey with our carefully curated Omra packages, designed to provide a peaceful
                and fulfilling pilgrimage experience.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in [animation-delay:600ms]">
                <button className="px-6 py-3 bg-white text-blue-900 rounded-lg font-medium hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Explore Packages
                </button>
                <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-all">
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 w-full h-16 bg-white [clip-path:polygon(0_100%,100%_100%,100%_40%,75%_40%,50%_100%,25%_40%,0_40%)]"></div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">All-Inclusive Packages</h3>
              <p className="text-gray-600">
                Our packages include accommodation, transportation, and guided tours to ensure a hassle-free experience.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">
                Choose from a variety of departure dates to find the perfect time for your spiritual journey.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Experienced Guides</h3>
              <p className="text-gray-600">
                Our knowledgeable guides provide spiritual and historical context throughout your journey.
              </p>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-blue-100">
            <h2 className="text-2xl font-bold mb-6 text-blue-900">Find Your Perfect Omra Package</h2>
            <OmraSearch />
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-1/4">
              <div className="sticky top-24">
                <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-600">
                  <h3 className="text-xl font-semibold mb-4 text-blue-900">Refine Your Search</h3>
                  <OmraFilters />

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-medium text-blue-900 mb-3">Popular Filters</h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => applyPresetFilter("premium-10-day")}
                        className="w-full text-left px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-800 flex justify-between items-center group transition-all"
                      >
                        <span>Premium 10-day Package</span>
                        <span className="text-blue-500 group-hover:translate-x-1 transition-transform">→</span>
                      </button>
                      <button
                        onClick={() => applyPresetFilter("budget")}
                        className="w-full text-left px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-800 flex justify-between items-center group transition-all"
                      >
                        <span>Budget-friendly Options</span>
                        <span className="text-blue-500 group-hover:translate-x-1 transition-transform">→</span>
                      </button>
                      <button
                        onClick={() => applyPresetFilter("family")}
                        className="w-full text-left px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-800 flex justify-between items-center group transition-all"
                      >
                        <span>Family Packages</span>
                        <span className="text-blue-500 group-hover:translate-x-1 transition-transform">→</span>
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-medium text-blue-900 mb-3">Available Packages</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Standard Omra</span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">
                          3 packages
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Premium Omra</span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">
                          2 packages
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Family Omra</span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">
                          1 package
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg p-4 text-white">
                      <h4 className="font-medium mb-2">Need Help?</h4>
                      <p className="text-sm text-blue-100 mb-3">
                        Our Omra specialists can help you find the perfect package for your journey.
                      </p>
                      <button className="w-full bg-white text-blue-700 rounded-lg py-2 text-sm font-medium hover:bg-blue-50 transition-colors">
                        Contact an Expert
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
            <div className="lg:w-3/4">
              <OmraPackageList />
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="bg-blue-900 text-white py-16 mt-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">What Our Pilgrims Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-blue-800 p-6 rounded-xl relative">
                <div className="absolute -top-5 left-6 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl">"</span>
                </div>
                <p className="mt-4 mb-4">
                  The Omra package exceeded all my expectations. The accommodations were excellent and the spiritual
                  guidance was invaluable.
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-700 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold">Ahmed Hassan</p>
                    <p className="text-blue-300 text-sm">Tripoli, Libya</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-800 p-6 rounded-xl relative">
                <div className="absolute -top-5 left-6 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl">"</span>
                </div>
                <p className="mt-4 mb-4">
                  I appreciated the attention to detail and the seamless organization. It allowed me to focus entirely
                  on my spiritual journey.
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-700 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold">Fatima Mahmoud</p>
                    <p className="text-blue-300 text-sm">Benghazi, Libya</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-800 p-6 rounded-xl relative">
                <div className="absolute -top-5 left-6 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl">"</span>
                </div>
                <p className="mt-4 mb-4">
                  The guides were knowledgeable and patient. They made the experience much more meaningful with their
                  insights and support.
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-700 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold">Omar Khalid</p>
                    <p className="text-blue-300 text-sm">Misrata, Libya</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add this style for animations */}
        <style jsx global>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            opacity: 0;
            animation: fadeIn 0.5s ease-out forwards;
          }
        `}</style>
      </div>
    </OmraFilterContext.Provider>
  )
}

