"use client";
import "./footer.scss";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__left">
          <h2 className="footer__logo">TrainBooking</h2>
          <p className="footer__tagline">Reliable travel, every time.</p>
        </div>
        <div className="footer__contact">
          <h3>Contact Us</h3>
          <ul>
            <li>Email: support@trainbooking.com</li>
            <li>Phone: +254 712 345 678</li>
            <li>Location: Nairobi, Kenya</li>
          </ul>
        </div>

        <div className="footer__center">
          <h3>Quick Links</h3>
          <div className="footer__links">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/timetable">Timetable</Link>
            </li>
            <li>
              <Link href="/booking">Booking</Link>
            </li>
            <li>
              <Link href="/booking">Terms and Conditions</Link>
            </li>
          </ul>
          </div>
        </div>

        <div className="footer__right">
          <h3>Subscribe</h3>
          <form className="footer__form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="footer__bottom">
        <p>
          &copy; {new Date().getFullYear()} TrainBooking. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
