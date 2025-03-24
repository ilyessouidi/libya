"use client"

import { useState, useContext } from "react"
import { Search } from "lucide-react"
import { OmraFilterContext } from "@/app/omra-packages/OmraPackagesClientPage"

export default function OmraSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const { filters, setFilters } = useContext(OmraFilterContext)

  const handleSearch = (e) => {
    e.preventDefault()

    // Update the filters context with the search query
    setFilters({
      ...filters,
      query: searchQuery,
    })
  }

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search for Omra packages, destinations, or services..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors sm:w-auto w-full"
      >
        Search
      </button>
    </form>
  )
}

