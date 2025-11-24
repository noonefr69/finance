import Logo from "@/components/Logo";
import SignInContainer from "./components/SignInContainer";

export default function SignIn() {
  return (
    <div className="h-screen relative flex items-center justify-center">
      <div className="absolute top-7 left-8">
        <Logo />
      </div>
      <SignInContainer />
    </div>
  );
}
