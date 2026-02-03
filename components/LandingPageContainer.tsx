import Headbar from "./Headbar";
import Hero from "./Hero";
import AboutUs from "./About/AboutUs";
import Blogs from "./Blog/Blogs";
import Contact from "./Contact/contact";
import Image from "next/image";

export default function LandingPageContainer() {
  return (
    <>
      <Headbar />
      {/* <Image src={`/images.png`} alt="background" width={100} height={100} className="-z-10 w-full absolute top-0"/> */}
      <Hero />
      <AboutUs />
      <Blogs />
      <Contact />
    </>
  );
}
