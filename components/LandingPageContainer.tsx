import Headbar from "./Headbar";
import Hero from "./Hero";
import AboutUs from "./About/AboutUs";
import Blogs from "./Blog/Blogs";
import Contact from "./Contact/contact";

export default function LandingPageContainer() {
  return (
    <>
      <Headbar />
      <Hero />
      <AboutUs />
      <Blogs />
      <Contact />
    </>
  );
}
