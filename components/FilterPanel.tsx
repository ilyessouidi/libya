"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Star, Bed, Wifi, Car, Coffee, PocketIcon as Pool } from "lucide-react"

interface FilterPanelProps {
  filters: {
    rating: number[]
    roomTypes: string[]
    services: string[]
  }
  onFilterChange: (filters: FilterPanelProps["filters"]) => void
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState(filters)

  useEffect(() => {
    onFilterChange(localFilters)
  }, [localFilters, onFilterChange])

  const handleRatingChange = (rating: number) => {
    setLocalFilters((prev) => ({
      ...prev,
      rating: prev.rating.includes(rating) ? prev.rating.filter((r) => r !== rating) : [...prev.rating, rating].sort(),
    }))
  }

  const handleRoomTypeChange = (roomType: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      roomTypes: prev.roomTypes.includes(roomType)
        ? prev.roomTypes.filter((r) => r !== roomType)
        : [...prev.roomTypes, roomType],
    }))
  }

  const handleServiceChange = (service: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
      <h2 className="text-2xl font-semibold mb-6">Filters</h2>

      <div className="mb-6">
        <h3 className="font-semibold mb-3">Star Rating</h3>
        {[5, 4, 3, 2, 1].map((rating) => (
          <label key={rating} className="flex items-center mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={localFilters.rating.includes(rating)}
              onChange={() => handleRatingChange(rating)}
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

      <div className="mb-6">
        <h3 className="font-semibold mb-3">Room Type</h3>
        {["single", "double", "suite"].map((roomType) => (
          <label key={roomType} className="flex items-center mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={localFilters.roomTypes.includes(roomType)}
              onChange={() => handleRoomTypeChange(roomType)}
              className="mr-2 form-checkbox h-5 w-5 text-blue-600"
            />
            <Bed className="w-5 h-5 mr-2 text-gray-600" />
            <span className="text-gray-700">{roomType.charAt(0).toUpperCase() + roomType.slice(1)}</span>
          </label>
        ))}
      </div>

      <div>
        <h3 className="font-semibold mb-3">Services</h3>
        {[
          { name: "wifi", icon: Wifi, label: "Wi-Fi" },
          { name: "parking", icon: Car, label: "Parking" },
          { name: "breakfast", icon: Coffee, label: "Breakfast" },
          { name: "pool", icon: Pool, label: "Pool" },
        ].map(({ name, icon: Icon, label }) => (
          <label key={name} className="flex items-center mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={localFilters.services.includes(name)}
              onChange={() => handleServiceChange(name)}
              className="mr-2 form-checkbox h-5 w-5 text-blue-600"
            />
            <Icon className="w-5 h-5 mr-2 text-gray-600" />
            <span className="text-gray-700">{label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default FilterPanel

