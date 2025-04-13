"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import AdminSidebar from "./components/AdminSidebar"
import ReservationModal from "./components/ReservationModal"
import PaymentModal from "./components/PaymentModal"

// Updated demo data for reservations with varied statuses
const reservations = [
    {
        id: "R001",
        customer: "Diwata Pares",
        car: "2016 Toyota Camry",
        reservationDate: "May 01, 2025",
        expirationDate: "May 08, 2025",
        status: "Active",
        actionRequired: true,
    },
    {
        id: "R002",
        customer: "Diwata Pares",
        car: "2016 Toyota Camry",
        reservationDate: "May 02, 2025",
        expirationDate: "May 09, 2025",
        status: "Active",
        actionRequired: false,
    },
    {
        id: "R003",
        customer: "Diwata Pares",
        car: "2016 Toyota Camry",
        reservationDate: "May 03, 2025",
        expirationDate: "May 10, 2025",
        status: "Pending Confirmation",
        actionRequired: true,
    },
    {
        id: "R004",
        customer: "Diwata Pares",
        car: "2016 Toyota Camry",
        reservationDate: "May 04, 2025",
        expirationDate: "May 11, 2025",
        status: "Expired",
        actionRequired: false,
    },
    {
        id: "R005",
        customer: "John Smith",
        car: "2018 Honda Civic",
        reservationDate: "May 05, 2025",
        expirationDate: "May 12, 2025",
        status: "Converted to Booking",
        actionRequired: false,
    },
    {
        id: "R006",
        customer: "Maria Garcia",
        car: "2020 Ford Explorer",
        reservationDate: "May 06, 2025",
        expirationDate: "May 13, 2025",
        status: "Cancelled",
        actionRequired: false,
    },
    {
        id: "R007",
        customer: "Carlos Reyes",
        car: "2019 Mitsubishi Montero",
        reservationDate: "May 07, 2025",
        expirationDate: "May 14, 2025",
        status: "Pending Confirmation",
        actionRequired: true,
    },
]

export default function AdminReservations() {
    const [filter, setFilter] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedReservation, setSelectedReservation] = useState(null)
    const [showReservationModal, setShowReservationModal] = useState(false)
    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState("Cash")

    // Filter reservations based on selected filter and search term
    const filteredReservations = reservations
        .filter((reservation) => {
            if (filter === "all") return true
            if (filter === "active") return reservation.status === "Active"
            if (filter === "pending") return reservation.status === "Pending Confirmation"
            if (filter === "expired") return reservation.status === "Expired"
            if (filter === "converted") return reservation.status === "Converted to Booking"
            if (filter === "cancelled") return reservation.status === "Cancelled"
            if (filter === "action-required") return reservation.actionRequired
            return true
        })
        .filter((reservation) => {
            if (!searchTerm) return true
            return (
                reservation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                reservation.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                reservation.car.toLowerCase().includes(searchTerm.toLowerCase())
            )
        })

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

    // Function to determine the appropriate action button based on reservation status
    const renderActionButton = (reservation) => {
        switch (reservation.status) {
            case "Active":
                return (
                    <button
                        onClick={() => handleBookNow(reservation)}
                        className="px-4 py-2 bg-black text-white rounded-md text-sm"
                    >
                        Book Now
                    </button>
                )
            case "Pending Confirmation":
                return (
                    <button
                        onClick={() => handleBookNow(reservation)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
                    >
                        Confirm
                    </button>
                )
            case "Expired":
                return (
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-md bg-gray-200 text-gray-800">
                        Expired
                    </span>
                )
            case "Converted to Booking":
                return (
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-md bg-green-200 text-green-800">
                        Converted
                    </span>
                )
            case "Cancelled":
                return (
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-md bg-gray-200 text-gray-800">
                        Cancelled
                    </span>
                )
            default:
                return (
                    <button
                        onClick={() => handleBookNow(reservation)}
                        className="px-4 py-2 bg-black text-white rounded-md text-sm"
                    >
                        Book Now
                    </button>
                )
        }
    }

    // Function to determine the status badge style
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "Active":
                return "bg-green-100 text-green-800"
            case "Pending Confirmation":
                return "bg-yellow-100 text-yellow-800"
            case "Expired":
                return "bg-gray-100 text-gray-800"
            case "Converted to Booking":
                return "bg-blue-100 text-blue-800"
            case "Cancelled":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
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
                            placeholder="Search name or ID"
                            className="w-full pl-10 pr-4 py-2 border rounded-md"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setFilter("all")}
                            className={`px-4 py-2 rounded-md ${filter === "all" ? "bg-black text-white" : "bg-white text-gray-700 border"}`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter("active")}
                            className={`px-4 py-2 rounded-md ${filter === "active" ? "bg-black text-white" : "bg-white text-gray-700 border"}`}
                        >
                            Active
                        </button>
                        <button
                            onClick={() => setFilter("pending")}
                            className={`px-4 py-2 rounded-md ${filter === "pending" ? "bg-black text-white" : "bg-white text-gray-700 border"}`}
                        >
                            Pending
                        </button>
                        <button
                            onClick={() => setFilter("expired")}
                            className={`px-4 py-2 rounded-md ${filter === "expired" ? "bg-black text-white" : "bg-white text-gray-700 border"}`}
                        >
                            Expired
                        </button>
                        <button
                            onClick={() => setFilter("converted")}
                            className={`px-4 py-2 rounded-md ${filter === "converted" ? "bg-black text-white" : "bg-white text-gray-700 border"}`}
                        >
                            Converted
                        </button>
                        <button
                            onClick={() => setFilter("cancelled")}
                            className={`px-4 py-2 rounded-md ${filter === "cancelled" ? "bg-black text-white" : "bg-white text-gray-700 border"}`}
                        >
                            Cancelled
                        </button>
                        <button
                            onClick={() => setFilter("action-required")}
                            className={`px-4 py-2 rounded-md ${filter === "action-required" ? "bg-black text-white" : "bg-white text-gray-700 border"}`}
                        >
                            Action Required
                        </button>
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
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredReservations.map((reservation) => (
                                <tr key={reservation.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reservation.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.customer}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.car}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.reservationDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.expirationDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(reservation.status)}`}
                                        >
                                            {reservation.status}
                                        </span>
                                        {reservation.actionRequired && (
                                            <span className="ml-2 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                Action Required
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {renderActionButton(reservation)}
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
