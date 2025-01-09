import { Provider } from "@/components/ui/provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from 'sonner';
import { AppProvider } from "./contexts/AppContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Provider>
          <AppProvider>
            {children}
            <Toaster richColors position="top-center" closeButton />
          </AppProvider>
        </Provider>
      </body>
    </html>
  );
}
