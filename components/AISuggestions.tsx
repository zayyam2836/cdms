// components/AISuggestions.tsx
'use client'

import { useState } from 'react'
import { Sparkles, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

interface AISuggestionsProps {
  complaintDescription: string
  category?: string
  location?: string
  onSuggestionsGenerated?: (suggestions: string[]) => void
}

export default function AISuggestions({
  complaintDescription,
  category = 'General',
  location = 'Not specified',
  onSuggestionsGenerated
}: AISuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(false)

  const generateSuggestions = async () => {
    if (!complaintDescription.trim()) {
      setError('Please enter complaint description')
      return
    }

    setLoading(true)
    setError(null)
    setExpanded(true)

    try {
      const response = await fetch('/api/ai-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          complaintDescription,
          category,
          location
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate suggestions')
      }

      // Parse the AI response
      const aiText = data.suggestions
      const parsedSuggestions = parseAISuggestions(aiText)
      
      setSuggestions(parsedSuggestions)
      
      if (onSuggestionsGenerated) {
        onSuggestionsGenerated(parsedSuggestions)
      }

    } catch (err: unknown) {
      console.error('Error generating suggestions:', err)
      const message = err instanceof Error ? err.message : String(err)
      setError(message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const parseAISuggestions = (text: string): string[] => {
    // Parse the AI response into individual suggestions
    const lines = text.split('\n').filter(line => line.trim())
    
    // Group by numbered suggestions
    const suggestions: string[] = []
    let currentSuggestion = ''
    
    lines.forEach(line => {
      // Check if line starts a new suggestion (e.g., "1.", "2.", "- ", "•")
      if (/^\d+\.\s|- \s|•\s|\*\s/.test(line)) {
        if (currentSuggestion) {
          suggestions.push(currentSuggestion.trim())
        }
        currentSuggestion = line
      } else {
        currentSuggestion += ' ' + line
      }
    })
    
    if (currentSuggestion) {
      suggestions.push(currentSuggestion.trim())
    }
    
    return suggestions.length > 0 ? suggestions : [text]
  }

  return (
    <div className="w-full">
      {/* Generate Button */}
      <div className="mb-4">
        <button
          onClick={generateSuggestions}
          disabled={loading || !complaintDescription.trim()}
          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating AI Solutions...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Get AI-Powered Solutions
            </>
          )}
        </button>
        
        <p className="text-sm text-gray-500 mt-2">
          Get intelligent solution suggestions powered by AI
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 text-red-700">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Error:</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Suggestions Panel */}
      {expanded && (suggestions.length > 0 || loading) && (
        <div className="border rounded-xl shadow-sm bg-gradient-to-br from-white to-gray-50 overflow-hidden">
          {/* Header */}
          <div 
            className="px-6 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b cursor-pointer"
            onClick={() => setExpanded(!expanded)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">AI-Powered Solutions</h3>
                  <p className="text-sm text-gray-600">
                    {suggestions.length} suggested solutions
                  </p>
                </div>
              </div>
              <span className="text-gray-500">
                {expanded ? '▲' : '▼'}
              </span>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="p-8 text-center">
              <div className="inline-block">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-4" />
                <p className="text-gray-600">AI is analyzing the complaint...</p>
                <p className="text-sm text-gray-500 mt-1">This may take a few seconds</p>
              </div>
            </div>
          )}

          {/* Suggestions List */}
          {!loading && suggestions.length > 0 && (
            <div className="divide-y divide-gray-100">
              {suggestions.map((suggestion, index) => (
                <div 
                  key={index} 
                  className="p-6 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex gap-4">
                    {/* Number Badge */}
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                    
                    {/* Suggestion Content */}
                    <div className="flex-1">
                      <div className="prose max-w-none">
                        <div 
                          className="text-gray-800"
                          dangerouslySetInnerHTML={{
                            __html: formatSuggestionText(suggestion)
                          }}
                        />
                      </div>
                      
                      {/* Actions */}
                      <div className="flex gap-3 mt-4">
                        <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                          ✅ Accept Solution
                        </button>
                        <button className="text-sm text-gray-600 hover:text-gray-700">
                          📝 Edit
                        </button>
                        <button className="text-sm text-gray-600 hover:text-gray-700">
                          📋 Copy
                        </button>
                      </div>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="flex-shrink-0">
                      <button className="p-2 text-gray-400 hover:text-purple-600">
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && suggestions.length === 0 && (
            <div className="p-8 text-center">
              <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No suggestions generated yet</p>
              <p className="text-sm text-gray-400 mt-1">
                Click the button above to generate AI solutions
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Powered by AI • Suggestions are auto-generated</span>
              </div>
              <button 
                onClick={() => setSuggestions([])}
                className="text-gray-500 hover:text-gray-700"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Helper function to format suggestion text
const formatSuggestionText = (text: string): string => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>')
    .replace(/^\d+\.\s/, '')
    .replace(/^- \s/, '• ')
    .replace(/(Estimated [^:]+):/g, '<strong>$1:</strong>')
    .replace(/(Time required|Responsible department|Cost range):/g, '<strong>$1:</strong>')
}
