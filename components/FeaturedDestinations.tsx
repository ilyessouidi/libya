import Image from "next/image"
import Link from "next/link"

const destinations = [
  {
    id: 1,
    name: "Tunis",
    description: "Explore the Capital's Rich History",
    image: "/tunis.jpg",
  },
  {
    id: 2,
    name: "Djerba",
    description: "Experience the Mediterranean Beauty",
    image: "/djerba.jpg",
  },
  {
    id: 3,
    name: "Sidi Bou Said",
    description: "Discover the Blue and White Village",
    image: "/sidi-bou-said.jpg",
  },
  {
    id: 4,
    name: "Sahara Desert",
    description: "Adventure in the Golden Dunes",
    image: "/sahara.jpg",
  },
]

export default function FeaturedDestinations() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Explore Our Top Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination) => (
            <div key={destination.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
                <p className="text-gray-600 mb-4">{destination.description}</p>
                <Link
                  href={`/search?q=${encodeURIComponent(destination.name)}`}
                  className="text-blue-500 hover:underline"
                >
                  View Hotels
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/destinations" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
            See More Destinations
          </Link>
        </div>
      </div>
    </section>
  )
}

