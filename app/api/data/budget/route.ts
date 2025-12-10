import { NextRequest, NextResponse } from 'next/server'

// Mock budget data
const mockBudget = {
  total: 50000000, // 5 Crore
  allocated: 32000000,
  utilized: 24500000,
  remaining: 25500000,
  ucAllocations: [
    { uc: 'UC 1', allocated: 8500000, utilized: 6200000, percentage: 73 },
    { uc: 'UC 2', allocated: 7500000, utilized: 5800000, percentage: 77 },
    { uc: 'UC 3', allocated: 9000000, utilized: 7200000, percentage: 80 },
    { uc: 'UC 4', allocated: 5500000, utilized: 3500000, percentage: 64 },
    { uc: 'UC 5', allocated: 6500000, utilized: 4800000, percentage: 74 },
    { uc: 'UC 6', allocated: 6000000, utilized: 5200000, percentage: 87 },
  ],
  categories: [
    { name: 'Infrastructure', allocated: 15000000, utilized: 12500000 },
    { name: 'Sanitation', allocated: 8000000, utilized: 6500000 },
    { name: 'Water Supply', allocated: 7000000, utilized: 5500000 },
    { name: 'Road Maintenance', allocated: 6000000, utilized: 4000000 },
    { name: 'Public Facilities', allocated: 4000000, utilized: 3000000 },
  ]
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Optional: Filter by UC
    const uc = searchParams.get('uc')
    
    let responseData = { ...mockBudget }
    
    // If UC specified, filter allocations
    if (uc) {
      responseData.ucAllocations = responseData.ucAllocations.filter(a => a.uc === uc)
    }

    return NextResponse.json({
      success: true,
      data: responseData,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Budget API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields for budget allocation
    if (!body.uc || !body.amount || !body.category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Mock budget allocation
    const allocation = {
      id: Date.now(),
      uc: body.uc,
      amount: body.amount,
      category: body.category,
      purpose: body.purpose || 'General',
      fiscalYear: body.fiscalYear || '2023-24',
      status: 'allocated',
      allocatedAt: new Date().toISOString(),
      allocatedBy: 'System' // In real app, get from auth
    }

    return NextResponse.json({
      success: true,
      message: 'Budget allocated successfully',
      data: allocation,
      allocationId: allocation.id
    }, { status: 201 })

  } catch (error) {
    console.error('Allocate budget API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}