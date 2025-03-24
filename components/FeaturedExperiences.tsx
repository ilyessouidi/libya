"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Sparkles,
  Check,
  ArrowRight,
} from "lucide-react"
import PromotionalBanner from "./PromotionalBanner"

const experiences = [
  {
    id: 1,
    title: "Desert Safari Adventure",
    location: "Sahara Desert, Libya",
    duration: "3 days",
    groupSize: "4-12 people",
    image: "/desert-safari.jpg",
    description:
      "Experience the thrill of a lifetime with our Desert Safari Adventure. Ride camels, sandboard down dunes, and camp under the stars in the breathtaking Sahara Desert.",
    highlights: [
      "Camel riding through golden dunes",
      "Sandboarding on towering sand hills",
      "Stargazing in the clear desert night",
      "Traditional Bedouin-style camping",
      "Authentic local cuisine experiences",
    ],
    included: ["Professional guide", "Transportation", "Camping equipment", "Meals and water", "Sandboarding gear"],
    price: 599,
    rating: 4.8,
  },
  {
    id: 2,
    title: "Mediterranean Coastal Retreat",
    location: "Tripoli, Libya",
    duration: "5 days",
    groupSize: "2-8 people",
    image: "/coastal-retreat.jpg",
    description:
      "Unwind in luxury along the stunning Mediterranean coast. Enjoy private beaches, gourmet seafood, and explore ancient Roman ruins in this perfect blend of relaxation and culture.",
    highlights: [
      "Luxurious beachfront accommodation",
      "Guided tour of Tripoli's Old City",
      "Gourmet seafood dining experiences",
      "Visit to the ancient Roman ruins of Sabratha",
      "Relaxing spa treatments",
    ],
    included: [
      "4-star hotel accommodation",
      "Daily breakfast and dinner",
      "Guided tours",
      "Airport transfers",
      "Welcome drink",
    ],
    price: 899,
    rating: 4.9,
  },
  {
    id: 3,
    title: "Historical Wonders Tour",
    location: "Leptis Magna, Libya",
    duration: "4 days",
    groupSize: "6-15 people",
    image: "/historical-wonders.jpg",
    description:
      "Step back in time with our Historical Wonders Tour. Explore the well-preserved ruins of Leptis Magna, a UNESCO World Heritage site, and discover Libya's rich ancient history.",
    highlights: [
      "In-depth tour of Leptis Magna",
      "Visit to the Arch of Septimius Severus",
      "Exploration of the ancient theater",
      "Guided walk through the old market",
      "Museum visit with expert historian",
    ],
    included: ["3-star hotel accommodation", "All meals", "Expert guide", "Entry fees to all sites", "Transportation"],
    price: 749,
    rating: 4.7,
  },
  {
    id: 4,
    title: "Oasis Expedition",
    location: "Ghadames, Libya",
    duration: "6 days",
    groupSize: "4-10 people",
    image: "/oasis-expedition.jpg",
    description:
      "Embark on an unforgettable journey to the enchanting oasis town of Ghadames. Experience traditional Berber culture, explore mud-brick architecture, and witness stunning desert landscapes.",
    highlights: [
      "Explore the UNESCO World Heritage site of Ghadames",
      "Stay in traditional Berber houses",
      "Visit local artisan workshops",
      "4x4 desert excursion to nearby dunes",
      "Traditional music and dance performances",
    ],
    included: [
      "Traditional guesthouse accommodation",
      "All meals with traditional dishes",
      "Local Berber guide",
      "4x4 vehicle for desert excursion",
      "Cultural activities and performances",
    ],
    price: 1099,
    rating: 4.9,
  },
]

export default function FeaturedExperiences() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (experiences?.length || 1))
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + (experiences?.length || 1)) % (experiences?.length || 1))
  }

  useEffect(() => {
    // Safety check to ensure currentIndex is valid
    if (!experiences || currentIndex >= experiences.length) {
      setCurrentIndex(0)
    }

    const timer = setInterval(() => {
      if (experiences && experiences.length > 1) {
        nextSlide()
      }
    }, 5000)

    return () => clearInterval(timer)
  }, [currentIndex])

  // Safety check - if no experiences are available
  if (!experiences || experiences.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Featured Travel Experiences</h2>
          <p className="text-gray-600">No experiences available at the moment. Please check back later.</p>
        </div>
      </section>
    )
  }

  // Get current experience with safety check
  const currentExperience = experiences[currentIndex] || experiences[0]

  return (
    <>
      <section className="relative py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-gray-50 -z-10"></div>
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent -z-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent -z-10"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-100 rounded-full opacity-20 blur-3xl -z-10"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl -z-10"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800">
              Featured Travel Experiences
            </h2>
            <div className="w-24 h-1 bg-blue-500 rounded-full mb-6"></div>
            <p className="text-gray-600 text-center max-w-2xl text-lg">
              Discover handpicked experiences that will make your journey unforgettable
            </p>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl">
              <div className="flex flex-col lg:flex-row">
                {/* Image Section - Full height on desktop */}
                <div className="lg:w-1/2 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/20 mix-blend-multiply z-10"></div>
                  <div className="relative h-96 lg:h-full overflow-hidden">
                    <Image
                      src={currentExperience?.image || "/placeholder.svg?height=600&width=800"}
                      alt={currentExperience?.title || "Travel experience"}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                      onLoadingComplete={() => setIsLoading(false)}
                      onError={() => setIsLoading(false)}
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <span className="inline-block px-4 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-full shadow-lg">
                        {currentExperience?.duration || "Experience"}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-8 z-20">
                      <div className="flex items-center space-x-3 text-white mb-2">
                        <DollarSign className="w-6 h-6 text-yellow-400" />
                        <span className="text-3xl font-bold">${currentExperience?.price || 0}</span>
                        <span className="text-sm opacity-90">per person</span>
                      </div>
                      <div className="flex items-center text-white/80">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{currentExperience?.location || "Various locations"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:w-1/2 p-6 lg:p-10 flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-3xl font-bold text-gray-800 mb-3">
                      {currentExperience?.title || "Travel Experience"}
                    </h3>
                    <div className="w-16 h-1 bg-blue-500 rounded-full mb-4"></div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed flex-grow text-lg">
                    {currentExperience?.description || "Discover amazing travel experiences with us."}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-xl shadow-sm">
                      <div className="p-2.5 bg-blue-100 rounded-full">
                        <Calendar className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Duration</p>
                        <p className="font-medium">{currentExperience?.duration || "Flexible"}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-xl shadow-sm">
                      <div className="p-2.5 bg-blue-100 rounded-full">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Group Size</p>
                        <p className="font-medium">{currentExperience?.groupSize || "Various options"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="font-semibold mb-4 flex items-center text-gray-800 text-lg">
                      <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
                      Trip Highlights
                    </h4>
                    <ul className="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                      {(currentExperience?.highlights || []).slice(0, 4).map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <div className="p-1 bg-green-100 rounded-full mr-3 mt-0.5">
                            <Check className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="text-gray-700">{highlight}</span>
                        </li>
                      ))}
                      {(!currentExperience?.highlights || currentExperience.highlights.length === 0) && (
                        <li className="text-gray-700">Contact us to learn more about this experience</li>
                      )}
                    </ul>
                  </div>

                  <div className="mt-auto">
                    <Link
                      href={`/destinations/${currentExperience?.id || 1}`}
                      className="group w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1 hover:from-blue-700 hover:to-blue-800"
                    >
                      <span className="flex items-center">
                        <span className="mr-2 text-lg">Discover & Book</span>
                        <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {experiences.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute top-1/2 -left-4 md:left-4 transform -translate-y-1/2 bg-white p-4 rounded-full shadow-lg hover:bg-gray-50 transition duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Previous experience"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute top-1/2 -right-4 md:right-4 transform -translate-y-1/2 bg-white p-4 rounded-full shadow-lg hover:bg-gray-50 transition duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Next experience"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
              </>
            )}
          </div>

          {experiences.length > 1 && (
            <div className="flex justify-center mt-10 space-x-2">
              {experiences.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none ${
                    index === currentIndex ? "bg-blue-600 w-10" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      <PromotionalBanner />
    </>
  )
}

