import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather App - Real-time Weather Information",
  description:
    "Get current weather conditions for any city worldwide. Beautiful, responsive weather app with detailed forecasts.",
  keywords: "weather, forecast, temperature, humidity, wind",
  icons: {
    icon: "icons/favicon.png",
    shortcut: "icons/favicon.png",
    apple: "icons/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "hsl(var(--b1))",
              color: "hsl(var(--bc))",
              border: "1px solid hsl(var(--b3))",
            },
            error: {
              style: {
                background: "hsl(var(--er))",
                color: "hsl(var(--erc))",
              },
            },
            success: {
              style: {
                background: "hsl(var(--su))",
                color: "hsl(var(--suc))",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
