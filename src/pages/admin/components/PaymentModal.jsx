"use client"

import { useState, useEffect } from "react"

export default function PaymentModal({ booking, onClose, onPaymentComplete }) {
    const [paymentMethod, setPaymentMethod] = useState("Cash")
    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        nameOnCard: "",
        expiryDate: "",
        securityCode: "",
    })
    const [cashAmount, setCashAmount] = useState("")

    // Set default values
    useEffect(() => {
        if (booking) {
            setCashAmount(booking.price || 4500)
        }
    }, [booking])

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value)
    }

    const handleCardDetailsChange = (e) => {
        const { name, value } = e.target
        setCardDetails((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Process payment based on method
        if (paymentMethod === "Cash") {
            console.log("Processing cash payment:", cashAmount)
        } else {
            console.log("Processing card payment:", cardDetails)
        }

        // Notify parent component
        if (onPaymentComplete) {
            onPaymentComplete({
                method: paymentMethod,
                amount: booking?.totalAmount || 31500,
                status: "completed",
            })
        }

        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full">
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-6">Booking Summary</h2>

                    <div className="mb-6">
                        {booking?.carName && (
                            <div className="mb-4">
                                <h3 className="text-gray-600">Car Name</h3>
                                <p className="font-medium">{booking.carName || "Toyota Camary"}</p>
                            </div>
                        )}

                        <div className="border-t border-gray-200 pt-4">
                            <h3 className="text-gray-600 italic">Amount Due</h3>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">₱ 4500 x 7 days</span>
                                <span className="font-bold">₱ 31,500.00</span>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <select
                                    value={paymentMethod}
                                    onChange={handlePaymentMethodChange}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                                >
                                    <option value="Cash">Cash</option>
                                    <option value="Debit Card">Debit Card</option>
                                    <option value="Credit Card">Credit Card</option>
                                </select>
                            </div>

                            {paymentMethod === "Cash" ? (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cash Amount</label>
                                    <div className="flex items-center">
                                        <span className="mr-2">₱</span>
                                        <input
                                            type="text"
                                            value={cashAmount}
                                            onChange={(e) => setCashAmount(e.target.value)}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2"
                                            placeholder="Enter amount"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={cardDetails.cardNumber}
                                            onChange={handleCardDetailsChange}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2"
                                            placeholder="1234 5678 9012 456"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                                        <input
                                            type="text"
                                            name="nameOnCard"
                                            value={cardDetails.nameOnCard}
                                            onChange={handleCardDetailsChange}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2"
                                            placeholder="Diwata Pares Overcook"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                            <input
                                                type="text"
                                                name="expiryDate"
                                                value={cardDetails.expiryDate}
                                                onChange={handleCardDetailsChange}
                                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                                                placeholder="MM / YY"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Security Code</label>
                                            <input
                                                type="password"
                                                name="securityCode"
                                                value={cardDetails.securityCode}
                                                onChange={handleCardDetailsChange}
                                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                                                placeholder="* * *"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="pt-4">
                                <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800">
                                    Pay
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

