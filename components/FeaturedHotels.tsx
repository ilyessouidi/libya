"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Flame, Tag, ArrowUpDown } from "lucide-react"
import type { Hotel } from "@/types/hotel"

interface FeaturedHotelsProps {
  topVisitedHotels: Hotel[]
  promotionalHotels: Hotel[]
}

const FeaturedHotels: React.FC<FeaturedHotelsProps> = ({ topVisitedHotels, promotionalHotels }) => {
  const [sortBy, setSortBy] = useState<"price" | "rating">("price")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  const sortHotels = (hotels: Hotel[]) => {
    return [...hotels].sort((a, b) => {
      if (sortBy === "price") {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price
      } else {
        return sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating
      }
    })
  }

  const renderHotelCard = (hotel: Hotel, isPromotional = false) => (
    <div key={hotel.id} className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image src={hotel.image || "/placeholder.svg"} alt={hotel.name} layout="fill" objectFit="cover" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{hotel.name}</h3>
        <div className="flex items-center mb-2">
          {[...Array(hotel.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
          <span className="ml-2 text-sm text-gray-600">{hotel.rating} stars</span>
        </div>
        <p className="text-sm text-gray-600 mb-2">{hotel.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">${hotel.price}/night</span>
          {isPromotional && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Special Offer</span>}
        </div>
        <Link
          href={`/hotels/${hotel.id}`}
          className="mt-4 block w-full text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  )

  return (
    <div>
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <Flame className="w-6 h-6 text-orange-500 mr-2" />
            Top Visited Hotels
          </h2>
          <div className="flex items-center">
            <span className="mr-2">Sort by:</span>
            <select
              className="mr-2 p-2 border rounded"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "price" | "rating")}
            >
              <option value="price">Price</option>
              <option value="rating">Rating</option>
            </select>
            <button
              className="p-2 border rounded flex items-center"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              <ArrowUpDown className="w-4 h-4 mr-1" />
              {sortOrder === "asc" ? "Ascending" : "Descending"}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortHotels(topVisitedHotels).map((hotel) => renderHotelCard(hotel))}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Tag className="w-6 h-6 text-green-500 mr-2" />
          Promotional Hotels
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortHotels(promotionalHotels).map((hotel) => renderHotelCard(hotel, true))}
        </div>
      </div>
    </div>
  )
}

export default FeaturedHotels

