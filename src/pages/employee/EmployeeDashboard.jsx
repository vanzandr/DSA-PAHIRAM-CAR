"use client"
import { useAuth } from "../../context/AuthContext"
import EmployeeSidebar from "./components/EmployeeSidebar.jsx"
import AdminNotifications from "../../components/AdminNotifications"

export default function EmployeeDashboard() {
    const { currentUser } = useAuth()

    return (
        <div className="flex min-h-screen bg-gray-50">
            <EmployeeSidebar active="dashboard" />

            <div className="flex-1 p-8">
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Employee Dashboard</h1>
                        <p className="text-gray-600">Manage reservations and bookings</p>
                    </div>
                    <div className="flex items-center">
                        <AdminNotifications />
                    </div>
                </div>

                {/* Welcome Card */}
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                    <h2 className="text-xl font-semibold mb-2">Welcome, {currentUser?.displayName || "Employee"}</h2>
                    <p className="text-gray-600">
                        Use the sidebar to navigate to reservations and bookings. You can view and manage customer reservations and
                        active bookings from there.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-semibold mb-2">Manage Reservations</h3>
                        <p className="text-gray-600 mb-4">View and manage customer reservation requests</p>
                        <a href="/employee/reservations" className="text-black font-medium hover:underline">
                            Go to Reservations →
                        </a>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-semibold mb-2">Manage Bookings</h3>
                        <p className="text-gray-600 mb-4">Handle active bookings and car returns</p>
                        <a href="/employee/bookings" className="text-black font-medium hover:underline">
                            Go to Bookings →
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
