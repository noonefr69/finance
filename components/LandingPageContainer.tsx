import Hero from "./Hero";
import AboutUs from "./About/AboutUs";
import Blogs from "./Blog/Blogs";
import Contact from "./Contact/contact";
import HeadbarLand from "./HeadbarLand";
import ImageAnim from "./ImageAnim";

export default function LandingPageContainer() {
  return (
    <>
      <HeadbarLand />
      <ImageAnim />
      <Hero />
      <AboutUs />
      {/* <Blogs /> */}
      <Contact />
    </>
  );
}
