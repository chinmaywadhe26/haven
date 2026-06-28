import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import { cn } from "@/lib/utils";
import { ThemeProvider } from './../components/ui/providers/theme-provider';
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Haven",
  description: "Team chat web application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/sign-in">
      <html
        lang="en"
        suppressHydrationWarning
        className={cn("h-full antialiased", geistMono.variable, "font-mono")}
      >
        <body className="bg-background text-foreground">
          <ThemeProvider
            attribute="class"
            storageKey="haven-theme"
            enableSystem={false}
            defaultTheme="dark"
            >
          {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
