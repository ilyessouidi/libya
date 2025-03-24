"use client"

import { useState } from "react"
import { Hotel, Plane, Calendar, Clock, ChevronDown, ChevronUp } from "lucide-react"
import type { OmraPackage } from "@/types/omra"
import OmraBookingModal from "./OmraBookingModal"

interface OmraTripsProps {
  filters: {
    minPrice: number
    maxPrice: number
    minDuration: number
    maxDuration: number
    accommodationType: string[]
    transportationType: string[]
  }
}

const omraPackages: OmraPackage[] = [
  {
    id: 1,
    name: "Standard Omra Package",
    image: "/omra-standard.jpg",
    departureDate: "2023-10-15",
    duration: 10,
    hotel: "3-star hotel in Mecca",
    transport: "Economy class flights",
    price: 1500,
    description:
      "Experience the spiritual journey of Omra with our comprehensive standard package. This package is designed for those seeking a meaningful pilgrimage without compromising on comfort and convenience.",
    services: ["Visa", "Meals", "Guide", "Airport Transfers"],
    itinerary: [
      "Day 1: Arrival in Jeddah and transfer to Mecca",
      "Day 2-5: Perform Omra rituals including Tawaf and Sa'i",
      "Day 6-7: Visit historical sites in Mecca",
      "Day 8-9: Optional visit to Medina",
      "Day 10: Return journey",
    ],
    spiritualSignificance:
      "Omra is a sacred pilgrimage that offers Muslims the opportunity to renew their faith, seek forgiveness, and draw closer to Allah. Each step of the journey, from the Tawaf around the Kaaba to the Sa'i between Safa and Marwa, holds deep spiritual meaning and helps pilgrims connect with Islamic history and teachings.",
    availableDates: ["2023-10-15", "2023-11-01", "2023-11-15", "2023-12-01"],
    hotelOptions: [
      {
        name: "Al Safwah Royale Orchid",
        type: "3-star",
        price: 100,
        description:
          "Comfortable accommodations within walking distance of the Masjid al-Haram. Enjoy modern amenities and a peaceful atmosphere for your spiritual journey.",
      },
      {
        name: "Swissotel Al Maqam Makkah",
        type: "4-star",
        price: 150,
        description:
          "Experience luxury and convenience with direct access to the Masjid al-Haram. Spacious rooms, excellent dining options, and top-notch services await you.",
      },
      {
        name: "Anjum Hotel Makkah",
        type: "5-star",
        price: 200,
        description:
          "Indulge in ultimate luxury and unparalleled views of the Holy Mosque. Exquisite dining, world-class amenities, and personalized service for a truly memorable Omra experience.",
      },
    ],
    transportOptions: [
      {
        type: "Economy",
        price: 500,
        description: "Comfortable seating and standard amenities for a pleasant journey to and from Mecca.",
      },
      {
        type: "Business",
        price: 1000,
        description:
          "Enjoy extra legroom, priority boarding, and enhanced meal options for a more relaxed travel experience.",
      },
    ],
    additionalServices: [
      {
        name: "VIP Transport",
        price: 200,
        description:
          "Travel in comfort with private, air-conditioned vehicles for all your transportation needs during your stay.",
      },
      {
        name: "Personal Guide",
        price: 300,
        description: "Benefit from the knowledge and assistance of an experienced guide throughout your Omra journey.",
      },
      {
        name: "Photography Service",
        price: 150,
        description:
          "Capture your spiritual journey with professional photography services, providing you with lasting memories of your Omra.",
      },
    ],
  },
  {
    id: 2,
    name: "Premium Omra Package",
    image: "/omra-premium.jpg",
    departureDate: "2023-11-01",
    duration: 14,
    hotel: "5-star hotel in Mecca and Medina",
    transport: "Business class flights",
    price: 3000,
    description:
      "Embark on a luxurious and spiritually enriching Omra journey with our premium package. Enjoy top-tier accommodations, personalized services, and an extended itinerary to make the most of your pilgrimage.",
    services: ["Visa", "Gourmet Meals", "Private Guide", "VIP Transport", "Luxury Accommodations"],
    itinerary: [
      "Day 1: Arrival in Jeddah, VIP transfer to Mecca",
      "Day 2-6: Perform Omra rituals with personal guide",
      "Day 7-8: Exclusive tours of historical sites in Mecca",
      "Day 9-12: Visit to Medina, including Prophet's Mosque",
      "Day 13: Reflection and preparation for return",
      "Day 14: Return journey with VIP airport service",
    ],
    spiritualSignificance:
      "Our premium Omra package offers an elevated spiritual experience, allowing pilgrims to focus deeply on their connection with Allah. With extended time in both Mecca and Medina, pilgrims have ample opportunity for prayer, reflection, and learning about Islamic history in the holiest sites of Islam.",
    availableDates: ["2023-11-01", "2023-11-15", "2023-12-01", "2023-12-15"],
    hotelOptions: [
      {
        name: "Raffles Makkah Palace",
        type: "5-star",
        price: 300,
        description:
          "Experience unparalleled luxury and breathtaking views of the Kaaba. Impeccable service, exquisite dining, and opulent accommodations await you.",
      },
      {
        name: "Hyatt Regency Makkah",
        type: "5-star",
        price: 350,
        description:
          "Enjoy a seamless blend of comfort and convenience with direct access to the Masjid al-Haram. Spacious rooms, world-class amenities, and exceptional service for a memorable stay.",
      },
      {
        name: "Dar Al Tawhid Intercontinental Makkah",
        type: "5-star",
        price: 400,
        description:
          "Immerse yourself in luxury and tranquility just steps away from the Holy Mosque. Elegant accommodations, fine dining, and personalized service for an unforgettable Omra experience.",
      },
    ],
    transportOptions: [
      {
        type: "Business",
        price: 1500,
        description:
          "Travel in style and comfort with spacious seating, premium amenities, and priority service for a relaxing journey.",
      },
      {
        type: "First Class",
        price: 2500,
        description:
          "Indulge in the ultimate travel experience with luxurious seating, gourmet meals, and personalized attention throughout your journey.",
      },
    ],
    additionalServices: [
      {
        name: "Private Car Service",
        price: 500,
        description:
          "Enjoy the convenience and comfort of a private car service for all your transportation needs during your stay in Mecca and Medina.",
      },
      {
        name: "Personal Concierge",
        price: 700,
        description:
          "Benefit from the expertise and assistance of a dedicated concierge to cater to your every need and ensure a seamless Omra experience.",
      },
      {
        name: "Professional Photography Package",
        price: 300,
        description:
          "Preserve your cherished memories with a professional photography package, capturing the highlights of your spiritual journey in stunning detail.",
      },
    ],
  },
]

export default function OmraTrips({ filters }: OmraTripsProps) {
  const [selectedPackage, setSelectedPackage] = useState<OmraPackage | null>(null)
  const [expandedPackage, setExpandedPackage] = useState<number | null>(null)

  const filteredPackages = omraPackages.filter((pkg) => {
    const matchesPrice = pkg.price >= filters.minPrice && pkg.price <= filters.maxPrice
    const matchesDuration = pkg.duration >= filters.minDuration && pkg.duration <= filters.maxDuration
    const matchesAccommodation =
      filters.accommodationType.length === 0 || filters.accommodationType.some((type) => pkg.hotel.includes(type))
    const matchesTransportation =
      filters.transportationType.length === 0 || filters.transportationType.some((type) => pkg.transport.includes(type))
    return matchesPrice && matchesDuration && matchesAccommodation && matchesTransportation
  })

  const togglePackageDetails = (packageId: number) => {
    setExpandedPackage(expandedPackage === packageId ? null : packageId)
  }

  return (
    <div className="space-y-8">
      {filteredPackages.map((pkg) => (
        <div key={pkg.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-semibold">{pkg.name}</h3>
              <span className="text-2xl font-bold text-green-600">${pkg.price}</span>
            </div>
            <p className="text-gray-600 mb-4">{pkg.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                <span>Departure: {pkg.departureDate}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-500" />
                <span>Duration: {pkg.duration} days</span>
              </div>
              <div className="flex items-center">
                <Hotel className="w-5 h-5 mr-2 text-blue-500" />
                <span>{pkg.hotel}</span>
              </div>
              <div className="flex items-center">
                <Plane className="w-5 h-5 mr-2 text-blue-500" />
                <span>{pkg.transport}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {pkg.services.map((service) => (
                <span key={service} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {service}
                </span>
              ))}
            </div>
            <button onClick={() => togglePackageDetails(pkg.id)} className="text-blue-500 flex items-center mb-4">
              {expandedPackage === pkg.id ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1" />
                  Hide Details
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" />
                  Show Details
                </>
              )}
            </button>
            {expandedPackage === pkg.id && (
              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Itinerary</h4>
                  <ul className="list-disc list-inside">
                    {pkg.itinerary.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Spiritual Significance</h4>
                  <p>{pkg.spiritualSignificance}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Hotel Options</h4>
                  {pkg.hotelOptions.map((hotel, index) => (
                    <div key={index} className="mb-2">
                      <p className="font-medium">
                        {hotel.name} ({hotel.type}) - ${hotel.price}/night
                      </p>
                      <p className="text-sm text-gray-600">{hotel.description}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Transport Options</h4>
                  {pkg.transportOptions.map((transport, index) => (
                    <div key={index} className="mb-2">
                      <p className="font-medium">
                        {transport.type} - ${transport.price}
                      </p>
                      <p className="text-sm text-gray-600">{transport.description}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Additional Services</h4>
                  {pkg.additionalServices.map((service, index) => (
                    <div key={index} className="mb-2">
                      <p className="font-medium">
                        {service.name} - ${service.price}
                      </p>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button
              onClick={() => setSelectedPackage(pkg)}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 mt-4"
            >
              Book Now
            </button>
          </div>
        </div>
      ))}
      {selectedPackage && <OmraBookingModal package={selectedPackage} onClose={() => setSelectedPackage(null)} />}
    </div>
  )
}

