import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'complaints'
    const format = searchParams.get('format') || 'csv'
    
    // Mock export data based on type
    let data = []
    let filename = 'export'
    
    switch (type) {
      case 'complaints':
        data = [
          { id: 1, uc: 'UC 1', type: 'Water Supply', status: 'Pending', date: '2024-01-15' },
          { id: 2, uc: 'UC 3', type: 'Road Repair', status: 'In Progress', date: '2024-01-14' },
          { id: 3, uc: 'UC 2', type: 'Electricity', status: 'Resolved', date: '2024-01-13' },
        ]
        filename = 'complaints'
        break
        
      case 'proposals':
        data = [
          { id: 1, uc: 'UC 3', title: 'Road Construction', status: 'Pending', amount: '₹25,00,000' },
          { id: 2, uc: 'UC 1', title: 'Water Supply Upgrade', status: 'Approved', amount: '₹18,50,000' },
          { id: 3, uc: 'UC 5', title: 'Park Renovation', status: 'Rejected', amount: '₹12,00,000' },
        ]
        filename = 'proposals'
        break
        
      case 'budget':
        data = [
          { uc: 'UC 1', allocated: '₹85,00,000', utilized: '₹62,00,000', remaining: '₹23,00,000' },
          { uc: 'UC 2', allocated: '₹75,00,000', utilized: '₹58,00,000', remaining: '₹17,00,000' },
          { uc: 'UC 3', allocated: '₹90,00,000', utilized: '₹72,00,000', remaining: '₹18,00,000' },
        ]
        filename = 'budget'
        break
        
      default:
        data = []
    }

    // Convert to requested format
    let content = ''
    let contentType = 'text/plain'
    
    if (format === 'csv') {
      // Convert to CSV
      if (data.length > 0) {
        const headers = Object.keys(data[0]).join(',')
        const rows = data.map(item => Object.values(item).join(','))
        content = [headers, ...rows].join('\n')
      }
      contentType = 'text/csv'
      filename += '.csv'
      
    } else if (format === 'json') {
      content = JSON.stringify(data, null, 2)
      contentType = 'application/json'
      filename += '.json'
    }

    // Create response with file download
    return new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })

  } catch (error) {
    console.error('Export API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}