import Hero from "@/components/Hero"
import FeaturedExperiences from "@/components/FeaturedExperiences"
import BookingProcess from "@/components/BookingProcess"
import ClientSuspense from "@/components/ClientSuspense"

export default function Home() {
  return (
    <ClientSuspense>
      <main className="min-h-screen flex flex-col">
        <Hero />
        <FeaturedExperiences />
        <BookingProcess />
      </main>
    </ClientSuspense>
  )
}

