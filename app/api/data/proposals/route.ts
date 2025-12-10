import { NextRequest, NextResponse } from 'next/server'

// Mock proposals data
const mockProposals = [
  { id: 1, uc: 'UC 3', title: 'Road Construction Proposal', description: 'Construction of 2km road in residential area', amount: '₹25,00,000', status: 'pending', date: '2024-01-15', duration: '6 months' },
  { id: 2, uc: 'UC 1', title: 'Water Supply Upgrade', description: 'Upgrade water pipelines in Sector A', amount: '₹18,50,000', status: 'approved', date: '2024-01-14', duration: '4 months' },
  { id: 3, uc: 'UC 5', title: 'Park Renovation', description: 'Renovation of community park with facilities', amount: '₹12,00,000', status: 'rejected', date: '2024-01-13', duration: '3 months' },
  { id: 4, uc: 'UC 2', title: 'Drainage System', description: 'New drainage system installation', amount: '₹32,00,000', status: 'pending', date: '2024-01-12', duration: '8 months' },
  { id: 5, uc: 'UC 4', title: 'Street Lights', description: 'Installation of LED street lights', amount: '₹8,50,000', status: 'in-review', date: '2024-01-11', duration: '2 months' },
  { id: 6, uc: 'UC 6', title: 'Community Center', description: 'Construction of community center', amount: '₹45,00,000', status: 'approved', date: '2024-01-10', duration: '10 months' },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Filter parameters
    const uc = searchParams.get('uc')
    const status = searchParams.get('status')
    const limit = searchParams.get('limit') || '10'
    const offset = searchParams.get('offset') || '0'

    let filteredProposals = [...mockProposals]

    // Apply filters
    if (uc) {
      filteredProposals = filteredProposals.filter(p => p.uc === uc)
    }
    
    if (status) {
      filteredProposals = filteredProposals.filter(p => p.status === status)
    }

    // Apply pagination
    const start = parseInt(offset)
    const end = start + parseInt(limit)
    const paginatedProposals = filteredProposals.slice(start, end)

    return NextResponse.json({
      success: true,
      data: paginatedProposals,
      total: filteredProposals.length,
      limit: parseInt(limit),
      offset: start
    })

  } catch (error) {
    console.error('Proposals API error:', error)
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
    if (!body.title || !body.description || !body.amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create new proposal
    const newProposal = {
      id: mockProposals.length + 1,
      uc: body.uc || 'UC 1',
      title: body.title,
      description: body.description,
      amount: body.amount,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      duration: body.duration || 'Not specified',
      category: body.category || 'Infrastructure',
      location: body.location || 'Not specified',
      createdAt: new Date().toISOString()
    }

    // In real app, save to database
    // mockProposals.push(newProposal)

    return NextResponse.json({
      success: true,
      message: 'Proposal created successfully',
      data: newProposal,
      proposalId: newProposal.id
    }, { status: 201 })

  } catch (error) {
    console.error('Create proposal API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}