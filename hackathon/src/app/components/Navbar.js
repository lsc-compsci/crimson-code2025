"use client";
import Link from "next/link"
import { useState, useRef, useEffect } from 'react'

export default function Navbar() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);

    // If click outside, close the profile button
    useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        // Navbar
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden" >
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
                                <Link
                                    href="/home"
                                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700">
                                    About Us
                                </Link>
                                
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="relative" ref={profileRef}>
                            {/* Profile button */}
                            <button
                                type="button"
                                className="relative flex rounded-full bg-slate-400 text-sm focus:outline-none focus:ring-2 "
                                onClick={() => setIsProfileOpen(!isProfileOpen)}>

                                {/* Profile icon */}
                                <img
                                    className="h-8 w-8 rounded-full"
                                    src="profile.png"
                                    alt="Profile"
                                />
                            </button>

                            {/* Profile dropdown menu */}
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                    <Link
                                        href="/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Your Profile
                                    </Link>
                                    <Link
                                        href="/login"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Sign out
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};