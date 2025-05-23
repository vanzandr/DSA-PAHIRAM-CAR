"use client"

import { useState, useEffect } from "react"
import { X, Plus, ImageIcon } from "lucide-react"
import apiClient from "../../../services/apiClient.js";


export default function EditCarModal({ car, onClose, onSave }) {
    const [formData, setFormData] = useState({
        carName: "",
        chassisNumber: "",
        engineNumber: "",
        carType: "",
        fuelType: "",
        transmission: "",
        seats: 4,
        price: 0,
        plateNumber: "",
        year: new Date().getFullYear(),
        description: "",
        status: "Available",
    })

    const [carImages, setCarImages] = useState([])
    const [previewImages, setPreviewImages] = useState([])

    useEffect(() => {
        if (car) {
            setFormData({
                carName: car.name || "",
                chassisNumber: car.chassisNumber || "",
                engineNumber: car.engineNumber || "",
                carType: car.type || "",
                fuelType: car.fuelType || "",
                transmission: car.transmission || "",
                seats: car.seats || 4,
                price: car.price || 0,
                plateNumber: car.plateNumber || "",
                year: car.year || new Date().getFullYear(),
                description: car.description ||
                    "Lorem ipsum dolor sit amet...",
                status: car.status || (car.available ? "Available" : "Archived"),
            })

            if (car.images && car.images.length > 0) {
                setPreviewImages(car.images)
            } else if (car.imageUrl) {
                setPreviewImages([car.imageUrl])
            }
        }
    }, [car])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files)
        if (files.length === 0) return

        const newPreviewImages = files.map((file) => URL.createObjectURL(file))
        setCarImages((prev) => [...prev, ...files])
        setPreviewImages((prev) => [...prev, ...newPreviewImages])
    }

    const removeImage = (index) => {
        setCarImages((prev) => prev.filter((_, i) => i !== index))
        setPreviewImages((prev) => {
            if (prev[index].startsWith("blob:")) {
                URL.revokeObjectURL(prev[index])
            }
            return prev.filter((_, i) => i !== index)
        })
    }

    const extractImageIdFromUrl = (url) => {
        const parts = url.split("/")
        const fileName = parts[parts.length - 1]
        return fileName.split(".")[0] // Adjust if backend uses different pattern
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            // Map frontend fields to backend expectations
            const updatedCar = {
                name: formData.carName,
                chassisNumber: formData.chassisNumber,
                engineNumber: formData.engineNumber,
                car_type: formData.carType,                  // ✅ correct backend field
                fuel_type: formData.fuelType,
                transmission_type: formData.transmission,
                seats: formData.seats,
                price_per_day: formData.price,
                plate_number: formData.plateNumber,
                year: formData.year,
                description: formData.description,
                status: formData.status,
                is_archived: formData.status !== "Available",
                available: formData.status === "Available",
            }

            // Send PUT request to update car
            await apiClient.put(`/api/admin/cars/${car.id}/edit`, updatedCar)

            // Upload new images if any
            if (carImages.length > 0) {
                const imageFormData = new FormData()
                carImages.forEach((file) => imageFormData.append("images", file))

                await apiClient.post(`/api/admin/cars/${car.id}/images`, imageFormData, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
            }

            // Remove deleted images
            const originalImageUrls = car.images || []
            const currentImageUrls = previewImages.filter((url) => !url.startsWith("blob:"))
            const deletedImages = originalImageUrls.filter(
                (url) => !currentImageUrls.includes(url)
            )

            for (const imageUrl of deletedImages) {
                const imageId = extractImageIdFromUrl(imageUrl)
                await apiClient.delete(`/api/admin/cars/${car.id}/images/${imageId}`)
            }

            if (onSave) {
                onSave({ ...updatedCar, images: currentImageUrls })
            }

            onClose()
        } catch (err) {
            console.error("Update failed:", err)
            alert("Failed to update car.")
        }
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Car Images */}
                    <div className="bg-gray-50 p-8 flex flex-col">
                        <h3 className="text-lg font-semibold mb-4">Car Images</h3>

                        {/* Image Preview Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            {previewImages.length > 0 ? (
                                previewImages.map((url, index) => (
                                    <div key={index} className="relative h-40 bg-gray-100 rounded-lg overflow-hidden">
                                        <img
                                            src={url || "/placeholder.svg"}
                                            alt={`Car Preview ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-2 right-2 bg-black bg-opacity-70 text-white p-1 rounded-full hover:bg-opacity-90"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-2 h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <div className="text-center p-4">
                                        <ImageIcon className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                                        <p className="text-gray-500">No images selected</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() => document.getElementById("carImagesUpload").click()}
                            className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-md"
                        >
                            <Plus size={18} className="mr-2" />
                            Add Images
                        </button>
                        <input
                            id="carImagesUpload"
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleImageUpload}
                        />

                        <p className="text-sm text-gray-500 mt-2">
                            You can upload multiple images. The first image will be used as the main display image.
                        </p>
                    </div>

                    {/* Car Form */}
                    <div className="p-8">
                        <h2 className="text-xl font-bold mb-6">Edit Car</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Car Name</label>
                                    <input
                                        type="text"
                                        name="carName"
                                        value={formData.carName}
                                        onChange={handleChange}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Chassis Number</label>
                                    <input
                                        type="text"
                                        name="chassisNumber"
                                        value={formData.chassisNumber}
                                        onChange={handleChange}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                                    />
                                </div>

                                {/* Engine Number Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Engine Number</label>
                                    <input
                                        type="text"
                                        name="engineNumber"
                                        value={formData.engineNumber}
                                        onChange={handleChange}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Car Type</label>
                                        <select
                                            name="carType"
                                            value={formData.carType}
                                            onChange={handleChange}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2"
                                        >
                                            <option value="Sedan">Sedan</option>
                                            <option value="SUV">SUV</option>
                                            <option value="Hatchback">Hatchback</option>
                                            <option value="Luxury">Luxury</option>
                                            <option value="Sports">Sports</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                                        <select
                                            name="fuelType"
                                            value={formData.fuelType}
                                            onChange={handleChange}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2"
                                        >
                                            <option value="Gasoline">Gasoline</option>
                                            <option value="Diesel">Diesel</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Transmission Type</label>
                                    <select
                                        name="transmission"
                                        value={formData.transmission}
                                        onChange={handleChange}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                                    >
                                        <option value="Automatic">Automatic</option>
                                        <option value="Manual">Manual</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Number of Seats</label>
                                        <input
                                            type="number"
                                            name="seats"
                                            value={formData.seats}
                                            onChange={handleChange}
                                            min="1"
                                            max="10"
                                            className="w-full rounded-md border border-gray-300 px-3 py-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Price per day</label>
                                        <div className="flex items-center">
                                            <span className="mr-2">₱</span>
                                            <input
                                                type="number"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                min="0"
                                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                                        <input
                                            type="number"
                                            name="year"
                                            value={formData.year}
                                            onChange={handleChange}
                                            min="1990"
                                            max={new Date().getFullYear()}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Plate Number</label>
                                        <input
                                            type="text"
                                            name="plateNumber"
                                            value={formData.plateNumber}
                                            onChange={handleChange}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2"
                                        />
                                    </div>
                                </div>

                                {/* Status Dropdown */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                                    >
                                        <option value="Available">Available</option>
                                        <option value="Archived">Archived</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="4"
                                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                                    ></textarea>
                                </div>

                                <div className="flex justify-end space-x-4 pt-4">
                                    <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md">
                                        Cancel
                                    </button>
                                    <button type="submit" className="px-4 py-2 bg-black text-white rounded-md">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
