import type { Metadata } from "next";
import Image from 'next/image';
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen flex flex-col justify-center items-center`}
      >
        <header className="bg-primary h-18 flex items-center w-full">
          <div className="flex items-center">
            <Image
              src="/headerIcon.jpg"
              alt="Image description"
              width={45}
              height={50}
              className="mr-2 ml-3"
            />
            <h1 className="text-white font-bold ml-3">UserData</h1>
          </div>
        </header>
        <main className="flex-1 flex justify-center items-center">{children}</main>
        <Toaster />

        <footer className="bg-primary h-12 flex justify-center items-center w-full">
          <p className="text-white">
            &copy; All rights are reserved to Mouzamuddin
          </p>
        </footer>
      </body>
    </html>
  );
}