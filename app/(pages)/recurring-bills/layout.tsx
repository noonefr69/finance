import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recurring Bills",
  description:
    "A place that you can see your transaction that has recurring. You can filter by name, date and amount ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
