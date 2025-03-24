"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import BookingForm from "./BookingForm"

// Define types for room
interface Room {
  id: number
  name: string
  price: number
  capacity: number
}

// Define types for special offers
interface SpecialOffer {
  type: string
  name: string
  description: string
  discountPercentage: number
  minDaysInAdvance?: number
  minNights?: number
}

// Define types for hotel
interface Hotel {
  id: number
  name: string
  specialOffers?: SpecialOffer[]
  rooms: Room[]
}

// Define props interface
interface BookingWidgetProps {
  hotel: Hotel
  selectedRoom: Room | null
  onRoomSelect: (room: Room) => void
  initialCheckIn?: string
  initialCheckOut?: string
  initialGuests?: number
}

export default function BookingWidget({
  hotel,
  selectedRoom,
  onRoomSelect,
  initialCheckIn = "",
  initialCheckOut = "",
  initialGuests = 1,
}: BookingWidgetProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingComplete, setBookingComplete] = useState(false)

  const handleBookingDetailsSubmit = (details: any) => {
    setIsSubmitting(true)

    // Here you would typically send the booking data to your backend
    // For this example, we'll simulate a network request
    setTimeout(() => {
      // Generate a booking reference
      const bookingReference = Math.random().toString(36).substring(2, 10).toUpperCase()

      // Store booking details for invoice
      const bookingDetails = {
        bookingId: bookingReference,
        hotelName: hotel.name,
        roomName: selectedRoom?.name,
        checkIn: details.checkIn,
        checkOut: details.checkOut,
        nights: details.nights,
        guests: details.guests,
        totalPrice: selectedRoom ? selectedRoom.price * details.nights : 0,
        paymentMethod: details.paymentMethod,
        customerName: `${details.title} ${details.firstName} ${details.lastName}`,
        customerEmail: details.email,
        customerPhone: details.mobileNumber,
        bookingDate: new Date().toLocaleDateString(),
      }

      // In a real application, you would store this in a database
      // For this example, we'll encode it in the URL
      const bookingDetailsParam = encodeURIComponent(JSON.stringify(bookingDetails))

      setIsSubmitting(false)
      setBookingComplete(true)

      // Redirect to the invoice page
      router.push(`/booking-invoice?details=${bookingDetailsParam}`)
    }, 1500)
  }

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Wrap the entire content in a stable container */}
      <div className="relative">
        <h2 className="text-2xl font-semibold mb-4">Book Your Stay</h2>

        {/* Display special offers if available */}
        {hotel.specialOffers && Array.isArray(hotel.specialOffers) && hotel.specialOffers.length > 0 && (
          <div className="mb-4 p-3 bg-blue-50 rounded-md">
            <h3 className="text-sm font-semibold text-blue-700 mb-2">Available Offers:</h3>
            {hotel.specialOffers.map((offer, index) => (
              <div key={index} className="flex items-start mb-2 last:mb-0">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">{offer.name}</p>
              </div>
            ))}
          </div>
        )}

        {/* Use a simple fade transition without complex animations */}
        <BookingForm
          hotel={hotel}
          selectedRoom={selectedRoom}
          onRoomSelect={onRoomSelect}
          onSubmit={handleBookingDetailsSubmit}
          initialCheckIn={initialCheckIn}
          initialCheckOut={initialCheckOut}
          initialGuests={initialGuests}
          isSubmitting={isSubmitting}
          currentStep={currentStep}
          onNextStep={handleNextStep}
          onPreviousStep={handlePreviousStep}
        />
      </div>
    </div>
  )
}

