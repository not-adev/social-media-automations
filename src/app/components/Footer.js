import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';
const Footer = () => {
  return (
    <footer className="bg-black text-white px-8 py-12 ">
        <div className='h-[1px] bg-gray-600 w-full mb-20' >

        </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-around items-start gap-12">
        {/* Left Section */}
        <div className="flex flex-col gap-4">
          {/* Logo */}
          <div className="text-2xl font-bold">MyLogo</div>

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
        <div className="grid grid-cols-2 gap-8">
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