"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Calendar, Clock, Hotel, Plane, CreditCard, ChevronRight } from "lucide-react"
import type { OmraPackage } from "@/types/omra"
import OmraBookingModal from "@/components/OmraBookingModal"

// This would typically come from an API or database
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
      { name: "Al Safwah Royale Orchid", type: "3-star", price: 100 },
      { name: "Swissotel Al Maqam Makkah", type: "4-star", price: 150 },
      { name: "Anjum Hotel Makkah", type: "5-star", price: 200 },
    ],
    transportOptions: [
      { type: "Economy", price: 500 },
      { type: "Business", price: 1000 },
    ],
    additionalServices: [
      { name: "VIP Transport", price: 200 },
      { name: "Personal Guide", price: 300 },
      { name: "Photography Service", price: 150 },
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
      { name: "Raffles Makkah Palace", type: "5-star", price: 300 },
      { name: "Hyatt Regency Makkah", type: "5-star", price: 350 },
      { name: "Dar Al Tawhid Intercontinental Makkah", type: "5-star", price: 400 },
    ],
    transportOptions: [
      { type: "Business", price: 1500 },
      { type: "First Class", price: 2500 },
    ],
    additionalServices: [
      { name: "Private Car Service", price: 500 },
      { name: "Personal Concierge", price: 700 },
      { name: "Professional Photography Package", price: 300 },
    ],
  },
]

export default function OmraTripDetails() {
  const { id } = useParams()
  const [trip, setTrip] = useState<OmraPackage | null>(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  useEffect(() => {
    const foundTrip = omraPackages.find((pkg) => pkg.id === Number(id))
    setTrip(foundTrip || null)
  }, [id])

  if (!trip) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{trip.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="relative h-96 mb-6">
            <Image
              src={trip.image || "/placeholder.svg"}
              alt={trip.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Trip Overview</h2>
            <p className="text-gray-600 mb-4">{trip.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                <span>Departure: {trip.departureDate}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-500" />
                <span>Duration: {trip.duration} days</span>
              </div>
              <div className="flex items-center">
                <Hotel className="w-5 h-5 mr-2 text-blue-500" />
                <span>{trip.hotel}</span>
              </div>
              <div className="flex items-center">
                <Plane className="w-5 h-5 mr-2 text-blue-500" />
                <span>{trip.transport}</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Itinerary</h2>
            <ul className="space-y-2">
              {trip.itinerary.map((item, index) => (
                <li key={index} className="flex items-start">
                  <ChevronRight className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Spiritual Significance</h2>
            <p className="text-gray-600">{trip.spiritualSignificance}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Accommodations</h2>
            <div className="space-y-4">
              {trip.hotelOptions.map((hotel, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <h3 className="font-semibold">{hotel.name}</h3>
                    <p className="text-sm text-gray-600">{hotel.type}</p>
                  </div>
                  <p className="font-bold">${hotel.price}/night</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Transportation</h2>
            <div className="space-y-4">
              {trip.transportOptions.map((option, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  <h3 className="font-semibold">{option.type}</h3>
                  <p className="font-bold">${option.price}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Additional Services</h2>
            <div className="space-y-4">
              {trip.additionalServices.map((service, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  <h3 className="font-semibold">{service.name}</h3>
                  <p className="font-bold">${service.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h2 className="text-2xl font-semibold mb-4">Book This Trip</h2>
            <p className="text-3xl font-bold mb-4">${trip.price}</p>
            <ul className="mb-6">
              {trip.services.map((service, index) => (
                <li key={index} className="flex items-center mb-2">
                  <ChevronRight className="w-5 h-5 mr-2 text-green-500" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Book Now
            </button>
          </div>
        </div>
      </div>
      {isBookingModalOpen && <OmraBookingModal package={trip} onClose={() => setIsBookingModalOpen(false)} />}
    </div>
  )
}

