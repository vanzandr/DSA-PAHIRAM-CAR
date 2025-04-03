"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import AdminSidebar from "./components/AdminSidebar"
import BookingDetailsModal from "./components/BookingDetailsModal"

// Demo data for bookings
const bookings = [
    {
        id: "B001",
        customer: "Diwata Pares",
        car: "2016 Toyota Camry",
        startDate: "May 05, 2025",
        endDate: "May 12, 2025",
        total: "₱ 24,000.00",
        status: "Ongoing",
    },
    {
        id: "B002",
        customer: "Diwata Pares",
        car: "2016 Toyota Camry",
        startDate: "May 04, 2025",
        endDate: "May 12, 2025",
        total: "₱ 24,000.00",
        status: "Due already",
    },
    {
        id: "B003",
        customer: "Diwata Pares",
        car: "2016 Toyota Camry",
        startDate: "May 03, 2025",
        endDate: "May 12, 2025",
        total: "₱ 24,000.00",
        status: "Completed",
    },
    {
        id: "B004",
        customer: "Diwata Pares",
        car: "2016 Toyota Camry",
        startDate: "May 01, 2025",
        endDate: "May 12, 2025",
        total: "₱ 24,000.00",
        status: "Completed",
    },
    {
        id: "B005",
        customer: "John Smith",
        car: "2016 Toyota Camry",
        startDate: "May 06, 2025",
        endDate: "May 13, 2025",
        total: "₱ 24,000.00",
        status: "Ongoing",
    },
    {
        id: "B006",
        customer: "Maria Garcia",
        car: "2016 Toyota Camry",
        startDate: "May 07, 2025",
        endDate: "May 14, 2025",
        total: "₱ 24,000.00",
        status: "Pending",
    },
]

export default function AdminBookings() {
    const [filter, setFilter] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedBooking, setSelectedBooking] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const filteredBookings =
        filter === "all" ? bookings : bookings.filter((booking) => booking.status.toLowerCase() === filter.toLowerCase())

    const handleViewBooking = (booking) => {
        setSelectedBooking(booking)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setSelectedBooking(null)
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
                            placeholder="Search booking ID"
                            className="w-full pl-10 pr-4 py-2 border rounded-md"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-6">
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setFilter("all")}
                            className={`px-4 py-2 rounded-md ${filter === "all" ? "bg-black text-white" : "bg-white text-gray-700 border"}`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter("ongoing")}
                            className={`px-4 py-2 rounded-md ${filter === "ongoing" ? "bg-black text-white" : "bg-white text-gray-700 border"}`}
                        >
                            Ongoing
                        </button>
                        <button
                            onClick={() => setFilter("pending")}
                            className={`px-4 py-2 rounded-md ${filter === "pending" ? "bg-black text-white" : "bg-white text-gray-700 border"}`}
                        >
                            Pending
                        </button>
                        <button
                            onClick={() => setFilter("completed")}
                            className={`px-4 py-2 rounded-md ${filter === "completed" ? "bg-black text-white" : "bg-white text-gray-700 border"}`}
                        >
                            Completed
                        </button>
                        <button
                            onClick={() => setFilter("due already")}
                            className={`px-4 py-2 rounded-md ${filter === "due already" ? "bg-black text-white" : "bg-white text-gray-700 border"}`}
                        >
                            Overdue
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
                                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${booking.status === "Ongoing"
                                                    ? "bg-green-100 text-green-800"
                                                    : booking.status === "Due already"
                                                        ? "bg-red-100 text-red-800"
                                                        : booking.status === "Pending"
                                                            ? "bg-yellow-100 text-yellow-800"
                                                            : "bg-gray-100 text-gray-800"
                                                }`}
                                        >
                                            {booking.status}
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

