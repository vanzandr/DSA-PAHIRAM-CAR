"use client"
import { Link } from "react-router-dom"
import { useAuth } from "../../../context/AuthContext"
import { Home, Calendar, BookOpen, LogOut } from "lucide-react"

export default function EmployeeSidebar({ active }) {
    const { logout } = useAuth()

    const handleLogout = async () => {
        try {
            await logout()
        } catch (error) {
            console.error("Error logging out:", error)
        }
    }

    return (
        <div className="w-64 bg-white h-screen shadow-sm flex flex-col">
            <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Car Rental</h2>
                <p className="text-sm text-gray-600">Employee Portal</p>
            </div>

            <nav className="flex-1 p-4">
                <ul className="space-y-1">
                    <li>
                        <Link
                            to="/employee"
                            className={`flex items-center px-4 py-3 rounded-md ${
                                active === "dashboard" ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                            <Home className="h-5 w-5 mr-3" />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/employee/reservations"
                            className={`flex items-center px-4 py-3 rounded-md ${
                                active === "reservations" ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                            <Calendar className="h-5 w-5 mr-3" />
                            Reservations
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/employee/bookings"
                            className={`flex items-center px-4 py-3 rounded-md ${
                                active === "bookings" ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                            <BookOpen className="h-5 w-5 mr-3" />
                            Bookings
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="p-4 border-t">
                <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-3 w-full text-left rounded-md text-gray-700 hover:bg-gray-100"
                >
                    <LogOut className="h-5 w-5 mr-3" />
                    Logout
                </button>
            </div>
        </div>
    )
}


