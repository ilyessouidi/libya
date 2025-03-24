"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Hotel, Plane } from "lucide-react"

interface OmraFilterPanelProps {
  filters: {
    minPrice: number
    maxPrice: number
    minDuration: number
    maxDuration: number
    accommodationType: string[]
    transportationType: string[]
  }
  onFilterChange: (filters: OmraFilterPanelProps["filters"]) => void
}

export default function OmraFilterPanel({ filters, onFilterChange }: OmraFilterPanelProps) {
  const [localFilters, setLocalFilters] = useState(filters)
  const [isInitialRender, setIsInitialRender] = useState(true)

  useEffect(() => {
    // Only call onFilterChange when localFilters actually changes
    // and not on the initial render

    if (isInitialRender) {
      setIsInitialRender(false)
      return
    }

    onFilterChange(localFilters)
  }, [localFilters, onFilterChange, isInitialRender])

  const handlePriceChange = (value: number[]) => {
    setLocalFilters((prev) => ({ ...prev, minPrice: value[0], maxPrice: value[1] }))
  }

  const handleDurationChange = (value: number[]) => {
    setLocalFilters((prev) => ({ ...prev, minDuration: value[0], maxDuration: value[1] }))
  }

  const handleAccommodationChange = (type: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      accommodationType: prev.accommodationType.includes(type)
        ? prev.accommodationType.filter((t) => t !== type)
        : [...prev.accommodationType, type],
    }))
  }

  const handleTransportationChange = (type: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      transportationType: prev.transportationType.includes(type)
        ? prev.transportationType.filter((t) => t !== type)
        : [...prev.transportationType, type],
    }))
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      <div className="mb-6">
        <h4 className="font-medium mb-2">Price Range</h4>
        <Slider
          min={1000}
          max={5000}
          step={100}
          value={[localFilters.minPrice, localFilters.maxPrice]}
          onValueChange={handlePriceChange}
        />
        <div className="flex justify-between mt-2">
          <span>${localFilters.minPrice}</span>
          <span>${localFilters.maxPrice}</span>
        </div>
      </div>
      <div className="mb-6">
        <h4 className="font-medium mb-2">Duration (days)</h4>
        <Slider
          min={7}
          max={21}
          step={1}
          value={[localFilters.minDuration, localFilters.maxDuration]}
          onValueChange={handleDurationChange}
        />
        <div className="flex justify-between mt-2">
          <span>{localFilters.minDuration} days</span>
          <span>{localFilters.maxDuration} days</span>
        </div>
      </div>
      <div className="mb-6">
        <h4 className="font-medium mb-2">Accommodation Type</h4>
        {["3-star", "4-star", "5-star"].map((type) => (
          <div key={type} className="flex items-center mb-2">
            <Checkbox
              id={`accommodation-${type}`}
              checked={localFilters.accommodationType.includes(type)}
              onCheckedChange={() => handleAccommodationChange(type)}
            />
            <label htmlFor={`accommodation-${type}`} className="ml-2 flex items-center">
              <Hotel className="w-4 h-4 mr-1" />
              <span className="text-sm">{type}</span>
            </label>
          </div>
        ))}
      </div>
      <div>
        <h4 className="font-medium mb-2">Transportation</h4>
        {["Economy", "Business", "First Class"].map((type) => (
          <div key={type} className="flex items-center mb-2">
            <Checkbox
              id={`transportation-${type}`}
              checked={localFilters.transportationType.includes(type)}
              onCheckedChange={() => handleTransportationChange(type)}
            />
            <label htmlFor={`transportation-${type}`} className="ml-2 flex items-center">
              <Plane className="w-4 h-4 mr-1" />
              <span className="text-sm">{type}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

