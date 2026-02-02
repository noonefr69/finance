import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function HelpPage() {
  return (
    <div className="flex">
      <div>Test</div>

      <Card className="p-0 bg-transparent md:flex hidden text-muted-foreground text-[12px] border-0 shadow-nonesticky top-[calc(var(--header-height)+1px)] z-30 ml-auto h-[90svh] w-(--sidebar-width) flex-col gap-1 overflow-hidden overscroll-none pb-8">
        <CardHeader className="p-0">On This Page</CardHeader>
        <CardContent className="p-0">
          <p>Card Content</p>
          <p>Card Content</p>
        </CardContent>
        <CardFooter className="mt-auto p-0">
          Give a star in github.
          <Link href={`/`}>Kir</Link>
        </CardFooter>
      </Card>
    </div>
  );
}
