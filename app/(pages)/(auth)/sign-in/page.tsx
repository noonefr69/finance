import Logo from "@/components/Logo";
import SignInContainer from "./components/SignInContainer";

export default function SignIn() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="absolute top-10 left-10">
        <Logo />
      </div>
      <SignInContainer />
    </div>
  );
}
