import Logo from "@/components/Logo";
import SignUpContainer from "./components/SignUpContainer";

export default function SignUp() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="absolute top-7 left-10">
        <Logo />
      </div>
      <SignUpContainer />
    </div>
  );
}
