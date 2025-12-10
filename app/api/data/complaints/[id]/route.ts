import { NextRequest, NextResponse } from 'next/server'

// Mock complaints data
const mockComplaints = [
  { id: 1, uc: 'UC 1', type: 'Water Supply', description: 'No water supply for 3 days', status: 'pending', date: '2024-01-15', priority: 'high', location: 'Sector A' },
  { id: 2, uc: 'UC 3', type: 'Road Repair', description: 'Potholes on main road', status: 'in-progress', date: '2024-01-14', priority: 'medium', location: 'Main Road' },
  { id: 3, uc: 'UC 2', type: 'Electricity', description: 'Frequent power cuts', status: 'resolved', date: '2024-01-13', priority: 'high', location: 'Sector B' },
]

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    const complaint = mockComplaints.find(c => c.id === id)
    
    if (!complaint) {
      return NextResponse.json(
        { error: 'Complaint not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: complaint
    })

  } catch (error) {
    console.error('Complaint detail API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const body = await request.json()
    
    // Find complaint
    const complaintIndex = mockComplaints.findIndex(c => c.id === id)
    
    if (complaintIndex === -1) {
      return NextResponse.json(
        { error: 'Complaint not found' },
        { status: 404 }
      )
    }

    // Update complaint
    const updatedComplaint = {
      ...mockComplaints[complaintIndex],
      ...body,
      updatedAt: new Date().toISOString()
    }

    // In real app, update in database
    // mockComplaints[complaintIndex] = updatedComplaint

    return NextResponse.json({
      success: true,
      message: 'Complaint updated successfully',
      data: updatedComplaint
    })

  } catch (error) {
    console.error('Update complaint API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    // Find complaint
    const complaintIndex = mockComplaints.findIndex(c => c.id === id)
    
    if (complaintIndex === -1) {
      return NextResponse.json(
        { error: 'Complaint not found' },
        { status: 404 }
      )
    }

    // In real app, delete from database
    // mockComplaints.splice(complaintIndex, 1)

    return NextResponse.json({
      success: true,
      message: 'Complaint deleted successfully'
    })

  } catch (error) {
    console.error('Delete complaint API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}