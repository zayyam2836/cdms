import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Check for token in headers
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json(
        { authenticated: false, message: 'No token provided' },
        { status: 401 }
      )
    }

    // Mock token validation
    // In real app, verify JWT token here
    if (token.startsWith('mock_token_')) {
      // Extract user info from mock token
      const parts = token.split('_')
      const userId = parseInt(parts[2])
      
      // Mock users data
      const users = [
        { Sort: 1, code: 'mayor', ref_id_int4: 1, username: 'mayor_hhi', name: 'City Mayor' },
        { Sort: 2, code: 'chairman', ref_id_int4: 1, username: 'shmed_khan_uc', name: 'Shmed Khan' },
      ]
      
      const user = users.find(u => u.Sort === userId)
      
      if (user) {
        return NextResponse.json({
          authenticated: true,
          user: {
            user_id: user.Sort,
            role: user.code as 'mayor' | 'chairman',
            ref_id: user.ref_id_int4,
            username: user.username,
            name: user.name
          }
        })
      }
    }

    return NextResponse.json(
      { authenticated: false, message: 'Invalid token' },
      { status: 401 }
    )

  } catch (error) {
    console.error('Auth check API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}