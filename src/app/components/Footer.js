'use client'
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
// import { TimelineLite } from 'gsap/gsap-core';
gsap.registerPlugin(ScrollTrigger)
const Footer = () => {
  const left = useRef(null)
  const right = useRef(null)

  useEffect(() => {
    const t1 = gsap.timeline({
      scrollTrigger: {
        start: 'center 80%'
      }
    })
    t1.from(left.current, {
      opacity: 0,
      y: -100,
      duration: 2,
    })
      .from(right.current, {
        opacity: 0,
        y: -100,
        duration: 2,
      }, '-=1.4')


  }, [])

  return (
    <footer className="bg-black text-white px-8 py-12 ">
      <div className='h-[1px] bg-gray-600 w-full mb-20' >

      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-around items-start gap-12">
        {/* Left Section */}
        <div ref={left} className="flex flex-col gap-4">
          {/* Logo */}
          <div className="text-2xl font-bold">Social Bird</div>

          {/* Address */}
          <p className="text-gray-400">
            123 Innovation Street<br />
            New Delhi, India<br />
            110001
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-2">
            <Link href="#" className="hover:text-cyan-400"><FaFacebookF /></Link >
            <Link href="#" className="hover:text-cyan-400"><FaTwitter /></Link >
            <Link href="#" className="hover:text-cyan-400"><FaInstagram /></Link >
            <Link href="#" className="hover:text-cyan-400"><FaLinkedin /></Link >
          </div>
        </div>

        {/* Right Section */}
        <div ref={right} className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold mb-2">Company</h4>
            <ul className="space-y-1 text-gray-400">
              <li><Link href="#" className="hover:text-white">About Us</Link ></li>
              <li><Link href="#" className="hover:text-white">Careers</Link ></li>
              <li><Link href="#" className="hover:text-white">Press</Link ></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Support</h4>
            <ul className="space-y-1 text-gray-400">
              <li><Link href="#" className="hover:text-white">Help Center</Link ></li>
              <li><Link href="#" className="hover:text-white">Contact Us</Link ></li>
              <li><Link href="#" className="hover:text-white">Privacy Policy</Link ></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;