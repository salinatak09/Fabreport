import type { Metadata } from "next";
import { Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";
import { connectToDataBase } from "@/db/database";
import ClientLayout from "./client-layout";

const hindi = Tiro_Devanagari_Hindi({
  weight: ['400', '400'],
  subsets: ['devanagari'],
});

export const metadata: Metadata = {
  title: "Fabric Report",
  description: "Manage details of Fabric, Amount, Customers etc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  connectToDataBase(process.env.DB_USERNAME!, process.env.DB_PASSWORD!);
  return (
    <html lang="en">
      <body className={`${hindi.className} antialiased`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
