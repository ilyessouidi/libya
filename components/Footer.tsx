import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Lock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="hover:text-blue-400 transition duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-blue-400 transition duration-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-blue-400 transition duration-300">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p>123 Travel Street, Tripoli, Libya</p>
            <p>Phone: +218 21 123 4567</p>
            <p>Email: info@libyabooking.com</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition duration-300">
                <Facebook />
              </a>
              <a href="#" className="hover:text-blue-400 transition duration-300">
                <Twitter />
              </a>
              <a href="#" className="hover:text-pink-400 transition duration-300">
                <Instagram />
              </a>
              <a href="#" className="hover:text-red-500 transition duration-300">
                <Youtube />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
            <p className="mb-4">Subscribe for exclusive deals and updates</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full rounded-l-md text-gray-800"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; {new Date().getFullYear()} Libya Booking. All rights reserved.</p>
          <div className="flex items-center justify-center mt-4">
            <Lock className="mr-2" />
            <span>Secure Payments</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

