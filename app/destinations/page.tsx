import type { Metadata } from "next"
import DestinationsClientPage from "./DestinationsClientPage"

export const metadata: Metadata = {
  title: "Explore Destinations | Libya Booking",
  description: "Discover amazing destinations in Libya and Tunisia for your next adventure, including Omra packages.",
}

export default function DestinationsPage() {
  return <DestinationsClientPage />
}

