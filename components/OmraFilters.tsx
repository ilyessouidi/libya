"use client"

import { useContext } from "react"
import { Hotel, Plane } from "lucide-react"
import { OmraFilterContext } from "@/app/omra-packages/OmraPackagesClientPage"

export default function OmraFilters() {
  const { filters, setFilters } = useContext(OmraFilterContext)

  const handleFilterChange = (filterType: string, value: string | number) => {
    // Create a new filters object to avoid direct state mutation
    const updatedFilters = { ...filters }

    if (filterType === "priceRange") {
      updatedFilters.priceRange = [updatedFilters.priceRange[0], value as number]
    } else {
      if (updatedFilters[filterType].includes(value)) {
        updatedFilters[filterType] = updatedFilters[filterType].filter((item) => item !== value)
      } else {
        updatedFilters[filterType] = [...updatedFilters[filterType], value]
      }
    }

    // Update context state
    setFilters(updatedFilters)
  }

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Price Range</h3>
        <input
          type="range"
          min="1000"
          max="5000"
          step="100"
          value={filters.priceRange[1]}
          onChange={(e) => handleFilterChange("priceRange", Number(e.target.value))}
          className="w-full accent-blue-600"
        />
        <div className="flex justify-between">
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-3">Duration (days)</h3>
        {[7, 10, 14].map((days) => (
          <label key={days} className="flex items-center mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.duration.includes(days)}
              onChange={() => handleFilterChange("duration", days)}
              className="mr-2 form-checkbox h-5 w-5 text-blue-600"
            />
            <span>{days} days</span>
          </label>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-3">Accommodation Type</h3>
        {["3-star", "4-star", "5-star", "family"].map((type) => (
          <label key={type} className="flex items-center mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.accommodationType.includes(type)}
              onChange={() => handleFilterChange("accommodationType", type)}
              className="mr-2 form-checkbox h-5 w-5 text-blue-600"
            />
            <Hotel className="w-5 h-5 mr-2 text-gray-600" />
            <span>{type}</span>
          </label>
        ))}
      </div>

      <div>
        <h3 className="font-semibold mb-3">Transportation</h3>
        {["Economy", "Business", "First Class"].map((type) => (
          <label key={type} className="flex items-center mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.transportationType.includes(type)}
              onChange={() => handleFilterChange("transportationType", type)}
              className="mr-2 form-checkbox h-5 w-5 text-blue-600"
            />
            <Plane className="w-5 h-5 mr-2 text-gray-600" />
            <span>{type}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

