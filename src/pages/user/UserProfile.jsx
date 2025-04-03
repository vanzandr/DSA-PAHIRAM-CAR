"use client"
import { useAuth } from "../../context/AuthContext"
import { Car, Calendar, Settings } from "lucide-react"
import { Link } from "react-router-dom"

// Demo data for user's rental history
const rentalHistory = [
    {
        id: "B001",
        car: "2016 Toyota Camry",
        startDate: "May 05, 2025",
        endDate: "May 12, 2025",
        total: "₱ 24,000.00",
        status: "Ongoing",
    },
    {
        id: "B002",
        car: "2016 Toyota Camry",
        startDate: "Apr 20, 2025",
        endDate: "Apr 27, 2025",
        total: "₱ 24,000.00",
        status: "Completed",
    },
    {
        id: "B003",
        car: "2016 Toyota Camry",
        startDate: "Mar 15, 2025",
        endDate: "Mar 22, 2025",
        total: "₱ 24,000.00",
        status: "Completed",
    },
]

export default function UserProfile() {
    const { currentUser } = useAuth()

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* User Profile Header */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                    <div className="p-6">
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-6">
                                <img
                                    src={currentUser.avatar || "/placeholder.svg"}
                                    alt={currentUser.fullName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">{currentUser.fullName}</h1>
                                <p className="text-gray-600">{currentUser.email}</p>
                                <p className="text-gray-600">{currentUser.phone}</p>

                                <div className="mt-4 flex space-x-4">
                                    <Link to="/reserved-cars" className="flex items-center text-gray-700 hover:text-black">
                                        <Car className="h-4 w-4 mr-2" />
                                        Reserved Cars
                                    </Link>
                                    <Link to="/rented-cars" className="flex items-center text-gray-700 hover:text-black">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        Rented Cars
                                    </Link>
                                    <Link to="/settings" className="flex items-center text-gray-700 hover:text-black">
                                        <Settings className="h-4 w-4 mr-2" />
                                        Settings
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Rental History */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-medium">Rental History</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Booking ID
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
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {rentalHistory.map((booking) => (
                                    <tr key={booking.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.id}</td>
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
                                                            : "bg-gray-100 text-gray-800"
                                                    }`}
                                            >
                                                {booking.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

