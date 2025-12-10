import { NextRequest, NextResponse } from 'next/server'

// Mock complaints data
const mockComplaints = [
  { id: 1, uc: 'UC 1', type: 'Water Supply', description: 'No water supply for 3 days', status: 'pending', date: '2024-01-15', priority: 'high', location: 'Sector A' },
  { id: 2, uc: 'UC 3', type: 'Road Repair', description: 'Potholes on main road', status: 'in-progress', date: '2024-01-14', priority: 'medium', location: 'Main Road' },
  { id: 3, uc: 'UC 2', type: 'Electricity', description: 'Frequent power cuts', status: 'resolved', date: '2024-01-13', priority: 'high', location: 'Sector B' },
  { id: 4, uc: 'UC 5', type: 'Sanitation', description: 'Garbage not collected', status: 'pending', date: '2024-01-12', priority: 'low', location: 'Market Area' },
  { id: 5, uc: 'UC 4', type: 'Drainage', description: 'Water logging issue', status: 'resolved', date: '2024-01-11', priority: 'medium', location: 'Low-lying Area' },
  { id: 6, uc: 'UC 6', type: 'Street Lights', description: 'Non-functional street lights', status: 'in-progress', date: '2024-01-10', priority: 'high', location: 'All streets' },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Filter parameters
    const uc = searchParams.get('uc')
    const status = searchParams.get('status')
    const type = searchParams.get('type')
    const limit = searchParams.get('limit') || '10'
    const offset = searchParams.get('offset') || '0'

    let filteredComplaints = [...mockComplaints]

    // Apply filters
    if (uc) {
      filteredComplaints = filteredComplaints.filter(c => c.uc === uc)
    }
    
    if (status) {
      filteredComplaints = filteredComplaints.filter(c => c.status === status)
    }
    
    if (type) {
      filteredComplaints = filteredComplaints.filter(c => c.type === type)
    }

    // Apply pagination
    const start = parseInt(offset)
    const end = start + parseInt(limit)
    const paginatedComplaints = filteredComplaints.slice(start, end)

    return NextResponse.json({
      success: true,
      data: paginatedComplaints,
      total: filteredComplaints.length,
      limit: parseInt(limit),
      offset: start
    })

  } catch (error) {
    console.error('Complaints API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.type || !body.description || !body.location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create new complaint
    const newComplaint = {
      id: mockComplaints.length + 1,
      uc: body.uc || 'UC 1',
      type: body.type,
      description: body.description,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      priority: body.priority || 'medium',
      location: body.location,
      createdAt: new Date().toISOString()
    }

    // In real app, save to database
    // mockComplaints.push(newComplaint)

    return NextResponse.json({
      success: true,
      message: 'Complaint created successfully',
      data: newComplaint,
      complaintId: newComplaint.id
    }, { status: 201 })

  } catch (error) {
    console.error('Create complaint API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}