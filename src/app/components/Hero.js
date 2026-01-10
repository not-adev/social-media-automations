'use client'
import React from 'react'
// import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { UserButton, SignedIn, SignUpButton, SignInButton, SignedOut } from '@clerk/nextjs'

gsap.registerPlugin(ScrollTrigger)
const Hero = () => {
    const mainText = useRef(null)
    const buttons = useRef(null)
    const subText = useRef(null)
    const img1 = useRef(null)
    const img2 = useRef(null)
    const img3 = useRef(null)
    const container = useRef(null)
    useGSAP(() => {
        gsap.from(mainText.current, { y: -100, opacity: 0, duration: 2, delay: 0.3 });
        gsap.from(buttons.current, { y: 100, delay: 0.3, duration: 2, opacity: 0.5 });
        gsap.from(subText.current, { opacity: 0, delay: 0.3, duration: 2, ease: 'power1' });

        gsap.from(img1.current, {
            y: 200,
            // delay : 0.5,
            opacity: 0,
            duration: 2,
            ease: 'bounce',
            scrollTrigger: {
                trigger: img1.current,
                start: 'top 70%',
                // markers : true 
            }

        })
        gsap.from(img2.current, {
            y: -200,
            // delay : 0.5,
            opacity: 0,
            duration: 2,
            ease: 'bounce',
            scrollTrigger: {
                trigger: img2.current,
                start: 'top 10%',
            }

        })
        gsap.from(img3.current, {
            y: 200,
            // delay : 0.5,
            opacity: 0,
            duration: 2,
            ease: 'bounce',
            scrollTrigger: {
                trigger: img3.current,
                start: 'top 70%',
                // markers : true 
            }

        })




    }, { scope: container })

    return (
        <section ref={container} className=" bg-[url('https://i.pinimg.com/1200x/35/0f/02/350f02458ebc0e43023ae5217bdc2a7d.jpg')] bg-cover bg-no-repeat text-white px-8 py-16">
            <div className="max-w-xl text-center m-auto  h-[400px]  dm:pl-12 ">
                <h1 ref={mainText} className="sm:text-7xl main-text text-5xl font-bold  my-4 cursor-pointer  ">
                    {/* <!-- Parent div controls the base size and bold weight for all children --> */}
    
                        <span class="char inline-block transition-transform duration-200 hover:scale-110">A</span>
                        <span class="char inline-block transition-transform duration-200 hover:scale-110">u</span>
                        <span class="char inline-block transition-transform duration-200 hover:scale-110">t</span>
                        <span class="char inline-block transition-transform duration-200 hover:scale-110">o</span>
                        <span class="char inline-block transition-transform duration-200 hover:scale-110">m</span>
                        <span class="char inline-block transition-transform duration-200 hover:scale-110">a</span>
                        <span class="char inline-block transition-transform duration-200 hover:scale-110">t</span>
                        <span class="char inline-block transition-transform duration-200 hover:scale-110">e</span>
                        <span class="char inline-block">&nbsp;</span>
                        <span class="char inline-block transition-transform duration-200 hover:scale-110">Y</span>
                        <span class="char inline-block transition-transform duration-200 hover:scale-110">o</span>
                        <span class="char inline-block transition-transform duration-200 hover:scale-110">u</span>
                        <span class="char inline-block transition-transform duration-200 hover:scale-110">r</span>
                        <span class="char inline-block">&nbsp;</span>
                        <span class="char inline-block transition-transform duration-200 hover:scale-110">S</span>
                        <span class="char inline-block transition-transform duration-200 hover:scale-110">o</span>
                        <span class="char inline-block transition-transform duration-200 hover:scale-110">c</span>
                        <span class="char inline-block transition-transform duration-200 hover:scale-110">i</span>
                        <span class="char inline-block transition-transform duration-200 hover:scale-110">a</span>
                        <span class="char inline-block transition-transform duration-200 hover:scale-110">l</span>
                        <span class="char inline-block">&nbsp;</span>
                        <span class="char inline-block transition-transform duration-200 hover:scale-110">M</span>
                        <span class="char inline-block transition-transform duration-200 hover:scale-110">e</span>
                        <span class="char inline-block transition-transform duration-200 hover:scale-110">d</span>
                        <span class="char inline-block transition-transform duration-200 hover:scale-110">i</span>
                        <span class="char inline-block transition-transform duration-200 hover:scale-110">a</span>
                    

                </h1>
                <p ref={subText} className="text-md text-gray-300 mb-8">
                    Start your journey with powerful tools and beautiful design. Everything you need to launch fast and scale smart.
                </p>
                <div ref={buttons} className="flex items-center  justify-center gap-4">
                    <SignedOut>
                        <SignInButton redirectUrl="/dashboard/home">
                            <button className="border  text-center border-[#52514e] px-4  py-2 rounded-full bg-[#52514e]   hover:bg-black hover:text-white transition"> Login</button>
                        </SignInButton>
                        <SignUpButton redirectUrl="/dashboard/home">
                            <button className="px-8 py-2 text-center rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200" >Sign up</button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn >
                        <UserButton />
                    </SignedIn>

                </div>
            </div>

            <div className="w-full py-10 px-4 flex flex-col sm:flex-row justify-center items-center gap-10 h-auto">
                <img
                    ref={img1}
                    src="https://i.pinimg.com/736x/24/e2/5b/24e25b8940aa30d61de6c6c1cd3a6804.jpg"
                    alt="Photo 1"
                    className="sm:w-1/3 w-full h-[300px] object-cover object-top self-start rounded-lg shadow-lg"
                />
                <img
                    ref={img2}
                    src="https://i.pinimg.com/736x/79/42/26/79422615bb3cc9dea29d4e141aaf8dfb.jpg"
                    alt="Photo 2"
                    className="sm:w-1/4  w-full h-[350px] object-cover transform self-end  sm:translate-y-15 rounded-lg shadow-lg"
                />
                <img
                    ref={img3}
                    src="https://i.pinimg.com/1200x/72/d9/d8/72d9d816611b28d2fdb1294f1adc0e35.jpg"
                    alt="Photo 3"
                    className="sm:w-1/4 hidden sm:block w-full h-[390px] object-cover transform self-center sm:-translate-y-16 rounded-lg shadow-lg"
                />
            </div>
        </section>

    )
}

export default Hero


