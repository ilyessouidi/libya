import Link from "next/link"
import Image from "next/image"
import { Plane, Umbrella, Building, ChurchIcon as Mosque } from "lucide-react"

const categories = [
  { name: "City Breaks", icon: Building, image: "/city-breaks.jpg", href: "/destinations/city-breaks" },
  { name: "Beach Holidays", icon: Umbrella, image: "/beach-holidays.jpg", href: "/destinations/beach-holidays" },
  { name: "Adventure Tours", icon: Plane, image: "/adventure-tours.jpg", href: "/destinations/adventure-tours" },
  { name: "Omra Trips", icon: Mosque, image: "/omra-trips.jpg", href: "#omra-packages" },
]

export default function DestinationCategories() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link key={category.name} href={category.href}>
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
            <div className="relative h-48">
              <Image src={category.image || "/placeholder.svg"} alt={category.name} layout="fill" objectFit="cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-xl font-semibold">{category.name}</h3>
              </div>
            </div>
            <div className="p-4 flex items-center justify-center">
              <category.icon className="w-6 h-6 mr-2 text-blue-500" />
              <span className="text-gray-700">Explore {category.name}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

