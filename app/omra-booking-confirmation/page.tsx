"use client"

import { useSearchParams } from "next/navigation"
import { CheckCircle } from "lucide-react"

export default function OmraBookingConfirmationPage() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("bookingId")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-4">Omra Booking Confirmed!</h1>
        <p className="text-center mb-6">
          Thank you for your Omra booking. Your booking ID is: <strong>{bookingId}</strong>
        </p>
        <p className="text-center text-gray-600">
          A confirmation email has been sent to your registered email address with all the details of your Omra booking.
        </p>
        <p className="text-center mt-6 text-sm text-gray-500">May Allah accept your Omra and bless your journey.</p>
      </div>
    </div>
  )
}

