import React from 'react'

const Hero2 = () => {

    const cards = [
        {
            bg: 'https://i.pinimg.com/1200x/31/c3/47/31c347d02f8399be1dc951049256c03e.jpg',
            logo: '/logo1.png',
            title: 'Post Automation',
            text: 'Push boundaries with cutting-edge solutions tailored for scale.',
        },
        {
            bg: 'https://i.pinimg.com/736x/40/76/fc/4076fcfe75ac91635549cda45a12fe6a.jpg',
            logo: '/logo2.png',
            title: 'Smart scheduling',
            text: 'Craft interfaces that captivate and convert with clarity.',
        },
        {
            bg: 'https://i.pinimg.com/736x/03/2b/b4/032bb4387d0796e02d7e23ac92adea99.jpg',
            logo: '/logo3.png',
            title: 'Ai Content generation ',
            text: 'Launch confidently with optimized workflows and smart hosting.',
        },
    ];
    return (
        <div className="bg-black text-white min-h-screen px-16 py-20">

            <div className="text-center mt-12 mb-20">
                <h1 className="text-3xl font-bold mb-4">Welcome to Your Next Big Thing</h1>
                <p className="text-md   text-gray-300">
                    Explore powerful tools and beautiful design in one unified experience.
                </p>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="relative border border-gray-500 rounded-xl shadow-lg h-65 overflow-hidden"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-40"
                            style={{ backgroundImage: `url(${card.bg})` }}
                        />


                        <div className="relative  p-6 h-full flex flex-col justify-center text-white">
                            <div className="absolute top-4 left-4 w-12 h-12 ">

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-cube"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M21 16.008v-8.018a1.98 1.98 0 0 0 -1 -1.717l-7 -4.008a2.016 2.016 0 0 0 -2 0l-7 4.008c-.619 .355 -1 1.01 -1 1.718v8.018c0 .709 .381 1.363 1 1.717l7 4.008a2.016 2.016 0 0 0 2 0l7 -4.008c.619 -.355 1 -1.01 1 -1.718z" /><path d="M12 22v-10" /><path d="M12 12l8.73 -5.04" /><path d="M3.27 6.96l8.73 5.04" /></svg>
                            </div>


                            {/* Text */}
                            <h2 className="text-2xl font-bold mb-2">{card.title}</h2>
                            <p className="text-gray-200">{card.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Hero2

