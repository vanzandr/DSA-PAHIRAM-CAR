"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./AuthContext"
import { useCars } from "./CarContext"
import { useNotifications } from "./NotificationContext"

// Create the reservation context
const ReservationContext = createContext(null)

// Initial reservation data
const initialReservations = [
  {
    id: "R001",
    carId: "1",
    userId: "user1",
    startDate: "2025-05-01",
    endDate: "2025-05-08",
    status: "Active",
    totalPrice: 31500,
    createdAt: "2025-04-28T10:00:00Z",
    hasLicenseFile: true,
    hasContractFile: true,
  },
  {
    id: "R002",
    carId: "2",
    userId: "user1",
    startDate: "2025-05-10",
    endDate: "2025-05-17",
    status: "Pending Confirmation",
    totalPrice: 29400,
    createdAt: "2025-04-29T14:30:00Z",
    hasLicenseFile: true,
    hasContractFile: true,
  },
]

export const ReservationProvider = ({ children }) => {
  const { currentUser } = useAuth()
  const { updateCarAvailability, getCarById } = useCars()
  const { addNotification } = useNotifications()

  // Check if reservation data exists in localStorage
  const storedReservations = localStorage.getItem("pahiramcar_reservations")
  const [reservations, setReservations] = useState(
    storedReservations ? JSON.parse(storedReservations) : initialReservations,
  )
  const [loading, setLoading] = useState(true)

  // Update localStorage when reservations change
  useEffect(() => {
    localStorage.setItem("pahiramcar_reservations", JSON.stringify(reservations))
    setLoading(false)
  }, [reservations])

  // Add a new reservation
  const addReservation = (reservation) => {
    const reservationId = `R${Date.now().toString().slice(-6)}`
    const newReservation = {
      ...reservation,
      id: reservationId,
      userId: currentUser?.id || "user1",
      createdAt: new Date().toISOString(),
      status: "Pending Confirmation",
    }

    setReservations((prev) => [...prev, newReservation])

    // Update car availability
    updateCarAvailability(reservation.carId, false)

    // Create notification for admin
    const car = getCarById(reservation.carId)
    addNotification({
      type: "reservation",
      title: "New Reservation",
      message: `${currentUser?.fullName || reservation.customerName} reserved a ${car?.name}`,
      data: {
        reservationId,
        carId: reservation.carId,
        carName: car?.name,
        customerName: currentUser?.fullName || reservation.customerName,
        startDate: reservation.startDate,
        days: reservation.days,
        totalPrice: reservation.totalPrice,
      },
    })

    return newReservation
  }

  // Update a reservation
  const updateReservation = (updatedReservation) => {
    setReservations((prev) =>
      prev.map((reservation) => (reservation.id === updatedReservation.id ? updatedReservation : reservation)),
    )
    return updatedReservation
  }

  // Cancel a reservation
  const cancelReservation = (reservationId) => {
    const reservation = reservations.find((r) => r.id === reservationId)
    if (reservation) {
      // Update car availability
      updateCarAvailability(reservation.carId, true)

      // Update reservation status
      setReservations((prev) => prev.map((r) => (r.id === reservationId ? { ...r, status: "Cancelled" } : r)))

      // Get car details
      const car = getCarById(reservation.carId)

      // Create notification for admin
      addNotification({
        type: "cancellation",
        title: "Reservation Cancelled",
        message: `Reservation for ${car?.name} has been cancelled`,
        data: {
          reservationId,
          carId: reservation.carId,
          carName: car?.name,
          customerName: currentUser?.fullName || reservation.customerName,
          timestamp: new Date().toISOString(),
        },
      })

      // Create notification for user
      if (currentUser) {
        addNotification({
          type: "cancellation",
          title: "Reservation Cancelled",
          message: `Your reservation for ${car?.name} has been cancelled`,
          userId: currentUser.id,
          data: {
            reservationId,
            carId: reservation.carId,
            carName: car?.name,
            timestamp: new Date().toISOString(),
          },
        })
      }

      return true
    }
    return false
  }

  // Convert reservation to booking
  const convertToBooking = (reservationId, bookingData) => {
    const reservation = reservations.find((r) => r.id === reservationId)
    if (reservation) {
      setReservations((prev) =>
        prev.map((r) => (r.id === reservationId ? { ...r, status: "Converted to Booking" } : r)),
      )
      return { ...reservation, ...bookingData }
    }
    return null
  }

  // Get user reservations
  const getUserReservations = () => {
    if (!currentUser) return []
    return reservations
      .filter((r) => r.userId === currentUser.id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort newest first
  }

  // Get active reservations
  const getActiveReservations = () => {
    return reservations.filter((r) => r.status === "Active" || r.status === "Pending Confirmation")
  }

  // Check if a car is already reserved
  const isCarReserved = (carId) => {
    return reservations.some((r) => r.carId === carId && (r.status === "Active" || r.status === "Pending Confirmation"))
  }

  // Get reservations by car ID
  const getReservationsByCarId = (carId) => {
    return reservations.filter((r) => r.carId === carId)
  }

  // Get user's recent reservation activities
  const getUserRecentActivities = () => {
    if (!currentUser) return []

    const userReservations = reservations.filter((r) => r.userId === currentUser.id)

    return userReservations
      .map((reservation) => {
        const car = getCarById(reservation.carId)
        return {
          id: reservation.id,
          type: "reservation",
          action: reservation.status === "Cancelled" ? "cancelled" : "created",
          carName: car?.name || "Unknown Car",
          timestamp:
            reservation.status === "Cancelled"
              ? reservation.cancelledAt || reservation.updatedAt || reservation.createdAt
              : reservation.createdAt,
          status: reservation.status,
        }
      })
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Ensure newest first
  }

  return (
    <ReservationContext.Provider
      value={{
        reservations,
        loading,
        addReservation,
        updateReservation,
        cancelReservation,
        convertToBooking,
        getUserReservations,
        getActiveReservations,
        isCarReserved,
        getReservationsByCarId,
        getUserRecentActivities,
      }}
    >
      {children}
    </ReservationContext.Provider>
  )
}

// Custom hook to use the reservation context
export const useReservations = () => {
  const context = useContext(ReservationContext)
  if (!context) {
    throw new Error("useReservations must be used within a ReservationProvider")
  }
  return context
}
