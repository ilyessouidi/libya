"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { MapPin, Calendar, Users, Star, Sunrise, Check, ChevronDown, ChevronUp } from "lucide-react"
import BookingForm from "@/components/BookingForm"
import ReviewSection from "@/components/ReviewSection"

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
    itinerary: [
      {
        day: 1,
        title: "Arrival and Desert Introduction",
        description:
          "Arrive at the meeting point, meet your guides, and begin your journey into the Sahara. Enjoy a welcome dinner and orientation under the stars.",
      },
      {
        day: 2,
        title: "Desert Exploration and Activities",
        description:
          "Full day of desert activities including camel riding, sandboarding, and exploring hidden oases. Evening includes traditional music and storytelling around the campfire.",
      },
      {
        day: 3,
        title: "Sunrise Farewell",
        description:
          "Early morning sunrise viewing, followed by a final desert breakfast. Return journey with stops at scenic points before drop-off at the original meeting location.",
      },
    ],
    included: ["Professional guide", "Transportation", "Camping equipment", "Meals and water", "Sandboarding gear"],
    price: 599,
    rating: 4.8,
  },
  // ... (other experiences)
]

export default function ExperiencePage() {
  const { id } = useParams()
  const [experience, setExperience] = useState(null)
  const [showFullItinerary, setShowFullItinerary] = useState(false)

  useEffect(() => {
    const foundExperience = experiences.find((exp) => exp.id === Number(id))
    setExperience(foundExperience)
  }, [id])

  if (!experience) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{experience.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Image
            src={experience.image || "/placeholder.svg"}
            alt={experience.title}
            width={800}
            height={500}
            className="rounded-lg shadow-md mb-6"
          />
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Experience Overview</h2>
            <p className="text-gray-600 mb-4">{experience.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-blue-500 mr-2" />
                <span>{experience.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-blue-500 mr-2" />
                <span>{experience.duration}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 text-blue-500 mr-2" />
                <span>{experience.groupSize}</span>
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                <span>{experience.rating} / 5</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Highlights:</h3>
            <ul className="list-none mb-4">
              {experience.highlights.map((highlight, index) => (
                <li key={index} className="mb-1 flex items-start">
                  <Sunrise className="w-5 h-5 text-orange-500 mr-2 flex-shrink-0 mt-1" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Itinerary</h2>
            {experience.itinerary.slice(0, showFullItinerary ? undefined : 2).map((day, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold">
                  Day {day.day}: {day.title}
                </h3>
                <p className="text-gray-600">{day.description}</p>
              </div>
            ))}
            {!showFullItinerary && experience.itinerary.length > 2 && (
              <button onClick={() => setShowFullItinerary(true)} className="text-blue-500 flex items-center">
                Show Full Itinerary
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
            )}
            {showFullItinerary && (
              <button onClick={() => setShowFullItinerary(false)} className="text-blue-500 flex items-center">
                Hide Full Itinerary
                <ChevronUp className="w-4 h-4 ml-1" />
              </button>
            )}
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">What's Included</h2>
            <ul className="list-none">
              {experience.included.map((item, index) => (
                <li key={index} className="mb-2 flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <ReviewSection experienceId={experience.id} />
        </div>
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h2 className="text-2xl font-semibold mb-4">Book This Experience</h2>
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">Price:</span>
              <span className="text-2xl font-bold text-green-500">${experience.price}</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">per person</p>
            <BookingForm experienceId={experience.id} price={experience.price} />
          </div>
        </div>
      </div>
    </div>
  )
}

