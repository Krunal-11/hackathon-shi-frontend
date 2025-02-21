"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 w-full p-4 bg-gradient-to-r from-[#2C4A9A] to-[#1E3A8A] text-white flex justify-between items-center shadow-md px-6 z-50">
      <div className="flex items-center space-x-2">
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="text-2xl font-semibold tracking-wide">
          Meta Sketch Agri
        </h1>
      </div>
      <ul className="hidden md:flex space-x-6 text-lg">
        <li>
          <Link
            href="/"
            className="hover:text-blue-300 transition-all duration-200"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/weather"
            className="hover:text-blue-300 transition-all duration-200"
          >
            Weather
          </Link>
        </li>
        <li>
          <Link
            href="/chat"
            className="hover:text-blue-300 transition-all duration-200"
          >
            Chat
          </Link>
        </li>
        <li>
          <Link
            href="/pests"
            className="hover:text-blue-300 transition-all duration-200"
          >
            Pest Detection
          </Link>
        </li>
      </ul>
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#1E3A8A] shadow-md md:hidden">
          <ul className="flex flex-col space-y-4 p-4 text-lg">
            <li>
              <Link
                href="/"
                className="block w-full p-2 hover:text-blue-300"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/weather"
                className="block w-full p-2 hover:text-blue-300"
                onClick={() => setIsOpen(false)}
              >
                Weather
              </Link>
            </li>
            <li>
              <Link
                href="/chat"
                className="block w-full p-2 hover:text-blue-300"
                onClick={() => setIsOpen(false)}
              >
                Chat
              </Link>
            </li>
            <li>
              <Link
                href="/pests"
                className="block w-full p-2 hover:text-blue-300"
                onClick={() => setIsOpen(false)}
              >
                Pest Detection
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
