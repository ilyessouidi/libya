"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Hotel, MapPin } from "lucide-react"

const navItems = [
  { name: "Hotels", href: "/hotels", icon: Hotel },
  { name: "Destinations", href: "/destinations", icon: MapPin },
]

export default function Navigation() {
  const pathname = usePathname()
  const [activeItem, setActiveItem] = useState("")

  useEffect(() => {
    setActiveItem(pathname)
  }, [pathname])

  return (
    <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${
            activeItem === item.href ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <item.icon className="w-5 h-5 mr-2" />
          {item.name}
        </Link>
      ))}
    </nav>
  )
}

