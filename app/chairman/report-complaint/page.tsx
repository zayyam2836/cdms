// app/chairman/report-complaint/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import PageTransition from '@/components/PageTransition'
import { ArrowLeft } from 'lucide-react'
import AISuggestions from '@/components/AISuggestions'

export default function ReportComplaintPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Your table fields
    location_detail: '',
    description: '',
    severity: 'Low',
    priority_id: 3, // medium
    estimated_cost: 0,
    uc_id: 1,
    type_id: 1
  })

  const handleChange = (e) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      console.log('Form Data for table:', formData)
      
      // Add current date and status
      const complaintData = {
        ...formData,
        chairman_id: 1, // TEMPORARY - get from auth
        date_reported: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        status: 'Pending'
      }
      
      console.log('Final data for insert:', complaintData)
      
      // Direct REST API call (alternative method)
      const response = await fetch(
        'https://jculuzklcusscieqjrag.supabase.co/rest/v1/complaint',
        {
          method: 'POST',
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjdWx1emtsY3Vzc2NpZXFqcmFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxOTc0ODUsImV4cCI6MjA4MDc3MzQ4NX0.--xWOhO5J76MHkivA4m7NV7o_oSv5jccTTb_FWl10fA',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjdWx1emtsY3Vzc2NpZXFqcmFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxOTc0ODUsImV4cCI6MjA4MDc3MzQ4NX0.--xWOhO5J76MHkivA4m7NV7o_oSv5jccTTb_FWl10fA',
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          },
          body: JSON.stringify(complaintData)
        }
      )
      
      console.log('Response status:', response.status)
      const result = await response.json()
      console.log('Response data:', result)
      
      if (response.ok) {
        alert('✅ Complaint submitted successfully!')
        router.push('/chairman/dashboard')
      } else {
        alert(`Error ${response.status}: ${JSON.stringify(result)}`)
      }
      
    } catch (error) {
      console.error('Full error:', error)
      if (error instanceof Error) {
        alert(`Error: ${error.message}`)
      } else {
        alert(`Error: ${String(error)}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            
            <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-2xl p-6 md:p-8">
              <h1 className="text-3xl font-bold mb-2">Report New Complaint</h1>
              <p className="text-green-100">
                Submit a complaint about city issues
              </p>
            </div>
          </div>

          {/* Form - Based on YOUR table structure */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Location Detail */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Location Details *
                </label>
                <input
                  type="text"
                  name="location_detail"
                  value={formData.location_detail}
                  onChange={handleChange}
                  placeholder="e.g., Sector 5, Street 10, Near City Park"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Detailed description of the issue..."
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div className="mt-6">
                <AISuggestions 
                  complaintDescription={formData.description}
                  category={formData.category}
                  location={formData.location_detail}
                  onSuggestionsGenerated={(suggestions) => {
                    console.log('AI Suggestions:', suggestions)
                  }}
                />
              </div>

              {/* Type ID (Category) */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Complaint Type *
                </label>
                <select
                  name="type_id"
                  value={formData.type_id}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="1">Infrastructure</option>
                  <option value="2">Sanitation</option>
                  <option value="3">Electricity</option>
                  <option value="4">Water Supply</option>
                  <option value="5">Roads</option>
                  <option value="6">Other</option>
                </select>
              </div>

              {/* Severity */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Severity *
                </label>
                <select
                  name="severity"
                  value={formData.severity}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              {/* Priority ID */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Priority *
                </label>
                <select
                  name="priority_id"
                  value={formData.priority_id}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="1">Urgent (1)</option>
                  <option value="2">High (2)</option>
                  <option value="3">Medium (3)</option>
                  <option value="4">Low (4)</option>
                </select>
              </div>

              {/* Estimated Cost */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Estimated Cost (if any)
                </label>
                <input
                  type="number"
                  name="estimated_cost"
                  value={formData.estimated_cost}
                  onChange={handleChange}
                  min="0"
                  step="1000"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-6 border-t">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Submit Complaint'}
                </button>

                <button
                  type="button"
                  onClick={() => router.push('/chairman/dashboard')}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-medium hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
