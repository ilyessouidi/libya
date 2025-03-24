"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import {
  Calendar,
  Clock,
  Hotel,
  Plane,
  MapPin,
  Users,
  Star,
  Check,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  CreditCard,
} from "lucide-react"
import { omraPackages } from "@/data/omraPackages"
import OmraBookingModal from "@/components/OmraBookingModal"
import Breadcrumb from "@/components/Breadcrumb"

export default function OmraPackageDetail() {
  const { id } = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [omraPackage, setOmraPackage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    itinerary: false,
    hotelOptions: false,
    transportOptions: false,
    additionalServices: false,
  })

  // Get search parameters
  const departureDate = searchParams.get("departureDate") || ""
  const travelers = Number(searchParams.get("travelers")) || 1

  useEffect(() => {
    // Find the Omra package by ID
    const packageId = Number(id)
    const foundPackage = omraPackages.find((pkg) => pkg.id === packageId)

    if (foundPackage) {
      setOmraPackage(foundPackage)
    }

    setLoading(false)
  }, [id])

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Omra package information...</p>
        </div>
      </div>
    )
  }

  if (!omraPackage) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Package Not Found</h2>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find the Omra package you're looking for.</p>
          <button
            onClick={() => router.push("/omra-packages")}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center mx-auto"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Omra Packages
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={omraPackage.image || "/placeholder.svg?height=400&width=800"}
            alt={omraPackage.name}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/60"></div>

          {/* Decorative elements */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.3),transparent_70%)]"></div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-white [clip-path:polygon(0_100%,100%_100%,100%_60%,75%_40%,50%_60%,25%_40%,0_60%)]"></div>
        </div>

        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 bg-blue-700 text-blue-100 rounded-full text-sm font-medium mb-4">
              Sacred Journey
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">{omraPackage.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <Calendar className="w-5 h-5 mr-2" />
                <span>Departure: {omraPackage.departureDate}</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <Clock className="w-5 h-5 mr-2" />
                <span>Duration: {omraPackage.duration} days</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <Users className="w-5 h-5 mr-2" />
                <span>Group Size: 15-30 pilgrims</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10 -mt-10">
        <div className="flex justify-between items-center mb-6">
          <Breadcrumb />
          <button
            onClick={() => router.back()}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors bg-white py-2 px-4 rounded-full shadow-sm hover:shadow"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to packages
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {/* Overview Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">Package Overview</h2>
              <p className="text-gray-700 mb-6">{omraPackage.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <Hotel className="w-5 h-5 mr-2 text-blue-500" />
                  <span>
                    <strong>Accommodation:</strong> {omraPackage.hotel}
                  </span>
                </div>
                <div className="flex items-center">
                  <Plane className="w-5 h-5 mr-2 text-blue-500" />
                  <span>
                    <strong>Transportation:</strong> {omraPackage.transport}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                  <span>
                    <strong>Destinations:</strong> Mecca, Medina
                  </span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  <span>
                    <strong>Package Rating:</strong> 4.8/5
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3">Included Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                {omraPackage.services.map((service, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="w-5 h-5 mr-2 text-green-500" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-semibold mb-3">Available Departure Dates</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {omraPackage.availableDates.map((date, index) => (
                  <div key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                    {date}
                  </div>
                ))}
              </div>
            </div>

            {/* Spiritual Significance */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">Spiritual Significance</h2>
              <p className="text-gray-700">{omraPackage.spiritualSignificance}</p>
            </div>

            {/* Itinerary Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Detailed Itinerary</h2>
                <button onClick={() => toggleSection("itinerary")} className="text-blue-500 flex items-center">
                  {expandedSections.itinerary ? (
                    <>
                      <ChevronUp className="w-5 h-5 mr-1" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-5 h-5 mr-1" />
                      Show All
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-4">
                {omraPackage.itinerary.slice(0, expandedSections.itinerary ? undefined : 3).map((day, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                    <h3 className="font-semibold text-lg">{day.split(":")[0]}</h3>
                    <p className="text-gray-700">{day.split(":")[1]}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Accommodation Options */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Accommodation Options</h2>
                <button onClick={() => toggleSection("hotelOptions")} className="text-blue-500 flex items-center">
                  {expandedSections.hotelOptions ? (
                    <>
                      <ChevronUp className="w-5 h-5 mr-1" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-5 h-5 mr-1" />
                      Show All
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-4">
                {omraPackage.hotelOptions
                  .slice(0, expandedSections.hotelOptions ? undefined : 2)
                  .map((hotel, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-lg">{hotel.name}</h3>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                          {hotel.type}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-2">{hotel.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Hotel className="w-5 h-5 mr-2 text-blue-500" />
                          <span>Proximity to Haram: 500m</span>
                        </div>
                        <span className="font-bold">${hotel.price}/night</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Transportation Options */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Transportation Options</h2>
                <button onClick={() => toggleSection("transportOptions")} className="text-blue-500 flex items-center">
                  {expandedSections.transportOptions ? (
                    <>
                      <ChevronUp className="w-5 h-5 mr-1" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-5 h-5 mr-1" />
                      Show All
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-4">
                {omraPackage.transportOptions
                  .slice(0, expandedSections.transportOptions ? undefined : 1)
                  .map((transport, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-lg">{transport.type} Class</h3>
                        <span className="font-bold">${transport.price}</span>
                      </div>
                      <p className="text-gray-700">{transport.description}</p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Additional Services */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Additional Services</h2>
                <button onClick={() => toggleSection("additionalServices")} className="text-blue-500 flex items-center">
                  {expandedSections.additionalServices ? (
                    <>
                      <ChevronUp className="w-5 h-5 mr-1" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-5 h-5 mr-1" />
                      Show All
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-4">
                {omraPackage.additionalServices
                  .slice(0, expandedSections.additionalServices ? undefined : 2)
                  .map((service, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-lg">{service.name}</h3>
                        <span className="font-bold">${service.price}</span>
                      </div>
                      <p className="text-gray-700">{service.description}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-2xl font-semibold mb-4">Book This Package</h2>
              <div className="text-3xl font-bold text-blue-600 mb-4">${omraPackage.price}</div>
              <p className="text-gray-600 mb-6">per person, all inclusive</p>

              {/* Pre-filled booking details if available */}
              {(departureDate || travelers > 1) && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Your Selection</h3>
                  {departureDate && (
                    <div className="flex items-center mb-2">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      <span>Departure: {departureDate}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-blue-500" />
                    <span>Travelers: {travelers}</span>
                  </div>
                </div>
              )}

              <div className="space-y-3 mb-6">
                <h3 className="font-semibold">Package Highlights:</h3>
                {omraPackage.services.slice(0, 4).map((service, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Book Now
              </button>

              <div className="mt-4 text-center text-sm text-gray-500">
                No payment required today. Reserve your spot now.
              </div>
            </div>
          </div>
        </div>

        {isBookingModalOpen && (
          <OmraBookingModal
            package={omraPackage}
            onClose={() => setIsBookingModalOpen(false)}
            initialDepartureDate={departureDate}
            initialTravelers={travelers}
          />
        )}
      </div>
    </div>
  )
}

