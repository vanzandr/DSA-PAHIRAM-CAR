"use client"

import { useState } from "react"
import { Search, Plus } from "lucide-react"
import AdminSidebar from "./components/AdminSidebar"
import AddCarModal from "./components/AddCarModal"
import EditCarModal from "./components/EditCarModal"

// Demo data for cars
const cars = [
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
        plateNumber: "DIWATA001",
    },
    {
        id: "2",
        name: "2018 Honda Civic",
        type: "Sedan",
        price: 4800,
        seats: 4,
        transmission: "Automatic",
        fuelType: "Gasoline",
        imageUrl: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=2156",
        available: true,
        plateNumber: "DIWATA002",
    },
    {
        id: "3",
        name: "2020 Mitsubishi Montero",
        type: "SUV",
        price: 6500,
        seats: 7,
        transmission: "Automatic",
        fuelType: "Diesel",
        imageUrl: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=2156",
        available: true,
        plateNumber: "DIWATA003",
    },
]

export default function CarManagement() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filters, setFilters] = useState({
        carType: "",
        transmission: "",
        fuelType: "",
    })
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedCar, setSelectedCar] = useState(null)

    const handleAddCar = () => {
        setShowAddModal(true)
    }

    const handleEditCar = (car) => {
        setSelectedCar(car)
        setShowEditModal(true)
    }

    const handleCloseAddModal = () => {
        setShowAddModal(false)
    }

    const handleCloseEditModal = () => {
        setShowEditModal(false)
        setSelectedCar(null)
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar active="cars" />

            <div className="flex-1 p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">Car Management</h1>
                    <p className="text-gray-600">View and manage your car inventory</p>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-wrap gap-4 mb-6">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Search cars..."
                            className="w-full pl-10 pr-4 py-2 border rounded-md"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>

                    <div className="flex gap-4">
                        <select
                            className="border rounded-md px-4 py-2"
                            onChange={(e) => setFilters({ ...filters, carType: e.target.value })}
                            value={filters.carType}
                        >
                            <option value="">All Car Types</option>
                            <option value="SUV">SUV</option>
                            <option value="Sedan">Sedan</option>
                            <option value="Hatchback">Hatchback</option>
                            <option value="Luxury">Luxury</option>
                            <option value="Sports">Sports</option>
                        </select>

                        <select
                            className="border rounded-md px-4 py-2"
                            onChange={(e) => setFilters({ ...filters, transmission: e.target.value })}
                            value={filters.transmission}
                        >
                            <option value="">All Transmission Types</option>
                            <option value="Automatic">Automatic</option>
                            <option value="Manual">Manual</option>
                        </select>

                        <select
                            className="border rounded-md px-4 py-2"
                            onChange={(e) => setFilters({ ...filters, fuelType: e.target.value })}
                            value={filters.fuelType}
                        >
                            <option value="">All Fuel Types</option>
                            <option value="Gasoline">Gasoline</option>
                            <option value="Diesel">Diesel</option>
                        </select>
                    </div>

                    <button className="bg-black text-white px-4 py-2 rounded-md flex items-center" onClick={handleAddCar}>
                        <Plus className="h-5 w-5 mr-2" />
                        Add New Car
                    </button>
                </div>

                {/* Car Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cars.map((car) => (
                        <div key={car.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                            <div className="relative">
                                <img src={car.imageUrl || "/placeholder.svg"} alt={car.name} className="w-full h-48 object-cover" />
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
                                    onClick={() => handleEditCar(car)}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Car Modal */}
            {showAddModal && <AddCarModal onClose={handleCloseAddModal} />}

            {/* Edit Car Modal */}
            {showEditModal && selectedCar && <EditCarModal car={selectedCar} onClose={handleCloseEditModal} />}
        </div>
    )
}

