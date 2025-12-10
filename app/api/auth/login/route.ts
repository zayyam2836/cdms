import { NextRequest, NextResponse } from 'next/server'

// Your Supabase user_login table data (from your screenshot)
const users = [
  { Sort: 1, code: 'mayor', ref_id_int4: 1, username: 'mayor_hhi', password_text: 'mayorpass123', name: 'City Mayor' },
  { Sort: 2, code: 'chairman', ref_id_int4: 1, username: 'shmed_khan_uc', password_text: 'pass1', name: 'Shmed Khan' },
  { Sort: 3, code: 'chairman', ref_id_int4: 2, username: 'sama_baloch_uc', password_text: 'pass2', name: 'Sama Baloch' },
  { Sort: 4, code: 'chairman', ref_id_int4: 3, username: 'rasa_hussein_uc', password_text: 'pass3', name: 'Rasa Hussein' },
  { Sort: 5, code: 'chairman', ref_id_int4: 4, username: 'sama_shaikh_uc', password_text: 'pass4', name: 'Sama Shaikh' },
  { Sort: 6, code: 'chairman', ref_id_int4: 6, username: 'bini_gonashi_uc', password_text: 'pass5', name: 'Bini Gonashi' }
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    // Find user in mock database
    const user = users.find(u => 
      u.username === username && u.password_text === password
    )

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      )
    }

    // Create user object without password
    const userData = {
      user_id: user.Sort,
      role: user.code as 'mayor' | 'chairman',
      ref_id: user.ref_id_int4,
      username: user.username,
      name: user.name,
      token: `mock_token_${Date.now()}_${user.Sort}` // Mock JWT token
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: userData
    })

  } catch (error) {
    console.error('Login API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Login API endpoint',
    method: 'POST',
    parameters: {
      username: 'string',
      password: 'string'
    }
  })
}