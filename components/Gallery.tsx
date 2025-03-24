"use client"

import { useState } from "react"
import Image from "next/image"

interface GalleryProps {
  images: string[]
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0])

  return (
    <div>
      <div className="relative h-96 mb-4">
        <Image
          src={selectedImage || "/placeholder.svg"}
          alt="Selected Image"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {images.map((image: string, index: number) => (
          <div
            key={index}
            className="relative w-24 h-24 flex-shrink-0 cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Thumbnail ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className={`rounded-lg ${selectedImage === image ? "ring-2 ring-blue-500" : ""}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

