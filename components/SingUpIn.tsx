import Link from "next/link";
import { Button } from "./ui/button";

export default function SingUpIn({
  className,
  label,
}: {
  className?: string;
  label: string;
}) {
  return (
    <Link href={`/sign-up`} className={`${className} cursor-pointer`}>
      {" "}
      <Button className={`cursor-pointer`}>
        <span>{label}</span>
      </Button>
    </Link>
  );
}
