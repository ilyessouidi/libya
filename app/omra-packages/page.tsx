import type { Metadata } from "next"
import OmraPackagesClientPage from "./OmraPackagesClientPage"

export const metadata: Metadata = {
  title: "Omra Packages | Libya Booking",
  description: "Explore and book Omra packages for your spiritual journey to Mecca and Medina.",
}

export default function OmraPackagesPage() {
  return <OmraPackagesClientPage />
}

