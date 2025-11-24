import Image from "next/image";
import AboutHero from "./AboutHero";
import AboutMid from "./AboutMid";

export default function AboutUs() {
  return (
    <div id="about" className="min-h-screen pt-10 text-center">
      {/* <div className="grid lg:grid-cols-2 gap-10 "> */}
        <AboutHero />
        <AboutMid />
      {/* </div> */}
    </div>
  );
}
