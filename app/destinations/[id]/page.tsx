"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Calendar, Users, MapPin, Star, CheckCircle, Loader2, ArrowLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

// Define destination data structure
interface Destination {
  id: string
  name: string
  location: string
  description: string
  images: string[]
  highlights: string[]
  hotels: {
    name: string
    stars: number
    price: number
    description: string
  }[]
  activities: {
    name: string
    description: string
    price?: number
    duration?: string
  }[]
}

// Sample destinations data
const destinations: Destination[] = [
  {
    id: "1",
    name: "Tunis",
    location: "Tunisia",
    description:
      "Tunis is a city of contrasts, where ancient medinas stand alongside modern boulevards. Visit the UNESCO World Heritage Medina of Tunis, explore the ruins of Carthage, and enjoy the beautiful beaches of La Marsa. The city offers a perfect blend of history, culture, and Mediterranean charm.",
    images: ["/tunis.jpg", "/tunis-medina.jpg", "/carthage.jpg"],
    highlights: [
      "Explore the ancient Medina, a UNESCO World Heritage site",
      "Visit the ruins of Carthage, once a powerful ancient civilization",
      "Relax on the beautiful beaches of La Marsa",
      "Experience the vibrant local markets and cuisine",
    ],
    hotels: [
      {
        name: "Four Seasons Hotel Tunis",
        stars: 5,
        price: 200,
        description:
          "Luxury beachfront hotel with stunning Mediterranean views, spa facilities, and world-class dining options.",
      },
      {
        name: "Dar El Jeld Hotel and Spa",
        stars: 4,
        price: 180,
        description:
          "Boutique hotel located in a restored traditional house in the heart of the Medina, offering authentic Tunisian hospitality.",
      },
      {
        name: "The Residence Tunis",
        stars: 5,
        price: 220,
        description: "Elegant resort featuring a private beach, golf course, and thalassotherapy spa treatments.",
      },
    ],
    activities: [
      {
        name: "Medina Walking Tour",
        description:
          "Explore the ancient Medina of Tunis with its souks and historic sites with a knowledgeable local guide.",
        price: 45,
        duration: "3 hours",
      },
      {
        name: "Carthage Archaeological Tour",
        description: "Visit the archaeological site of ancient Carthage and learn about its fascinating history.",
        price: 60,
        duration: "4 hours",
      },
      {
        name: "Sidi Bou Said Excursion",
        description:
          "Stroll through the picturesque blue and white village and enjoy panoramic views of the Mediterranean.",
        price: 50,
        duration: "Half day",
      },
    ],
  },
  {
    id: "2",
    name: "Djerba",
    location: "Tunisia",
    description:
      "Djerba is known for its stunning beaches, traditional architecture, and relaxed atmosphere. Explore the island's rich cultural heritage, visit ancient synagogues, and enjoy water sports along its pristine coastline. The island combines beautiful natural landscapes with fascinating cultural sites.",
    images: ["/djerba.jpg", "/djerba-beach.jpg", "/houmt-souk.jpg"],
    highlights: [
      "Relax on pristine white sand beaches with crystal clear waters",
      "Explore Houmt Souk, the island's vibrant market town",
      "Visit El Ghriba Synagogue, one of the oldest in Africa",
      "Experience traditional Djerbian architecture and culture",
    ],
    hotels: [
      {
        name: "Radisson Blu Palace Resort & Thalasso",
        stars: 5,
        price: 190,
        description:
          "Luxury beachfront resort with extensive thalassotherapy spa facilities and multiple dining options.",
      },
      {
        name: "Djerba Plaza Hotel & Spa",
        stars: 4,
        price: 150,
        description:
          "Comfortable resort with traditional architectural elements, beautiful gardens, and direct beach access.",
      },
      {
        name: "Club Med Djerba",
        stars: 4,
        price: 170,
        description: "All-inclusive resort offering a wide range of activities, entertainment, and water sports.",
      },
    ],
    activities: [
      {
        name: "Island Tour",
        description:
          "Comprehensive tour of Djerba's main attractions, including traditional villages and historical sites.",
        price: 70,
        duration: "Full day",
      },
      {
        name: "Water Sports Package",
        description:
          "Try various water sports including jet skiing, parasailing, and windsurfing on Djerba's beautiful beaches.",
        price: 90,
        duration: "Flexible",
      },
      {
        name: "Crocodile Farm Visit",
        description: "Visit Djerba Explore Park featuring a crocodile farm and traditional Djerbian heritage museum.",
        price: 35,
        duration: "3 hours",
      },
    ],
  },
  {
    id: "3",
    name: "Sidi Bou Said",
    location: "Tunisia",
    description:
      "Perched on a cliff overlooking the Mediterranean, Sidi Bou Said is famous for its striking blue and white architecture. Wander through its cobblestone streets, enjoy panoramic views, and experience its artistic atmosphere. This picturesque village has inspired artists and writers for generations with its unique charm and beauty.",
    images: ["/sidi-bou-said.jpg", "/sidi-bou-said-cafe.jpg", "/sidi-bou-said-view.jpg"],
    highlights: [
      "Wander through charming blue and white streets with stunning architecture",
      "Enjoy breathtaking views of the Mediterranean from clifftop viewpoints",
      "Visit the famous Café des Nattes, a traditional Tunisian café",
      "Explore local art galleries and artisan shops",
    ],
    hotels: [
      {
        name: "La Villa Bleue",
        stars: 5,
        price: 230,
        description:
          "Elegant boutique hotel in a restored mansion with panoramic sea views and refined Tunisian design.",
      },
      {
        name: "Dar Said",
        stars: 4,
        price: 180,
        description:
          "Charming hotel in a traditional building featuring a beautiful courtyard and terrace with sea views.",
      },
      {
        name: "Hotel Sidi Bou Said",
        stars: 3,
        price: 120,
        description:
          "Comfortable hotel with local character, offering good value and a convenient location in the village.",
      },
    ],
    activities: [
      {
        name: "Art and Culture Tour",
        description: "Visit local art galleries and the Ennejma Ezzahra palace with its impressive music collection.",
        price: 40,
        duration: "3 hours",
      },
      {
        name: "Photography Walk",
        description: "Guided photography tour of the most picturesque spots in Sidi Bou Said with photography tips.",
        price: 35,
        duration: "2 hours",
      },
      {
        name: "Sunset Dinner Experience",
        description: "Enjoy a traditional Tunisian dinner at a restaurant with panoramic views during sunset.",
        price: 65,
        duration: "Evening",
      },
    ],
  },
  {
    id: "4",
    name: "Sahara Desert",
    location: "Tunisia/Libya",
    description:
      "Experience the magic of the Sahara Desert with its endless golden dunes, starry nights, and unique desert culture. Ride camels, stay in traditional camps, and witness spectacular sunrises and sunsets over the dunes. The Sahara offers an unforgettable adventure and a chance to connect with one of nature's most awe-inspiring landscapes.",
    images: ["/sahara.jpg", "/sahara-camels.jpg", "/sahara-camp.jpg"],
    highlights: [
      "Experience camel trekking across magnificent golden sand dunes",
      "Stay in traditional Bedouin-style desert camps under the stars",
      "Witness breathtaking desert sunrises and sunsets",
      "Learn about traditional desert culture and lifestyle",
    ],
    hotels: [
      {
        name: "Desert Luxury Camp",
        stars: 4,
        price: 250,
        description:
          "Premium desert camp with comfortable tents featuring proper beds, private bathrooms, and gourmet dining.",
      },
      {
        name: "Sahara Stars Camp",
        stars: 3,
        price: 150,
        description:
          "Authentic desert camp experience with traditional tents, campfire dinners, and cultural activities.",
      },
      {
        name: "Tozeur Desert Resort",
        stars: 5,
        price: 300,
        description:
          "Luxury resort at the edge of the desert with pool, spa, and organized excursions into the Sahara.",
      },
    ],
    activities: [
      {
        name: "2-Day Desert Trek",
        description:
          "Comprehensive desert experience including camel riding, overnight camping, and traditional entertainment.",
        price: 200,
        duration: "2 days",
      },
      {
        name: "Stargazing Experience",
        description: "Evening stargazing session with an astronomy expert using professional telescopes.",
        price: 60,
        duration: "3 hours",
      },
      {
        name: "4x4 Desert Safari",
        description:
          "Thrilling jeep adventure through varied desert landscapes including dunes, salt flats, and oases.",
        price: 120,
        duration: "Full day",
      },
    ],
  },
]

interface DestinationPageProps {
  params: {
    id: string
  }
}

export default function DestinationPage({ params }: DestinationPageProps) {
  const router = useRouter()
  const destination = destinations.find((dest) => dest.id === params.id)

  const [showBookingForm, setShowBookingForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [bookingData, setBookingData] = useState({
    fullName: "",
    email: "",
    phone: "",
    hotel: "",
    checkIn: "",
    checkOut: "",
    guests: 2,
    specialRequests: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call to booking system
    setTimeout(() => {
      console.log("Booking submitted:", bookingData)
      setIsSubmitting(false)
      setFormSubmitted(true)

      // Reset form data
      setBookingData({
        fullName: "",
        email: "",
        phone: "",
        hotel: "",
        checkIn: "",
        checkOut: "",
        guests: 2,
        specialRequests: "",
      })
    }, 1500)
  }

  if (!destination) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h1 className="text-2xl font-bold text-red-700 mb-4">Destination Not Found</h1>
          <p className="text-gray-700 mb-4">Sorry, we couldn't find a destination with the ID: "{params.id}".</p>
          <p className="text-gray-600 mb-6">
            Please check the URL or return to our destinations page to browse available options.
          </p>
          <button
            onClick={() => router.push("/destinations")}
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Destinations
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px]">
        <Image
          src={destination.images[0] || "/placeholder.svg?height=600&width=1200"}
          alt={destination.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20"></div>

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 container mx-auto">
          <Link href="/destinations" className="text-white mb-4 flex items-center hover:underline self-start">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to all destinations
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{destination.name}</h1>
          <div className="flex items-center text-white/90 mb-6">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{destination.location}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Overview Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{destination.description}</p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Highlights</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {destination.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gallery Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destination.images.slice(1).map((image, index) => (
                  <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src={image || "/placeholder.svg?height=300&width=400"}
                      alt={`${destination.name} - Image ${index + 2}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Accommodation Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Where to Stay</h2>
              <div className="space-y-6">
                {destination.hotels.map((hotel, index) => (
                  <div key={index} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">{hotel.name}</h3>
                        <div className="flex items-center my-2">
                          {Array.from({ length: hotel.stars }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">${hotel.price}</p>
                        <p className="text-sm text-gray-500">per night</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mt-2 mb-4">{hotel.description}</p>
                    <button
                      onClick={() => {
                        setBookingData((prev) => ({ ...prev, hotel: hotel.name }))
                        setShowBookingForm(true)
                        setTimeout(() => {
                          document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" })
                        }, 100)
                      }}
                      className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                    >
                      Book this hotel
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Activities Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Things to Do</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {destination.activities.map((activity, index) => (
                  <div key={index} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-all">
                    <h3 className="font-semibold text-lg text-gray-800">{activity.name}</h3>
                    <p className="text-gray-600 my-2">{activity.description}</p>
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{activity.duration}</span>
                      </div>
                      {activity.price && <div className="font-semibold text-blue-600">${activity.price}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              {/* Booking Card */}
              <div id="booking-form" className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Book Your Trip</h2>

                {formSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Booking Request Received!</h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for your interest in visiting {destination.name}. We've received your booking request
                      and will contact you shortly to confirm the details.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Book Another Stay
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="hotel" className="block text-sm font-medium text-gray-700 mb-1">
                        Select Hotel*
                      </label>
                      <select
                        id="hotel"
                        name="hotel"
                        value={bookingData.hotel}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Choose a hotel</option>
                        {destination.hotels.map((hotel, index) => (
                          <option key={index} value={hotel.name}>
                            {hotel.name} (${hotel.price}/night)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-1">
                          Check-in Date*
                        </label>
                        <div className="relative">
                          <Calendar
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={16}
                          />
                          <input
                            type="date"
                            id="checkIn"
                            name="checkIn"
                            value={bookingData.checkIn}
                            onChange={handleInputChange}
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-1">
                          Check-out Date*
                        </label>
                        <div className="relative">
                          <Calendar
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={16}
                          />
                          <input
                            type="date"
                            id="checkOut"
                            name="checkOut"
                            value={bookingData.checkOut}
                            onChange={handleInputChange}
                            min={bookingData.checkIn || new Date().toISOString().split("T")[0]}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Guests*
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="number"
                          id="guests"
                          name="guests"
                          value={bookingData.guests}
                          onChange={handleInputChange}
                          min="1"
                          max="10"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name*
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={bookingData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address*
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={bookingData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number*
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={bookingData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
                        Special Requests
                      </label>
                      <textarea
                        id="specialRequests"
                        name="specialRequests"
                        value={bookingData.specialRequests}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Book Now"
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Location Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Location</h2>
                <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                  <Image src="/map-placeholder.jpg" alt={`Map of ${destination.name}`} fill className="object-cover" />
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{destination.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Clock({ className, size }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  )
}

