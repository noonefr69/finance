import Credentials from "./Credentials";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GitHubGoogle from "./GitHubGoogle";
import Link from "next/link";

export default function SignUpContainer() {
  return (
    <Card className="w-5/6 lg:w-2/3 xl:w-1/3">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <Credentials />
          <div className="my-5 h-0.5 w-full opacity-10 bg-white rounded-full" />
          <GitHubGoogle />
        </div>
      </CardContent>
      <CardFooter>
        <span className="mt-3 text-sm md:text-[16px]">
          Already have an account?{" "}
          <Link className="text-blue-600 hover:underline" href={`/sign-in`}>
            Sign in
          </Link>
        </span>
      </CardFooter>
    </Card>
  );
}
