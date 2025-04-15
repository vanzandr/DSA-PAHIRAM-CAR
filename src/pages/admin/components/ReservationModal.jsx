"use client"

import { useState, useEffect } from "react"
import { useBookings } from "../../../context/BookingContext"
import { useCars } from "../../../context/CarContext"
import PaymentModal from "./PaymentModal"

export default function ReservationModal({ reservation, onClose }) {
    const { addBooking } = useBookings()
    const { getCarById } = useCars()

    const [formData, setFormData] = useState({
        fullName: "Diwata Pares Overcook",
        contactNumber: "63912-345-6789",
        licenseId: "1234 5678 9123",
        paymentMethod: "Cash",
    })

    const [licenseImage, setLicenseImage] = useState(null)
    const [contractImage, setContractImage] = useState(null)
    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const [bookingData, setBookingData] = useState(null)
    const [car, setCar] = useState(null)

    useEffect(() => {
        if (reservation && reservation.carId) {
            const carData = getCarById(reservation.carId)
            setCar(carData)
        }
    }, [reservation])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Prepare booking data
        const booking = {
            carId: reservation.carId,
            carName: car ? car.name : reservation.car,
            customerName: formData.fullName,
            contactNumber: formData.contactNumber,
            licenseId: formData.licenseId,
            paymentMethod: formData.paymentMethod,
            startDate: reservation.startDate,
            endDate: reservation.endDate,
            totalPrice: reservation.totalPrice || car.price * 7,
        }

        setBookingData(booking)
        setShowPaymentModal(true)
    }

    const handlePaymentComplete = (paymentDetails) => {
        // Add payment details to booking
        const completeBooking = {
            ...bookingData,
            paymentStatus: "Paid",
            paymentMethod: paymentDetails.method,
        }

        // Add booking to context
        addBooking(completeBooking)

        onClose()
    }

    const handleClosePaymentModal = () => {
        setShowPaymentModal(false)
    }

    if (!reservation || !car) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg p-8">
                    <p>Loading reservation details...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Car Details */}
                    <div className="bg-gray-50 p-8">
                        <img src={car.imageUrl || "/placeholder.svg"} alt={car.name} className="w-full h-auto rounded-lg mb-6" />

                        <h2 className="text-2xl font-bold">{car.name}</h2>
                        <p className="text-gray-600 mb-4">{car.type}</p>

                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <span className="text-2xl font-bold">₱ {car.price}</span>
                                <span className="text-gray-500 text-sm ml-1">per day</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="flex flex-col items-center p-3 bg-white rounded-lg">
                                <span className="text-sm">{car.seats} Seats</span>
                            </div>
                            <div className="flex flex-col items-center p-3 bg-white rounded-lg">
                                <span className="text-sm">{car.transmission}</span>
                            </div>
                            <div className="flex flex-col items-center p-3 bg-white rounded-lg">
                                <span className="text-sm">{car.fuelType}</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-medium mb-2">Plate Number</h3>
                            <p className="text-gray-700">{car.plateNumber || "DIWATA009"}</p>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-medium mb-2">Start Date</h3>
                                <p className="text-gray-700">{new Date(reservation.startDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <h3 className="font-medium mb-2">End Date</h3>
                                <p className="text-gray-700">{new Date(reservation.endDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Booking Form */}
                    <div className="p-8">
                        <h2 className="text-xl font-bold mb-6">Booking Information</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Renter's Full Name</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                                        <input
                                            type="text"
                                            name="contactNumber"
                                            value={formData.contactNumber}
                                            onChange={handleChange}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Driver's License ID number</label>
                                        <input
                                            type="text"
                                            name="licenseId"
                                            value={formData.licenseId}
                                            onChange={handleChange}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">License Image</label>
                                        <button
                                            type="button"
                                            onClick={() => document.getElementById("licenseUpload").click()}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-gray-700"
                                        >
                                            Upload Image
                                        </button>
                                        <input
                                            id="licenseUpload"
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => setLicenseImage(e.target.files[0])}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Signed Contract Image</label>
                                    <button
                                        type="button"
                                        onClick={() => document.getElementById("contractUpload").click()}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-gray-700"
                                    >
                                        Upload Image
                                    </button>
                                    <input
                                        id="contractUpload"
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => setContractImage(e.target.files[0])}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                                    <select
                                        name="paymentMethod"
                                        value={formData.paymentMethod}
                                        onChange={handleChange}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                                    >
                                        <option value="Cash">Cash</option>
                                        <option value="Debit Card">Debit Card</option>
                                        <option value="Credit Card">Credit Card</option>
                                    </select>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-medium mb-2">Booking Summary</h3>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Amount Due</span>
                                        <span>
                                            ₱ {car.price} x {Math.round(reservation.totalPrice / car.price)} days
                                        </span>
                                    </div>
                                    <div className="flex justify-between font-bold">
                                        <span>Total</span>
                                        <span>₱ {reservation.totalPrice.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-4">
                                    <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md">
                                        Cancel
                                    </button>
                                    <button type="submit" className="px-4 py-2 bg-black text-white rounded-md">
                                        Proceed
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            {showPaymentModal && (
                <PaymentModal
                    booking={bookingData}
                    onClose={handleClosePaymentModal}
                    onPaymentComplete={handlePaymentComplete}
                />
            )}
        </div>
    )
}
