import Destinations from "./components/home/routes/Destinations";
import Landing from "./components/home/Landing/Landing";
import Packages from "./components/home/packages/Packages";
export default function Home() {
  return (
    <div className="homepage">
      <Landing />
      <Destinations />
      <Packages/>
      </div>
  );
}

