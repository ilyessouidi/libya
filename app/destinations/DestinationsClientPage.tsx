"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  MapPin,
  ArrowRight,
  Search,
  ChevronRight,
  Star,
  Compass,
  TreePalmIcon as Palm,
  Landmark,
  HandIcon as PrayingHands,
} from "lucide-react"
import Breadcrumb from "@/components/Breadcrumb"

// Enhanced animations
const animations = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.6s ease-out forwards;
  }
  
  .animate-slideIn {
    animation: slideInRight 0.6s ease-out forwards;
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .stagger-1 { animation-delay: 0.1s; }
  .stagger-2 { animation-delay: 0.2s; }
  .stagger-3 { animation-delay: 0.3s; }
  .stagger-4 { animation-delay: 0.4s; }
  .stagger-5 { animation-delay: 0.5s; }
  .stagger-6 { animation-delay: 0.6s; }
`

// Featured destinations data
const featuredDestinations = [
  {
    id: 1,
    name: "Tripoli",
    country: "Libya",
    description:
      "Explore the vibrant capital city with its rich history, beautiful architecture, and Mediterranean coastline.",
    image: "/tripoli.jpg",
    type: "city",
    rating: 4.7,
    icon: <Compass className="w-5 h-5" />,
  },
  {
    id: 2,
    name: "Tunis",
    country: "Tunisia",
    description:
      "Discover the blend of ancient and modern in Tunisia's capital, from the historic medina to contemporary attractions.",
    image: "/tunis.jpg",
    type: "city",
    rating: 4.8,
    icon: <Compass className="w-5 h-5" />,
  },
  {
    id: 3,
    name: "Djerba",
    country: "Tunisia",
    description:
      "Relax on the beautiful beaches of this island paradise, known for its stunning coastline and unique culture.",
    image: "/djerba.jpg",
    type: "beach",
    rating: 4.9,
    icon: <Palm className="w-5 h-5" />,
  },
  {
    id: 4,
    name: "Sahara Desert",
    country: "Libya",
    description:
      "Experience the majesty of the world's largest desert with guided tours, camel treks, and unforgettable stargazing.",
    image: "/sahara.jpg",
    type: "adventure",
    rating: 4.8,
    icon: <Compass className="w-5 h-5" />,
  },
  {
    id: 5,
    name: "Leptis Magna",
    country: "Libya",
    description: "Walk through one of the most impressive and well-preserved Roman ruins in the Mediterranean region.",
    image: "/leptis-magna.jpg",
    type: "historical",
    rating: 4.6,
    icon: <Landmark className="w-5 h-5" />,
  },
  {
    id: 6,
    name: "Mecca & Medina",
    country: "Saudi Arabia",
    description: "Embark on a spiritual journey to the holiest cities in Islam with our guided Omra packages.",
    image: "/mecca.jpg",
    type: "religious",
    rating: 5.0,
    icon: <PrayingHands className="w-5 h-5" />,
  },
]

// Destination types for filtering
const destinationTypes = [
  { id: "all", name: "All Destinations", icon: <Compass className="w-5 h-5" /> },
  { id: "city", name: "Cities", icon: <Compass className="w-5 h-5" /> },
  { id: "beach", name: "Beaches", icon: <Palm className="w-5 h-5" /> },
  { id: "historical", name: "Historical", icon: <Landmark className="w-5 h-5" /> },
  { id: "adventure", name: "Adventure", icon: <Compass className="w-5 h-5" /> },
  { id: "religious", name: "Religious", icon: <PrayingHands className="w-5 h-5" /> },
]

export default function DestinationsClientPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [visibleDestinations, setVisibleDestinations] = useState(featuredDestinations)
  const [isLoaded, setIsLoaded] = useState(false)

  // Filter destinations based on search and type
  useEffect(() => {
    const filtered = featuredDestinations.filter(
      (destination) =>
        (activeFilter === "all" || destination.type === activeFilter) &&
        (destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          destination.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
          destination.description.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    setVisibleDestinations(filtered)
  }, [searchTerm, activeFilter])

  // Simulate loading for animation purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <style jsx global>
        {animations}
      </style>

      {/* Enhanced Hero Section with Parallax Effect */}
      <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/destinations-hero.jpg"
            alt="Explore amazing destinations"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/60"></div>

          {/* Decorative elements */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.3),transparent_70%)]"></div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-white [clip-path:polygon(0_100%,100%_100%,100%_60%,75%_40%,50%_60%,25%_40%,0_60%)]"></div>
        </div>

        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
          <div className={`max-w-3xl ${isLoaded ? "animate-fadeIn" : "opacity-0"}`}>
            <span className="inline-block px-3 py-1 bg-blue-700 text-blue-100 rounded-full text-sm font-medium mb-4 shadow-lg">
              Explore The World
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Discover Your <span className="text-blue-300">Perfect Destination</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              Explore breathtaking locations across North Africa and beyond with our curated travel experiences
            </p>

            {/* Enhanced Search Bar */}
            <div className="relative max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-blue-500" />
              </div>
              <input
                type="text"
                placeholder="Search destinations, experiences, or activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-4 pl-12 pr-4 rounded-xl shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white/95 backdrop-blur-sm"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Search
              </button>
            </div>

            {/* Quick category buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              {["Popular", "Beaches", "Cities", "Historical", "Adventure"].map((category) => (
                <button
                  key={category}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-full transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Enhanced */}
      <div className="bg-gradient-to-b from-white to-blue-50 relative">
        {/* Decorative elements */}
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-40 left-10 w-80 h-80 bg-indigo-100 rounded-full opacity-30 blur-3xl"></div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="mb-6">
            <Breadcrumb />
          </div>

          {/* Filter Tabs */}
          <div className={`mb-10 overflow-x-auto pb-2 ${isLoaded ? "animate-fadeIn stagger-1" : "opacity-0"}`}>
            <div className="flex space-x-2 min-w-max">
              {destinationTypes.map((type, index) => (
                <button
                  key={type.id}
                  onClick={() => setActiveFilter(type.id)}
                  className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ${
                    activeFilter === type.id
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-2">{type.icon}</span>
                  {type.name}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Destinations */}
          <section className={`mb-16 ${isLoaded ? "animate-fadeIn stagger-2" : "opacity-0"}`}>
            <h2 className="text-3xl font-bold mb-2 text-gray-800">Explore Destinations</h2>
            <p className="text-gray-600 mb-8 max-w-3xl">
              Discover our handpicked selection of unforgettable places to explore, from historic cities to pristine
              beaches
            </p>

            {visibleDestinations.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center shadow-sm">
                <p className="text-gray-600 mb-4">No destinations found matching your search criteria.</p>
                <button
                  onClick={() => {
                    setSearchTerm("")
                    setActiveFilter("all")
                  }}
                  className="text-blue-600 font-medium hover:text-blue-800"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleDestinations.map((destination, index) => (
                  <div
                    key={destination.id}
                    className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-500 overflow-hidden h-full flex flex-col group border border-gray-100 ${
                      isLoaded ? `animate-fadeIn stagger-${(index % 6) + 1}` : "opacity-0"
                    }`}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={destination.image || "/placeholder.svg?height=300&width=400"}
                        alt={destination.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                        priority={index <= 3}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 m-3 rounded-full text-xs font-medium z-10 flex items-center">
                        {destination.icon}
                        <span className="ml-1">
                          {destination.type.charAt(0).toUpperCase() + destination.type.slice(1)}
                        </span>
                      </div>

                      <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <Link
                          href={destination.type === "religious" ? "/omra-packages" : `/destinations/${destination.id}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-lg flex items-center justify-center transition-colors"
                        >
                          Explore Now
                          <ChevronRight className="ml-1 w-4 h-4" />
                        </Link>
                      </div>
                    </div>

                    <div className="p-5 flex-grow flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-600 text-sm font-medium">{destination.country}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="text-gray-700 font-medium">{destination.rating}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                        {destination.name}
                      </h3>

                      <p className="text-gray-600 mb-4 text-sm leading-relaxed flex-grow">{destination.description}</p>

                      <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center">
                        <Link
                          href={destination.type === "religious" ? "/omra-packages" : `/destinations/${destination.id}`}
                          className="text-blue-600 hover:text-blue-800 flex items-center font-medium text-sm group-hover:translate-x-1 transition-transform"
                        >
                          View Details
                          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Religious Journeys / Omra Section */}
          <section className={`mb-12 ${isLoaded ? "animate-fadeIn stagger-3" : "opacity-0"}`}>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl overflow-hidden shadow-sm">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
                  <span className="text-blue-600 font-medium mb-2">SPIRITUAL JOURNEY</span>
                  <h2 className="text-3xl font-bold mb-4 text-gray-800">Omra Packages</h2>
                  <p className="text-gray-700 mb-4">
                    Embark on a spiritual journey to the holiest cities in Islam with our comprehensive Omra packages.
                    We offer a range of options to suit different preferences and budgets, all designed to provide a
                    meaningful and comfortable pilgrimage experience.
                  </p>
                  <p className="text-gray-700 mb-6">
                    Our packages include visa processing, accommodation, transportation, guided tours, and spiritual
                    guidance to ensure a fulfilling journey.
                  </p>
                  <div className="animate-float">
                    <Link
                      href="/omra-packages"
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-flex items-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    >
                      View Omra Packages
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
                <div className="md:w-1/2 relative">
                  <div className="relative h-64 md:h-full min-h-[320px]">
                    <Image src="/mecca-kaaba.jpg" alt="Mecca and Kaaba" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-transparent"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="flex items-center text-white">
                      <PrayingHands className="w-5 h-5 mr-2" />
                      <span className="font-medium">Holy Pilgrimage</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className={`text-center py-10 ${isLoaded ? "animate-fadeIn stagger-4" : "opacity-0"}`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to start your journey?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Our travel experts are ready to help you plan the perfect trip tailored to your preferences.
            </p>
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 inline-flex items-center transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Contact Us
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </section>
        </div>
      </div>
    </>
  )
}

