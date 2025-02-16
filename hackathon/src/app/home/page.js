import Image from "next/image";
import Link from "next/link";
import Navbar from '../components/Navbar'
import TopicCard from "../components/TopicCard.js";


export default function Homepage() {
    // Learning topics
    const topics = [
        {
            title: "CSS",
            description: "Learn CSS fundamentals and advanced styling.",
            image: "/css.png",
            link: "/css",
        },
        {
            title: "Color Theory",
            description: "Master the art of color combinations and harmony.",
            image: "/color-theory.png",
            link: "/color-theory",
        },
        {
            title: "Typography",
            description: "Explore the world of fonts and typography design.",
            image: "/typography.png",
            link: "/typography",
        },
    ];

    // Current courses (we'll fetch this from backend later)
    const currentCourses = [
        {
            title: "CSS Basics",
            description: "You're halfway through this course. Keep going!",
            image: "/css.png",
            link: "/css",
        },
        {
            title: "Typography Essentials",
            description: "Learn the fundamentals of great type design.",
            image: "/typography.png",
            link: "/typography",
        },
    ];
    return (
        <>
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button */}
                            <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset" aria-controls="mobile-menu" aria-expanded="false">
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Open main menu</span>
                                <svg className="hidden size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700" aria-current="page">About Us</a>
                                    <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Courses</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {/* Learning topics */}
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-black text-center">Explore Courses</h1>
                <div className="grid gap-6 md:grid-cols-3">
                    {topics.map((topic, idx) => (
                        <TopicCard
                            key={topic.title}
                            topic={topic}
                        />
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-4 text-black text-center">Current Courses</h2>

                <div className="space-y-3">
                    {currentCourses.map((course) => (
                        <div
                            key={course.title}
                            className="bg-white rounded shadow p-4 flex items-center hover:bg-green-400 transition"
                        >
                            {/* Thumbnail (optional) */}
                            <div className="w-20 h-20 relative mr-4 flex-shrink-0">
                                <Image
                                    src={course.image}
                                    alt={course.title}
                                    fill
                                    className="object-cover rounded"
                                />
                            </div>

                            {/* Course Info */}
                            <div className="cursor-pointer">
                                <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
                                <p className="text-gray-600 text-sm">{course.description}</p>
                                <Link
                                    href={course.link}
                                    className="cursor-pointer mt-2 inline-block text-blue-600 hover:underline">
                                    Continue Learning
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
