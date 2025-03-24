"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { CheckCircle } from "lucide-react"

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const [bookingDetails, setBookingDetails] = useState({
    experienceId: "",
    startDate: "",
    travelers: "",
    services: [],
  })

  useEffect(() => {
    setBookingDetails({
      experienceId: searchParams.get("experienceId") || "",
      startDate: searchParams.get("startDate") || "",
      travelers: searchParams.get("travelers") || "",
      services: searchParams.get("services")?.split(",") || [],
    })
  }, [searchParams])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-center mb-4">Booking Confirmed!</h1>
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Booking Details:</h2>
          <p>
            <strong>Experience ID:</strong> {bookingDetails.experienceId}
          </p>
          <p>
            <strong>Start Date:</strong> {bookingDetails.startDate}
          </p>
          <p>
            <strong>Number of Travelers:</strong> {bookingDetails.travelers}
          </p>
          <p>
            <strong>Additional Services:</strong>
          </p>
          <ul className="list-disc list-inside">
            {bookingDetails.services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>
        <p className="text-center text-gray-600">
          Thank you for booking with us. We'll send you a confirmation email shortly with more details about your trip.
        </p>
      </div>
    </div>
  )
}

