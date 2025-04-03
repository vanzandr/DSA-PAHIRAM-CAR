import { Github, Linkedin, Mail } from "lucide-react"

export default function TeamSection() {
    const teamMembers = [
        {
            id: 1,
            name: "Maria Santos",
            role: "CEO & Founder",
            bio: "Maria founded PahiramCar with a vision to revolutionize car rentals in the Philippines. With over 10 years in the automotive industry, she brings expertise and passion to the company.",
            imageUrl:
                "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
            social: {
                linkedin: "https://linkedin.com/",
                github: "https://github.com/",
                email: "maria@pahiramcar.com",
            },
        },
        {
            id: 2,
            name: "Juan Reyes",
            role: "Operations Manager",
            bio: "Juan oversees the day-to-day operations of PahiramCar, ensuring that our fleet is well-maintained and our customers receive exceptional service.",
            imageUrl:
                "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
            social: {
                linkedin: "https://linkedin.com/",
                github: "https://github.com/",
                email: "juan@pahiramcar.com",
            },
        },
        {
            id: 3,
            name: "Sophia Cruz",
            role: "Customer Relations",
            bio: "Sophia is dedicated to ensuring our customers have the best experience. She handles customer inquiries, feedback, and works to continuously improve our service.",
            imageUrl:
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1961&q=80",
            social: {
                linkedin: "https://linkedin.com/",
                github: "https://github.com/",
                email: "sophia@pahiramcar.com",
            },
        },
        {
            id: 4,
            name: "Miguel Lim",
            role: "Fleet Manager",
            bio: "Miguel manages our diverse fleet of vehicles, ensuring they meet our high standards of quality and safety. He's always on the lookout for new additions to our collection.",
            imageUrl:
                "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
            social: {
                linkedin: "https://linkedin.com/",
                github: "https://github.com/",
                email: "miguel@pahiramcar.com",
            },
        },
    ]

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Our dedicated team of professionals is committed to providing you with the best car rental experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member) => (
                        <div
                            key={member.id}
                            className="bg-white rounded-lg overflow-hidden shadow-sm transition-transform hover:transform hover:scale-105"
                        >
                            <div className="h-64 overflow-hidden">
                                <img
                                    src={member.imageUrl || "/placeholder.svg"}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                                <p className="text-gray-600 text-sm mb-3">{member.role}</p>
                                <p className="text-gray-700 text-sm mb-4">{member.bio}</p>
                                <div className="flex space-x-3">
                                    <a href={member.social.linkedin} className="text-gray-600 hover:text-black" aria-label="LinkedIn">
                                        <Linkedin size={18} />
                                    </a>
                                    <a href={member.social.github} className="text-gray-600 hover:text-black" aria-label="GitHub">
                                        <Github size={18} />
                                    </a>
                                    <a
                                        href={`mailto:${member.social.email}`}
                                        className="text-gray-600 hover:text-black"
                                        aria-label="Email"
                                    >
                                        <Mail size={18} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

