"use client"

import { useState } from "react"
import { useAuth } from "../../context/AuthContext"

export default function UserSettings() {
    const { currentUser } = useAuth()
    const [formData, setFormData] = useState({
        fullName: currentUser.fullName,
        email: currentUser.email,
        phone: currentUser.phone || "",
    })

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
                    <div className="px-6 py-4">
                        <h1 className="text-2xl font-bold">Settings</h1>
                        <p className="text-gray-600">Manage your account</p>
                    </div>

                    <div className="border-t border-gray-200 px-6 py-4">
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Customer Name
                                    </label>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none"
                                        />
                                        <button type="button" className="ml-4 px-4 py-2 bg-black text-white rounded-md">
                                            Edit
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Mobile Number
                                    </label>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none"
                                        />
                                        <button type="button" className="ml-4 px-4 py-2 bg-black text-white rounded-md">
                                            Edit
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <div className="flex">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none"
                                        />
                                        <button type="button" className="ml-4 px-4 py-2 bg-black text-white rounded-md">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

