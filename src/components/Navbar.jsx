"use client"

import { Car, User, LogOut } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Navbar() {
  const { currentUser, logout, isAuthenticated, isAdmin } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Car className="h-8 w-8 text-black" />
              <span className="ml-2 text-xl font-bold">PahiramCar</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/browse-cars" className="text-gray-700 hover:text-black">
              Browse Cars
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-black">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-black">
              Contact
            </Link>

            {isAuthenticated ? (
              <>
                {isAdmin ? (
                  <Link to="/admin" className="text-gray-700 hover:text-black">
                    Admin Dashboard
                  </Link>
                ) : (
                  <>
                    <Link to="/reserved-cars" className="text-gray-700 hover:text-black">
                      Reserved Cars
                    </Link>
                    <Link to="/rented-cars" className="text-gray-700 hover:text-black">
                      Rented Cars
                    </Link>
                  </>
                )}
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-black">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img
                        src={currentUser.avatar || "/placeholder.svg"}
                        alt={currentUser.fullName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span>{currentUser.fullName}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    {isAdmin ? (
                      <>
                        <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Dashboard
                        </Link>
                        <Link to="/admin/cars" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Car Management
                        </Link>
                        <Link to="/admin/bookings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Bookings
                        </Link>
                        <Link to="/admin/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Settings
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                          <User className="h-4 w-4 mr-2" />
                          Profile
                        </Link>
                        <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Settings
                        </Link>
                      </>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-black px-3 py-2 rounded-md">
                  Log In
                </Link>
                <Link to="/signup" className="bg-black text-white px-3 py-2 rounded-md hover:bg-gray-800">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

