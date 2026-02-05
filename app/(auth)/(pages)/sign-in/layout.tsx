import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignIn",
  description:
    "If you have an account then what are you waiting. lets sign in and use my app now. it is an order from KGB. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
