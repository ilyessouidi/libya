"use client"

import { useState, useEffect } from "react"
import { Star } from "lucide-react"

interface Review {
  id: number
  user: string
  rating: number
  comment: string
  date: string
}

interface ReviewSectionProps {
  experienceId: number
}

const mockReviews: Review[] = [
  {
    id: 1,
    user: "John D.",
    rating: 5,
    comment: "Amazing experience! The desert safari was unforgettable.",
    date: "2023-05-15",
  },
  {
    id: 2,
    user: "Sarah M.",
    rating: 4,
    comment: "Great adventure, but it can be physically demanding. Be prepared!",
    date: "2023-05-10",
  },
  {
    id: 3,
    user: "Michael R.",
    rating: 5,
    comment: "The guides were knowledgeable and friendly. Highly recommend!",
    date: "2023-05-05",
  },
]

export default function ReviewSection({ experienceId }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    // In a real application, you would fetch reviews from an API
    setReviews(mockReviews)
  }, [experienceId])

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">User Reviews</h2>
      {reviews.map((review) => (
        <div key={review.id} className="mb-4 pb-4 border-b last:border-b-0">
          <div className="flex items-center mb-2">
            <span className="font-semibold mr-2">{review.user}</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${star <= review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">{review.date}</span>
          </div>
          <p className="text-gray-600">{review.comment}</p>
        </div>
      ))}
    </div>
  )
}

