export default function Contact() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-2">Pahiram Car Rental</h1>
                    <p className="text-gray-600">A group made by Watts from Technological Institute of Philippines</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Visit us */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="mb-4">

                        </div>
                        <h3 className="text-lg font-semibold mb-2">About Pahiram Car</h3>
                        <p className="text-gray-600 text-sm mb-3"> PahiramCar is a leading car rental service dedicated to providing high-quality vehicles for all your
                            transportation needs. Whether you're traveling for business, going on a family vacation, or just need a
                            temporary vehicle, we've got you covered.</p>

                    </div>

                    {/* Call us */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="mb-4">
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Our Mission</h3>
                        <p className="text-gray-600 text-sm mb-3">Our mission is to provide convenient, reliable, and affordable car rental services that meet the diverse needs
                            of our customers. We strive to make the car rental process as seamless as possible, from booking to return.</p>
                    </div>

                    {/* Message us */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="mb-4">
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Why Choose Us?</h3>
                        <p className="text-gray-600 text-sm mb-3">We offer a wide range of vehicles, from compact cars to SUVs, ensuring that you find the perfect fit for your
                            needs. Our fleet is regularly maintained and inspected to guarantee safety and reliability.</p>
                        <p className="text-gray-600 text-sm mb-3">We pride ourselves on our exceptional customer service. Our friendly and knowledgeable staff are here to assist
                            you every step of the way, ensuring a smooth and enjoyable rental experience.</p>
                    </div>

                </div>
            </div>
        </div>
    );
}