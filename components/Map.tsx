"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

export default function Map({ location }) {
  const mapRef = useRef(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!mapRef.current) {
        mapRef.current = L.map("map").setView([location.lat, location.lng], 13)

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapRef.current)
      } else {
        mapRef.current.setView([location.lat, location.lng], 13)
      }

      L.marker([location.lat, location.lng]).addTo(mapRef.current)
    }
  }, [location])

  return <div id="map" style={{ height: "400px", width: "100%" }}></div>
}

