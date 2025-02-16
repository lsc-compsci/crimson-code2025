"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // For redirecting users after login

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // To store error messages
    const router = useRouter(); // For navigation after login

    const login = async () => {
        setError(""); // Reset error state before login attempt
        try {
            const response = await fetch("http://127.0.0.1:8000/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.access_token); // Store token
                console.log("Login successful!");
                router.push("/home"); // Redirect after login
            } else {
                setError(data.detail || "Login failed. Please try again."); // Show error message
            }
        } catch (error) {
            setError("Error connecting to server. Please try again.");
            console.error("Login error:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login();
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="cougar-head.jpg" alt="Coug Creative" />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Sign In
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error message */}

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-500">
                            Sign in
                        </button>
                    </div>
                </form>
                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Not a member?
                    <a href="/register" className="font-semibold text-black hover:underline rounded-md p-1">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
}