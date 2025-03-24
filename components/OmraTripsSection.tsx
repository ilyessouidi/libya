"use client"

import { useState, useCallback } from "react"
import OmraFilterPanel from "./OmraFilterPanel"
import OmraTrips from "./OmraTrips"
import OmraBookingModal from "./OmraBookingModal"
import type { OmraPackage } from "@/types/omra"

export default function OmraTripsSection() {
  const [filters, setFilters] = useState({
    minPrice: 1000,
    maxPrice: 5000,
    minDuration: 7,
    maxDuration: 21,
    accommodationType: [],
    transportationType: [],
  })
  const [selectedPackage, setSelectedPackage] = useState<OmraPackage | null>(null)

  const handleFilterChange = useCallback((newFilters: typeof filters) => {
    setFilters(newFilters)
  }, [])

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

