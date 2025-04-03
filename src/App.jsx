"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Contact from "./pages/Contact"
import About from "./pages/About"
import BrowseCars from "./components/BrowseCars"
import AdminDashboard from "./pages/admin/AdminDashboard"
import CarManagement from "./pages/admin/CarManagement"
import AdminBookings from "./pages/admin/AdminBookings"
import AdminSettings from "./pages/admin/AdminSettings"
import AdminReservations from "./pages/admin/AdminReservations"
import UserProfile from "./pages/user/UserProfile"
import ReservedCars from "./pages/user/ReservedCars"
import RentedCars from "./pages/user/RentedCars"
import UserSettings from "./pages/user/UserSettings"
import { AuthProvider, useAuth } from "./context/AuthContext"

// Protected route component
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth()

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" />
  }

  return children
}

function AppRoutes() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/browse-cars" element={<BrowseCars />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/cars"
            element={
              <ProtectedRoute requireAdmin={true}>
                <CarManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reservations"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminReservations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminSettings />
              </ProtectedRoute>
            }
          />

          {/* User Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reserved-cars"
            element={
              <ProtectedRoute>
                <ReservedCars />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rented-cars"
            element={
              <ProtectedRoute>
                <RentedCars />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <UserSettings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App

