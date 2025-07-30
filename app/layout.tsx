import type React from "react";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/navigation";
import { ChatbotWidget } from "@/components/chatbot-widget";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Gebeta SACCOS LTD - Empowering Your Dreams with Every Birr",
  icons: {
    icon: "/favicon.png",
  },
  description:
    "Join Ethiopia's most trusted SACCOS and unlock financial opportunities that grow with you. Save, invest, and borrow with confidence.",
  keywords:
    "SACCOS, Ethiopia, savings, loans, financial services, cooperative, Gebeta",
  authors: [{ name: "Gebeta SACCOS LTD" }],
  openGraph: {
    title: "Gebeta SACCOS LTD",
    description: "Empowering Your Dreams with Every Birr",
    type: "website",
    locale: "en_US",
  },
  generator: "Yihun Shekuri",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
      >
        <Providers>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <ChatbotWidget />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
