export interface Hotel {
  id: number
  name: string
  city: string
  country: string
  rating: number
  price: number
  image: string
  roomTypes: string[]
  services: string[]
  description?: string
}

