"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create the car context
const CarContext = createContext(null)

// Initial car data
const initialCars = [
    {
        id: "1",
        name: "2016 Toyota Camry",
        type: "Sedan",
        price: 4500,
        seats: 4,
        transmission: "Automatic",
        fuelType: "Gasoline",
        images: [
            "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=2156",
            "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=2156",
            "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=2156",
        ],
        imageUrl: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=2156",
        available: true,
        plateNumber: "DIWATA001",
        year: 2016,
        description: "A reliable and comfortable sedan perfect for city driving and longer trips.",
    },
    {
        id: "2",
        name: "2018 Honda Civic",
        type: "Sedan",
        price: 4200,
        seats: 5,
        transmission: "Automatic",
        fuelType: "Gasoline",
        images: [
            "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2070",
            "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2070",
        ],
        imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2070",
        available: true,
        plateNumber: "DIWATA002",
        year: 2018,
        description: "A sporty and fuel-efficient sedan with modern features and excellent handling.",
    },
    {
        id: "3",
        name: "2020 Ford Explorer",
        type: "SUV",
        price: 6500,
        seats: 7,
        transmission: "Automatic",
        fuelType: "Gasoline",
        images: [
            "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?auto=format&fit=crop&q=80&w=2070",
            "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?auto=format&fit=crop&q=80&w=2070",
            "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?auto=format&fit=crop&q=80&w=2070",
        ],
        imageUrl: "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?auto=format&fit=crop&q=80&w=2070",
        available: true,
        plateNumber: "DIWATA003",
        year: 2020,
        description: "A spacious SUV perfect for family trips and adventures with plenty of cargo space.",
    },
    {
        id: "4",
        name: "2019 Mitsubishi Montero",
        type: "SUV",
        price: 5800,
        seats: 7,
        transmission: "Automatic",
        fuelType: "Diesel",
        images: [
            "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=2071",
            "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=2071",
        ],
        imageUrl: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=2071",
        available: true,
        plateNumber: "DIWATA004",
        year: 2019,
        description: "A rugged and reliable SUV with excellent off-road capabilities and comfortable interior.",
    },
    {
        id: "5",
        name: "2021 Mazda 3",
        type: "Hatchback",
        price: 4800,
        seats: 5,
        transmission: "Manual",
        fuelType: "Gasoline",
        images: [
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=2070",
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=2070",
        ],
        imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=2070",
        available: true,
        plateNumber: "DIWATA005",
        year: 2021,
        description: "A stylish hatchback with sporty handling and modern features for an enjoyable driving experience.",
    },
    {
        id: "6",
        name: "2017 Toyota Fortuner",
        type: "SUV",
        price: 5500,
        seats: 7,
        transmission: "Manual",
        fuelType: "Diesel",
        images: [
            "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=2070",
            "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=2070",
        ],
        imageUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=2070",
        available: true,
        plateNumber: "DIWATA006",
        year: 2017,
        description: "A versatile SUV with excellent durability and performance on various terrains.",
    },
]

export const CarProvider = ({ children }) => {
    // Check if car data exists in localStorage
    const storedCars = localStorage.getItem("pahiramcar_cars")
    const [cars, setCars] = useState(storedCars ? JSON.parse(storedCars) : initialCars)
    const [loading, setLoading] = useState(true)

    // Update localStorage when cars change
    useEffect(() => {
        localStorage.setItem("pahiramcar_cars", JSON.stringify(cars))
        setLoading(false)
    }, [cars])

    // Add a new car
    const addCar = (car) => {
        const newCar = {
            ...car,
            id: `${cars.length + 1}`,
            available: true,
        }
        setCars((prev) => [...prev, newCar])
        return newCar
    }

    // Update a car
    const updateCar = (updatedCar) => {
        setCars((prev) => prev.map((car) => (car.id === updatedCar.id ? updatedCar : car)))
        return updatedCar
    }

    // Delete a car
    const deleteCar = (carId) => {
        setCars((prev) => prev.filter((car) => car.id !== carId))
    }

    // Get a car by ID
    const getCarById = (carId) => {
        return cars.find((car) => car.id === carId)
    }

    // Update car availability
    const updateCarAvailability = (carId, isAvailable) => {
        setCars((prev) => prev.map((car) => (car.id === carId ? { ...car, available: isAvailable } : car)))
    }

    return (
        <CarContext.Provider
            value={{
                cars,
                loading,
                addCar,
                updateCar,
                deleteCar,
                getCarById,
                updateCarAvailability,
            }}
        >
            {children}
        </CarContext.Provider>
    )
}

// Custom hook to use the car context
export const useCars = () => {
    const context = useContext(CarContext)
    if (!context) {
        throw new Error("useCars must be used within a CarProvider")
    }
    return context
}
