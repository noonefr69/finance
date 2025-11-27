import { auth } from "@/auth";
import LandingPageContainer from "@/components/LandingPageContainer";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const session = await auth();

  if (session) {
    redirect("/home");
  }
  return (
    <div className="">
      <LandingPageContainer />
    </div>
  );
}
