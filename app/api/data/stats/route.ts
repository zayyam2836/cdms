import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const uc = searchParams.get('uc')
    
    // Mock statistics data
    const stats = {
      totalComplaints: 1247,
      pendingComplaints: 89,
      resolvedComplaints: 1002,
      totalProposals: 156,
      approvedProposals: 89,
      pendingProposals: 45,
      rejectedProposals: 22,
      totalBudget: 50000000,
      allocatedBudget: 32000000,
      utilizedBudget: 24500000,
      activeProjects: 56,
      completedProjects: 123,
      delayedProjects: 12,
      ucStats: [
        { uc: 'UC 1', complaints: 45, resolved: 38, efficiency: 84 },
        { uc: 'UC 2', complaints: 32, resolved: 28, efficiency: 88 },
        { uc: 'UC 3', complaints: 56, resolved: 49, efficiency: 88 },
        { uc: 'UC 4', complaints: 28, resolved: 24, efficiency: 86 },
        { uc: 'UC 5', complaints: 41, resolved: 35, efficiency: 85 },
        { uc: 'UC 6', complaints: 39, resolved: 33, efficiency: 85 },
      ],
      recentActivities: [
        { id: 1, action: 'Complaint Resolved', uc: 'UC 3', time: '2 hours ago' },
        { id: 2, action: 'Proposal Approved', uc: 'UC 5', time: 'Yesterday' },
        { id: 3, action: 'Budget Allocated', uc: 'UC 2', time: '2 days ago' },
      ]
    }

    // If UC specified, filter UC stats
    let responseData = { ...stats }
    if (uc) {
      responseData.ucStats = responseData.ucStats.filter(s => s.uc === uc)
    }

    return NextResponse.json({
      success: true,
      data: responseData,
      generatedAt: new Date().toISOString()
    })

  } catch (error) {
    console.error('Stats API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}