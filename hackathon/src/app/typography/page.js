"use client";
import Link from "next/link"
import { useRouter } from 'next/navigation';
import Navbar from "../components/Navbar";
import Quiz from "../components/Quiz";

export default function courseTypography() {
    return (
        <>
            <Navbar />
            <Quiz/>
        </>
        
    )
}