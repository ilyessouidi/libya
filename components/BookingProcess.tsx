import { CheckCircle } from "lucide-react"

const steps = [
  { id: 1, title: "Search", description: "Enter your travel details" },
  { id: 2, title: "Choose", description: "Select from our best offers" },
  { id: 3, title: "Book", description: "Secure your reservation" },
  { id: 4, title: "Enjoy", description: "Have a great trip!" },
]

export default function BookingProcess() {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            How It <span className="text-blue-600">Works</span>
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Follow these simple steps to book your perfect travel experience with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-md border border-blue-100 mb-6 group-hover:bg-blue-50 transition-all duration-300">
                <CheckCircle className="w-8 h-8 text-blue-500 group-hover:text-blue-600 transition-all duration-300" />
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-full h-full group-hover:shadow-md transition-all duration-300">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

