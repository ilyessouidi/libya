"use client"

import { useState } from "react"
import { X, Calendar, Users, Check } from "lucide-react"
import { useRouter } from "next/navigation"

interface BookingModalProps {
  experience: {
    id: number
    title: string
    price: number
    included: string[]
  }
  onClose: () => void
}

export default function BookingModal({ experience, onClose }: BookingModalProps) {
  const [startDate, setStartDate] = useState("")
  const [travelers, setTravelers] = useState(1)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const router = useRouter()

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]))
  }

  const handleBooking = () => {
    // Here you would typically send the booking data to your backend
    // For this example, we'll just navigate to a checkout page
    router.push(
      `/checkout?experienceId=${experience.id}&startDate=${startDate}&travelers=${travelers}&services=${selectedServices.join(",")}`,
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Book {experience.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Travelers</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={travelers}
              onChange={(e) => setTravelers(Number(e.target.value))}
              min="1"
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Included Services</h3>
          {experience.included.map((service, index) => (
            <div key={index} className="flex items-center mb-2">
              <Check className="w-5 h-5 text-green-500 mr-2" />
              <span>{service}</span>
            </div>
          ))}
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Additional Services</h3>
          <div className="space-y-2">
            {["Travel Insurance", "Airport Transfer", "Guided Tours"].map((service, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                  className="mr-2"
                />
                {service}
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-semibold">Total Price:</span>
          <span className="text-2xl font-bold">${experience.price * travelers}</span>
        </div>
        <button
          onClick={handleBooking}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  )
}

