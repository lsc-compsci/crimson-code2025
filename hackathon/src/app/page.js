import Image from "next/image";
import Link from "next/link";
import Navbar from './components/Navbar';

export default function Landing() {
  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 min-h-screen text-white">
      <header className="flex justify-center items-center h-screen bg-cover bg-center relative"
        style={{ backgroundImage: "url('/path-to-your-background-image.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center">
          <h3 className="text-xs md:text-3xl mb-4 text-white overflow-hidden">
            Technology & Innovation System Machine
          </h3>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white overflow-hidden">
            Master the Art of Design and Innovation.
          </h1>
          <p className="text-sm md:text-2xl mb-24 text-white overflow-hidden mt-4">
            {/* Learn CSS, Typography, and Color Theory to create stunning designs. */}
            CSS | Color Theory | Typography Principles
          </p>

          <Link href="/login" className="mt-4 bg-green-600 text-white py-3 px-8 rounded-lg text-xl font-medium transition hover:bg-green-700">
            Start Learning Today!
          </Link>
        </div>
      </header>

      <section className="py-16 px-4 bg-white text-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Why Learn with Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className=" bg-gray-100 p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
              <h3 className="text-xl font-bold mb-2">CSS Mastery</h3>
              <p>Build responsive and modern websites by mastering CSS fundamentals and advanced techniques.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
              <h3 className="text-xl font-bold mb-2">Typography Expertise</h3>
              <p>Learn the principles of typography to create readable and aesthetically pleasing designs.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
              <h3 className="text-xl font-bold mb-2">Color Theory</h3>
              <p>Understand the science of color to design harmonious and visually striking palettes.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} TISM - Project BL4NC | All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}
