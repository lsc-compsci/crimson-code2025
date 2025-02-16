"use client"; // Enables client-side rendering in Next.js

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CameraIcon } from "@heroicons/react/24/solid";
import Navbar from "../components/Navbar";

export default function ProfilePage() {
    // State for profile image
    const [profileImage, setProfileImage] = useState(null);
    const [preview, setPreview] = useState("/default-profile.png");

    // get username from db
    const username = "John Doe";

    // Image upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfileImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // Save profile image
    const handleSave = () => {
        if (profileImage) {
            console.log("Profile image saved:", profileImage);
            alert("Profile Image saved!");

        } else {
            alert("No image to save...");
        }
    };

    const handleLogout = () => {
        alert("Logout Successfully!");
    };

    return (
        <>
            <Navbar />

            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
                    <h1 className="text-xl font-semibold mb-4 text-black">Profile</h1>

                    {/* Profile Image */}
                    <div className="relative w-32 h-32 mx-auto mb-4">
                        <Image
                            src={preview}
                            alt="Profile"
                            width={128}
                            height={128}
                            className="rounded-full object-cover border-2 border-gray-300"
                        />
                        {/* Upload Button */}
                        <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer hover:bg-blue-600">
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                            <CameraIcon className="w-5 h-5" />
                        </label>
                    </div>

                    <p className="text-lg font-medium text-black">{username}</p>

                    {/* Buttons Container */}
                    <div className="mt-6 space-y-4">
                        {/* Save Button */}
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
                            Save Changes
                        </button>

                        {/* Logout Button */}
                        <Link
                            href="/login"
                            onClick={handleLogout}
                            className="block text-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                            Logout
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
