import React from 'react';
import Link from 'next/link';
const page = () => {
    const cards = [
        {
            bg: 'https://i.pinimg.com/1200x/31/c3/47/31c347d02f8399be1dc951049256c03e.jpg',
            logo: '/logo1.png',
            title: 'Generate Post',
            id: "generatepost",
            text: 'Generate and Schedule your post with some easy clisks.',
        },
        {
            bg: 'https://i.pinimg.com/736x/03/2b/b4/032bb4387d0796e02d7e23ac92adea99.jpg',
            logo: '/logo2.png',
            title: 'Smart A.I',
            id: "smartai",
            text: 'Smart A.I to help you in generating visual appeling content.',
        },
        {
            bg: 'https://i.pinimg.com/736x/40/76/fc/4076fcfe75ac91635549cda45a12fe6a.jpg',
            id: "tredingtopics",
            logo: '/logo3.png',
            title: 'Treding Topics',
            text: 'Dont have an idea what to post? Explore treding topics curated for you.',
        },
    ];
    return (
        <div className="relative">
            <div className="max-w-4xl m-auto px-2 py-6  max-h-screen  overflow-scroll scrollbar-hidden">
                <header>
                    <h1 className="text-3xl font-bold mb-8 md:w-[50%] m-auto  text-center">Generate your content and Post </h1>
                </header>

                <div className="grid grid-cols-1 m-auto my-10 px-8 md:grid-cols-2 gap-8">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="relative border border-gray-500 hover:-translate-y-2 transition-all rounded-xl hover:border-2 hover:border-gray-200 h-65 overflow-hidden group"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-20"
                                style={{ backgroundImage: `url(${card.bg})` }}
                            />

                            <div className="relative  p-6 h-full flex flex-col justify-center text-white">
                                <div className="absolute top-4 left-4 w-12 h-12 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-cube"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M21 16.008v-8.018a1.98 1.98 0 0 0 -1 -1.717l-7 -4.008a2.016 2.016 0 0 0 -2 0l-7 4.008c-.619 .355 -1 1.01 -1 1.718v8.018c0 .709 .381 1.363 1 1.717l7 4.008a2.016 2.016 0 0 0 2 0l7 -4.008c.619 -.355 1 -1.01 1 -1.718z" /><path d="M12 22v-10" /><path d="M12 12l8.73 -5.04" /><path d="M3.27 6.96l8.73 5.04" /></svg>
                                </div>
                                {/* Text */}
                                <h2 className="text-2xl text-gray-200 font-semibold mb-2">{card.title}</h2>
                                <p className="text-gray-200">{card.text}</p>
                                <Link
                                    href={`./postAutomation/postworking?type=${card.id}`}
                                    className="absolute bottom-6 right-6 bg-gradient-to-r from-gray-500 to-gray-300 hover:to-gray-400 hover:cursor-pointer  text-white font-bold py-2 px-5 rounded-full shadow-lg transition-all duration-300 z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
                                >
                                    Generate Content
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
              
            
        </div>
    );
};

export default page;