import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import ClientProviders from "@/providers/client-provider";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  style: ["italic", "normal"]
});

export const metadata: Metadata = {
  title: "METALYTICS",
  description: "Metalytics App"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClientProviders>
            <Toaster />
            {children}
          </ClientProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
