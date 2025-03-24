import { supabase } from './supabase'
import type { Database } from '@/types/supabase'

// Hotels
export async function getAllHotels() {
  const { data, error } = await supabase
    .from('hotels')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getHotelById(id: string) {
  const { data, error } = await supabase
    .from('hotels')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

// Omra Packages
export async function getAllOmraPackages() {
  const { data, error } = await supabase
    .from('omra_packages')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// Bookings
export async function createBooking(booking: Database['public']['Tables']['bookings']['Insert']) {
  const { data, error } = await supabase
    .from('bookings')
    .insert(booking)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getUserBookings(userId: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      hotels (*),
      omra_packages (*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// Auth
export async function signUp(email: string, password: string, name: string) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError) throw authError

  // Create user profile
  if (authData.user) {
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email,
        name,
        role: 'user'
      })

    if (profileError) throw profileError
  }

  return authData
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
} 