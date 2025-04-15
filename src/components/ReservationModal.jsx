"use client"

import { useState, useEffect, useRef } from "react"
import { X, Calendar, Clock, AlertCircle, Upload, FileText, CreditCard } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useNotifications } from "../context/NotificationContext"
import { useReservations } from "../context/ReservationContext"

export default function ReservationModal({ car, onClose, onReserve }) {
    const { currentUser, isAuthenticated } = useAuth()
    const { addNotification } = useNotifications()
    const { addReservation } = useReservations()
    const [selectedDays, setSelectedDays] = useState(7)
    const [startDate, setStartDate] = useState("")
    const [formData, setFormData] = useState({
        fullName: currentUser?.fullName || "",
        email: currentUser?.email || "",
        phone: currentUser?.phone || "",
    })
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [step, setStep] = useState(1)

    // File uploads
    const [licenseFile, setLicenseFile] = useState(null)
    const [licensePreview, setLicensePreview] = useState(null)
    const [contractFile, setContractFile] = useState(null)
    const [contractPreview, setContractPreview] = useState(null)

    const licenseInputRef = useRef(null)
    const contractInputRef = useRef(null)

    // Calculate today's date in YYYY-MM-DD format for min date
    const today = new Date().toISOString().split("T")[0]

    // Set default start date to today
    useEffect(() => {
        setStartDate(today)
    }, [today])

    // Pre-fill form data when user is logged in
    useEffect(() => {
        if (currentUser) {
            setFormData({
                fullName: currentUser.fullName || "",
                email: currentUser.email || "",
                phone: currentUser.phone || "",
            })
        }
    }, [currentUser])

    // Clean up previews when component unmounts
    useEffect(() => {
        return () => {
            if (licensePreview && licensePreview.startsWith("blob:")) {
                URL.revokeObjectURL(licensePreview)
            }
            if (contractPreview && contractPreview.startsWith("blob:")) {
                URL.revokeObjectURL(contractPreview)
            }
        }
    }, [licensePreview, contractPreview])

    // Calculate end date based on start date and selected days
    const calculateEndDate = () => {
        if (!startDate) return ""
        const date = new Date(startDate)
        date.setDate(date.getDate() + selectedDays)
        return date.toISOString().split("T")[0]
    }

    // Calculate total price
    const totalPrice = car.price * selectedDays

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
        // Clear error when field is edited
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }))
        }
    }

    const handleLicenseUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            setLicenseFile(file)
            setLicensePreview(URL.createObjectURL(file))
            if (errors.license) {
                setErrors((prev) => ({ ...prev, license: null }))
            }
        }
    }

    const handleContractUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            setContractFile(file)
            setContractPreview(URL.createObjectURL(file))
            if (errors.contract) {
                setErrors((prev) => ({ ...prev, contract: null }))
            }
        }
    }

    const validateStep1 = () => {
        const newErrors = {}

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required"
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid"
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required"
        }

        if (!startDate) {
            newErrors.startDate = "Start date is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const validateStep2 = () => {
        const newErrors = {}

        if (!licenseFile) {
            newErrors.license = "Driver's license image is required"
        }

        if (!contractFile) {
            newErrors.contract = "Signed contract is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleNextStep = () => {
        if (validateStep1()) {
            setStep(2)
        }
    }

    const handlePrevStep = () => {
        setStep(1)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (step === 1) {
            handleNextStep()
            return
        }

        if (!validateStep2()) {
            return
        }

        setIsSubmitting(true)

        try {
            // Create reservation object with file references
            const reservation = {
                carId: car.id,
                startDate,
                endDate: calculateEndDate(),
                days: selectedDays,
                totalPrice,
                customerName: formData.fullName,
                customerEmail: formData.email,
                customerPhone: formData.phone,
                hasLicenseFile: true,
                hasContractFile: true,
            }

            // Add reservation to context
            const newReservation = addReservation(reservation)

            // Add notification for the user
            addNotification({
                type: "reservation",
                title: "Car Reserved",
                message: `You have successfully reserved a ${car.name}`,
                data: {
                    reservationId: newReservation.id,
                    carId: car.id,
                    carName: car.name,
                    startDate: startDate,
                    days: selectedDays,
                    totalPrice: totalPrice,
                },
            })

            // Call the onReserve callback with the reservation data
            if (onReserve) {
                onReserve(newReservation)
            }

            onClose()
        } catch (error) {
            console.error("Error creating reservation:", error)
            setErrors({ submit: "Failed to create reservation. Please try again." })
        } finally {
            setIsSubmitting(false)
        }
    }

    // Render step 1 - Basic information
    const renderStep1 = () => (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full rounded-md border ${errors.fullName ? "border-red-500" : "border-gray-300"} px-3 py-2`}
                    required
                />
                {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.fullName}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full rounded-md border ${errors.email ? "border-red-500" : "border-gray-300"} px-3 py-2`}
                    required
                />
                {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.email}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full rounded-md border ${errors.phone ? "border-red-500" : "border-gray-300"} px-3 py-2`}
                    required
                />
                {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.phone}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center">
                        <Calendar size={16} className="mr-2" />
                        Start Date
                    </div>
                </label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                        setStartDate(e.target.value)
                        if (errors.startDate) {
                            setErrors((prev) => ({ ...prev, startDate: null }))
                        }
                    }}
                    min={today}
                    className={`w-full rounded-md border ${errors.startDate ? "border-red-500" : "border-gray-300"} px-3 py-2`}
                    required
                />
                {errors.startDate && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.startDate}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center">
                        <Clock size={16} className="mr-2" />
                        Rental Duration
                    </div>
                </label>
                <div className="flex items-center">
                    <input
                        type="range"
                        min="1"
                        max="30"
                        value={selectedDays}
                        onChange={(e) => setSelectedDays(Number.parseInt(e.target.value))}
                        className="w-full mr-4"
                    />
                    <span className="font-medium">{selectedDays} days</span>
                </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Reservation Summary</h3>
                <div className="flex justify-between mb-2">
                    <span>Daily Rate</span>
                    <span>₱ {car.price}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Duration</span>
                    <span>{selectedDays} days</span>
                </div>
                <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₱ {totalPrice.toLocaleString()}</span>
                </div>
            </div>

            <div className="pt-2">
                <p className="text-sm text-gray-600 mb-4">
                    By reserving this car, you agree to our terms and conditions. The car will be held for you for 24 hours.
                </p>

                {errors.submit && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-center">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        {errors.submit}
                    </div>
                )}

                <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                    Continue
                </button>
            </div>
        </div>
    )

    // Render step 2 - Document uploads
    const renderStep2 = () => (
        <div className="space-y-4">
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Required Documents</h3>
                <p className="text-gray-600 text-sm">Please upload the following documents to complete your reservation.</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Driver's License</label>
                <div
                    className={`border-2 border-dashed rounded-lg p-4 ${errors.license ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"
                        } cursor-pointer transition-colors`}
                    onClick={() => licenseInputRef.current.click()}
                >
                    {licensePreview ? (
                        <div className="relative">
                            <img
                                src={licensePreview || "/placeholder.svg"}
                                alt="License preview"
                                className="max-h-48 mx-auto rounded"
                            />
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setLicenseFile(null)
                                    setLicensePreview(null)
                                }}
                                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ) : (
                        <div className="text-center py-6">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="mt-2 text-sm text-gray-600">Click to upload your driver's license</p>
                            <p className="text-xs text-gray-500 mt-1">PNG, JPG or PDF up to 5MB</p>
                        </div>
                    )}
                    <input
                        ref={licenseInputRef}
                        type="file"
                        accept="image/*,application/pdf"
                        className="hidden"
                        onChange={handleLicenseUpload}
                    />
                </div>
                {errors.license && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.license}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Signed Contract</label>
                <div
                    className={`border-2 border-dashed rounded-lg p-4 ${errors.contract ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"
                        } cursor-pointer transition-colors`}
                    onClick={() => contractInputRef.current.click()}
                >
                    {contractPreview ? (
                        <div className="relative">
                            <img
                                src={contractPreview || "/placeholder.svg"}
                                alt="Contract preview"
                                className="max-h-48 mx-auto rounded"
                            />
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setContractFile(null)
                                    setContractPreview(null)
                                }}
                                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ) : (
                        <div className="text-center py-6">
                            <FileText className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="mt-2 text-sm text-gray-600">Click to upload signed contract</p>
                            <p className="text-xs text-gray-500 mt-1">PNG, JPG or PDF up to 5MB</p>
                            <a
                                href="#"
                                className="text-blue-600 text-sm mt-2 inline-block hover:underline"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    // Here you would typically provide a link to download the contract template
                                    alert("Download contract template")
                                }}
                            >
                                Download contract template
                            </a>
                        </div>
                    )}
                    <input
                        ref={contractInputRef}
                        type="file"
                        accept="image/*,application/pdf"
                        className="hidden"
                        onChange={handleContractUpload}
                    />
                </div>
                {errors.contract && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.contract}
                    </p>
                )}
            </div>

            <div className="p-4 bg-gray-50 rounded-lg mt-6">
                <h3 className="font-medium mb-2 flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Payment Information
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                    No payment is required at this time. You will pay when you pick up the car.
                </p>
                <div className="flex justify-between font-bold">
                    <span>Total Due at Pickup</span>
                    <span>₱ {totalPrice.toLocaleString()}</span>
                </div>
            </div>

            <div className="flex gap-4 pt-4">
                <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                    Back
                </button>
                <button
                    type="submit"
                    className="flex-1 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Processing..." : "Complete Reservation"}
                </button>
            </div>
        </div>
    )

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="relative">
                    <button onClick={onClose} className="absolute top-4 right-4 bg-black text-white p-1 rounded-full z-10">
                        <X size={20} />
                    </button>

                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-6">Reserve Car</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                            <div>
                                <img
                                    src={car.images?.[0] || car.imageUrl || "/placeholder.svg"}
                                    alt={car.name}
                                    className="w-full h-auto rounded-lg"
                                />

                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold">{car.name}</h3>
                                    <p className="text-gray-600 mb-3">{car.type}</p>
                                    <div className="flex justify-between items-center mb-2">
                                        <div>
                                            <span className="text-xl font-bold">₱ {car.price}</span>
                                            <span className="text-gray-500 text-sm ml-1">per day</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 text-sm">
                                        <div className="flex items-center gap-1">
                                            <span>{car.seats} Seats</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span>{car.transmission}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span>{car.fuelType}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Step indicator */}
                                <div className="mt-6">
                                    <div className="flex items-center">
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-black text-white" : "bg-gray-200 text-gray-600"
                                                }`}
                                        >
                                            1
                                        </div>
                                        <div className={`flex-1 h-1 ${step >= 2 ? "bg-black" : "bg-gray-200"}`}></div>
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-black text-white" : "bg-gray-200 text-gray-600"
                                                }`}
                                        >
                                            2
                                        </div>
                                    </div>
                                    <div className="flex justify-between mt-2 text-xs text-gray-600">
                                        <span>Reservation Details</span>
                                        <span>Documents</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <form onSubmit={handleSubmit}>{step === 1 ? renderStep1() : renderStep2()}</form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
