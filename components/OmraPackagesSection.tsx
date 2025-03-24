"use client"

import { useState, useCallback } from "react"
import OmraFilterPanel from "./OmraFilterPanel"
import OmraTrips from "./OmraTrips"
import OmraBookingModal from "./OmraBookingModal"
import type { OmraPackage } from "@/types/omra"

export default function OmraPackagesSection() {
  const [filters, setFilters] = useState({
    minPrice: 1000,
    maxPrice: 5000,
    minDuration: 7,
    maxDuration: 21,
    accommodationType: [],
    transportationType: [],
  })
  const [selectedPackage, setSelectedPackage] = useState<OmraPackage | null>(null)

  // Replace the handleFilterChange callback with this memoized version
  const handleFilterChange = useCallback(
    (newFilters: typeof filters) => {
      // Only update if the filters have actually changed
      if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
        setFilters(newFilters)
      }
    },
    [filters],
  )

  const handleBookNow = useCallback((pkg: OmraPackage) => {
    setSelectedPackage(pkg)
  }, [])

  const handleCloseModal = useCallback(() => {
    setSelectedPackage(null)
  }, [])

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-1/4">
        <OmraFilterPanel filters={filters} onFilterChange={handleFilterChange} />
      </div>
      <div className="lg:w-3/4">
        <OmraTrips filters={filters} onBookNow={handleBookNow} />
      </div>
      {selectedPackage && <OmraBookingModal package={selectedPackage} onClose={handleCloseModal} />}
    </div>
  )
}

