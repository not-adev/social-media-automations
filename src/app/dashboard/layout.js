import Link from "next/link";
import { HiHome } from 'react-icons/hi';
import { MdOutlineBuild } from 'react-icons/md';
import { UserButton ,SignedOut , SignedIn} from "@clerk/nextjs";

import { FaRegCalendarCheck } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';



export default function dashboardLayout({ children }) {
    return (
        <div className="flex justify-center min-h-screen text-white bg-[#262627] p-1">
            <aside className="w-[220px] md:block hidden border-1 border-gray-600 rounded-lg  bg-[#2a2b2c]">
                <h2 className="m-auto text-center text-4xl py-7 font-bold">MyLogo </h2>
                <nav className="text-gray-300 flex flex-col gap-6 items-start px-4">
                    <Link href="/dashboard/home" className="flex items-center gap-2 hover:text-blue-400">
                        <HiHome className="text-white text-xl" />
                        <span>Home</span>
                    </Link>
                    <Link href="/dashboard/postAutomation" className="flex items-center gap-2 hover:text-blue-400">
                        <MdOutlineBuild className="text-white text-xl" />
                        <span>Post  Automation</span>
                    </Link>

                    <Link href="/dashboard/scheduledPost" className="flex items-center gap-2 hover:text-blue-400">
                        <FaRegCalendarCheck className="text-white text-xl" />
                        <span>Scheduled Post</span>
                    </Link>
                    <Link href="/dashboard/settings" className="flex items-center gap-2 hover:text-blue-400">
                        <FiSettings className="text-white text-xl" />
                        <span>Settings</span>
                    </Link>
                    <div className="flex items-center gap-2 hover:text-blue-400">

                        <SignedOut>
                            <CgProfile className="text-white text-xl" />

                        </SignedOut>
                         <SignedIn>
                              <UserButton/>
                         </SignedIn>

                        <span>Profile</span>
                    </div>
                </nav>

            </aside>
            


            <main className="flex-1 ">
                {children}
            </main>
        </div>
    );


}