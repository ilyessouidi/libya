export interface OmraPackage {
  id: number
  name: string
  image: string
  departureDate: string
  duration: number
  hotel: string
  transport: string
  price: number
  description: string
  services: string[]
  itinerary: string[]
  spiritualSignificance: string
  availableDates: string[]
  hotelOptions: {
    name: string
    type: string
    price: number
    description: string
  }[]
  transportOptions: {
    type: string
    price: number
    description: string
  }[]
  additionalServices: {
    name: string
    price: number
    description: string
  }[]
}

