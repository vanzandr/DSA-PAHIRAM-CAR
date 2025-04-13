"use client"

import { useState } from "react"
import { X, Calendar, Clock } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useNotifications } from "../context/NotificationContext"

export default function ReservationModal({ car, onClose, onReserve }) {
    const { currentUser, isAuthenticated } = useAuth()
    const { addNotification } = useNotifications()
    const [selectedDays, setSelectedDays] = useState(7)
    const [startDate, setStartDate] = useState("")
    const [formData, setFormData] = useState({
        fullName: currentUser?.fullName || "",
        email: currentUser?.email || "",
        phone: currentUser?.phone || "",
    })

    // Calculate today's date in YYYY-MM-DD format for min date
    const today = new Date().toISOString().split("T")[0]

    // Calculate total price
    const totalPrice = car.price * selectedDays

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!startDate) {
            alert("Please select a start date")
            return
        }

        // Create reservation object
        const reservationId = `R${Date.now().toString().slice(-6)}`
        const reservation = {
            id: reservationId,
            carId: car.id,
            carName: car.name,
            carType: car.type,
            price: car.price,
            startDate,
            days: selectedDays,
            totalPrice,
            customerName: formData.fullName,
            customerEmail: formData.email,
            customerPhone: formData.phone,
            status: "Reserved",
            timestamp: new Date().toISOString(),
        }

        // Create notification for admin
        addNotification({
            type: "reservation",
            title: "New Reservation",
            message: `${formData.fullName} reserved a ${car.name}`,
            data: {
                reservationId,
                carId: car.id,
                carName: car.name,
                customerName: formData.fullName,
                startDate,
                days: selectedDays,
                totalPrice,
            },
        })

        // Call the onReserve callback with the reservation data
        if (onReserve) {
            onReserve(reservation)
        }

        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="relative">
                    <button onClick={onClose} className="absolute top-4 right-4 bg-black text-white p-1 rounded-full z-10">
                        <X size={20} />
                    </button>

                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-6">Reserve Car</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                            <div>
                                <img src={car.imageUrl || "/placeholder.svg"} alt={car.name} className="w-full h-auto rounded-lg" />

                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold">{car.name}</h3>
                                    <p className="text-gray-600 mb-3">{car.type}</p>
                                    <div className="flex justify-between items-center mb-2">
                                        <div>
                                            <span className="text-xl font-bold">₱ {car.price}</span>
                                            <span className="text-gray-500 text-sm ml-1">per day</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 text-sm">
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
                                </div>
                            </div>

                            <div>
                                <form onSubmit={handleSubmit}>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                <div className="flex items-center">
                                                    <Calendar size={16} className="mr-2" />
                                                    Start Date
                                                </div>
                                            </label>
                                            <input
                                                type="date"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                min={today}
                                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                <div className="flex items-center">
                                                    <Clock size={16} className="mr-2" />
                                                    Rental Duration
                                                </div>
                                            </label>
                                            <div className="flex items-center">
                                                <input
                                                    type="range"
                                                    min="1"
                                                    max="30"
                                                    value={selectedDays}
                                                    onChange={(e) => setSelectedDays(Number.parseInt(e.target.value))}
                                                    className="w-full mr-4"
                                                />
                                                <span className="font-medium">{selectedDays} days</span>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <h3 className="font-medium mb-2">Reservation Summary</h3>
                                            <div className="flex justify-between mb-2">
                                                <span>Daily Rate</span>
                                                <span>₱ {car.price}</span>
                                            </div>
                                            <div className="flex justify-between mb-2">
                                                <span>Duration</span>
                                                <span>{selectedDays} days</span>
                                            </div>
                                            <div className="flex justify-between font-bold">
                                                <span>Total</span>
                                                <span>₱ {totalPrice.toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <div className="pt-2">
                                            <p className="text-sm text-gray-600 mb-4">
                                                By reserving this car, you agree to our terms and conditions. The car will be held for you for
                                                24 hours.
                                            </p>

                                            <button type="submit" className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800">
                                                Reserve Now
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

