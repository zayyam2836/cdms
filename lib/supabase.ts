// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://jculuzklcusscieqjrag.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjdWx1emtsY3Vzc2NpZXFqcmFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxOTc0ODUsImV4cCI6MjA4MDc3MzQ4NX0.--xWOhO5J76MHkivA4m7NV7o_oSv5jccTTb_FWl10fA'

// Create official Supabase client
export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY)

// REST API helper with proper insert support
export const supabase = {
  // GET method
  async query(table: string, method: string = 'GET', data?: any, filters?: any) {
    try {
      const options: RequestInit = {
        method,
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': method === 'POST' ? 'return=representation' : ''
        }
      }
      
      if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        options.body = JSON.stringify(data)
      }
      
      // Build URL with filters
      let url = `${SUPABASE_URL}/rest/v1/${table}`
      if (filters && Object.keys(filters).length > 0) {
        const params = new URLSearchParams()
        Object.entries(filters).forEach(([key, value]) => {
          params.append(key, `eq.${value}`)
        })
        url += `?${params.toString()}`
      }
      
      const response = await fetch(url, options)
      
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }
      
      // For POST requests, return the created data
      if (method === 'POST' && response.status === 201) {
        return await response.json()
      }
      
      // For GET requests
      if (response.status === 200) {
        const text = await response.text()
        return text ? JSON.parse(text) : []
      }
      
      return []
    } catch (error) {
      console.error('Database error:', error)
      throw error // Re-throw so we can catch in form
    }
  },

  // INSERT complaint method
  async insertComplaint(complaintData: any) {
    try {
      console.log('Inserting complaint with table structure:', complaintData)
      
      // Map your form data to table columns
      const mappedData = {
        chairman_id: complaintData.chairman_id || 1, // Default for testing
        uc_id: complaintData.uc_id || 1, // Default UC
        type_id: complaintData.type_id || 1, // Default type
        location_detail: complaintData.location,
        description: complaintData.description,
        severity: complaintData.priority === 'urgent' ? 'High' : 
                  complaintData.priority === 'high' ? 'Medium' : 'Low',
        priority_id: complaintData.priority === 'urgent' ? 1 :
                     complaintData.priority === 'high' ? 2 :
                     complaintData.priority === 'medium' ? 3 : 4,
        estimated_cost: complaintData.estimated_cost || 0,
        date_reported: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
        status: 'Pending'
      }
      
      console.log('Mapped data for insert:', mappedData)
      
      const response = await this.query('complaint', 'POST', mappedData)
      console.log('Insert response:', response)
      return response
    } catch (error) {
      console.error('Insert error:', error)
      throw error
    }
  },

  // GET complaints
  async getComplaints(filters?: any) {
    return await this.query('complaint', 'GET', undefined, filters)
  },

  // AUTH methods
  auth: {
    async getUser() {
      try {
        // Since we're using REST, we need to handle auth differently
        // For now, return mock user for testing
        return {
          data: {
            user: {
              id: 1, // Mock user ID
              email: 'chairman@example.com'
            }
          },
          error: null
        }
      } catch (error) {
        return { data: { user: null }, error }
      }
    }
  },

  from(table: string) {
    return {
      insert: async (data: any) => {
        const result = await this.query(table, 'POST', data)
        return {
          data: result,
          error: null
        }
      },
      select: (columns?: string) => ({
        eq: (column: string, value: any) => ({
          async then(callback: any) {
            const result = await supabase.query(table, 'GET', undefined, { [column]: value })
            callback({ data: result, error: null })
          }
        })
      })
    }
  },

  // Custom queries for your CDMS
  async getMayorDashboard() {
    const complaints = await this.query('complaint')
    const proposals = await this.query('project_proposal')
    const incomplete = await this.query('incomplete_project')
    const budgetApprovals = await this.query('budget_approval')
    
    return {
      totalComplaints: complaints.length,
      pendingComplaints: complaints.filter((c: any) => c.status === 'Pending').length,
      totalProposals: proposals.length,
      pendingProposals: proposals.filter((p: any) => p.status === 'Pending').length,
      incompleteProjects: incomplete.length,
      pendingBudget: budgetApprovals.filter((b: any) => b.status === 'Pending').length
    }
  },

  async getChairmanDashboard(chairmanId: number) {
    const complaints = await this.query(`complaint?chairman_id=eq.${chairmanId}`)
    const proposals = await this.query(`project_proposal?chairman_id=eq.${chairmanId}`)
    const incomplete = await this.query(`incomplete_project?chairman_id=eq.${chairmanId}`)
    
    return {
      myComplaints: complaints.length,
      pendingComplaints: complaints.filter((c: any) => c.status === 'Pending').length,
      myProposals: proposals.length,
      pendingProposals: proposals.filter((p: any) => p.status === 'Pending').length,
      myIncomplete: incomplete.length
    }
  }
}