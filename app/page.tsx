import { auth, signOut } from "@/auth";
import AboutUs from "@/components/About/AboutUs";
import Blogs from "@/components/Blog/Blogs";
import Contact from "@/components/Contact/contact";
import Headbar from "@/components/Headbar";
import Hero from "@/components/Hero";

export default async function Home() {
  const session = await auth();
  return (
    <div className="">
      <Headbar />
      <Hero />
      <AboutUs />
      <Blogs />
      <Contact />
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Signin with GitHub</button>
      </form>
      {JSON.stringify(session)}
    </div>
  );
}
