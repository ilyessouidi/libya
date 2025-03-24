import { NextResponse } from 'next/server'
import { getAllHotels } from '@/lib/supabase-utils'

export async function GET() {
  try {
    const hotels = await getAllHotels()
    return NextResponse.json({ success: true, data: hotels })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch hotels' },
      { status: 500 }
    )
  }
} 
