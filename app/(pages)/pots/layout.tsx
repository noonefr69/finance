import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pots",
  description:
    "A place that you can add, edit or delete the pots. You can save money for future!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
