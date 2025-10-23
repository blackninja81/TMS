'use client'

import React, { useState, useEffect } from "react";
import "./Testimonials.scss";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Ethan Patel",
    role: "Frequent Business Traveler",
    quote:
      "Booking my daily train rides through RailEase has been a game-changer. I can reserve seats, get instant updates, and even change my schedule on the go — all in seconds.",
    color: "#FFD166",
  },
  {
    name: "Olivia Martin",
    role: "University Student",
    quote:
      "As a student commuting between cities every weekend, RailEase made my life so much easier. The mobile app is intuitive, and the student discounts are a huge plus!",
    color: "#06D6A0",
  },
  {
    name: "James O’Connor",
    role: "Family Traveler",
    quote:
      "Our family trip was perfectly organized thanks to RailEase. Real-time train tracking and seat selection helped us travel together comfortably without stress.",
    color: "#118AB2",
  },
  {
    name: "Priya Mehra",
    role: "Tour Operator",
    quote:
      "Managing group bookings used to be a nightmare until I found RailEase. Bulk booking and instant e-tickets save me hours every week.",
    color: "#EF476F",
  },
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setActiveIndex((prev) => (prev + 1) % testimonials.length),
      6000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="testimonials">
      <div className="testimonials__container">
        <h2 className="testimonials__heading">What Our Clients Say</h2>

        <div className="testimonials__slider">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className={`testimonial-card ${
                index === activeIndex ? "active" : ""
              }`}
              style={{ borderTopColor: t.color }}
            >
              <div className="testimonial-quote">“{t.quote}”</div>
              <div className="testimonial-info">
                <div
                  className="avatar"
                  style={{ backgroundColor: t.color }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="testimonial-name">{t.name}</h4>
                  <span className="testimonial-role">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonials__dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
