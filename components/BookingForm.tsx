"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Calendar,
  Users,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Check,
  Shield,
  CreditCardIcon,
  AlertCircle,
} from "lucide-react"

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

// Define types for form data
interface FormData {
  checkIn: string
  checkOut: string
  guests: number
  roomType: string | number
  nights: number
  totalPrice: number
  title: string
  firstName: string
  lastName: string
  email: string
  mobileNumber: string
  paymentMethod: string
  cardNumber: string
  cardHolder: string
  expiryDate: string
  cvv: string
  cibAccountNumber: string
  cibPin: string
  edinarWalletId: string
  edinarPassword: string
  postalCardNumber: string
  postalCardHolder: string
  postalExpiryDate: string
  postalCvv: string
  acceptTerms: boolean
}

// Define props interface
interface BookingFormProps {
  hotel: Hotel
  selectedRoom: Room | null
  onRoomSelect: (room: Room) => void
  onSubmit: (formData: FormData) => void
  initialCheckIn?: string
  initialCheckOut?: string
  initialGuests?: number
  isSubmitting?: boolean
  currentStep?: number
  onNextStep?: () => void
  onPreviousStep?: () => void
}

export default function BookingForm({
  hotel,
  selectedRoom,
  onRoomSelect,
  onSubmit,
  initialCheckIn = "",
  initialCheckOut = "",
  initialGuests = 1,
  isSubmitting = false,
  currentStep = 1,
  onNextStep,
  onPreviousStep,
}: BookingFormProps) {
  const [formData, setFormData] = useState<FormData>({
    // Booking details
    checkIn: initialCheckIn,
    checkOut: initialCheckOut,
    guests: initialGuests,
    roomType: selectedRoom?.id || "",
    nights: 1,
    totalPrice: selectedRoom?.price || 0,

    // Personal information
    title: "M.",
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",

    // Payment information
    paymentMethod: "visa",
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",

    // CIB specific fields
    cibAccountNumber: "",
    cibPin: "",

    // E-Dinar specific fields
    edinarWalletId: "",
    edinarPassword: "",

    // Postal specific fields
    postalCardNumber: "",
    postalCardHolder: "",
    postalExpiryDate: "",
    postalCvv: "",

    // Terms and conditions
    acceptTerms: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  // Calculate nights and total price when dates change
  useEffect(() => {
    if (formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn)
      const checkOutDate = new Date(formData.checkOut)

      // Calculate the difference in days
      if (checkInDate && checkOutDate && checkOutDate > checkInDate) {
        const diffTime = checkOutDate.getTime() - checkInDate.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        // Calculate base price
        let totalPrice = selectedRoom ? selectedRoom.price * diffDays : 0

        // Apply special offers if available
        const specialOffers = hotel?.specialOffers || []
        if (Array.isArray(specialOffers) && specialOffers.length > 0) {
          // Early booking discount
          const earlyBookingOffer = specialOffers.find((offer) => offer.type === "earlyBooking")
          if (earlyBookingOffer && earlyBookingOffer.minDaysInAdvance) {
            const today = new Date()
            const daysUntilCheckIn = Math.ceil((checkInDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
            if (daysUntilCheckIn >= earlyBookingOffer.minDaysInAdvance) {
              totalPrice = totalPrice * (1 - earlyBookingOffer.discountPercentage / 100)
            }
          }

          // Long stay discount
          const longStayOffer = specialOffers.find((offer) => offer.type === "longStay")
          if (longStayOffer && longStayOffer.minNights && diffDays >= longStayOffer.minNights) {
            totalPrice = totalPrice * (1 - longStayOffer.discountPercentage / 100)
          }
        }

        setFormData((prev) => ({
          ...prev,
          nights: diffDays,
          totalPrice: totalPrice,
        }))
      }
    }
  }, [formData.checkIn, formData.checkOut, selectedRoom, hotel?.specialOffers])

  // Update room type when selectedRoom changes
  useEffect(() => {
    if (selectedRoom) {
      setFormData((prev) => ({
        ...prev,
        roomType: selectedRoom.id,
        totalPrice: selectedRoom.price * formData.nights,
      }))
    }
  }, [selectedRoom, formData.nights])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    // Handle checkbox inputs
    const inputValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value

    // Clear related errors when a field is changed
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }))

    setFormData((prev) => ({ ...prev, [name]: inputValue }))
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.checkIn) {
        newErrors.checkIn = "Check-in date is required"
      }

      if (!formData.checkOut) {
        newErrors.checkOut = "Check-out date is required"
      } else if (new Date(formData.checkOut) <= new Date(formData.checkIn)) {
        newErrors.checkOut = "Check-out date must be after check-in date"
      }
    } else if (step === 2) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required"
      }

      if (!formData.lastName.trim()) {
        newErrors.lastName = "Last name is required"
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email is required"
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid"
      }

      if (!formData.mobileNumber.trim()) {
        newErrors.mobileNumber = "Mobile number is required"
      }
    } else if (step === 3) {
      if (formData.paymentMethod === "visa" || formData.paymentMethod === "mastercard") {
        if (!formData.cardNumber.trim()) {
          newErrors.cardNumber = "Card number is required"
        } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
          newErrors.cardNumber = "Card number must be 16 digits"
        }

        if (!formData.cardHolder.trim()) {
          newErrors.cardHolder = "Card holder name is required"
        }

        if (!formData.expiryDate.trim()) {
          newErrors.expiryDate = "Expiry date is required"
        } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
          newErrors.expiryDate = "Expiry date must be in MM/YY format"
        }

        if (!formData.cvv.trim()) {
          newErrors.cvv = "CVV is required"
        } else if (!/^\d{3,4}$/.test(formData.cvv)) {
          newErrors.cvv = "CVV must be 3 or 4 digits"
        }
      }

      if (!formData.acceptTerms) {
        newErrors.acceptTerms = "You must accept the terms and conditions"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStepClick = () => {
    if (validateStep(currentStep) && onNextStep) {
      onNextStep()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateStep(3)) {
      // Simulate payment processing
      setPaymentSuccess(true)

      // After 2 seconds, submit the form
      setTimeout(() => {
        onSubmit(formData)
      }, 2000)
    }
  }

  // Format date for input
  const formatDateForInput = (dateString: string): string => {
    if (!dateString) return ""

    // Ensure we have a proper date format for the input
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return ""

    return date.toISOString().split("T")[0]
  }

  // Render step 1: Booking details
  const renderBookingDetails = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Booking Details</h3>

      <div>
        <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-1">
          Check-in Date*
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="date"
            id="checkIn"
            name="checkIn"
            value={formatDateForInput(formData.checkIn)}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.checkIn ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
            min={new Date().toISOString().split("T")[0]}
            required
          />
          {errors.checkIn && <p className="text-red-500 text-xs mt-1">{errors.checkIn}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-1">
          Check-out Date*
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="date"
            id="checkOut"
            name="checkOut"
            value={formatDateForInput(formData.checkOut)}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.checkOut ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
            min={
              formData.checkIn
                ? new Date(formData.checkIn).toISOString().split("T")[0]
                : new Date().toISOString().split("T")[0]
            }
            required
          />
          {errors.checkOut && <p className="text-red-500 text-xs mt-1">{errors.checkOut}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
          Number of Guests*
        </label>
        <div className="relative">
          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="number"
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleInputChange}
            min="1"
            max={selectedRoom?.capacity || 10}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {selectedRoom && <p className="text-xs text-gray-500 mt-1">Max capacity: {selectedRoom.capacity} guests</p>}
      </div>

      <div>
        <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 mb-1">
          Room Type*
        </label>
        <select
          id="roomType"
          name="roomType"
          value={formData.roomType}
          onChange={(e) => {
            handleInputChange(e)
            const selectedRoomId = Number(e.target.value)
            const room = hotel?.rooms?.find((room) => room.id === selectedRoomId)
            if (room) {
              onRoomSelect(room)
            }
          }}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          {(hotel?.rooms || []).map((room) => (
            <option key={room.id} value={room.id}>
              {room.name} - ${room.price}/night (Up to {room.capacity} guests)
            </option>
          ))}
        </select>
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <h3 className="font-semibold mb-2">Booking Summary</h3>
        <div className="flex justify-between mb-1">
          <span>Room:</span>
          <span>{selectedRoom?.name}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>Price per night:</span>
          <span>${selectedRoom?.price}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>Nights:</span>
          <span>{formData.nights}</span>
        </div>

        {/* Display applied special offers */}
        {hotel?.specialOffers && Array.isArray(hotel.specialOffers) && hotel.specialOffers.length > 0 && (
          <div className="mt-2 mb-2">
            <h4 className="text-sm font-medium text-green-600">Applied Offers:</h4>
            {hotel.specialOffers.map((offer, index) => {
              // Check if early booking offer applies
              if (offer?.type === "earlyBooking" && offer?.minDaysInAdvance) {
                const today = new Date()
                const checkInDate = new Date(formData.checkIn)
                const daysUntilCheckIn = Math.ceil((checkInDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
                if (daysUntilCheckIn >= offer.minDaysInAdvance) {
                  return (
                    <div key={index} className="text-sm text-green-600 flex justify-between">
                      <span>Early Booking Discount:</span>
                      <span>-{offer.discountPercentage}%</span>
                    </div>
                  )
                }
              }

              // Check if long stay offer applies
              if (offer?.type === "longStay" && offer?.minNights && formData.nights >= offer.minNights) {
                return (
                  <div key={index} className="text-sm text-green-600 flex justify-between">
                    <span>Long Stay Discount:</span>
                    <span>-{offer.discountPercentage}%</span>
                  </div>
                )
              }

              return null
            })}
          </div>
        )}

        <div className="flex justify-between font-bold border-t pt-2 mt-2">
          <span>Total:</span>
          <span>${formData.totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )

  // Render step 2: Personal information
  const renderPersonalInformation = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Personal Information</h3>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title*
        </label>
        <select
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="M.">M.</option>
          <option value="Mme">Mme</option>
          <option value="Mlle">Mlle</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name*
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.firstName ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
            required
          />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name*
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.lastName ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
            required
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address*
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
          }`}
          required
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">
          Mobile Number*
        </label>
        <input
          type="tel"
          id="mobileNumber"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.mobileNumber ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
          }`}
          placeholder="+216 XX XXX XXX"
          required
        />
        {errors.mobileNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>}
      </div>

      <div className="p-4 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Your personal information is secure and will only be used for booking purposes. We will
          send your booking confirmation to the email address provided.
        </p>
      </div>
    </div>
  )

  // Render step 3: Payment information
  const renderPaymentInformation = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Payment Information</h3>

      {paymentSuccess ? (
        <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-start animate-fadeIn">
          <Check className="text-green-500 w-5 h-5 mr-3 mt-0.5" />
          <div>
            <h4 className="font-medium text-green-800">Payment Successful!</h4>
            <p className="text-green-700 text-sm">
              Your payment has been processed successfully. We're preparing your booking confirmation.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex items-start mb-4">
            <Shield className="text-blue-500 w-5 h-5 mr-3 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-800">Secure Payment</h4>
              <p className="text-blue-700 text-sm">
                Your payment information is encrypted and secure. We use industry-standard security measures to protect
                your data.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Payment Method*</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <label
                className={`border rounded-md p-3 flex flex-col items-center cursor-pointer transition-all ${formData.paymentMethod === "visa" ? "border-blue-500 bg-blue-50 shadow-sm" : "hover:border-gray-300"}`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="visa"
                  checked={formData.paymentMethod === "visa"}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className="h-8 flex items-center justify-center">
                  <img
                    src="/visa-logo.png"
                    alt="Visa"
                    className="h-6"
                    onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/60x40?text=VISA")}
                  />
                </div>
                <span className="text-sm mt-2">Visa/MasterCard</span>
              </label>

              <label
                className={`border rounded-md p-3 flex flex-col items-center cursor-pointer transition-all ${formData.paymentMethod === "cib" ? "border-blue-500 bg-blue-50 shadow-sm" : "hover:border-gray-300"}`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cib"
                  checked={formData.paymentMethod === "cib"}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className="h-8 flex items-center justify-center">
                  <img
                    src="/cib-logo.png"
                    alt="CIB"
                    className="h-6"
                    onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/60x40?text=CIB")}
                  />
                </div>
                <span className="text-sm mt-2">CIB</span>
              </label>

              <label
                className={`border rounded-md p-3 flex flex-col items-center cursor-pointer transition-all ${formData.paymentMethod === "edinar" ? "border-blue-500 bg-blue-50 shadow-sm" : "hover:border-gray-300"}`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="edinar"
                  checked={formData.paymentMethod === "edinar"}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className="h-8 flex items-center justify-center">
                  <img
                    src="/edinar-logo.png"
                    alt="E-Dinar"
                    className="h-6"
                    onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/60x40?text=E-DINAR")}
                  />
                </div>
                <span className="text-sm mt-2">E-Dinar</span>
              </label>

              <label
                className={`border rounded-md p-3 flex flex-col items-center cursor-pointer transition-all ${formData.paymentMethod === "postal" ? "border-blue-500 bg-blue-50 shadow-sm" : "hover:border-gray-300"}`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="postal"
                  checked={formData.paymentMethod === "postal"}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className="h-8 flex items-center justify-center">
                  <img
                    src="/postal-logo.png"
                    alt="Visa Electron Postal"
                    className="h-6"
                    onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/60x40?text=POSTAL")}
                  />
                </div>
                <span className="text-sm mt-2">Visa Electron Postal</span>
              </label>
            </div>
          </div>

          <div className="mt-6 transition-all duration-300 ease-in-out">
            {/* Visa/MasterCard Payment Form */}
            {formData.paymentMethod === "visa" && (
              <div className="animate-fadeIn space-y-4 p-4 border border-gray-200 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-700">Credit Card Details</h4>
                  <div className="flex space-x-2">
                    <img
                      src="/visa-logo.png"
                      alt="Visa"
                      className="h-6"
                      onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/60x40?text=VISA")}
                    />
                    <img
                      src="/mastercard-logo.png"
                      alt="MasterCard"
                      className="h-6"
                      onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/60x40?text=MC")}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number*
                  </label>
                  <div className="relative">
                    <CreditCardIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        errors.cardNumber ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                      }`}
                      maxLength="19"
                    />
                    {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Holder Name*
                  </label>
                  <input
                    type="text"
                    id="cardHolder"
                    name="cardHolder"
                    value={formData.cardHolder}
                    onChange={handleInputChange}
                    placeholder="JOHN DOE"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.cardHolder ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                    }`}
                  />
                  {errors.cardHolder && <p className="text-red-500 text-xs mt-1">{errors.cardHolder}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date*
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        errors.expiryDate ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                      }`}
                      maxLength="5"
                    />
                    {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                  </div>

                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                      CVV*
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          errors.cvv ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                        }`}
                        maxLength="4"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-help group">
                        <AlertCircle className="w-4 h-4 text-gray-400" />
                        <div className="hidden group-hover:block absolute right-0 bottom-full mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10">
                          The CVV is the 3-digit code on the back of your card, or 4-digit code on the front for
                          American Express.
                        </div>
                      </div>
                    </div>
                    {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* CIB Payment Form */}
            {formData.paymentMethod === "cib" && (
              <div className="animate-fadeIn space-y-4 p-4 border border-gray-200 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-700">CIB Payment Details</h4>
                  <img
                    src="/cib-logo.png"
                    alt="CIB"
                    className="h-6"
                    onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/60x40?text=CIB")}
                  />
                </div>

                <div>
                  <label htmlFor="cibAccountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    CIB Account Number*
                  </label>
                  <input
                    type="text"
                    id="cibAccountNumber"
                    name="cibAccountNumber"
                    value={formData.cibAccountNumber || ""}
                    onChange={handleInputChange}
                    placeholder="Enter your CIB account number"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="cibPin" className="block text-sm font-medium text-gray-700 mb-1">
                    CIB PIN*
                  </label>
                  <input
                    type="password"
                    id="cibPin"
                    name="cibPin"
                    value={formData.cibPin || ""}
                    onChange={handleInputChange}
                    placeholder="Enter your CIB PIN"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength="4"
                  />
                </div>

                <div className="bg-yellow-50 p-3 rounded-md text-sm text-yellow-800">
                  <p>You will be redirected to the CIB secure payment portal to complete your transaction.</p>
                </div>
              </div>
            )}

            {/* E-Dinar Payment Form */}
            {formData.paymentMethod === "edinar" && (
              <div className="animate-fadeIn space-y-4 p-4 border border-gray-200 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-700">E-Dinar Payment Details</h4>
                  <img
                    src="/edinar-logo.png"
                    alt="E-Dinar"
                    className="h-6"
                    onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/60x40?text=E-DINAR")}
                  />
                </div>

                <div>
                  <label htmlFor="edinarWalletId" className="block text-sm font-medium text-gray-700 mb-1">
                    E-Dinar Wallet ID*
                  </label>
                  <input
                    type="text"
                    id="edinarWalletId"
                    name="edinarWalletId"
                    value={formData.edinarWalletId || ""}
                    onChange={handleInputChange}
                    placeholder="Enter your E-Dinar wallet ID"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="edinarPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    E-Dinar Password*
                  </label>
                  <input
                    type="password"
                    id="edinarPassword"
                    name="edinarPassword"
                    value={formData.edinarPassword || ""}
                    onChange={handleInputChange}
                    placeholder="Enter your E-Dinar password"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="bg-yellow-50 p-3 rounded-md text-sm text-yellow-800">
                  <p>
                    After clicking "Confirm & Pay", you will receive an OTP on your registered mobile number to complete
                    the transaction.
                  </p>
                </div>
              </div>
            )}

            {/* Visa Electron Postal Payment Form */}
            {formData.paymentMethod === "postal" && (
              <div className="animate-fadeIn space-y-4 p-4 border border-gray-200 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-700">Visa Electron Postal Details</h4>
                  <img
                    src="/postal-logo.png"
                    alt="Visa Electron Postal"
                    className="h-6"
                    onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/60x40?text=POSTAL")}
                  />
                </div>

                <div>
                  <label htmlFor="postalCardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number*
                  </label>
                  <div className="relative">
                    <CreditCardIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="postalCardNumber"
                      name="postalCardNumber"
                      value={formData.postalCardNumber || ""}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      maxLength="19"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="postalCardHolder" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Holder Name*
                  </label>
                  <input
                    type="text"
                    id="postalCardHolder"
                    name="postalCardHolder"
                    value={formData.postalCardHolder || ""}
                    onChange={handleInputChange}
                    placeholder="JOHN DOE"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="postalExpiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date*
                    </label>
                    <input
                      type="text"
                      id="postalExpiryDate"
                      name="postalExpiryDate"
                      value={formData.postalExpiryDate || ""}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      maxLength="5"
                    />
                  </div>

                  <div>
                    <label htmlFor="postalCvv" className="block text-sm font-medium text-gray-700 mb-1">
                      CVV*
                    </label>
                    <input
                      type="text"
                      id="postalCvv"
                      name="postalCvv"
                      value={formData.postalCvv || ""}
                      onChange={handleInputChange}
                      placeholder="123"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      maxLength="3"
                    />
                  </div>
                </div>

                <div className="bg-yellow-50 p-3 rounded-md text-sm text-yellow-800">
                  <p>You will be redirected to the Postal secure payment gateway to complete your transaction.</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4">
            <label className="flex items-start">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleInputChange}
                className={`mt-1 ${errors.acceptTerms ? "border-red-500" : ""}`}
              />
              <span className="ml-2 text-sm text-gray-700">
                I accept the{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  terms and conditions
                </a>{" "}
                and the{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  privacy policy
                </a>
                *
              </span>
            </label>
            {errors.acceptTerms && <p className="text-red-500 text-xs mt-1">{errors.acceptTerms}</p>}
          </div>
        </>
      )}

      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <h3 className="font-semibold mb-2">Payment Summary</h3>
        <div className="flex justify-between mb-1">
          <span>Room:</span>
          <span>{selectedRoom?.name}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>Nights:</span>
          <span>{formData.nights}</span>
        </div>
        <div className="flex justify-between font-bold border-t pt-2 mt-2">
          <span>Total Amount:</span>
          <span>${formData.totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )

  // Render progress steps
  const renderProgressSteps = () => (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div className={`flex flex-col items-center ${currentStep >= 1 ? "text-blue-600" : "text-gray-400"}`}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}
          >
            1
          </div>
          <span className="text-xs mt-1">Booking</span>
        </div>
        <div className={`flex-1 h-1 mx-2 ${currentStep >= 2 ? "bg-blue-600" : "bg-gray-200"}`}></div>
        <div className={`flex flex-col items-center ${currentStep >= 2 ? "text-blue-600" : "text-gray-400"}`}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}
          >
            2
          </div>
          <span className="text-xs mt-1">Personal</span>
        </div>
        <div className={`flex-1 h-1 mx-2 ${currentStep >= 3 ? "bg-blue-600" : "bg-gray-200"}`}></div>
        <div className={`flex flex-col items-center ${currentStep >= 3 ? "text-blue-600" : "text-gray-400"}`}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}
          >
            3
          </div>
          <span className="text-xs mt-1">Payment</span>
        </div>
      </div>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {renderProgressSteps()}

      {currentStep === 1 && renderBookingDetails()}
      {currentStep === 2 && renderPersonalInformation()}
      {currentStep === 3 && renderPaymentInformation()}

      <div className="flex justify-between mt-6">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={onPreviousStep}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </button>
        )}

        {currentStep < 3 ? (
          <button
            type="button"
            onClick={handleNextStepClick}
            className="ml-auto flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting || paymentSuccess}
            className={`ml-auto flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
              isSubmitting || paymentSuccess ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : paymentSuccess ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Payment Confirmed
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4 mr-2" />
                Confirm & Pay
              </>
            )}
          </button>
        )}
      </div>
    </form>
  )
}

