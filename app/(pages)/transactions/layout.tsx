import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transactions",
  description:
    "A place that you can add, edit or delete the transactions. Beside that you can sort or filter the transactions that you have.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
