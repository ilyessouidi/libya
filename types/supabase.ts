export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          role: 'admin' | 'user'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          role?: 'admin' | 'user'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          role?: 'admin' | 'user'
          created_at?: string
        }
      }
      hotels: {
        Row: {
          id: string
          name: string
          city: string
          country: string
          rating: number
          price: number
          image: string
          room_types: string[]
          services: string[]
          description: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          city: string
          country: string
          rating: number
          price: number
          image: string
          room_types: string[]
          services: string[]
          description: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          city?: string
          country?: string
          rating?: number
          price?: number
          image?: string
          room_types?: string[]
          services?: string[]
          description?: string
          created_at?: string
        }
      }
      omra_packages: {
        Row: {
          id: string
          name: string
          image: string
          departure_date: string
          duration: number
          hotel: string
          transport: string
          price: number
          description: string
          services: string[]
          itinerary: string[]
          spiritual_significance: string
          available_dates: string[]
          hotel_options: Json
          transport_options: Json
          additional_services: Json
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          image: string
          departure_date: string
          duration: number
          hotel: string
          transport: string
          price: number
          description: string
          services: string[]
          itinerary: string[]
          spiritual_significance: string
          available_dates: string[]
          hotel_options: Json
          transport_options: Json
          additional_services: Json
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          image?: string
          departure_date?: string
          duration?: number
          hotel?: string
          transport?: string
          price?: number
          description?: string
          services?: string[]
          itinerary?: string[]
          spiritual_significance?: string
          available_dates?: string[]
          hotel_options?: Json
          transport_options?: Json
          additional_services?: Json
          created_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string
          hotel_id: string | null
          package_id: string | null
          check_in: string
          check_out: string
          total_price: number
          payment_status: 'pending' | 'completed' | 'failed'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          hotel_id?: string | null
          package_id?: string | null
          check_in: string
          check_out: string
          total_price: number
          payment_status?: 'pending' | 'completed' | 'failed'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          hotel_id?: string | null
          package_id?: string | null
          check_in?: string
          check_out?: string
          total_price?: number
          payment_status?: 'pending' | 'completed' | 'failed'
          created_at?: string
        }
      }
    }
  }
} 