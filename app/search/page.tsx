"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import FilterPanel from "@/components/FilterPanel"
import HotelList from "@/components/HotelList"
import type { Hotel } from "@/types/hotel"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

// Mock data for hotels (in a real application, this would come from an API)
const hotels: Hotel[] = [
  {
    id: 1,
    name: "Corinthia Hotel",
    city: "Tripoli",
    country: "Libya",
    rating: 5,
    price: 150,
    image: "/hotel1.jpg",
    roomTypes: ["single", "double", "suite"],
    services: ["wifi", "parking", "breakfast", "pool"],
  },
  {
    id: 2,
    name: "Radisson Blu Hotel",
    city: "Tripoli",
    country: "Libya",
    rating: 4,
    price: 120,
    image: "/hotel2.jpg",
    roomTypes: ["single", "double"],
    services: ["wifi", "parking", "breakfast"],
  },
  {
    id: 3,
    name: "Four Seasons Hotel Tunis",
    city: "Tunis",
    country: "Tunisia",
    rating: 5,
    price: 200,
    image: "/hotel3.jpg",
    roomTypes: ["double", "suite"],
    services: ["wifi", "parking", "breakfast", "pool", "spa"],
  },
  {
    id: 4,
    name: "Dar El Jeld Hotel and Spa",
    city: "Tunis",
    country: "Tunisia",
    rating: 4,
    price: 180,
    image: "/hotel4.jpg",
    roomTypes: ["double", "suite"],
    services: ["wifi", "breakfast", "spa"],
  },
]

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const checkIn = searchParams.get("checkIn") || ""
  const checkOut = searchParams.get("checkOut") || ""
  const guests = searchParams.get("guests") || "1"

  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([])
  const [filters, setFilters] = useState({
    rating: [] as number[],
    roomTypes: [] as string[],
    services: [] as string[],
  })

  useEffect(() => {
    // Filter hotels based on the search query and applied filters
    const filtered = hotels.filter((hotel) => {
      const matchesQuery =
        hotel.name.toLowerCase().includes(query.toLowerCase()) ||
        hotel.city.toLowerCase().includes(query.toLowerCase()) ||
        hotel.country.toLowerCase().includes(query.toLowerCase())

      const matchesRating = filters.rating.length === 0 || filters.rating.includes(hotel.rating)
      const matchesRoomTypes =
        filters.roomTypes.length === 0 || hotel.roomTypes.some((type) => filters.roomTypes.includes(type))
      const matchesServices =
        filters.services.length === 0 || filters.services.every((service) => hotel.services.includes(service))

      return matchesQuery && matchesRating && matchesRoomTypes && matchesServices
    })

    setFilteredHotels(filtered)
  }, [query, filters])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Hotel Search Results for "{query}"</h1>
      <p className="mb-4">
        Check-in: {checkIn} • Check-out: {checkOut} • Guests: {guests}
      </p>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
        </div>
        <div className="w-full md:w-3/4">
          <HotelList hotels={filteredHotels} />
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <SearchResults />
      </main>
      <Footer />
    </div>
  )
}

