"use client"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import AdminSidebar from "./components/AdminSidebar"

// Demo data for the admin dashboard
const recentBookings = [
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
]

export default function AdminDashboard() {
    const { currentUser } = useAuth()

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar active="dashboard" />

            <div className="flex-1 p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                    <p className="text-gray-600">Manage your car rental business</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-sm font-medium text-gray-500">Monthly Total Revenue</h2>
                            <span className="text-gray-400">₱</span>
                        </div>
                        <div className="flex items-baseline">
                            <span className="text-2xl font-bold">₱ 123,456.78</span>
                        </div>
                        <div className="mt-2 text-sm text-green-600">+30.1% from last week</div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-sm font-medium text-gray-500">Active Bookings</h2>
                            <span className="text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                    <path
                                        fillRule="evenodd"
                                        d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        </div>
                        <div className="flex items-baseline">
                            <span className="text-2xl font-bold">24</span>
                        </div>
                        <div className="mt-2 text-sm text-green-600">+3 from last week</div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-sm font-medium text-gray-500">Available Cars</h2>
                            <span className="text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h3a1 1 0 00.8-.4l3-4a1 1 0 00.2-.6V8a1 1 0 00-1-1h-3.05A2.5 2.5 0 0011 5.05V5a1 1 0 00-1-1H3z" />
                                </svg>
                            </span>
                        </div>
                        <div className="flex items-baseline">
                            <span className="text-2xl font-bold">43</span>
                        </div>
                        <div className="mt-2 text-sm text-green-600">+3 new cars added</div>
                    </div>
                </div>

                {/* Recent Bookings */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-lg font-semibold">Recent Bookings</h2>
                            <p className="text-sm text-gray-500">View recent customer bookings</p>
                        </div>
                        <Link to="/admin/bookings" className="text-sm text-black hover:underline">
                            View all
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
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
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {recentBookings.map((booking) => (
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

