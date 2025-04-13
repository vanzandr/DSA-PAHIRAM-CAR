import { Link } from "react-router-dom"
import { LayoutDashboard, Car, Calendar, BookOpen, Settings, BarChart } from "lucide-react"
import { useNotifications } from "../../../context/NotificationContext"

export default function AdminSidebar({ active }) {
    const { unreadCount } = useNotifications()

    return (
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
            <div className="p-6">{/* Removed the PahiramCar logo and text from here */}</div>
            <nav className="mt-6">
                <Link
                    to="/admin"
                    className={`flex items-center px-6 py-4 ${active === "dashboard" ? "bg-gray-100 border-l-4 border-black" : ""
                        }`}
                >
                    <LayoutDashboard className="h-5 w-5 mr-3 text-gray-500" />
                    <span>Dashboard</span>
                </Link>
                <Link
                    to="/admin/cars"
                    className={`flex items-center px-6 py-4 ${active === "cars" ? "bg-gray-100 border-l-4 border-black" : ""}`}
                >
                    <Car className="h-5 w-5 mr-3 text-gray-500" />
                    <span>Cars</span>
                </Link>
                <Link
                    to="/admin/reservations"
                    className={`flex items-center px-6 py-4 ${active === "reservations" ? "bg-gray-100 border-l-4 border-black" : ""
                        }`}
                >
                    <Calendar className="h-5 w-5 mr-3 text-gray-500" />
                    <span>Reservations</span>
                    {unreadCount > 0 && active !== "reservations" && (
                        <span className="ml-auto bg-red-600 text-white text-xs px-2 py-1 rounded-full">{unreadCount}</span>
                    )}
                </Link>
                <Link
                    to="/admin/bookings"
                    className={`flex items-center px-6 py-4 ${active === "bookings" ? "bg-gray-100 border-l-4 border-black" : ""
                        }`}
                >
                    <BookOpen className="h-5 w-5 mr-3 text-gray-500" />
                    <span>Bookings</span>
                </Link>
                <Link
                    to="/admin/reports"
                    className={`flex items-center px-6 py-4 ${active === "reports" ? "bg-gray-100 border-l-4 border-black" : ""}`}
                >
                    <BarChart className="h-5 w-5 mr-3 text-gray-500" />
                    <span>Reports</span>
                </Link>
                <Link
                    to="/admin/settings"
                    className={`flex items-center px-6 py-4 ${active === "settings" ? "bg-gray-100 border-l-4 border-black" : ""
                        }`}
                >
                    <Settings className="h-5 w-5 mr-3 text-gray-500" />
                    <span>Settings</span>
                </Link>
            </nav>
        </div>
    )
}
