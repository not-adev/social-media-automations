import React from 'react'
import Link from 'next/link'
const Hero = () => {
    return (
        <section className=" bg-[url('https://i.pinimg.com/1200x/35/0f/02/350f02458ebc0e43023ae5217bdc2a7d.jpg')] bg-cover bg-no-repeat text-white px-8 py-16">
            <div className="max-w-xl text-center m-auto  h-[400px]  dm:pl-12 ">
                <h1 className="sm:text-7xl text-5xl font-bold  my-4  ">
                    Automate your social media 
                </h1>
                <p className="text-md text-gray-300 mb-8">
                    Start your journey with powerful tools and beautiful design. Everything you need to launch fast and scale smart.
                </p>
                <div className="flex items-center  justify-center gap-4">
                    <Link href="#" className="border border-[#52514e] px-4  py-2 rounded-2xl bg-[#52514e]   hover:bg-black hover:text-white transition">Login</Link>
                    <Link href="#" className="px-8 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">Sign Up</Link>

                </div>
            </div>

            <div className="w-full py-10 px-4 flex flex-col sm:flex-row justify-center items-center gap-10 h-auto">
                <img
                    src="https://i.pinimg.com/736x/24/e2/5b/24e25b8940aa30d61de6c6c1cd3a6804.jpg"
                    alt="Photo 1"
                    className="sm:w-1/3 w-full h-[300px] object-cover object-top self-start rounded-lg shadow-lg"
                />
                <img
                    src="https://i.pinimg.com/736x/79/42/26/79422615bb3cc9dea29d4e141aaf8dfb.jpg"
                    alt="Photo 2"
                    className="sm:w-1/4  w-full h-[350px] object-cover transform self-end  sm:translate-y-15 rounded-lg shadow-lg"
                />
                <img
                    src="https://i.pinimg.com/1200x/72/d9/d8/72d9d816611b28d2fdb1294f1adc0e35.jpg"
                    alt="Photo 3"
                    className="sm:w-1/4 hidden sm:block w-full h-[390px] object-cover transform self-center sm:-translate-y-16 rounded-lg shadow-lg"
                />
            </div>
        </section>

    )
}

export default Hero


