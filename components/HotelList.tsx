"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Star, MapPin, ArrowRight, Wifi, Car, Coffee, PocketIcon as Pool, SpadeIcon as Spa } from "lucide-react"
import type { Hotel } from "@/types/hotel"

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

// Helper function to get the appropriate icon for a service
const getServiceIcon = (service: string) => {
  switch (service) {
    case "wifi":
      return <Wifi className="w-3.5 h-3.5" />
    case "parking":
      return <Car className="w-3.5 h-3.5" />
    case "breakfast":
      return <Coffee className="w-3.5 h-3.5" />
    case "pool":
      return <Pool className="w-3.5 h-3.5" />
    case "spa":
      return <Spa className="w-3.5 h-3.5" />
    default:
      return null
  }
}

export default function HotelList() {
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()
  const isInitialLoadRef = useRef(true)
  const prevFilteredHotelsRef = useRef<Hotel[]>([])

  useEffect(() => {
    try {
      // Create a function to filter hotels to avoid code duplication
      const filterHotels = () => {
        // Safety check for hotels array
        if (!hotels || !Array.isArray(hotels)) {
          return []
        }

        const query = searchParams.get("q") || ""
        const rating = searchParams.get("rating")?.split(",").map(Number) || []
        const roomTypes = searchParams.get("roomTypes")?.split(",") || []
        const services = searchParams.get("services")?.split(",") || []

        // If no search params are provided on initial load, show all hotels
        if (isInitialLoadRef.current && !query && !rating.length && !roomTypes.length && !services.length) {
          return hotels
        }

        return hotels.filter((hotel) => {
          if (!hotel) return false

          // If no query is provided, don't filter by query
          const matchesQuery =
            !query ||
            (hotel.name && hotel.name.toLowerCase().includes(query.toLowerCase())) ||
            (hotel.city && hotel.city.toLowerCase().includes(query.toLowerCase())) ||
            (hotel.country && hotel.country.toLowerCase().includes(query.toLowerCase()))

          const matchesRating = rating.length === 0 || (hotel.rating && rating.includes(hotel.rating))
          const matchesRoomTypes =
            roomTypes.length === 0 || (hotel.roomTypes && roomTypes.some((type) => hotel.roomTypes.includes(type)))
          const matchesServices =
            services.length === 0 || (hotel.services && services.every((service) => hotel.services.includes(service)))

          return matchesQuery && matchesRating && matchesRoomTypes && matchesServices
        })
      }

      // Use the function to get filtered hotels
      const newFilteredHotels = filterHotels()

      // Compare with previous filtered hotels to avoid unnecessary updates
      const prevHotelsJSON = JSON.stringify(prevFilteredHotelsRef.current)
      const newHotelsJSON = JSON.stringify(newFilteredHotels)

      if (isInitialLoadRef.current || prevHotelsJSON !== newHotelsJSON) {
        setFilteredHotels(newFilteredHotels)
        prevFilteredHotelsRef.current = newFilteredHotels
      }

      if (isInitialLoadRef.current) {
        isInitialLoadRef.current = false
      }

      setIsLoading(false)
    } catch (error) {
      console.error("Error filtering hotels:", error)
      setFilteredHotels(hotels || [])
      setIsLoading(false)
    }
  }, [searchParams])

  // Function to handle direct navigation to hotel detail page
  const handleViewHotel = (hotelId: number) => {
    try {
      // Preserve search parameters when navigating
      const checkIn = searchParams.get("checkIn") || ""
      const checkOut = searchParams.get("checkOut") || ""
      const guests = searchParams.get("guests") || "1"

      // Use router.push instead of window.location.href
      router.push(`/hotels/${hotelId}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`)
    } catch (error) {
      console.error("Navigation error:", error)
      // Fallback direct navigation if router fails
      window.location.href = `/hotels/${hotelId}`
    }
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200 animate-pulse"></div>
            <div className="p-4 space-y-3">
              <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div key={star} className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                ))}
              </div>
              <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (filteredHotels.length === 0 && !isInitialLoadRef.current) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-600 mb-4">No hotels found matching your criteria.</p>
        <p className="text-gray-600">Try adjusting your search parameters or browse all hotels below.</p>
        <button
          onClick={() => setFilteredHotels(hotels)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Show All Hotels
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {filteredHotels.map((hotel) => (
        <div
          key={hotel?.id || Math.random()}
          className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row"
        >
          {/* Left side - Image */}
          <div
            className="relative md:w-1/3 h-64 md:h-auto cursor-pointer overflow-hidden"
            onClick={() => hotel?.id && handleViewHotel(hotel.id)}
          >
            <Image
              src={hotel?.image || "/placeholder.svg?height=300&width=400"}
              alt={hotel?.name || "Hotel"}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Premium badge for 5-star hotels */}
            {hotel?.rating === 5 && (
              <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                Premium
              </div>
            )}
          </div>

          {/* Right side - Content */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              {/* Header section */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3
                    className="text-xl font-bold text-gray-800 cursor-pointer hover:text-blue-600 transition-colors"
                    onClick={() => hotel?.id && handleViewHotel(hotel.id)}
                  >
                    {hotel?.name || "Hotel"}
                  </h3>
                  <div className="flex items-center mt-1 text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">
                      {hotel?.city || "City"}, {hotel?.country || "Country"}
                    </span>
                  </div>
                </div>

                {/* Rating stars */}
                <div className="flex items-center bg-gray-50 px-2 py-1 rounded-lg">
                  <div className="flex">
                    {[...Array(hotel?.rating || 0)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="ml-1 text-xs text-gray-600 font-medium">{hotel?.rating || 0}/5</span>
                </div>
              </div>

              {/* Amenities with icons */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-3 mt-3">
                  {hotel?.services?.map((service, index) => (
                    <div key={index} className="flex items-center text-gray-600 bg-gray-50 px-2 py-1 rounded-md">
                      <span className="mr-1 text-blue-500">{getServiceIcon(service)}</span>
                      <span className="text-xs capitalize">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Room types */}
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">Room types:</p>
                <div className="flex flex-wrap gap-2">
                  {hotel?.roomTypes?.map((type, index) => (
                    <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md capitalize">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer section with price and CTA */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-blue-600">${hotel?.price || 0}</span>
                <span className="text-sm text-gray-500 ml-1">/night</span>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => hotel?.id && handleViewHotel(hotel.id)}
                  className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg px-3 py-1 text-sm transition-colors"
                  type="button"
                >
                  Details
                </Button>
                <Button
                  onClick={() => hotel?.id && handleViewHotel(hotel.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-1 text-sm transition-colors flex items-center"
                  type="button"
                >
                  Book Now
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

