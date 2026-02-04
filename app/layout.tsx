import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
// @ts-ignore
import "./globals.css";

export const metadata: Metadata = {
  title: "Finance",
  description:
    "A modern personal finance app. create transactions, pots, and budgets. You can edit everything too.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          // disableTransitionOnChange
          themes={["light", "dark", "solar", "bubbleGum"]}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
