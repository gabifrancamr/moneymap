import { Provider } from "@/components/ui/provider";
import { AdminProvider } from "@/contexts/AdminContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from 'sonner';
import { AppProvider } from "../contexts/AppContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MoneyMap",
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
            <AdminProvider>
              {children}
              <Toaster richColors position="top-center" closeButton />
            </AdminProvider>
          </AppProvider>
        </Provider>
      </body>
    </html>
  );
}
