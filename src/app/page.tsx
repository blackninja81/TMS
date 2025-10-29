"use client";

import { useEffect } from "react";
import { app } from "@/lib/firebase";

//components
import Destinations from "./components/home/routes/Destinations";
import Landing from "./components/home/Landing/Landing";
import Testimonials from "./components/home/testimonials/Testimonials";
import Packages from "./components/home/packages/Packages";
import Timetable from "./components/home/timetable/Timetable";
import Newsletter from "./components/home/newsletter/Newsletter";

export default function Home() {
  useEffect(() => {
    console.log("🔥 Home component mounted");
    console.log("✅ Firebase app name:", app?.name || "Not initialized");
  }, []);

  return (
    <div className="homepage">
      <Landing />
      <Timetable />
      <Destinations />
      <Packages />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
