import { MapPin, Phone, Facebook, Mail } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Contact our friendly team</h1>
          <p className="text-gray-600">Let us know how we can help.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Visit us */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="mb-4">
              <MapPin className="h-6 w-6 text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Visit us</h3>
            <p className="text-gray-600 text-sm mb-3">Visit our office.</p>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-black hover:underline"
            >
              View on Google Maps
            </a>
          </div>

          {/* Call us */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="mb-4">
              <Phone className="h-6 w-6 text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Call us</h3>
            <p className="text-gray-600 text-sm mb-3">Mon-Fri from 8am to 5 pm.</p>
            <a 
              href="tel:639-123-456-7869"
              className="text-sm text-black hover:underline"
            >
              639-123-456-7869
            </a>
          </div>

          {/* Message us */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="mb-4">
              <Facebook className="h-6 w-6 text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Message us</h3>
            <p className="text-gray-600 text-sm mb-3">Message our facebook page.</p>
            <a 
              href="https://facebook.com/PahiramCar.Official"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-black hover:underline"
            >
              PahiramCar.Official
            </a>
          </div>

          {/* Email us */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="mb-4">
              <Mail className="h-6 w-6 text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Email us</h3>
            <p className="text-gray-600 text-sm mb-3">Message us through our email.</p>
            <a 
              href="mailto:pahiramcar@gmail.com"
              className="text-sm text-black hover:underline"
            >
              pahiramcar@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}