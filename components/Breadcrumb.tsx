"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"

export default function Breadcrumb() {
  const pathname = usePathname()
  const pathSegments = pathname.split("/").filter((segment) => segment !== "")

  return (
    <nav className="flex items-center text-sm text-gray-500 mb-4">
      <Link href="/" className="flex items-center hover:text-gray-700">
        <Home className="w-4 h-4 mr-1" />
        Home
      </Link>
      {pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join("/")}`
        const isLast = index === pathSegments.length - 1
        return (
          <div key={segment} className="flex items-center">
            <ChevronRight className="w-4 h-4 mx-2" />
            {isLast ? (
              <span className="text-gray-700 font-medium">{segment}</span>
            ) : (
              <Link href={href} className="hover:text-gray-700">
                {segment}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}

