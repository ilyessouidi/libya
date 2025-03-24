"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { MapPin, Calendar, Users, Search, X, Star, Hotel, ChurchIcon as Mosque } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Mock data for destinations and hotels
const destinations = [
  { id: 1, name: "Tripoli, Libya", type: "city" },
  { id: 2, name: "Benghazi, Libya", type: "city" },
  { id: 3, name: "Tunis, Tunisia", type: "city" },
  { id: 4, name: "Djerba, Tunisia", type: "city" },
  { id: 5, name: "Corinthia Hotel", type: "hotel", city: "Tripoli", rating: 5, price: 150, hotelId: 1 },
  { id: 6, name: "Radisson Blu Hotel", type: "hotel", city: "Tripoli", rating: 4, price: 120, hotelId: 2 },
  { id: 7, name: "Four Seasons Hotel Tunis", type: "hotel", city: "Tunis", rating: 5, price: 200, hotelId: 3 },
  { id: 8, name: "Dar El Jeld Hotel and Spa", type: "hotel", city: "Tunis", rating: 4, price: 180, hotelId: 4 },
]

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState(1)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [calendarError, setCalendarError] = useState("")
  const searchBarRef = useRef(null)
  const router = useRouter()
  const [searchType, setSearchType] = useState("hotels")
  const [omraForm, setOmraForm] = useState({
    departureCity: "",
    destination: "makkah-madinah", // Default to both
    departureDate: "",
    returnDate: "",
    travelers: 1,
  })

  // Format date for input
  const formatDateForInput = (dateString) => {
    if (!dateString) return ""

    try {
      // Handle different date formats
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return ""

      // Format as YYYY-MM-DD for input[type="date"]
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, "0")
      const day = String(date.getDate()).padStart(2, "0")
      return `${year}-${month}-${day}`
    } catch (error) {
      console.error("Error formatting date:", error)
      return ""
    }
  }

  // Check if checkOut date is after checkIn date
  useEffect(() => {
    if (checkIn && checkOut) {
      try {
        const checkInDate = new Date(checkIn)
        const checkOutDate = new Date(checkOut)

        if (!isNaN(checkInDate.getTime()) && !isNaN(checkOutDate.getTime())) {
          if (checkOutDate <= checkInDate) {
            setCalendarError("Check-out date must be after check-in date")
          } else {
            setCalendarError("")
          }
        }
      } catch (error) {
        console.error("Error validating dates:", error)
      }
    } else {
      setCalendarError("")
    }
  }, [checkIn, checkOut])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Filter suggestions based on query
  useEffect(() => {
    if (query.length > 1) {
      const filteredSuggestions = destinations.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          (item.type === "hotel" && item.city.toLowerCase().includes(query.toLowerCase())),
      )
      setSuggestions(filteredSuggestions)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [query])

  const handleOmraInputChange = (e) => {
    const { name, value } = e.target
    setOmraForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault()

    if (searchType === "hotels") {
      if (calendarError) return
      router.push(`/hotels?q=${encodeURIComponent(query)}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`)
    } else {
      // Handle Omra search
      router.push(
        `/omra-packages?departureCity=${encodeURIComponent(omraForm.departureCity)}&destination=${omraForm.destination}&departureDate=${omraForm.departureDate}&returnDate=${omraForm.returnDate}&travelers=${omraForm.travelers}`,
      )
    }
  }

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.name)
    setShowSuggestions(false)

    // If it's a hotel, navigate directly to the hotel details page
    if (suggestion.type === "hotel" && suggestion.hotelId) {
      router.push(`/hotels/${suggestion.hotelId}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`)
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4" ref={searchBarRef}>
      <Card className="p-6">
        <div className="flex border-b border-gray-200 mb-6">
          <button
            type="button"
            className={`px-4 py-2 font-medium text-sm rounded-t-lg mr-2 ${
              searchType === "hotels" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setSearchType("hotels")}
          >
            <Hotel className="w-4 h-4 inline mr-2" />
            Hotels
          </button>
          <button
            type="button"
            className={`px-4 py-2 font-medium text-sm rounded-t-lg ${
              searchType === "omra" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setSearchType("omra")}
          >
            <Mosque className="w-4 h-4 inline mr-2" />
            Omra Packages
          </button>
        </div>

        {searchType === "hotels" ? (
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Location Input */}
              <div className="relative">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" size={18} />
                  <Input
                    type="text"
                    placeholder="Where are you going?"
                    className="pl-10 pr-10"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onClick={() => setShowSuggestions(true)}
                  />
                  {query && (
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setQuery("")}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                {/* Location Suggestions */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {suggestions.map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <div className="font-semibold">{suggestion.name}</div>
                        {suggestion.type === "hotel" && (
                          <div className="text-sm text-gray-500 flex items-center">
                            <span className="mr-2">{suggestion.city}</span>
                            <span className="flex items-center mr-2">
                              {[...Array(suggestion.rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                              ))}
                            </span>
                            <span>${suggestion.price}/night</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Check-in Date */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" size={18} />
                <Input
                  type="date"
                  className={cn("pl-10", calendarError && "border-red-500 focus-visible:ring-red-500")}
                  value={formatDateForInput(checkIn)}
                  onChange={(e) => setCheckIn(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              {/* Check-out Date */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" size={18} />
                <Input
                  type="date"
                  className={cn("pl-10", calendarError && "border-red-500 focus-visible:ring-red-500")}
                  value={formatDateForInput(checkOut)}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn ? formatDateForInput(checkIn) : new Date().toISOString().split("T")[0]}
                />
              </div>

              {/* Guests and Search Button */}
              <div className="flex space-x-2">
                <div className="relative w-1/3">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" size={18} />
                  <Input
                    type="number"
                    placeholder="Guests"
                    className="pl-10"
                    value={guests}
                    onChange={(e) => setGuests(Math.max(1, Number(e.target.value) || 1))}
                    min="1"
                    max="10"
                  />
                </div>

                <Button type="submit" className="w-2/3 bg-blue-600 hover:bg-blue-700" disabled={!!calendarError}>
                  <Search className="mr-2" size={18} />
                  <span>Search</span>
                </Button>
              </div>
            </div>

            {calendarError && <p className="text-red-500 text-sm">{calendarError}</p>}
          </form>
        ) : (
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Departure City */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" size={18} />
                <Input
                  type="text"
                  name="departureCity"
                  placeholder="Departure City"
                  className="pl-10"
                  value={omraForm.departureCity}
                  onChange={handleOmraInputChange}
                />
              </div>

              {/* Destination */}
              <div className="relative">
                <Mosque className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" size={18} />
                <select
                  name="destination"
                  value={omraForm.destination}
                  onChange={handleOmraInputChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="makkah-madinah">Makkah & Madinah</option>
                  <option value="makkah">Makkah Only</option>
                  <option value="madinah">Madinah Only</option>
                </select>
              </div>

              {/* Departure Date */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" size={18} />
                <Input
                  type="date"
                  name="departureDate"
                  placeholder="Departure Date"
                  className="pl-10"
                  value={omraForm.departureDate}
                  onChange={handleOmraInputChange}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              {/* Return Date */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" size={18} />
                <Input
                  type="date"
                  name="returnDate"
                  placeholder="Return Date"
                  className="pl-10"
                  value={omraForm.returnDate}
                  onChange={handleOmraInputChange}
                  min={omraForm.departureDate || new Date().toISOString().split("T")[0]}
                />
              </div>

              {/* Travelers and Search Button */}
              <div className="flex space-x-2 md:col-span-2 lg:col-span-4">
                <div className="relative w-1/3">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" size={18} />
                  <Input
                    type="number"
                    name="travelers"
                    placeholder="Travelers"
                    className="pl-10"
                    value={omraForm.travelers}
                    onChange={handleOmraInputChange}
                    min="1"
                    max="20"
                  />
                </div>

                <Button type="submit" className="w-2/3 bg-blue-600 hover:bg-blue-700">
                  <Search className="mr-2" size={18} />
                  <span>Find Omra Packages</span>
                </Button>
              </div>
            </div>
          </form>
        )}
      </Card>
    </div>
  )
}

