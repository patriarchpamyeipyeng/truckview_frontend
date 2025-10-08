"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // shared styles for links
  const linkClass =
    "relative px-3 py-2 text-gray-300 transition-colors duration-300 hover:text-blue-400 " +
    "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 " +
    "after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full";

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 shadow-md">
      <div className="flex items-center justify-between max-w-6xl p-4 mx-auto">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-500">
          Truck-View Global Enterprise<br />
          <span className="text-sm font-normal"><i>In God We Trust</i></span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden gap-6 md:flex">
          <Link href="/" className={linkClass}>Home</Link>
          <Link href="/services" className={linkClass}>Services</Link>
          <Link href="/about" className={linkClass}>About</Link>
          <Link href="/booking" className={linkClass}>Booking</Link> {/* ✅ Added Booking */}
          <Link href="/contact" className={linkClass}>Contact</Link>
        </div>

        {/* Hamburger Button */}
        <button
          className="text-2xl text-white md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col gap-4 px-6 py-4 bg-gray-800 md:hidden">
          <Link href="./" className={linkClass} onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/services" className={linkClass} onClick={() => setIsOpen(false)}>Services</Link>
          <Link href="/about" className={linkClass} onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/booking" className={linkClass} onClick={() => setIsOpen(false)}>Booking</Link> 
          <Link href="/contact" className={linkClass} onClick={() => setIsOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  );
}
