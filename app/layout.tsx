// app/layout.tsx - UPDATED WITH EMERALD GREEN HEADER
'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import CDMSNavbar from '@/components/CDMSNavbar'
import { AnimatePresence } from 'framer-motion';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <title>City Development Management System (CDMS)</title>
        <meta name="description" content="Manage city complaints, proposals and projects efficiently" />
      </head>
      <body className={`${inter.className} bg-gradient-to-br from-gray-50 to-white`}>
        <AuthProvider>
          {/* EMERALD GREEN HEADER WRAPPER */}
          <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg">
            <div className="container mx-auto px-4">
              <CDMSNavbar />
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            <main className="min-h-screen pt-16">
              {children}
            </main>
          </AnimatePresence>
          
          <footer className="bg-gradient-to-r from-emerald-700 to-teal-700 text-white p-6 text-center mt-8">
            <div className="container mx-auto">
              <p className="font-bold">City Development Management System (CDMS)</p>
              <p className="text-sm text-white/80 mt-2">Streamlining Urban Development & Governance</p>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  )
}