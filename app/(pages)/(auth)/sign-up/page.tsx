import Logo from "@/components/Logo";
import { SignUpForm } from "./components/SignUpForm";

export default function SignUp() {
  return (
    <div className="h-screen relative flex items-center justify-center">
      <div className="absolute top-7 left-8">
        <Logo />
      </div>
      <SignUpForm />
    </div>
  );
}
