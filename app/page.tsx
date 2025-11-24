import AboutUs from "@/components/About/AboutUs";
import Blogs from "@/components/Blog/Blogs";
import Headbar from "@/components/Headbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="">
      <Headbar />
      <Hero />
      <AboutUs />
      <Blogs />
    </div>
  );
}
