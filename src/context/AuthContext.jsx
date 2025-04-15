"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create the authentication context
const AuthContext = createContext(null)

// Demo accounts
const demoAccounts = {
    admin: {
        id: "admin1",
        fullName: "Admin User",
        email: "admin@pahiramcar.com",
        password: "admin123",
        role: "admin",
        avatar: "https://i.pravatar.cc/150?img=68",
    },
    user: {
        id: "user1",
        fullName: "Diwata Pares",
        email: "diwatapares@overcook.com",
        password: "user123",
        role: "user",
        avatar: "https://i.pravatar.cc/150?img=33",
        phone: "63912-456-7891",
    },
}

export const AuthProvider = ({ children }) => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem("pahiramcar_user")
    const [currentUser, setCurrentUser] = useState(storedUser ? JSON.parse(storedUser) : null)
    const [loading, setLoading] = useState(true)

    // Update localStorage when user changes
    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("pahiramcar_user", JSON.stringify(currentUser))
        } else {
            localStorage.removeItem("pahiramcar_user")
        }
        setLoading(false)
    }, [currentUser])

    // Login function
    const login = (email, password) => {
        // Check if email/password match any demo account
        const adminAccount = demoAccounts.admin
        const userAccount = demoAccounts.user

        if (email === adminAccount.email && password === adminAccount.password) {
            // Remove password from stored user data for security
            const { password, ...userWithoutPassword } = adminAccount
            setCurrentUser(userWithoutPassword)
            return { success: true, user: userWithoutPassword }
        } else if (email === userAccount.email && password === userAccount.password) {
            const { password, ...userWithoutPassword } = userAccount
            setCurrentUser(userWithoutPassword)
            return { success: true, user: userWithoutPassword }
        }

        return { success: false, error: "Invalid email or password" }
    }

    // Login as demo user function
    const loginAsDemo = (role) => {
        const account = demoAccounts[role]
        if (account) {
            const { password, ...userWithoutPassword } = account
            setCurrentUser(userWithoutPassword)
            return { success: true, user: userWithoutPassword }
        }
        return { success: false, error: "Invalid role" }
    }

    // Logout function
    const logout = () => {
        setCurrentUser(null)
    }

    // Check if user is authenticated
    const isAuthenticated = !!currentUser

    // Check if user is admin
    const isAdmin = currentUser?.role === "admin"

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                login,
                loginAsDemo,
                logout,
                isAuthenticated,
                isAdmin,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

// Custom hook to use the auth context
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
