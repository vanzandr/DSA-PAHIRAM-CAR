"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import UserCarDetailsModal from "../../components/UserCarDetailsModal"

// Demo data for reserved cars
const reservedCars = [
    {
        id: "1",
        name: "2016 Toyota Camry",
        type: "Sedan",
        price: 4500,
        seats: 4,
        transmission: "Automatic",
        fuelType: "Gasoline",
        imageUrl: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=2156",
        available: true,
    },
    {
        id: "2",
        name: "2016 Toyota Camry",
        type: "Sedan",
        price: 4500,
        seats: 4,
        transmission: "Automatic",
        fuelType: "Gasoline",
        imageUrl: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=2156",
        available: true,
    },
    {
        id: "3",
        name: "2016 Toyota Camry",
        type: "Sedan",
        price: 4500,
        seats: 4,
        transmission: "Automatic",
        fuelType: "Gasoline",
        imageUrl: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=2156",
        available: true,
    },
]

export default function ReservedCars() {
    const [selectedCar, setSelectedCar] = useState(null)
    const [showDetailsModal, setShowDetailsModal] = useState(false)

    const handleViewDetails = (car) => {
        setSelectedCar(car)
        setShowDetailsModal(true)
    }

    const handleCloseModal = () => {
        setShowDetailsModal(false)
        setSelectedCar(null)
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Link to="/browse-cars" className="flex items-center text-gray-600 hover:text-black">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Go back to the Available Cars
                    </Link>

                    <div className="mt-4">
                        <h1 className="text-2xl font-bold">Reserved Cars</h1>
                        <p className="text-gray-600">Browse your reserved cars</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {reservedCars.map((car) => (
                        <div key={car.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                            <div className="relative">
                                <img src={car.imageUrl || "/placeholder.svg"} alt={car.name} className="w-full h-48 object-cover" />
                                <span className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-sm">
                                    Available
                                </span>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{car.name}</h3>
                                <p className="text-gray-600 text-sm mb-3">{car.type}</p>
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <span className="text-xl font-bold">₱ {car.price}</span>
                                        <span className="text-gray-500 text-sm ml-1">per day</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-sm mb-4">
                                    <div className="flex items-center gap-1">
                                        <span>{car.seats} Seats</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span>{car.transmission}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span>{car.fuelType}</span>
                                    </div>
                                </div>
                                <button
                                    className="w-full px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800"
                                    onClick={() => handleViewDetails(car)}
                                >
                                    Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {showDetailsModal && selectedCar && (
                <UserCarDetailsModal car={selectedCar} type="reserved" onClose={handleCloseModal} />
            )}
        </div>
    )
}

