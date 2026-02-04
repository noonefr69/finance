import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Budgets",
  description: "A place that you can add, edit or delete the budgets. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
