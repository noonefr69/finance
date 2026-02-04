import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help",
  description: "A place that I dont know why I make it. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
