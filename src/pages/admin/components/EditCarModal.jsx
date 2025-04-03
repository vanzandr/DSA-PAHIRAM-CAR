"use client"

import { useState, useEffect } from "react"

export default function EditCarModal({ car, onClose }) {
    const [formData, setFormData] = useState({
        carName: "",
        carType: "",
        fuelType: "",
        transmission: "",
        seats: 4,
        price: 0,
        plateNumber: "",
        year: new Date().getFullYear(),
        description: "",
    })

    const [carImage, setCarImage] = useState(null)

    useEffect(() => {
        if (car) {
            setFormData({
                carName: car.name || "",
                carType: car.type || "",
                fuelType: car.fuelType || "",
                transmission: car.transmission || "",
                seats: car.seats || 4,
                price: car.price || 0,
                plateNumber: car.plateNumber || "",
                year: new Date().getFullYear(),
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            })
        }
    }, [car])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Process editing car
        console.log("Car updated:", formData)
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Car Image */}
                    <div className="bg-gray-50 p-8 flex flex-col items-center justify-center">
                        <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                            {carImage ? (
                                <img
                                    src={URL.createObjectURL(carImage) || "/placeholder.svg"}
                                    alt="Car Preview"
                                    className="max-w-full max-h-full object-contain"
                                />
                            ) : car?.imageUrl ? (
                                <img
                                    src={car.imageUrl || "/placeholder.svg"}
                                    alt={car.name}
                                    className="max-w-full max-h-full object-contain"
                                />
                            ) : (
                                <div className="text-center p-4">
                                    <p className="text-gray-500">No image selected</p>
                                </div>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() => document.getElementById("carImageUpload").click()}
                            className="px-4 py-2 bg-black text-white rounded-md"
                        >
                            Upload Image
                        </button>
                        <input
                            id="carImageUpload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => setCarImage(e.target.files[0])}
                        />
                    </div>

                    {/* Car Form */}
                    <div className="p-8">
                        <h2 className="text-xl font-bold mb-6">Edit Car</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Car Name</label>
                                    <input
                                        type="text"
                                        name="carName"
                                        value={formData.carName}
                                        onChange={handleChange}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Car Type</label>
                                        <select
                                            name="carType"
                                            value={formData.carType}
                                            onChange={handleChange}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2"
                                        >
                                            <option value="Sedan">Sedan</option>
                                            <option value="SUV">SUV</option>
                                            <option value="Hatchback">Hatchback</option>
                                            <option value="Luxury">Luxury</option>
                                            <option value="Sports">Sports</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                                        <select
                                            name="fuelType"
                                            value={formData.fuelType}
                                            onChange={handleChange}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2"
                                        >
                                            <option value="Gasoline">Gasoline</option>
                                            <option value="Diesel">Diesel</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Transmission Type</label>
                                    <select
                                        name="transmission"
                                        value={formData.transmission}
                                        onChange={handleChange}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                                    >
                                        <option value="Automatic">Automatic</option>
                                        <option value="Manual">Manual</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Number of Seats</label>
                                        <input
                                            type="number"
                                            name="seats"
                                            value={formData.seats}
                                            onChange={handleChange}
                                            min="1"
                                            max="10"
                                            className="w-full rounded-md border border-gray-300 px-3 py-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Price per day</label>
                                        <div className="flex items-center">
                                            <span className="mr-2">₱</span>
                                            <input
                                                type="number"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                min="0"
                                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                                        <input
                                            type="number"
                                            name="year"
                                            value={formData.year}
                                            onChange={handleChange}
                                            min="1990"
                                            max={new Date().getFullYear()}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Plate Number</label>
                                        <input
                                            type="text"
                                            name="plateNumber"
                                            value={formData.plateNumber}
                                            onChange={handleChange}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="4"
                                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                                    ></textarea>
                                </div>

                                <div className="flex justify-end space-x-4 pt-4">
                                    <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md">
                                        Cancel
                                    </button>
                                    <button type="submit" className="px-4 py-2 bg-black text-white rounded-md">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

