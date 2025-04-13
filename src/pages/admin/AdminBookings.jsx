"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import AdminSidebar from "./components/AdminSidebar"
import BookingDetailsModal from "./components/BookingDetailsModal"

// Updated demo data for bookings with more varied and accurate statuses
const bookings = [
    {
        id: "B001",
        customer: "Diwata Pares",
        car: "2016 Toyota Camry",
        startDate: "May 05, 2025",
        endDate: "May 12, 2025",
        total: "₱ 24,000.00",
        status: "Ongoing",
        paymentStatus: "Paid",
        actionRequired: false,
    },
    {
        id: "B002",
        customer: "Diwata Pares",
        car: "2016 Toyota Camry",
        startDate: "May 04, 2025",
        endDate: "May 12, 2025",
        total: "₱ 24,000.00",
        status: "Overdue",
        paymentStatus: "Paid",
        actionRequired: true,
    },
    {
        id: "B003",
        customer: "Diwata Pares",
        car: "2016 Toyota Camry",
        startDate: "May 03, 2025",
        endDate: "May 12, 2025",
        total: "₱ 24,000.00",
        status: "Completed",
        paymentStatus: "Paid",
        actionRequired: false,
    },
    {
        id: "B004",
        customer: "Diwata Pares",
        car: "2016 Toyota Camry",
        startDate: "May 01, 2025",
        endDate: "May 12, 2025",
        total: "₱ 24,000.00",
        status: "Completed",
        paymentStatus: "Paid",
        actionRequired: false,
    },
    {
        id: "B005",
        customer: "John Smith",
        car: "2016 Toyota Camry",
        startDate: "May 06, 2025",
        endDate: "May 13, 2025",
        total: "₱ 24,000.00",
        status: "Ongoing",
        paymentStatus: "Paid",
        actionRequired: false,
    },
    {
        id: "B006",
        customer: "Maria Garcia",
        car: "2016 Toyota Camry",
        startDate: "May 07, 2025",
        endDate: "May 14, 2025",
        total: "₱ 24,000.00",
        status: "Confirmed",
        paymentStatus: "Pending",
        actionRequired: true,
    },
    {
        id: "B007",
        customer: "Carlos Reyes",
        car: "2018 Honda Civic",
        startDate: "May 10, 2025",
        endDate: "May 17, 2025",
        total: "₱ 29,400.00",
        status: "Confirmed",
        paymentStatus: "Paid",
        actionRequired: false,
    },
    {
        id: "B008",
        customer: "Sofia Cruz",
        car: "2020 Ford Explorer",
        startDate: "Apr 28, 2025",
        endDate: "May 05, 2025",
        total: "₱ 45,500.00",
        status: "Cancelled",
        paymentStatus: "Refunded",
        actionRequired: false,
    },
]

export default function AdminBookings() {
    const [filter, setFilter] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedBooking, setSelectedBooking] = useState(null)
    const [showModal, setShowModal] = useState(false)

    // Filter bookings based on selected filter and search term
    const filteredBookings = bookings
        .filter((booking) => {
            if (filter === "all") return true
            if (filter === "confirmed") return booking.status === "Confirmed"
            if (filter === "ongoing") return booking.status === "Ongoing"
            if (filter === "completed") return booking.status === "Completed"
            if (filter === "overdue") return booking.status === "Overdue"
            if (filter === "cancelled") return booking.status === "Cancelled"
            if (filter === "action-required") return booking.actionRequired
            if (filter === "payment-pending") return booking.paymentStatus === "Pending"
            return true
        })
        .filter((booking) => {
            if (!searchTerm) return true
            return (
                booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                booking.car.toLowerCase().includes(searchTerm.toLowerCase())
            )
        })

    const handleViewBooking = (booking) => {
        setSelectedBooking(booking)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setSelectedBooking(null)
    }

    // Function to determine the status badge style
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "Ongoing":
                return "bg-green-100 text-green-800"
            case "Overdue":
                return "bg-red-100 text-red-800"
            case "Confirmed":
                return "bg-blue-100 text-blue-800"
            case "Completed":
                return "bg-gray-100 text-gray-800"
            case "Cancelled":
                return "bg-gray-100 text-gray-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    // Function to determine the payment status badge style
    const getPaymentStatusBadgeClass = (status) => {
        switch (status) {
            case "Paid":
                return "bg-green-100 text-green-800"
            case "Pending":
                return "bg-yellow-100 text-yellow-800"
            case "Refunded":
                return "bg-blue-100 text-blue-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar active="bookings" />

            <div className="flex-1 p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">Bookings</h1>
                    <p className="text-gray-600">View and manage customer bookings</p>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <div className="relative max-w-md">
                        <input
                            type="text"
                            placeholder="Search booking ID or customer"
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
                            onClick={() => setFilter("confirmed")}
                            className={`px-4 py-2 rounded-md ${filter === "confirmed" ? "bg-black text-white" : "bg-white text-gray-700 border"}`}
                        >
                            Confirmed
                        </button>
                        <button
                            onClick={() => setFilter("ongoing")}
                            className={`px-4 py-2 rounded-md ${filter === "ongoing" ? "bg-black text-white" : "bg-white text-gray-700 border"}`}
                        >
                            Ongoing
                        </button>
                        <button
                            onClick={() => setFilter("completed")}
                            className={`px-4 py-2 rounded-md ${filter === "completed" ? "bg-black text-white" : "bg-white text-gray-700 border"}`}
                        >
                            Completed
                        </button>
                        <button
                            onClick={() => setFilter("overdue")}
                            className={`px-4 py-2 rounded-md ${filter === "overdue" ? "bg-black text-white" : "bg-white text-gray-700 border"}`}
                        >
                            Overdue
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
                        <button
                            onClick={() => setFilter("payment-pending")}
                            className={`px-4 py-2 rounded-md ${filter === "payment-pending" ? "bg-black text-white" : "bg-white text-gray-700 border"}`}
                        >
                            Payment Pending
                        </button>
                    </div>
                </div>

                {/* Bookings Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Booking ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Start Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    End Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Payment
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredBookings.map((booking) => (
                                <tr key={booking.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.customer}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.car}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.startDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.endDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.total}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(booking.status)}`}
                                        >
                                            {booking.status}
                                        </span>
                                        {booking.actionRequired && (
                                            <span className="ml-2 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                !
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentStatusBadgeClass(booking.paymentStatus)}`}
                                        >
                                            {booking.paymentStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button onClick={() => handleViewBooking(booking)} className="text-black hover:underline">
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Booking Details Modal */}
            {showModal && selectedBooking && <BookingDetailsModal booking={selectedBooking} onClose={handleCloseModal} />}
        </div>
    )
}
