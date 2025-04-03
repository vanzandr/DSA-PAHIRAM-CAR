import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import TeamSection from "../components/TeamSection"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between py-20">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-5xl font-bold mb-6">Rent Your Perfect Car Today</h1>
            <p className="text-gray-600 text-lg mb-8">
              Choose from our wide selection of vehicles for any occasion. Easy booking, flexible pickup, and
              competitive rates.
            </p>
            <Link
              to="/browse-cars"
              className="inline-flex items-center bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800"
            >
              Browse Cars <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          <div className="lg:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&q=80"
              alt="Luxury car"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose PahiramCar</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a premium car rental experience with a focus on quality, convenience, and customer satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-2xl font-bold mb-4">Wide Selection</div>
              <p className="text-gray-600">
                Choose from our diverse fleet of vehicles, from economy cars to luxury SUVs, to find the perfect match
                for your needs.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-2xl font-bold mb-4">Flexible Rentals</div>
              <p className="text-gray-600">
                Enjoy flexible rental periods, from daily to monthly, with competitive rates and transparent pricing.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-2xl font-bold mb-4">Quality Service</div>
              <p className="text-gray-600">
                Experience exceptional customer service from our dedicated team, committed to making your rental
                experience seamless.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <TeamSection />

      {/* Call to Action */}
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Hit the Road?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Browse our selection of quality vehicles and book your perfect car today.
          </p>
          <Link
            to="/browse-cars"
            className="inline-flex items-center bg-white text-black px-6 py-3 rounded-md hover:bg-gray-100"
          >
            View Available Cars <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

