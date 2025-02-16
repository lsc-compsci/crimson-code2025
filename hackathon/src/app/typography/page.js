"use client";
import Link from "next/link"
import { useRouter } from 'next/navigation';
import Navbar from "../components/Navbar";
import Quiz from "../components/typo_quiz";

export default function courseTypography() {
    return (
        <>
            <Navbar />
            <Quiz/>
        </>
        
    )
}