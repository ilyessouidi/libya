"use client"
import { useRouter, useSearchParams } from "next/navigation"
import PaymentForm from "@/components/PaymentForm"

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const bookingRef = searchParams.get("bookingRef")
  const amount = searchParams.get("amount")

  const handlePaymentSubmit = (paymentDetails) => {
    // Here you would typically process the payment
    // For this example, we'll just simulate a successful payment
    console.log("Payment details:", paymentDetails)

    // Generate a unique booking ID
    const bookingId = Math.random().toString(36).substring(2, 10).toUpperCase()

    // Redirect to a confirmation page
    router.push(`/booking-confirmation?bookingId=${bookingId}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Complete Your Payment</h1>
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
          <p className="mb-2">Booking Reference: {bookingRef}</p>
          <p className="mb-4">Total Amount: ${amount}</p>
        </div>
        <PaymentForm onSubmit={handlePaymentSubmit} />
      </div>
    </div>
  )
}

