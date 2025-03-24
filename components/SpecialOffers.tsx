"use client"

import { useState } from "react"
import { Tag } from "lucide-react"

interface SpecialOffer {
  type: string
  name: string
  description: string
  discountPercentage?: number
  minDaysInAdvance?: number
  minNights?: number
}

interface SpecialOffersProps {
  offers: SpecialOffer[]
}

export default function SpecialOffers({ offers }: SpecialOffersProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const toggleOffer = (offerType: string) => {
    setExpanded((prev) => ({
      ...prev,
      [offerType]: !prev[offerType],
    }))
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <Tag className="w-6 h-6 text-green-500 mr-2" />
        Special Offers
      </h2>
      <div className="space-y-4">
        {offers.map((offer, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{offer.name}</h3>
              {offer.discountPercentage && (
                <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                  {offer.discountPercentage}% off
                </span>
              )}
            </div>
            <p className="text-gray-600 mb-2">{offer.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

