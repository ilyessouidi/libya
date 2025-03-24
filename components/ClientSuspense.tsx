"use client"

import { Suspense, type ReactNode } from "react"

interface ClientSuspenseProps {
  children: ReactNode
  fallback?: ReactNode
}

export default function ClientSuspense({ children, fallback }: ClientSuspenseProps) {
  return (
    <Suspense
      fallback={
        fallback || (
          <div className="w-full h-full flex items-center justify-center p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading content...</p>
            </div>
          </div>
        )
      }
    >
      {children}
    </Suspense>
  )
}

