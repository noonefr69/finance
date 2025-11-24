import Link from "next/link";

export default function SingUpIn({
  className,
  label,
}: {
  className: string;
  label: string;
}) {
  return (
    <Link
      href={`/sign-up`}
      className={`${className} bg-[#ffe0c2] text-black  rounded-md duration-200 active:scale-95 hover:opacity-80`}
    >
      <span>{label}</span>
    </Link>
  );
}
