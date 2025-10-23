import Destinations from "./components/home/routes/Destinations";
import Landing from "./components/home/Landing/Landing";
import Testimonials from "./components/home/testimonials/Testimonials";
import Packages from "./components/home/packages/Packages";
import Timetable from "./components/home/timetable/Timetable";
import Newsletter from "./components/home/newsletter/Newsletter";

export default function Home() {
  return (
    <div className="homepage">
      <Landing />
      <Timetable/>
      <Destinations />
      <Packages/>
      <Testimonials/>
      <Newsletter/>
      </div>
  );
}

