'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { DollarSign, TrendingUp, TrendingDown, PieChart, Download, Calendar, Building2 } from 'lucide-react'

export default function MayorBudget() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'mayor')) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user || user.role !== 'mayor') return null

  const budgetData = {
    total: 50000000, // 5 Crore
    allocated: 32000000,
    utilized: 24500000,
    remaining: 25500000
  }

  const ucAllocations = [
    { uc: 'UC 1', allocated: 8500000, utilized: 6200000, percentage: 73 },
    { uc: 'UC 2', allocated: 7500000, utilized: 5800000, percentage: 77 },
    { uc: 'UC 3', allocated: 9000000, utilized: 7200000, percentage: 80 },
    { uc: 'UC 4', allocated: 5500000, utilized: 3500000, percentage: 64 },
    { uc: 'UC 5', allocated: 6500000, utilized: 4800000, percentage: 74 },
    { uc: 'UC 6', allocated: 6000000, utilized: 5200000, percentage: 87 },
  ]

  const categories = [
    { name: 'Infrastructure', allocated: 15000000, utilized: 12500000 },
    { name: 'Sanitation', allocated: 8000000, utilized: 6500000 },
    { name: 'Water Supply', allocated: 7000000, utilized: 5500000 },
    { name: 'Road Maintenance', allocated: 6000000, utilized: 4000000 },
    { name: 'Public Facilities', allocated: 4000000, utilized: 3000000 },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatPercentage = (value: number, total: number) => {
    return Math.round((value / total) * 100)
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Budget Management</h1>
          <p className="text-gray-600 mt-2">Manage budget allocations and expenditures</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            FY 2023-24
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Budget</p>
              <p className="text-2xl font-bold mt-1">{formatCurrency(budgetData.total)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Allocated</p>
              <p className="text-2xl font-bold mt-1">{formatCurrency(budgetData.allocated)}</p>
              <p className="text-sm text-green-600 mt-1 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                {formatPercentage(budgetData.allocated, budgetData.total)}% of total
              </p>
            </div>
            <PieChart className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Utilized</p>
              <p className="text-2xl font-bold mt-1">{formatCurrency(budgetData.utilized)}</p>
              <p className="text-sm text-blue-600 mt-1">
                {formatPercentage(budgetData.utilized, budgetData.allocated)}% of allocated
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Remaining</p>
              <p className="text-2xl font-bold mt-1">{formatCurrency(budgetData.remaining)}</p>
              <p className="text-sm text-yellow-600 mt-1 flex items-center">
                <TrendingDown className="w-4 h-4 mr-1" />
                {formatPercentage(budgetData.remaining, budgetData.total)}% remaining
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow mb-6">
        <div className="border-b">
          <nav className="flex overflow-x-auto">
            <button
              className={`px-6 py-3 font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`px-6 py-3 font-medium ${activeTab === 'uc-allocation' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('uc-allocation')}
            >
              UC Allocation
            </button>
            <button
              className={`px-6 py-3 font-medium ${activeTab === 'categories' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('categories')}
            >
              Categories
            </button>
            <button
              className={`px-6 py-3 font-medium ${activeTab === 'requests' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('requests')}
            >
              Budget Requests
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div>
              <h3 className="text-lg font-bold mb-4">Budget Overview</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Budget Utilization</span>
                    <span className="text-sm font-medium">{formatPercentage(budgetData.utilized, budgetData.allocated)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-green-500 h-2.5 rounded-full" 
                      style={{ width: `${formatPercentage(budgetData.utilized, budgetData.allocated)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-medium mb-3">Allocation by Category</h4>
                    <div className="space-y-3">
                      {categories.map((cat, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">{cat.name}</span>
                            <span className="text-sm font-medium">{formatCurrency(cat.allocated)}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-blue-500 h-1.5 rounded-full" 
                              style={{ width: `${formatPercentage(cat.allocated, budgetData.allocated)}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Quick Actions</h4>
                    <div className="space-y-3">
                      <button className="w-full p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-left">
                        Allocate New Budget
                      </button>
                      <button className="w-full p-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 text-left">
                        Approve Pending Requests
                      </button>
                      <button className="w-full p-3 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 text-left">
                        Generate Financial Report
                      </button>
                      <button className="w-full p-3 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 text-left">
                        Review UC Performance
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'uc-allocation' && (
            <div>
              <h3 className="text-lg font-bold mb-4">Union Council Budget Allocation</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 text-gray-600">Union Council</th>
                      <th className="text-left p-3 text-gray-600">Allocated</th>
                      <th className="text-left p-3 text-gray-600">Utilized</th>
                      <th className="text-left p-3 text-gray-600">Remaining</th>
                      <th className="text-left p-3 text-gray-600">Utilization %</th>
                      <th className="text-left p-3 text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ucAllocations.map((uc, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div className="flex items-center">
                            <Building2 className="w-4 h-4 mr-2 text-blue-500" />
                            <span className="font-medium">{uc.uc}</span>
                          </div>
                        </td>
                        <td className="p-3 font-medium">{formatCurrency(uc.allocated)}</td>
                        <td className="p-3">{formatCurrency(uc.utilized)}</td>
                        <td className="p-3">{formatCurrency(uc.allocated - uc.utilized)}</td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full" 
                                style={{ width: `${uc.percentage}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm font-medium">{uc.percentage}%</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
                            Adjust
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <div>
              <h3 className="text-lg font-bold mb-4">Budget by Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map((cat, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">{cat.name}</h4>
                      <span className="font-bold">{formatCurrency(cat.allocated)}</span>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Utilized: {formatCurrency(cat.utilized)}</span>
                        <span>{formatPercentage(cat.utilized, cat.allocated)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${formatPercentage(cat.utilized, cat.allocated)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Remaining: {formatCurrency(cat.allocated - cat.utilized)}</span>
                      <span>{100 - formatPercentage(cat.utilized, cat.allocated)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'requests' && (
            <div className="text-center py-8">
              <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">No pending budget requests</h3>
              <p className="text-gray-500">All budget requests have been processed for this quarter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}