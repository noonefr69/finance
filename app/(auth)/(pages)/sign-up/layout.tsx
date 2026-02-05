import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignUp",
  description:
    "WHAT! You do not have an account in my app??? fast create an account then use my app. NOW!. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
