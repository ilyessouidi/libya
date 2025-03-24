"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Printer, Download, Check, Home } from "lucide-react"
import Link from "next/link"

export default function BookingInvoicePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [bookingDetails, setBookingDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const invoiceRef = useRef(null)
  const detailsParam = searchParams.get("details")

  const processedRef = useRef(false)

  useEffect(() => {
    // Only process once to prevent infinite loops
    if (!processedRef.current) {
      processedRef.current = true

      try {
        const detailsParam = searchParams.get("details")
        if (detailsParam) {
          const parsedDetails = JSON.parse(decodeURIComponent(detailsParam))
          setBookingDetails(parsedDetails)
        }
      } catch (error) {
        console.error("Error parsing booking details:", error)
      } finally {
        setLoading(false)
      }
    }
  }, []) // Empty dependency array - only run once on mount

  const handlePrintInvoice = () => {
    if (invoiceRef.current) {
      const printContent = invoiceRef.current.innerHTML
      const originalContent = document.body.innerHTML

      document.body.innerHTML = `
      <div style="padding: 20px;">
        <div style="max-width: 800px; margin: 0 auto;">
          ${printContent}
        </div>
      </div>
    `

      window.print()
      document.body.innerHTML = originalContent
      window.location.reload()
    }
  }

  const handleDownloadInvoice = () => {
    if (!bookingDetails) return

    // Create a text version of the invoice
    const invoiceText = `
  BOOKING INVOICE

  Booking ID: ${bookingDetails.bookingId}
  Booking Date: ${bookingDetails.bookingDate}

  CUSTOMER INFORMATION
  Name: ${bookingDetails.customerName}
  Email: ${bookingDetails.customerEmail}
  Phone: ${bookingDetails.customerPhone}

  BOOKING DETAILS
  Hotel: ${bookingDetails.hotelName}
  Room: ${bookingDetails.roomName}
  Check-in: ${new Date(bookingDetails.checkIn).toLocaleDateString()}
  Check-out: ${new Date(bookingDetails.checkOut).toLocaleDateString()}
  Nights: ${bookingDetails.nights}
  Guests: ${bookingDetails.guests}

  PAYMENT INFORMATION
  Payment Method: ${bookingDetails.paymentMethod}
  Total Amount: $${bookingDetails.totalPrice.toFixed(2)}

  Thank you for booking with Libya Booking!
    `.trim()

    // Create a Blob and download link
    const blob = new Blob([invoiceText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `Invoice-${bookingDetails.bookingId}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading invoice information...</p>
        </div>
      </div>
    )
  }

  if (!bookingDetails) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Invoice Not Found</h1>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find the invoice you're looking for.</p>
          <Link
            href="/"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300 inline-flex items-center"
          >
            <Home className="mr-2" size={20} />
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Booking Confirmed!</h1>
            <div className="flex space-x-2">
              <button
                onClick={handlePrintInvoice}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
                title="Print Invoice"
              >
                <Printer size={20} />
              </button>
              <button
                onClick={handleDownloadInvoice}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
                title="Download Invoice"
              >
                <Download size={20} />
              </button>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-md flex items-start mb-6">
            <div className="bg-green-500 rounded-full p-1 mr-3 flex-shrink-0 mt-0.5">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-green-800 mb-1">Payment Successful</h2>
              <p className="text-green-700 text-sm">
                Your booking has been confirmed and payment processed successfully. A confirmation email has been sent
                to your email address.
              </p>
            </div>
          </div>

          <div ref={invoiceRef} className="border rounded-md p-6 mb-6">
            <div className="flex justify-between items-center mb-6 pb-4 border-b">
              <div>
                <h2 className="font-bold text-xl">BOOKING INVOICE</h2>
                <p className="text-sm text-gray-500">Libya Booking</p>
              </div>
              <div className="text-right">
                <p className="text-sm">
                  <span className="font-medium">Invoice Date:</span> {bookingDetails.bookingDate}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Booking ID:</span> {bookingDetails.bookingId}
                </p>
              </div>
            </div>

            <div className="mb-6 pb-4 border-b">
              <h3 className="font-semibold mb-3 text-gray-700">Customer Information</h3>
              <p className="text-sm mb-1">{bookingDetails.customerName}</p>
              <p className="text-sm mb-1">{bookingDetails.customerEmail}</p>
              <p className="text-sm">{bookingDetails.customerPhone}</p>
            </div>

            <div className="mb-6 pb-4 border-b">
              <h3 className="font-semibold mb-3 text-gray-700">Booking Details</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="mb-2">
                    <span className="font-medium">Hotel:</span> {bookingDetails.hotelName}
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">Room Type:</span> {bookingDetails.roomName}
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">Guests:</span> {bookingDetails.guests}
                  </p>
                </div>
                <div>
                  <p className="mb-2">
                    <span className="font-medium">Check-in:</span>{" "}
                    {bookingDetails.checkIn && new Date(bookingDetails.checkIn).toLocaleDateString()}
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">Check-out:</span>{" "}
                    {bookingDetails.checkOut && new Date(bookingDetails.checkOut).toLocaleDateString()}
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">Nights:</span> {bookingDetails.nights}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-gray-700">Payment Information</h3>
              <p className="text-sm mb-2">
                <span className="font-medium">Payment Method:</span>{" "}
                {bookingDetails.paymentMethod.charAt(0).toUpperCase() + bookingDetails.paymentMethod.slice(1)}
              </p>
              <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <span className="font-bold">Total Amount:</span>
                <span className="font-bold text-xl">${bookingDetails.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <Home size={18} className="mr-2" />
              Return to Home
            </Link>

            <Link
              href={`/hotels/${bookingDetails.hotelId || 1}`}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Book Another Room
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

