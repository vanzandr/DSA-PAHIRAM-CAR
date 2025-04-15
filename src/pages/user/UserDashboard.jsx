"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Car, Calendar, Clock, ArrowRight, FileText, X } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import { useReservations } from "../../context/ReservationContext"
import { useBookings } from "../../context/BookingContext"
import { useNotifications } from "../../context/NotificationContext"

export default function UserDashboard() {
    const { currentUser } = useAuth()
    const { getUserReservations, getUserRecentActivities } = useReservations()
    const { getUserBookings } = useBookings()
    const { getUserNotifications, markAsRead } = useNotifications()

    const [activeReservations, setActiveReservations] = useState(0)
    const [activeRentals, setActiveRentals] = useState(0)
    const [completedRentals, setCompletedRentals] = useState(0)
    const [recentActivities, setRecentActivities] = useState([])
    const [userNotifications, setUserNotifications] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        try {
            if (currentUser) {
                // Get user reservations and active bookings
                const reservations = getUserReservations ? getUserReservations() : []
                const bookings = getUserBookings ? getUserBookings() : []
                const notifications = getUserNotifications ? getUserNotifications() : []
                const activities = getUserRecentActivities ? getUserRecentActivities() : []

                // Count active reservations (not cancelled or converted)
                const activeReservs = reservations.filter(
                    (r) => r.status !== "Cancelled" && r.status !== "Converted to Booking",
                ).length

                // Count active rentals
                const activeRents = bookings.filter((b) => b.status === "Ongoing").length

                // Count completed rentals
                const completedRents = bookings.filter((b) => b.status === "Completed").length

                // Set state
                setActiveReservations(activeReservs)
                setActiveRentals(activeRents)
                setCompletedRentals(completedRents)
                setUserNotifications(notifications)

                // Create recent activities from both reservations, bookings, and cancellations
                const allActivities = [
                    ...activities,
                    ...(bookings || []).map((b) => ({
                        id: `book-${b.id}`,
                        type: b.status === "Completed" ? "return" : "rental",
                        action: b.status.toLowerCase(),
                        carName: b.carName || "Car",
                        date: new Date(b.createdAt).toLocaleDateString(),
                        status: b.status,
                        timestamp: b.createdAt,
                    })),
                ]

                // Sort by date (newest first) and take only the first 5
                allActivities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                setRecentActivities(allActivities.slice(0, 5))
            }
        } catch (err) {
            console.error("Error loading dashboard data:", err)
            setError("Failed to load dashboard data. Please try again later.")
        } finally {
            setLoading(false)
        }
    }, [currentUser, getUserReservations, getUserBookings, getUserNotifications, getUserRecentActivities])

    const handleMarkAsRead = (notificationId) => {
        try {
            if (markAsRead) {
                markAsRead(notificationId)
                setUserNotifications((prev) =>
                    prev.map((notification) =>
                        notification.id === notificationId ? { ...notification, read: true } : notification,
                    ),
                )
            }
        } catch (err) {
            console.error("Error marking notification as read:", err)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                        <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
                        <p className="text-gray-700">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Welcome Section */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <div className="flex items-center">
                        <div className="w-16 h-16 rounded-full overflow-hidden mr-6">
                            <img
                                src={currentUser?.avatar || "https://i.pravatar.cc/150?img=33"}
                                alt={currentUser?.fullName || "User"}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">Welcome back, {currentUser?.fullName?.split(" ")[0] || "User"}!</h1>
                            <p className="text-gray-600">Manage your car rentals and reservations</p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-black text-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-bold mb-4">Rent a Car</h2>
                        <p className="mb-6">Browse our selection of quality vehicles and rent your perfect car today.</p>
                        <Link
                            to="/browse-cars"
                            className="inline-flex items-center bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100"
                        >
                            Browse Cars <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>

                    <div className="bg-gray-800 text-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-bold mb-4">View Your Reservations</h2>
                        <p className="mb-6">Check the status of your current car reservations and bookings.</p>
                        <div className="flex space-x-4">
                            <Link
                                to="/reserved-cars"
                                className="inline-flex items-center bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100"
                            >
                                Reserved Cars
                            </Link>
                            <Link
                                to="/rented-cars"
                                className="inline-flex items-center bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100"
                            >
                                Rented Cars
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center mb-2">
                            <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                            <h3 className="text-lg font-semibold">Active Reservations</h3>
                        </div>
                        <p className="text-3xl font-bold">{activeReservations}</p>
                        <Link to="/reserved-cars" className="text-blue-600 hover:underline text-sm flex items-center mt-2">
                            View all <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center mb-2">
                            <Car className="h-5 w-5 text-green-500 mr-2" />
                            <h3 className="text-lg font-semibold">Active Rentals</h3>
                        </div>
                        <p className="text-3xl font-bold">{activeRentals}</p>
                        <Link to="/rented-cars" className="text-green-600 hover:underline text-sm flex items-center mt-2">
                            View all <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center mb-2">
                            <Clock className="h-5 w-5 text-purple-500 mr-2" />
                            <h3 className="text-lg font-semibold">Completed Rentals</h3>
                        </div>
                        <p className="text-3xl font-bold">{completedRentals}</p>
                        <Link to="/rental-history" className="text-purple-600 hover:underline text-sm flex items-center mt-2">
                            View history <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                    </div>
                </div>

                {/* Recent Activity and Notifications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Recent Activity */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold">Recent Activity</h2>
                        </div>

                        <div className="divide-y divide-gray-200">
                            {recentActivities.length === 0 ? (
                                <div className="p-6 text-center text-gray-500">No recent activity</div>
                            ) : (
                                <div className="max-h-96 overflow-y-auto">
                                    {recentActivities.map((activity) => (
                                        <div key={activity.id} className="p-6 border-b border-gray-100">
                                            <div className="flex items-start">
                                                <div
                                                    className={`rounded-full p-2 mr-4 ${activity.type === "reservation"
                                                            ? activity.action === "cancelled"
                                                                ? "bg-red-100 text-red-600"
                                                                : "bg-blue-100 text-blue-600"
                                                            : activity.type === "rental"
                                                                ? "bg-green-100 text-green-600"
                                                                : "bg-purple-100 text-purple-600"
                                                        }`}
                                                >
                                                    {activity.type === "reservation" ? (
                                                        activity.action === "cancelled" ? (
                                                            <X className="h-5 w-5" />
                                                        ) : (
                                                            <Calendar className="h-5 w-5" />
                                                        )
                                                    ) : activity.type === "rental" ? (
                                                        <Car className="h-5 w-5" />
                                                    ) : (
                                                        <Clock className="h-5 w-5" />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between">
                                                        <h3 className="font-medium">
                                                            {activity.type === "reservation"
                                                                ? activity.action === "cancelled"
                                                                    ? "Reservation Cancelled"
                                                                    : "Car Reserved"
                                                                : activity.type === "rental"
                                                                    ? "Car Rented"
                                                                    : "Car Returned"}
                                                        </h3>
                                                        <span
                                                            className={`px-2 py-1 text-xs rounded-full ${activity.status === "Active" || activity.status === "Pending Confirmation"
                                                                    ? "bg-blue-100 text-blue-800"
                                                                    : activity.status === "Ongoing"
                                                                        ? "bg-green-100 text-green-800"
                                                                        : activity.status === "Cancelled"
                                                                            ? "bg-red-100 text-red-800"
                                                                            : "bg-gray-100 text-gray-800"
                                                                }`}
                                                        >
                                                            {activity.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-600">{activity.carName}</p>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {new Date(activity.timestamp).toLocaleDateString()} at{" "}
                                                        {new Date(activity.timestamp).toLocaleTimeString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold">Notifications</h2>
                        </div>

                        <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                            {userNotifications.length === 0 ? (
                                <div className="p-6 text-center text-gray-500">No notifications</div>
                            ) : (
                                userNotifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`p-4 hover:bg-gray-50 cursor-pointer ${!notification.read ? "bg-blue-50" : ""}`}
                                        onClick={() => handleMarkAsRead(notification.id)}
                                    >
                                        <div className="flex items-start">
                                            <div
                                                className={`rounded-full p-2 mr-3 ${notification.type === "reservation"
                                                        ? "bg-blue-100 text-blue-600"
                                                        : notification.type === "cancellation"
                                                            ? "bg-red-100 text-red-600"
                                                            : "bg-green-100 text-green-600"
                                                    }`}
                                            >
                                                {notification.type === "reservation" ? (
                                                    <Calendar className="h-4 w-4" />
                                                ) : notification.type === "cancellation" ? (
                                                    <X className="h-4 w-4" />
                                                ) : (
                                                    <FileText className="h-4 w-4" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between">
                                                    <h4 className="font-medium text-sm">{notification.title}</h4>
                                                    {!notification.read && (
                                                        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {new Date(notification.timestamp).toLocaleDateString()} at{" "}
                                                    {new Date(notification.timestamp).toLocaleTimeString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
