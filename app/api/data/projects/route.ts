import { NextRequest, NextResponse } from 'next/server'

// Mock projects data
const mockProjects = [
  {
    id: 1,
    name: 'Road Construction - Phase 2',
    uc: 'UC 3',
    type: 'Infrastructure',
    location: 'Main Road, Sector B',
    startDate: '2023-10-15',
    endDate: '2024-02-15',
    progress: 65,
    status: 'delayed',
    budget: '₹25,00,000',
    spent: '₹18,50,000',
    delayReason: 'Monsoon season affected work'
  },
  {
    id: 2,
    name: 'Water Pipeline Upgrade',
    uc: 'UC 1',
    type: 'Water Supply',
    location: 'Sector A Residential Area',
    startDate: '2023-11-01',
    endDate: '2024-01-31',
    progress: 85,
    status: 'on-track',
    budget: '₹18,50,000',
    spent: '₹15,00,000',
    delayReason: null
  },
  {
    id: 3,
    name: 'Community Park Renovation',
    uc: 'UC 5',
    type: 'Public Facilities',
    location: 'Central Park',
    startDate: '2023-12-01',
    endDate: '2024-03-01',
    progress: 40,
    status: 'at-risk',
    budget: '₹12,00,000',
    spent: '₹5,50,000',
    delayReason: 'Material supply delays'
  },
  {
    id: 4,
    name: 'Drainage System Installation',
    uc: 'UC 2',
    type: 'Infrastructure',
    location: 'Low-lying Areas',
    startDate: '2023-09-01',
    endDate: '2024-04-01',
    progress: 75,
    status: 'on-track',
    budget: '₹32,00,000',
    spent: '₹24,00,000',
    delayReason: null
  },
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

    let filteredProjects = [...mockProjects]

    // Apply filters
    if (uc) {
      filteredProjects = filteredProjects.filter(p => p.uc === uc)
    }
    
    if (status) {
      filteredProjects = filteredProjects.filter(p => p.status === status)
    }
    
    if (type) {
      filteredProjects = filteredProjects.filter(p => p.type === type)
    }

    // Apply pagination
    const start = parseInt(offset)
    const end = start + parseInt(limit)
    const paginatedProjects = filteredProjects.slice(start, end)

    return NextResponse.json({
      success: true,
      data: paginatedProjects,
      total: filteredProjects.length,
      limit: parseInt(limit),
      offset: start
    })

  } catch (error) {
    console.error('Projects API error:', error)
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
    if (!body.name || !body.uc || !body.type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create new project
    const newProject = {
      id: mockProjects.length + 1,
      name: body.name,
      uc: body.uc,
      type: body.type,
      location: body.location || 'Not specified',
      startDate: body.startDate || new Date().toISOString().split('T')[0],
      endDate: body.endDate || 'Not specified',
      progress: 0,
      status: 'planning',
      budget: body.budget || '₹0',
      spent: '₹0',
      delayReason: null,
      createdAt: new Date().toISOString()
    }

    // In real app, save to database
    // mockProjects.push(newProject)

    return NextResponse.json({
      success: true,
      message: 'Project created successfully',
      data: newProject,
      projectId: newProject.id
    }, { status: 201 })

  } catch (error) {
    console.error('Create project API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}