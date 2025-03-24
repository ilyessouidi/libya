import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import Breadcrumb from "@/components/Breadcrumb"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Religious Journeys | Libya Booking",
  description: "Explore our religious journey packages including Omra trips to Mecca and Medina.",
}

export default function ReligiousJourneysPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb />
      <h1 className="text-3xl font-bold mb-6">Religious Journeys</h1>

      {/* Omra Section */}
      <section className="mb-12">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="relative h-64 md:h-full">
                <Image src="/mecca-kaaba.jpg" alt="Mecca and Kaaba" fill className="object-cover" />
              </div>
            </div>
            <div className="p-6 md:w-1/2">
              <h2 className="text-2xl font-bold mb-4">Omra Packages</h2>
              <p className="text-gray-700 mb-4">
                Embark on a spiritual journey to the holiest cities in Islam with our comprehensive Omra packages. We
                offer a range of options to suit different preferences and budgets, all designed to provide a meaningful
                and comfortable pilgrimage experience.
              </p>
              <p className="text-gray-700 mb-6">
                Our packages include visa processing, accommodation, transportation, guided tours, and spiritual
                guidance to ensure a fulfilling journey.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <span>Standard Omra Package - Starting from $1,500</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <span>Premium Omra Package - Starting from $3,000</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <span>Family Omra Package - Starting from $2,200</span>
                </div>
              </div>
              <Link
                href="/omra-packages"
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 inline-flex items-center"
              >
                View Omra Packages
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Other Religious Journeys */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Other Religious Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image src="/jerusalem.jpg" alt="Jerusalem" fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Jerusalem</h3>
              <p className="text-gray-600 mb-4">
                Explore the holy city of Jerusalem, sacred to three major religions: Judaism, Christianity, and Islam.
              </p>
              <p className="text-blue-600">Coming soon</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image src="/vatican.jpg" alt="Vatican City" fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Vatican City</h3>
              <p className="text-gray-600 mb-4">
                Visit the spiritual center of the Roman Catholic Church and explore its rich religious heritage.
              </p>
              <p className="text-blue-600">Coming soon</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image src="/kairouan.jpg" alt="Kairouan" fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Kairouan, Tunisia</h3>
              <p className="text-gray-600 mb-4">
                Discover one of Islam's holiest cities and home to the Great Mosque of Kairouan.
              </p>
              <p className="text-blue-600">Coming soon</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

