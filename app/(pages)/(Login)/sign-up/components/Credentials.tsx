import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Credentials() {
  return (
    <form className="flex flex-col gap-3">
      <Label htmlFor="userName">Your name </Label>
      <Input
        className="text-lg font-medium py-5"
        type="text"
        placeholder="John"
        name="userName"
        id="userName"
      />
      <Label htmlFor="userEmail">Your email address </Label>
      <Input
        className="text-lg font-medium py-5"
        type="email"
        placeholder="john@gmail.com"
        name="userEmail"
        id="userEmail"
      />
      <Label htmlFor="userPassword">Your password </Label>
      <Input
        className="text-lg font-medium py-5"
        type="password"
        placeholder="john1234"
        name="userPassword"
        id="userPassword"
      />
      <Button className="cursor-pointer w-fit self-end mt-2" type="submit">
        Create acount
      </Button>
    </form>
  );
}
