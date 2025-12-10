// app/api/ai-suggestions/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { complaintDescription, category, location } = await request.json()

    if (!complaintDescription) {
      return NextResponse.json(
        { error: 'Complaint description is required' },
        { status: 400 }
      )
    }

    // ✅ YAHAN APNA OPENAI API KEY PASTE KARO
    const apiKey = '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'
    // Example: 'sk-proj-abc123xyz456...'
    
    if (!apiKey || apiKey === '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') {
      console.error('⚠️ Please add your OpenAI API key in the code')
      return NextResponse.json(
        { 
          error: 'OpenAI API key not configured',
          message: 'Please add your API key in app/api/ai-suggestions/route.ts file'
        },
        { status: 500 }
      )
    }

    // Construct prompt for AI
    const prompt = `
      As a city development expert in Pakistan, suggest practical solutions for this municipal complaint:
      
      COMPLAINT: "${complaintDescription}"
      CATEGORY: ${category || 'General'}
      LOCATION: ${location || 'Not specified'}
      
      Provide 3-5 specific, actionable solutions that the city administration can implement.
      
      FORMAT FOR EACH SOLUTION:
      1. **Title** - Short descriptive title
      2. **Steps** - Detailed implementation steps
      3. **Cost** - Estimated cost (Low: <50k, Medium: 50k-200k, High: >200k PKR)
      4. **Time** - Time required (1-7 days, 1-4 weeks, 1-3 months)
      5. **Department** - Responsible department (e.g., Municipal Services, Water Board, Electricity Dept)
      
      IMPORTANT: Make solutions realistic for Pakistani municipal context.
      Use terms like "UC Office", "Tehsil Municipal", "WASA", "LESCO" where relevant.
    `

    console.log('📤 Sending request to OpenAI API...')
    
    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',  // Using cheaper model
        messages: [
          {
            role: 'system',
            content: 'You are an expert in Pakistani municipal governance and city development. Provide practical, budget-friendly solutions.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 800  // Increased for detailed responses
      })
    })

    const data = await response.json()
    console.log('📥 OpenAI Response:', data.choices?.[0]?.message?.content?.substring(0, 100) + '...')

    if (!response.ok) {
      console.error('❌ OpenAI API error:', data)
      return NextResponse.json(
        { 
          error: 'OpenAI API Error',
          code: data.error?.code,
          message: data.error?.message,
          type: data.error?.type
        },
        { status: response.status }
      )
    }

    const suggestions = data.choices[0]?.message?.content || 'No suggestions generated.'

    return NextResponse.json({
      success: true,
      suggestions,
      model: data.model,
      usage: data.usage,
      isMock: false
    })

  } catch (error: any) {
    console.error('❌ AI suggestion error:', error)
    return NextResponse.json(
      { 
        error: 'Server Error',
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}