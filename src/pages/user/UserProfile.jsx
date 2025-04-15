"use client"
import { useState, useRef } from "react"
import { useAuth } from "../../context/AuthContext"
import { Car, Calendar, Camera, Clock } from "lucide-react"
import { Link } from "react-router-dom"

export default function UserProfile() {
    const { currentUser } = useAuth()
    const [avatar, setAvatar] = useState(currentUser.avatar || "/placeholder.svg")
    const [formData, setFormData] = useState({
        fullName: currentUser.fullName,
        email: currentUser.email,
        phone: currentUser.phone || "",
    })
    const fileInputRef = useRef(null)

    const handleAvatarClick = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setAvatar(e.target.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Here you would typically update the user's information
        console.log("Updated user info:", formData)
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h1 className="text-2xl font-bold">Profile</h1>
                        <p className="text-gray-600">Manage your personal information</p>
                    </div>

                    <div className="p-6">
                        <div className="flex justify-center mb-8">
                            <div className="relative">
                                <div
                                    className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 cursor-pointer"
                                    onClick={handleAvatarClick}
                                >
                                    <img
                                        src={avatar || "/placeholder.svg"}
                                        alt={formData.fullName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div
                                    className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full cursor-pointer"
                                    onClick={handleAvatarClick}
                                >
                                    <Camera className="h-4 w-4" />
                                </div>
                                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Mobile Number
                                    </label>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none"
                                    />
                                </div>

                                <div className="pt-4">
                                    <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </form>

                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <h2 className="text-lg font-medium mb-4">Quick Links</h2>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    to="/reserved-cars"
                                    className="flex items-center px-4 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200"
                                >
                                    <Car className="h-4 w-4 mr-2" />
                                    Reserved Cars
                                </Link>
                                <Link
                                    to="/rented-cars"
                                    className="flex items-center px-4 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200"
                                >
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Rented Cars
                                </Link>
                                <Link
                                    to="/rental-history"
                                    className="flex items-center px-4 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200"
                                >
                                    <Clock className="h-4 w-4 mr-2" />
                                    Rental History
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
