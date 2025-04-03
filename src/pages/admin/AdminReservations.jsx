"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import AdminSidebar from "./components/AdminSidebar"
import ReservationModal from "./components/ReservationModal"
import PaymentModal from "./components/PaymentModal"

// Demo data for reservations
const reservations = [
    {
        id: "R001",
        customer: "Diwata Pares",
        car: "2016 Toyota Camry",
        reservationDate: "May 01, 2025",
        expirationDate: "May 08, 2025",
        status: "Active",
    },
    {
        id: "R002",
        customer: "Diwata Pares",
        car: "2016 Toyota Camry",
        reservationDate: "May 02, 2025",
        expirationDate: "May 09, 2025",
        status: "Active",
    },
    {
        id: "R003",
        customer: "Diwata Pares",
        car: "2016 Toyota Camry",
        reservationDate: "May 03, 2025",
        expirationDate: "May 10, 2025",
        status: "Active",
    },
    {
        id: "R004",
        customer: "Diwata Pares",
        car: "2016 Toyota Camry",
        reservationDate: "May 04, 2025",
        expirationDate: "May 11, 2025",
        status: "Expired",
    },
]

export default function AdminReservations() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedReservation, setSelectedReservation] = useState(null)
    const [showReservationModal, setShowReservationModal] = useState(false)
    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState("Cash")

    const handleBookNow = (reservation) => {
        setSelectedReservation(reservation)
        setShowReservationModal(true)
    }

    const handleDirectPayment = (reservation) => {
        setSelectedReservation(reservation)
        setShowPaymentModal(true)
    }

    const handleCloseReservationModal = () => {
        setShowReservationModal(false)
        setSelectedReservation(null)
    }

    const handleClosePaymentModal = () => {
        setShowPaymentModal(false)
    }

    const handlePaymentComplete = (paymentDetails) => {
        console.log("Payment completed:", paymentDetails)
        console.log("Reservation processed:", selectedReservation)
        setShowPaymentModal(false)
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar active="reservations" />

            <div className="flex-1 p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">Reservations</h1>
                    <p className="text-gray-600">View and manage car reservations</p>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <div className="relative max-w-md">
                        <input
                            type="text"
                            placeholder="Search name"
                            className="w-full pl-10 pr-4 py-2 border rounded-md"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                </div>

                {/* Reservations Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Reservation ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Reservation Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Expiration Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {reservations.map((reservation) => (
                                <tr key={reservation.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reservation.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.customer}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.car}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.reservationDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.expirationDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {reservation.status === "Active" ? (
                                            <button
                                                onClick={() => handleBookNow(reservation)}
                                                className="px-4 py-2 bg-black text-white rounded-md text-sm"
                                            >
                                                Book Now
                                            </button>
                                        ) : (
                                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-md bg-gray-200 text-gray-800">
                                                Expired
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Reservation Modal */}
            {showReservationModal && selectedReservation && (
                <ReservationModal reservation={selectedReservation} onClose={handleCloseReservationModal} />
            )}

            {/* Direct Payment Modal */}
            {showPaymentModal && selectedReservation && (
                <PaymentModal
                    booking={{
                        carName: selectedReservation.car,
                        price: 4500,
                        days: 7,
                        totalAmount: 31500,
                    }}
                    onClose={handleClosePaymentModal}
                    onPaymentComplete={handlePaymentComplete}
                />
            )}
        </div>
    )
}

