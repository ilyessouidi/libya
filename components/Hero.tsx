"use client"
import { useEffect, useRef } from "react"
import SearchBar from "./SearchBar"

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Ensure video plays automatically
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay was prevented:", error)
      })
    }
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background video */}
      <video ref={videoRef} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
        <source src="/travel-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white z-10 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center max-w-4xl">Your Dream Vacation Starts Here</h1>
        <p className="text-xl md:text-2xl mb-8 text-center max-w-3xl">
          Find the best deals on hotels, flights, and packages in Libya and Tunisia
        </p>

        <SearchBar />
      </div>
    </section>
  )
}

