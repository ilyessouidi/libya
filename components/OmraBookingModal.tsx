"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { X, Calendar, Users, CreditCard, Plus, Check } from "lucide-react"
import type { OmraPackage } from "@/types/omra"

interface OmraBookingModalProps {
  package: OmraPackage
  onClose: () => void
  initialDepartureDate?: string
  initialTravelers?: number
}

const steps = ["Trip Details", "Accommodations", "Transportation", "Additional Services", "Review"]

export default function OmraBookingModal({
  package: pkg,
  onClose,
  initialDepartureDate = "",
  initialTravelers = 1,
}: OmraBookingModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [bookingDetails, setBookingDetails] = useState({
    departureDate: initialDepartureDate || pkg.availableDates[0],
    travelers: initialTravelers,
    selectedHotel: pkg.hotelOptions[0],
    selectedTransport: pkg.transportOptions[0],
    selectedServices: [],
    contactInfo: {
      fullName: "",
      email: "",
      phone: "",
    },
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setBookingDetails((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }))
    } else {
      setBookingDetails((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleHotelSelect = (hotel: (typeof pkg.hotelOptions)[0]) => {
    setBookingDetails((prev) => ({ ...prev, selectedHotel: hotel }))
  }

  const handleTransportSelect = (transport: (typeof pkg.transportOptions)[0]) => {
    setBookingDetails((prev) => ({ ...prev, selectedTransport: transport }))
  }

  const handleServiceToggle = (service: (typeof pkg.additionalServices)[0]) => {
    setBookingDetails((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(service)
        ? prev.selectedServices.filter((s) => s !== service)
        : [...prev.selectedServices, service],
    }))
  }

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const calculateTotalPrice = () => {
    const basePrice = pkg.price * bookingDetails.travelers
    const hotelPrice = bookingDetails.selectedHotel.price * bookingDetails.travelers * pkg.duration
    const transportPrice = bookingDetails.selectedTransport.price * bookingDetails.travelers
    const additionalServicesPrice = bookingDetails.selectedServices.reduce((sum, service) => sum + service.price, 0)

    return basePrice + hotelPrice + transportPrice + additionalServicesPrice
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Generate a booking reference
      const bookingReference = Math.random().toString(36).substring(2, 10).toUpperCase()
      const totalPrice = calculateTotalPrice()

      // Redirect to payment page
      router.push(`/omra-payment?bookingRef=${bookingReference}&amount=${totalPrice}&packageId=${pkg.id}`)
      onClose()
    }, 1500)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <div className="mb-4">
              <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 mb-1">
                Departure Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  id="departureDate"
                  name="departureDate"
                  value={bookingDetails.departureDate}
                  onChange={handleInputChange}
                  className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {pkg.availableDates.map((date) => (
                    <option key={date} value={date}>
                      {date}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 mb-1">
                Number of Travelers
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  id="travelers"
                  name="travelers"
                  value={bookingDetails.travelers}
                  onChange={handleInputChange}
                  min="1"
                  max="30"
                  className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="contactInfo.fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="contactInfo.fullName"
                name="contactInfo.fullName"
                value={bookingDetails.contactInfo.fullName}
                onChange={handleInputChange}
                className="px-3 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="contactInfo.email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="contactInfo.email"
                name="contactInfo.email"
                value={bookingDetails.contactInfo.email}
                onChange={handleInputChange}
                className="px-3 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="contactInfo.phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="contactInfo.phone"
                name="contactInfo.phone"
                value={bookingDetails.contactInfo.phone}
                onChange={handleInputChange}
                className="px-3 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </>
        )
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-2">Select Accommodation</h3>
            {pkg.hotelOptions.map((hotel) => (
              <div
                key={hotel.name}
                className={`p-4 border rounded-md cursor-pointer ${
                  bookingDetails.selectedHotel === hotel ? "border-blue-500 bg-blue-50" : "border-gray-200"
                }`}
                onClick={() => handleHotelSelect(hotel)}
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h4 className="font-semibold">{hotel.name}</h4>
                    <p className="text-sm text-gray-600">{hotel.type}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="font-bold mr-3">${hotel.price}/night</p>
                    {bookingDetails.selectedHotel === hotel && <Check className="w-5 h-5 text-blue-500" />}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{hotel.description}</p>
              </div>
            ))}
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-2">Select Transportation</h3>
            {pkg.transportOptions.map((transport) => (
              <div
                key={transport.type}
                className={`p-4 border rounded-md cursor-pointer ${
                  bookingDetails.selectedTransport === transport ? "border-blue-500 bg-blue-50" : "border-gray-200"
                }`}
                onClick={() => handleTransportSelect(transport)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">{transport.type}</h4>
                  <div className="flex items-center">
                    <p className="font-bold mr-3">${transport.price}</p>
                    {bookingDetails.selectedTransport === transport && <Check className="w-5 h-5 text-blue-500" />}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{transport.description}</p>
              </div>
            ))}
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-2">Additional Services</h3>
            <p className="text-sm text-gray-600 mb-4">Enhance your Omra experience with these optional services:</p>
            {pkg.additionalServices.map((service) => (
              <div
                key={service.name}
                className={`p-4 border rounded-md cursor-pointer ${
                  bookingDetails.selectedServices.includes(service) ? "border-blue-500 bg-blue-50" : "border-gray-200"
                }`}
                onClick={() => handleServiceToggle(service)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">{service.name}</h4>
                  <div className="flex items-center">
                    <p className="font-bold mr-3">${service.price}</p>
                    {bookingDetails.selectedServices.includes(service) ? (
                      <Check className="w-5 h-5 text-blue-500" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        )
      case 4:
        const totalPrice = calculateTotalPrice()

        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-2">Booking Summary</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Contact Information</h4>
                <p>{bookingDetails.contactInfo.fullName}</p>
                <p>{bookingDetails.contactInfo.email}</p>
                <p>{bookingDetails.contactInfo.phone}</p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold mb-2">Trip Details</h4>
                <p>
                  <strong>Package:</strong> {pkg.name}
                </p>
                <p>
                  <strong>Departure Date:</strong> {bookingDetails.departureDate}
                </p>
                <p>
                  <strong>Travelers:</strong> {bookingDetails.travelers}
                </p>
                <p>
                  <strong>Duration:</strong> {pkg.duration} days
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold mb-2">Selected Options</h4>
                <p>
                  <strong>Hotel:</strong> {bookingDetails.selectedHotel.name} ({bookingDetails.selectedHotel.type}) - $
                  {bookingDetails.selectedHotel.price}/night
                </p>
                <p>
                  <strong>Transportation:</strong> {bookingDetails.selectedTransport.type} - $
                  {bookingDetails.selectedTransport.price}
                </p>
              </div>

              {bookingDetails.selectedServices.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Additional Services</h4>
                  <ul className="list-disc list-inside">
                    {bookingDetails.selectedServices.map((service) => (
                      <li key={service.name}>
                        {service.name} (${service.price})
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total Price:</span>
                  <span>${totalPrice}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Includes all taxes and fees</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <p className="text-sm text-yellow-800">
                By proceeding to payment, you agree to our terms and conditions. A 20% deposit is required to secure
                your booking.
              </p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Book {pkg.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <ol className="flex items-center w-full">
            {steps.map((step, index) => (
              <li
                key={step}
                className={`flex items-center ${
                  index < steps.length - 1 ? "w-full" : ""
                } ${index <= currentStep ? "text-blue-600" : "text-gray-500"}`}
              >
                <span
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    index <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {index + 1}
                </span>
                <span className="ml-2 text-sm hidden sm:inline">{step}</span>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${index < currentStep ? "bg-blue-600" : "bg-gray-300"}`}></div>
                )}
              </li>
            ))}
          </ol>
        </div>

        <form onSubmit={handleSubmit}>
          {renderStepContent()}

          <div className="mt-6 flex justify-between">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handlePrevStep}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Previous
              </button>
            )}

            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ml-auto"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 ml-auto flex items-center ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Proceed to Payment
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

