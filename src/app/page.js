import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero2 from "./components/Hero2";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
export default function Home() {
  return (
   <div>
      <Navbar/>
      <Hero/>
      <Hero2/>
      <Footer/>
   </div>
  );
}
