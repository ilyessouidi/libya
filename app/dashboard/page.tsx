"use client"

import { useState } from "react"
import Link from "next/link"

// Mock data for user bookings
const mockBookings = [
  { id: 1, hotel: "Corinthia Hotel", checkIn: "2023-07-01", checkOut: "2023-07-05", guests: 2, status: "Confirmed" },
  { id: 2, hotel: "Radisson Blu Hotel", checkIn: "2023-08-15", checkOut: "2023-08-20", guests: 3, status: "Pending" },
  { id: 3, hotel: "Radisson Blu Hotel", checkIn: "2025-08-15", checkOut: "2025-08-20", guests: 1, status: "Confirmed" },
]

export default function Dashboard() {
  const [bookings, setBookings] = useState(mockBookings)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold mb-4">My Account</h1>
        <p className="text-gray-600 mb-4">
          Welcome to your account dashboard. Here you can view your bookings and manage your account settings.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hotel</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Check-in
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Check-out
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guests</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4 whitespace-nowrap">{booking.hotel}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.checkIn}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.checkOut}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.guests}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      booking.status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link href={`/booking/${booking.id}`} className="text-indigo-600 hover:text-indigo-900">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

