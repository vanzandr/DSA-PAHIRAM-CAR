"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./AuthContext"
import { useCars } from "./CarContext"
import { useNotifications } from "./NotificationContext"
import apiClient from "../services/apiClient"

const ReservationContext = createContext(null)

export const RESERVATION_STATUS = {
  WAITING_FOR_APPROVAL: "WAITING_FOR_APPROVAL",
  BOOKED: "BOOKED",
  CANCELLED: "CANCELLED",
  EXPIRED: "EXPIRED",
}

const initialReservations = [
  {
    id: "R001",
    carId: "1",
    userId: "user1",
    customerName: "Diwata Pares",
    firstName: "Diwata",
    middleName: "",
    lastName: "Pares",
    mobilePhone: "63912-345-6789",
    nationality: "Filipino",
    startDate: "2025-05-01",
    endDate: "2025-05-08",
    status: RESERVATION_STATUS.WAITING_FOR_APPROVAL,
    totalPrice: 31500,
    createdAt: "2025-04-28T10:00:00Z",
    hasLicenseFile: true,
    hasContractFile: true,
  },
]

export const ReservationProvider = ({ children }) => {
  const { currentUser } = useAuth()
  const { updateCarAvailability, getCarById } = useCars()
  const { addNotification } = useNotifications()

  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!currentUser?.id) return

    const fetchReservations = async () => {
      const token = localStorage.getItem("token")
      const isDemo = !token || token === "demo-token"
      const isEmployeeDemo = isDemo && currentUser?.role === "employee"

      setLoading(true)

      try {
        if (isDemo || isEmployeeDemo) {
          console.log(" Demo mode: loading reservations from localStorage")

          const localData = localStorage.getItem("pahiramcar_reservations")
          if (localData) {
            setReservations(JSON.parse(localData))
          } else {
            setReservations(initialReservations)
          }
        } else {
          const response = await apiClient.get(`/api/customer/reservations/${currentUser.id}`)
          if (response.data && Array.isArray(response.data)) {
            setReservations(response.data)
            localStorage.setItem("pahiramcar_reservations", JSON.stringify(response.data))
          } else {
            throw new Error("Invalid reservations data format")
          }
        }
      } catch (err) {
        console.error(" Failed to get reservations:", err)
        setReservations(initialReservations)
      } finally {
        setLoading(false)
      }
    }

    fetchReservations()
  }, [currentUser?.id])

  const persistReservations = (updated) => {
    setReservations(updated)
    localStorage.setItem("pahiramcar_reservations", JSON.stringify(updated))
  }

  const addReservation = async (reservation) => {
    if (!currentUser?.id || typeof currentUser.id !== "number") {
      throw new Error("currentUser.id must be a number.")
    }

    const reservationId = `R${Date.now().toString().slice(-6)}`
    const customerName = `${currentUser.firstName || ""} ${currentUser.middleName || ""} ${currentUser.lastName || ""}`.trim()

    const newReservation = {
      ...reservation,
      id: reservationId,
      userId: currentUser.id,
      createdAt: new Date().toISOString(),
      status: RESERVATION_STATUS.WAITING_FOR_APPROVAL,
      customerName,
      firstName: currentUser.firstName || "",
      middleName: currentUser.middleName || "",
      lastName: currentUser.lastName || "",
      mobilePhone: currentUser.mobilePhone || "",
      nationality: currentUser.nationality || "Filipino",
    }

    try {
      const res = await apiClient.post(`/api/customer/${currentUser.id}/reservations`, newReservation)
      setReservations((prev) => [...prev, res.data])
      updateCarAvailability(newReservation.carId, false)

      const car = getCarById(newReservation.carId)
      addNotification({
        type: "reservation",
        title: "New Reservation",
        message: `${customerName} reserved a ${car?.name}`,
        data: {
          reservationId,
          carId: newReservation.carId,
          carName: car?.name,
          customerName,
          startDate: newReservation.startDate,
          days: newReservation.days,
          totalPrice: newReservation.totalPrice,
        },
      })

      return res.data
    } catch (error) {
      console.error("❌ Failed to add reservation:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateReservation = async (updatedData) => {
    try {
      setLoading(true)
      const response = await apiClient.put(`/api/reservations/${updatedData.id}`, updatedData)
      const updated = reservations.map((r) => (r.id === updatedData.id ? response.data : r))
      persistReservations(updated)
      return response.data
    } catch (err) {
      console.error("Failed to update reservation:", err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const cancelReservation = async (reservationId) => {
    const reservation = reservations.find((r) => r.id === reservationId)
    if (!reservation) return false

    try {
      await apiClient.put(`/api/customer/reservation/${reservationId}/cancel`)
      updateCarAvailability(reservation.carId, true)

      const updated = reservations.map((r) =>
          r.id === reservationId ? { ...r, status: RESERVATION_STATUS.CANCELLED } : r
      )
      setReservations(updated)

      const car = getCarById(reservation.carId)

      addNotification({
        type: "cancellation",
        title: "Reservation Cancelled",
        message: `Reservation for ${car?.name} has been cancelled`,
        data: {
          reservationId,
          carId: reservation.carId,
          carName: car?.name,
          customerName: reservation.customerName,
          timestamp: new Date().toISOString(),
        },
      })

      return true
    } catch (error) {
      console.error("Failed to cancel reservation:", error)
      return false
    }
  }

  const convertToBooking = (reservationId, bookingData) => {
    const reservation = reservations.find((r) => r.id === reservationId)
    if (!reservation) return null
    setReservations((prev) =>
        prev.map((r) =>
            r.id === reservationId ? { ...r, status: RESERVATION_STATUS.BOOKED } : r
        )
    )
    return { ...reservation, ...bookingData }
  }

  const getUserReservations = () => {
    if (!currentUser) return []
    return reservations.filter((r) => r.userId === currentUser.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  const getActiveReservations = () => {
    return reservations.filter((r) => r.status === RESERVATION_STATUS.WAITING_FOR_APPROVAL)
  }

  const checkExpiredReservations = () => {
    const today = new Date()
    const updated = reservations.map((r) => {
      if (r.status === RESERVATION_STATUS.WAITING_FOR_APPROVAL && new Date(r.endDate) < today) {
        return { ...r, status: RESERVATION_STATUS.EXPIRED }
      }
      return r
    })

    if (JSON.stringify(updated) !== JSON.stringify(reservations)) {
      persistReservations(updated)
    }

    return updated.filter((r) => r.status === RESERVATION_STATUS.EXPIRED)
  }

  const isCarReserved = (carId) => {
    return reservations.some((r) => r.carId === carId && r.status === RESERVATION_STATUS.WAITING_FOR_APPROVAL)
  }

  const getReservationsByCarId = (carId) => {
    return reservations.filter((r) => r.carId === carId)
  }

  const getUserRecentActivities = () => {
    if (!currentUser) return []
    const userReservations = reservations.filter((r) => r.userId === currentUser.id)

    return userReservations
        .map((reservation) => {
          const car = getCarById(reservation.carId)
          return {
            id: reservation.id,
            type: "reservation",
            action: reservation.status === RESERVATION_STATUS.CANCELLED ? "cancelled" : "created",
            carName: car?.name || "Unknown Car",
            timestamp: reservation.cancelledAt || reservation.updatedAt || reservation.createdAt,
            status: reservation.status,
          }
        })
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
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
            checkExpiredReservations,
            isCarReserved,
            getReservationsByCarId,
            getUserRecentActivities,
            RESERVATION_STATUS,
          }}
      >
        {children}
      </ReservationContext.Provider>
  )
}

export const useReservations = () => {
  const context = useContext(ReservationContext)
  if (!context) {
    throw new Error("useReservations must be used within a ReservationProvider")
  }
  return context
}