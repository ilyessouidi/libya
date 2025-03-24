import type { Metadata } from "next"
import SearchBar from "@/components/SearchBar"
import HotelFilters from "@/components/HotelFilters"
import HotelList from "@/components/HotelList"

export const metadata: Metadata = {
  title: "Hotels | Libya Booking",
  description: "Search and book hotels in Libya and Tunisia. Find the best deals on accommodations.",
}

export default function HotelsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero section with background image */}
      <div
        className="relative bg-cover bg-center py-12 px-4"
        style={{
          backgroundImage: "url('/placeholder.svg?height=800&width=1600')",
          backgroundPosition: "center 30%",
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Content container */}
        <div className="container mx-auto relative z-10">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-md">Find Your Perfect Stay</h1>
            <p className="text-lg text-white/90 drop-shadow">
              Browse our selection of premium hotels across Libya and Tunisia
            </p>
          </div>

          <SearchBar />
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/3 sticky top-24 self-start">
            <HotelFilters />
          </aside>
          <div className="lg:w-2/3">
            <HotelList />
          </div>
        </div>
      </div>
    </div>
  )
}

