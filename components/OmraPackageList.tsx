"use client"

import { useState, useEffect, useContext } from "react"
import Image from "next/image"
import { Calendar, Hotel, Plane, Users, ArrowRight } from "lucide-react"
import type { OmraPackage } from "@/types/omra"
import { omraPackages } from "@/data/omraPackages"
import { OmraFilterContext } from "@/app/omra-packages/OmraPackagesClientPage"
import { useRouter } from "next/navigation"

export default function OmraPackageList() {
  const [filteredPackages, setFilteredPackages] = useState<OmraPackage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { filters } = useContext(OmraFilterContext)

  // Filter packages whenever filters change
  useEffect(() => {
    setIsLoading(true)

    try {
      // Safety check for omraPackages
      if (!omraPackages || !Array.isArray(omraPackages)) {
        setFilteredPackages([])
        setIsLoading(false)
        return
      }

      const filtered = omraPackages.filter((pkg) => {
        if (!pkg) return false

        // Filter by search query if present
        const matchesQuery =
          !filters.query ||
          pkg.name.toLowerCase().includes(filters.query.toLowerCase()) ||
          pkg.description.toLowerCase().includes(filters.query.toLowerCase())

        // Filter by price range
        const matchesPriceRange = pkg.price >= filters.priceRange[0] && pkg.price <= filters.priceRange[1]

        // Filter by duration
        const matchesDuration = filters.duration.length === 0 || filters.duration.includes(pkg.duration)

        // Filter by accommodation type
        const matchesAccommodation =
          filters.accommodationType.length === 0 ||
          (pkg.hotel && filters.accommodationType.some((type) => pkg.hotel.includes(type)))

        // Filter by transportation type
        const matchesTransportation =
          filters.transportationType.length === 0 ||
          (pkg.transport && filters.transportationType.some((type) => pkg.transport.includes(type)))

        return matchesQuery && matchesPriceRange && matchesDuration && matchesAccommodation && matchesTransportation
      })

      setFilteredPackages(filtered)
    } catch (error) {
      console.error("Error filtering packages:", error)
      setFilteredPackages(omraPackages || [])
    } finally {
      setIsLoading(false)
    }
  }, [filters])

  const handleViewPackage = (packageId: number) => {
    router.push(`/omra-packages/${packageId}`)
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {filteredPackages.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600 mb-4">No Omra packages found matching your criteria.</p>
          <p className="text-gray-600">Try adjusting your search parameters or browse all packages below.</p>
          <button
            onClick={() => {
              // Reset all filters
              const resetFilters = {
                ...filters,
                priceRange: [1000, 5000],
                duration: [],
                accommodationType: [],
                transportationType: [],
                query: "",
              }
              setFilteredPackages(omraPackages || [])
            }}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Show All Packages
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-blue-800">
              <span className="font-semibold">{filteredPackages.length}</span> packages found matching your criteria
            </p>
          </div>

          {filteredPackages.map((pkg) => (
            <div
              key={pkg?.id || Math.random()}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="md:flex">
                <div className="md:w-1/3 relative">
                  <div className="h-64 md:h-full relative">
                    <Image
                      src={pkg?.image || "/placeholder.svg?height=300&width=400"}
                      alt={pkg?.name || "Omra Package"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {pkg?.duration || "N/A"} days
                  </div>
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{pkg?.name || "Omra Package"}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{pkg?.description || "Contact us for details"}</p>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center">
                          <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                          <span>Next departure: {pkg?.departureDate || "Contact us"}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-5 h-5 mr-2 text-blue-500" />
                          <span>Group size: 15-30 pilgrims</span>
                        </div>
                        <div className="flex items-center">
                          <Hotel className="w-5 h-5 mr-2 text-blue-500" />
                          <span>{pkg?.hotel || "Various accommodations"}</span>
                        </div>
                        <div className="flex items-center">
                          <Plane className="w-5 h-5 mr-2 text-blue-500" />
                          <span>{pkg?.transport || "Various options"}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {(pkg?.services || []).slice(0, 3).map((service, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded"
                          >
                            {service}
                          </span>
                        ))}
                        {(pkg?.services?.length || 0) > 3 && (
                          <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                            +{(pkg?.services?.length || 0) - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <span className="text-gray-500 text-sm">Starting from</span>
                        <p className="text-2xl font-bold text-blue-600">${pkg?.price || "Contact us"}</p>
                        <span className="text-gray-500 text-sm">per person</span>
                      </div>
                      <button
                        onClick={() => pkg?.id && handleViewPackage(pkg.id)}
                        className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-md hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center relative overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center">
                          <span className="mr-2">Discover & Book</span>
                          <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                        <span className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

