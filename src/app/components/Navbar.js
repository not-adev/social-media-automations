import React from 'react';

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';


const Navbar = () => {
    return (
        <nav className="bg-black text-white sticky top-0 left-0 z-10  px-6 py-4 flex justify-between items-center">
            {/* Left: Logo + Navigation */}
            <div className="flex items-center gap-8">
                <div className="text-2xl font-bold">MyLogo</div>
                <div className="hidden md:flex gap-6">
                    <a href="#" className="hover:text-cyan-400 transition">Home</a>
                    <a href="#" className="hover:text-cyan-400 transition">About</a>
                    <Link href="/dashboard/home" className="hover:text-cyan-400 transition">Dashboard</Link>
                    <a href="#" className="hover:text-cyan-400 transition">Contact</a>
                </div>
            </div>

            {/* Right: Auth Buttons */}
            <div className="flex items-center justify-center gap-4">
                <SignedOut>
                    <SignInButton redirectUrl="/dashboard/home">
                        <button className="border  text-center border-[#52514e] px-4  py-2 rounded-full bg-[#52514e]   hover:bg-black hover:text-white transition"> Login</button>
                    </SignInButton>
                    <SignUpButton redirectUrl="/dashboard/home">
                        <button  className="px-8 py-2 text-center rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200" >Sign up</button>
                    </SignUpButton>
                </SignedOut>
                <SignedIn >
                    <UserButton/>
                </SignedIn>


            </div>
        </nav>
    );
};

export default Navbar;