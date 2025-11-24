import Link from "next/link";
import { Button } from "./ui/button";

export default function SingUpIn({
  className,
  label,
}: {
  className: string;
  label: string;
}) {
  return (
    <Link href={`/sign-up`} className="cursor-pointer">
      {" "}
      <Button
        className={`${className} cursor-pointer rounded-md duration-200 active:scale-95 hover:opacity-80`}
      >
        <span>{label}</span>
      </Button>
    </Link>
  );
}
