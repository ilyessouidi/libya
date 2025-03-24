"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Star, Bed, Wifi, Car, Coffee, PocketIcon as Pool } from "lucide-react"

export default function HotelFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState({
    rating: [] as number[],
    roomTypes: [] as string[],
    services: [] as string[],
  })

  useEffect(() => {
    // Initialize filters from URL parameters only if they're different from current state
    const urlRating = searchParams.get("rating")?.split(",").map(Number) || []
    const urlRoomTypes = searchParams.get("roomTypes")?.split(",") || []
    const urlServices = searchParams.get("services")?.split(",") || []

    // Check if the filters are different before updating state
    const isRatingDifferent = JSON.stringify(urlRating) !== JSON.stringify(filters.rating)
    const isRoomTypesDifferent = JSON.stringify(urlRoomTypes) !== JSON.stringify(filters.roomTypes)
    const isServicesDifferent = JSON.stringify(urlServices) !== JSON.stringify(filters.services)

    if (isRatingDifferent || isRoomTypesDifferent || isServicesDifferent) {
      setFilters({
        rating: urlRating,
        roomTypes: urlRoomTypes,
        services: urlServices,
      })
    }
  }, [searchParams])

  const handleFilterChange = (filterType: string, value: string | number) => {
    setFilters((prevFilters) => {
      // Check if the value is already in the array
      const isValueIncluded = prevFilters[filterType].includes(value)

      // Only update if there's an actual change
      if ((isValueIncluded && prevFilters[filterType].length > 0) || !isValueIncluded) {
        const updatedFilters = {
          ...prevFilters,
          [filterType]: isValueIncluded
            ? prevFilters[filterType].filter((item) => item !== value)
            : [...prevFilters[filterType], value],
        }

        // Update URL with new filters, but use a setTimeout to avoid immediate re-render
        setTimeout(() => {
          const newSearchParams = new URLSearchParams(searchParams.toString())
          Object.entries(updatedFilters).forEach(([key, values]) => {
            if (values.length > 0) {
              newSearchParams.set(key, values.join(","))
            } else {
              newSearchParams.delete(key)
            }
          })
          router.push(`/hotels?${newSearchParams.toString()}`, { scroll: false })
        }, 0)

        return updatedFilters
      }

      return prevFilters
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-600">
      <h2 className="text-xl font-semibold mb-4 text-blue-900">Hotel Filters</h2>

      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-gray-700">Star Rating</h3>
        {[5, 4, 3, 2, 1].map((rating) => (
          <label
            key={rating}
            className="flex items-center mb-2 cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-colors"
          >
            <input
              type="checkbox"
              checked={filters.rating.includes(rating)}
              onChange={() => handleFilterChange("rating", rating)}
              className="mr-2 form-checkbox h-5 w-5 text-blue-600"
            />
            <div className="flex items-center">
              {[...Array(rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
              <span className="ml-2 text-gray-700">& up</span>
            </div>
          </label>
        ))}
      </div>

      <div className="mb-6 pt-4 border-t border-gray-200">
        <h3 className="font-semibold mb-3 text-gray-700">Room Type</h3>
        {["single", "double", "suite"].map((roomType) => (
          <label
            key={roomType}
            className="flex items-center mb-2 cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-colors"
          >
            <input
              type="checkbox"
              checked={filters.roomTypes.includes(roomType)}
              onChange={() => handleFilterChange("roomTypes", roomType)}
              className="mr-2 form-checkbox h-5 w-5 text-blue-600"
            />
            <Bed className="w-5 h-5 mr-2 text-blue-600" />
            <span className="text-gray-700">{roomType.charAt(0).toUpperCase() + roomType.slice(1)}</span>
          </label>
        ))}
      </div>

      <div className="mb-6 pt-4 border-t border-gray-200">
        <h3 className="font-semibold mb-3 text-gray-700">Services</h3>
        {[
          { name: "wifi", icon: Wifi, label: "Wi-Fi" },
          { name: "parking", icon: Car, label: "Parking" },
          { name: "breakfast", icon: Coffee, label: "Breakfast" },
          { name: "pool", icon: Pool, label: "Pool" },
        ].map(({ name, icon: Icon, label }) => (
          <label
            key={name}
            className="flex items-center mb-2 cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-colors"
          >
            <input
              type="checkbox"
              checked={filters.services.includes(name)}
              onChange={() => handleFilterChange("services", name)}
              className="mr-2 form-checkbox h-5 w-5 text-blue-600"
            />
            <Icon className="w-5 h-5 mr-2 text-blue-600" />
            <span className="text-gray-700">{label}</span>
          </label>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-medium text-blue-900 mb-3">Popular Filters</h4>
        <div className="space-y-2">
          <button
            onClick={() => {
              const newParams = new URLSearchParams(searchParams.toString())
              newParams.set("rating", "5")
              router.push(`/hotels?${newParams.toString()}`, { scroll: false })
            }}
            className="w-full text-left px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-800 flex justify-between items-center group transition-all"
          >
            <span>5-Star Luxury</span>
            <span className="text-blue-500 group-hover:translate-x-1 transition-transform">→</span>
          </button>
          <button
            onClick={() => {
              const newParams = new URLSearchParams(searchParams.toString())
              newParams.set("services", "breakfast,wifi")
              router.push(`/hotels?${newParams.toString()}`, { scroll: false })
            }}
            className="w-full text-left px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-800 flex justify-between items-center group transition-all"
          >
            <span>Breakfast & Wi-Fi</span>
            <span className="text-blue-500 group-hover:translate-x-1 transition-transform">→</span>
          </button>
          <button
            onClick={() => {
              const newParams = new URLSearchParams(searchParams.toString())
              newParams.set("roomTypes", "suite")
              router.push(`/hotels?${newParams.toString()}`, { scroll: false })
            }}
            className="w-full text-left px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-800 flex justify-between items-center group transition-all"
          >
            <span>Suite Rooms</span>
            <span className="text-blue-500 group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-medium text-blue-900 mb-3">Available Options</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Luxury Hotels</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">12 hotels</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Business Hotels</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">8 hotels</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Budget Stays</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">15 hotels</span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg p-4 text-white">
          <h4 className="font-medium mb-2">Need Assistance?</h4>
          <p className="text-sm text-blue-100 mb-3">
            Our hotel specialists can help you find the perfect accommodation for your stay.
          </p>
          <button className="w-full bg-white text-blue-700 rounded-lg py-2 text-sm font-medium hover:bg-blue-50 transition-colors">
            Contact a Specialist
          </button>
        </div>
      </div>
    </div>
  )
}

