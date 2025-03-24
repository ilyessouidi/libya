"use client"

import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation"
import {
  MapPin,
  Wifi,
  Coffee,
  Utensils,
  Car,
  Star,
  Tv,
  Snowflake,
  Dumbbell,
  PocketIcon as Pool,
  SpadeIcon as Spa,
  Calendar,
  Users,
  ArrowLeft,
  FileText,
} from "lucide-react"
import { useRouter } from "next/navigation"
import BookingWidget from "@/components/BookingWidget"
import Gallery from "@/components/Gallery"
import ReviewSection from "@/components/ReviewSection"

// Mock data for hotels
const hotels = [
  {
    id: 1,
    name: "Corinthia Hotel Tripoli",
    description:
      "Located in the heart of Tripoli, the Corinthia Hotel offers unparalleled views of the Mediterranean Sea and features an exquisite blend of traditional and modern architecture.",
    address: "Souk Al-Thulatha Al-Gadim, Tripoli, Libya",
    rating: 5,
    price: 150,
    images: ["/hotel1.jpg", "/hotel2.jpg", "/hotel3.jpg", "/hotel4.jpg"],
    amenities: [
      { name: "Free Wi-Fi", icon: Wifi },
      { name: "Coffee Shop", icon: Coffee },
      { name: "Restaurants", icon: Utensils },
      { name: "Parking", icon: Car },
      { name: "TV", icon: Tv },
      { name: "Air Conditioning", icon: Snowflake },
      { name: "Fitness Center", icon: Dumbbell },
      { name: "Swimming Pool", icon: Pool },
      { name: "Spa", icon: Spa },
    ],
    rooms: [
      { id: 1, name: "Deluxe Room", price: 150, capacity: 2 },
      { id: 2, name: "Executive Suite", price: 250, capacity: 2 },
      { id: 3, name: "Family Room", price: 300, capacity: 4 },
    ],
    location: { lat: 32.8872, lng: 13.1913 },
    specialOffers: [
      {
        type: "earlyBooking",
        name: "Early Bird Discount",
        description: "10% off when booking 30 days in advance",
        discountPercentage: 10,
        minDaysInAdvance: 30,
      },
      {
        type: "longStay",
        name: "Extended Stay Offer",
        description: "15% off for stays of 5 nights or more",
        discountPercentage: 15,
        minNights: 5,
      },
    ],
  },
  {
    id: 2,
    name: "Radisson Blu Hotel",
    description:
      "Experience luxury and comfort at the Radisson Blu Hotel, offering modern amenities and exceptional service in the heart of Tripoli.",
    address: "Al Fatah Street, Tripoli, Libya",
    rating: 4,
    price: 120,
    images: ["/hotel2.jpg", "/hotel1.jpg", "/hotel3.jpg", "/hotel4.jpg"],
    amenities: [
      { name: "Free Wi-Fi", icon: Wifi },
      { name: "Coffee Shop", icon: Coffee },
      { name: "Restaurants", icon: Utensils },
      { name: "Parking", icon: Car },
      { name: "TV", icon: Tv },
      { name: "Air Conditioning", icon: Snowflake },
    ],
    rooms: [
      { id: 1, name: "Standard Room", price: 120, capacity: 2 },
      { id: 2, name: "Business Suite", price: 200, capacity: 2 },
    ],
    location: { lat: 32.8922, lng: 13.1863 },
    specialOffers: [
      {
        type: "longStay",
        name: "Stay 3, Pay 2",
        description: "Free night when you book 3 nights",
        discountPercentage: 33.33,
        minNights: 3,
      },
    ],
  },
  {
    id: 3,
    name: "Four Seasons Hotel Tunis",
    description:
      "Nestled along the Mediterranean coastline, the Four Seasons Hotel Tunis offers a luxurious retreat with stunning sea views and world-class amenities.",
    address: "Gammarth, Tunis, Tunisia",
    rating: 5,
    price: 200,
    images: ["/hotel3.jpg", "/hotel1.jpg", "/hotel2.jpg", "/hotel4.jpg"],
    amenities: [
      { name: "Free Wi-Fi", icon: Wifi },
      { name: "Coffee Shop", icon: Coffee },
      { name: "Restaurants", icon: Utensils },
      { name: "Parking", icon: Car },
      { name: "TV", icon: Tv },
      { name: "Air Conditioning", icon: Snowflake },
      { name: "Fitness Center", icon: Dumbbell },
      { name: "Swimming Pool", icon: Pool },
      { name: "Spa", icon: Spa },
    ],
    rooms: [
      { id: 1, name: "Deluxe Sea View", price: 200, capacity: 2 },
      { id: 2, name: "Premier Suite", price: 350, capacity: 2 },
      { id: 3, name: "Family Suite", price: 400, capacity: 4 },
    ],
    location: { lat: 36.8892, lng: 10.3213 },
  },
  {
    id: 4,
    name: "Dar El Jeld Hotel and Spa",
    description:
      "A boutique hotel located in the heart of Tunis' Medina, Dar El Jeld offers a unique blend of traditional architecture and modern luxury.",
    address: "Medina, Tunis, Tunisia",
    rating: 4,
    price: 180,
    images: ["/hotel4.jpg", "/hotel1.jpg", "/hotel2.jpg", "/hotel3.jpg"],
    amenities: [
      { name: "Free Wi-Fi", icon: Wifi },
      { name: "Coffee Shop", icon: Coffee },
      { name: "Restaurants", icon: Utensils },
      { name: "TV", icon: Tv },
      { name: "Air Conditioning", icon: Snowflake },
      { name: "Spa", icon: Spa },
    ],
    rooms: [
      { id: 1, name: "Traditional Room", price: 180, capacity: 2 },
      { id: 2, name: "Deluxe Suite", price: 280, capacity: 2 },
    ],
    location: { lat: 36.7992, lng: 10.1713 },
  },
]

export default function HotelPage() {
  const { id } = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [hotel, setHotel] = useState(null)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [loading, setLoading] = useState(true)

  // Get search parameters
  const checkIn = searchParams.get("checkIn") || ""
  const checkOut = searchParams.get("checkOut") || ""
  const guests = Number(searchParams.get("guests")) || 1

  useEffect(() => {
    // Find the hotel by ID
    const hotelId = Number(id)
    const foundHotel = hotels.find((h) => h.id === hotelId)

    if (foundHotel) {
      setHotel(foundHotel)
      setSelectedRoom(foundHotel.rooms[0])
    }

    setLoading(false)
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading hotel information...</p>
        </div>
      </div>
    )
  }

  if (!hotel) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Hotel Not Found</h2>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find the hotel you're looking for.</p>
          <button
            onClick={() => router.push("/hotels")}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center mx-auto"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Hotels
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => router.back()} className="flex items-center text-blue-500 hover:text-blue-700 mb-4">
        <ArrowLeft size={16} className="mr-1" />
        Back to search results
      </button>

      <h1 className="text-3xl font-bold mb-4">{hotel.name}</h1>
      <div className="flex items-center mb-4">
        {[...Array(hotel.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
        <span className="ml-2 text-gray-600">{hotel.rating}-star hotel</span>
        <span className="ml-4 flex items-center text-gray-600">
          <MapPin className="w-5 h-5 mr-1" />
          {hotel.address}
        </span>
      </div>

      {/* Display booking dates if provided */}
      {(checkIn || checkOut) && (
        <div className="flex flex-wrap items-center mb-4 bg-blue-50 p-3 rounded-md">
          {checkIn && (
            <div className="flex items-center mr-6">
              <Calendar className="w-5 h-5 mr-2 text-blue-500" />
              <span>Check-in: {new Date(checkIn).toLocaleDateString()}</span>
            </div>
          )}
          {checkOut && (
            <div className="flex items-center mr-6">
              <Calendar className="w-5 h-5 mr-2 text-blue-500" />
              <span>Check-out: {new Date(checkOut).toLocaleDateString()}</span>
            </div>
          )}
          <div className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-blue-500" />
            <span>
              {guests} {guests === 1 ? "Guest" : "Guests"}
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          {/* Enhanced Gallery Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <Gallery images={hotel.images} />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-blue-900">About {hotel.name}</h2>
                <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                  {[...Array(hotel.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                  <span className="ml-1 text-sm font-medium text-yellow-700">{hotel.rating}/5</span>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{hotel.description}</p>

              {/* Expanded Hotel Description */}
              <div className="mt-4 text-gray-700 space-y-4">
                <p>
                  Experience unparalleled comfort and luxury at {hotel.name}, where every detail is designed to enhance
                  your stay. Our attentive staff is available 24/7 to ensure your needs are met promptly and
                  professionally.
                </p>
                <p>
                  The hotel's strategic location in {hotel.address.split(",")[1]} provides easy access to major
                  attractions, shopping centers, and business districts, making it an ideal choice for both leisure and
                  business travelers.
                </p>
              </div>
            </div>
          </div>

          {/* Room Options Section - Linked with Booking Process */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-6 flex items-center">
              <span className="bg-blue-100 p-2 rounded-full mr-3">
                <Users className="w-5 h-5 text-blue-600" />
              </span>
              Room Options
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hotel.rooms.map((room) => (
                <div
                  key={room.id}
                  className={`bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-all duration-300 ${selectedRoom?.id === room.id ? "ring-2 ring-blue-500" : ""}`}
                >
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">{room.name}</h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <Users className="w-4 h-4 mr-2 text-blue-500" />
                    <span>
                      Accommodates {room.capacity} {room.capacity === 1 ? "guest" : "guests"}
                    </span>
                  </div>
                  <div className="mb-4">
                    <p className="text-gray-700">
                      {room.name.includes("Deluxe")
                        ? "Spacious and elegantly furnished room with premium amenities and stunning views."
                        : room.name.includes("Suite")
                          ? "Luxurious suite featuring a separate living area and exclusive amenities for a truly premium experience."
                          : room.name.includes("Family")
                            ? "Comfortable and spacious room designed for families, with additional space and amenities."
                            : "Comfortable room with all essential amenities for a pleasant stay."}
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <div className="text-blue-600 font-bold text-xl">
                      ${room.price}
                      <span className="text-sm font-normal text-gray-500">/night</span>
                    </div>
                    <button
                      className={`${selectedRoom?.id === room.id ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"} text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center`}
                      onClick={() => {
                        setSelectedRoom(room)
                        // Scroll to booking widget
                        document.getElementById("booking-widget")?.scrollIntoView({ behavior: "smooth" })
                      }}
                    >
                      {selectedRoom?.id === room.id ? (
                        <>
                          Selected <span className="ml-1 text-lg">✓</span>
                        </>
                      ) : (
                        <>Book This Room</>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-100 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Booking Process</h3>
              <ol className="list-decimal list-inside text-gray-700 space-y-2">
                <li>Select your preferred room type above</li>
                <li>Fill in your stay details in the booking form</li>
                <li>Complete your reservation with our secure payment system</li>
                <li>Receive instant confirmation via email</li>
              </ol>
            </div>
          </div>

          {/* Amenities Section - Redesigned */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-6 flex items-center">
              <span className="bg-green-100 p-2 rounded-full mr-3">
                <Coffee className="w-5 h-5 text-green-600" />
              </span>
              Hotel Amenities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-6">
              {hotel.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center group">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mr-3 transition-colors
                    ${
                      amenity.name.includes("Wi-Fi")
                        ? "bg-blue-100 text-blue-600"
                        : amenity.name.includes("Coffee")
                          ? "bg-amber-100 text-amber-600"
                          : amenity.name.includes("Restaurant")
                            ? "bg-red-100 text-red-600"
                            : amenity.name.includes("Parking")
                              ? "bg-gray-100 text-gray-600"
                              : amenity.name.includes("TV")
                                ? "bg-purple-100 text-purple-600"
                                : amenity.name.includes("Air")
                                  ? "bg-cyan-100 text-cyan-600"
                                  : amenity.name.includes("Fitness")
                                    ? "bg-green-100 text-green-600"
                                    : amenity.name.includes("Pool")
                                      ? "bg-blue-100 text-blue-600"
                                      : "bg-indigo-100 text-indigo-600"
                    }`}
                  >
                    <amenity.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-gray-800 font-medium">{amenity.name}</span>
                    <p className="text-xs text-gray-500">
                      {amenity.name.includes("Wi-Fi")
                        ? "High-speed internet throughout the property"
                        : amenity.name.includes("Coffee")
                          ? "Gourmet coffee and snacks available"
                          : amenity.name.includes("Restaurant")
                            ? "Fine dining experience"
                            : amenity.name.includes("Parking")
                              ? "Secure on-site parking"
                              : amenity.name.includes("TV")
                                ? "Flat-screen TV with premium channels"
                                : amenity.name.includes("Air")
                                  ? "Individual climate control"
                                  : amenity.name.includes("Fitness")
                                    ? "State-of-the-art equipment"
                                    : amenity.name.includes("Pool")
                                      ? "Temperature-controlled pool"
                                      : amenity.name.includes("Spa")
                                        ? "Full-service spa treatments"
                                        : "Available for all guests"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hotel Policies Section - New */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-6 flex items-center">
              <span className="bg-indigo-100 p-2 rounded-full mr-3">
                <FileText className="w-5 h-5 text-indigo-600" />
              </span>
              Hotel Policies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-100 rounded-lg p-4">
                <h3 className="font-medium text-gray-800 mb-2">Check-in & Check-out</h3>
                <p className="text-gray-600 text-sm">Check-in: 2:00 PM - 12:00 AM</p>
                <p className="text-gray-600 text-sm">Check-out: Until 12:00 PM</p>
              </div>
              <div className="border border-gray-100 rounded-lg p-4">
                <h3 className="font-medium text-gray-800 mb-2">Payment Options</h3>
                <p className="text-gray-600 text-sm">Credit cards, debit cards, and cash accepted</p>
              </div>
              <div className="border border-gray-100 rounded-lg p-4">
                <h3 className="font-medium text-gray-800 mb-2">Cancellation Policy</h3>
                <p className="text-gray-600 text-sm">Free cancellation up to 24 hours before check-in</p>
              </div>
              <div className="border border-gray-100 rounded-lg p-4">
                <h3 className="font-medium text-gray-800 mb-2">Pet Policy</h3>
                <p className="text-gray-600 text-sm">Pets allowed with additional fee (restrictions apply)</p>
              </div>
            </div>
          </div>

          {/* Reviews Section - Enhanced */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-blue-900 mb-4 flex items-center">
                <span className="bg-yellow-100 p-2 rounded-full mr-3">
                  <Star className="w-5 h-5 text-yellow-600" />
                </span>
                Guest Reviews
              </h2>
              <p className="text-gray-700 mb-4">
                Read what our guests have to say about their experience at {hotel.name}. We value all feedback and
                continuously strive to improve our services.
              </p>
            </div>
            <ReviewSection hotelId={hotel.id} />
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="sticky top-4" id="booking-widget">
            <BookingWidget
              hotel={hotel}
              selectedRoom={selectedRoom}
              onRoomSelect={setSelectedRoom}
              initialCheckIn={checkIn}
              initialCheckOut={checkOut}
              initialGuests={guests}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

