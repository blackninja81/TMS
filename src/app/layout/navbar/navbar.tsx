"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./Navbar.scss";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <nav className="navbar__container">
        <div className="navbar__logo">🚆 RailEase</div>

        <ul className="navbar__links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/timetable">Timetable</Link></li>
          <li><Link href="/booking">Booking</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>

        <div className="navbar__cta">
          <Link href="/booking">
            <Button>Book Now</Button>
          </Link>
        </div>

        <button className="navbar__menu-btn" onClick={toggleMenu}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <div className={`navbar__mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <Link href="/" onClick={closeMenu}>Home</Link>
        <Link href="/timetable" onClick={closeMenu}>Timetable</Link>
        <Link href="/booking" onClick={closeMenu}>Booking</Link>
        <Link href="/contact" onClick={closeMenu}>Contact</Link>
        <Link href="/booking">
          <Button className="navbar__mobile-btn">Book Now</Button>
        </Link>
      </div>
    </header>
  );
}
