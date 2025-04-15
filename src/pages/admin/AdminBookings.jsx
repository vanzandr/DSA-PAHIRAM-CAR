"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import AdminSidebar from "./components/AdminSidebar"
import BookingDetailsModal from "./components/BookingDetailsModal"
import { useBookings } from "../../context/BookingContext"
import { useCars } from "../../context/CarContext"

export default function AdminBookings() {
    const { bookings, updateBooking, completeBooking, cancelBooking } = useBookings()
    const { cars, getCarById } = useCars()

    const [filter, setFilter] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedBooking, setSelectedBooking] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [filteredBookings, setFilteredBookings] = useState([])
    const [loading, setLoading] = useState(true)

    // Process bookings with car details
    useEffect(() => {
        if (bookings.length > 0 && cars.length > 0) {
            const processedBookings = bookings.map((booking) => {
                const car = getCarById(booking.carId)

                // Check if the booking is overdue
                const endDate = new Date(booking.endDate)
                const today = new Date()
                const isOverdue = booking.status === "Ongoing" && today > endDate

                return {
                    ...booking,
                    car: car ? car.name : booking.carName || "Unknown Car",
                    customer: booking.customerName || "Unknown Customer",
                    status: isOverdue ? "Overdue" : booking.status,
                    actionRequired: isOverdue || booking.paymentStatus === "Pending",
                }
            })

            setFilteredBookings(processedBookings)
            setLoading(false)
        }
    }, [bookings, cars])

    // Filter bookings based on selected filter and search term
    useEffect(() => {
        if (loading) return

        let result = [...bookings].map((booking) => {
            const car = getCarById(booking.carId)

            // Check if the booking is overdue
            const endDate = new Date(booking.endDate)
            const today = new Date()
            const isOverdue = booking.status === "Ongoing" && today > endDate

            return {
                ...booking,
                car: car ? car.name : booking.carName || "Unknown Car",
                customer: booking.customerName || "Unknown Customer",
                status: isOverdue ? "Overdue" : booking.status,
                actionRequired: isOverdue || booking.paymentStatus === "Pending",
            }
        })

        // Apply filter
        if (filter !== "all") {
            if (filter === "confirmed") result = result.filter((b) => b.status === "Confirmed")
            if (filter === "ongoing") result = result.filter((b) => b.status === "Ongoing")
            if (filter === "completed") result = result.filter((b) => b.status === "Completed")
            if (filter === "overdue") result = result.filter((b) => b.status === "Overdue")
            if (filter === "cancelled") result = result.filter((b) => b.status === "Cancelled")
            if (filter === "action-required") result = result.filter((b) => b.actionRequired)
            if (filter === "payment-pending") result = result.filter((b) => b.paymentStatus === "Pending")
        }

        // Apply search
        if (searchTerm) {
            result = result.filter(
                (b) =>
                    b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    b.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    b.car.toLowerCase().includes(searchTerm.toLowerCase()),
            )
        }

        setFilteredBookings(result)
    }, [filter, searchTerm, loading])

    const handleViewBooking = (booking) => {
        setSelectedBooking(booking)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setSelectedBooking(null)
    }

    const handleCompleteBooking = (bookingId) => {
        if (window.confirm("Are you sure you want to mark this booking as completed?")) {
            completeBooking(bookingId)

            // Update UI
            setFilteredBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status: "Completed" } : b)))
        }
    }

    const handleCancelBooking = (bookingId) => {
        if (window.confirm("Are you sure you want to cancel this booking?")) {
            cancelBooking(bookingId)

            // Update UI
            setFilteredBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status: "Cancelled" } : b)))
        }
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

    if (loading) {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <AdminSidebar active="bookings" />
                <div className="flex-1 p-8">
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
                    </div>
                </div>
            </div>
        )
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
                    {filteredBookings.length === 0 ? (
                        <div className="p-8 text-center">
                            <h3 className="text-lg font-semibold mb-2">No bookings found</h3>
                            <p className="text-gray-600">Try adjusting your filters to see more results.</p>
                        </div>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Booking ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Customer
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Car
                                    </th>
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
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(booking.startDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(booking.endDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            ₱ {booking.totalPrice.toLocaleString()}
                                        </td>
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
                                            <div className="flex gap-2">
                                                <button onClick={() => handleViewBooking(booking)} className="text-black hover:underline">
                                                    View
                                                </button>
                                                {booking.status === "Ongoing" && (
                                                    <button
                                                        onClick={() => handleCompleteBooking(booking.id)}
                                                        className="text-green-600 hover:underline"
                                                    >
                                                        Complete
                                                    </button>
                                                )}
                                                {(booking.status === "Ongoing" || booking.status === "Confirmed") && (
                                                    <button
                                                        onClick={() => handleCancelBooking(booking.id)}
                                                        className="text-red-600 hover:underline"
                                                    >
                                                        Cancel
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Booking Details Modal */}
            {showModal && selectedBooking && <BookingDetailsModal booking={selectedBooking} onClose={handleCloseModal} />}
        </div>
    )
}
