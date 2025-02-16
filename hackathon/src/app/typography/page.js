"use client";
import Link from "next/link"
import { useRouter } from 'next/navigation';
import Navbar from "../components/Navbar";
import Quiz from "../components/Quiz";

export default function courseTypography() {
    return (
        <>
            <Navbar />
            <h1 className="text-black text-2xl text-center p-3 font-bold">Test</h1>
            <Quiz/>
        </>
        
    )
}