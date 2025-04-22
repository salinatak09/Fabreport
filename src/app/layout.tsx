import type { Metadata } from "next";
import { Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";

const hindi = Tiro_Devanagari_Hindi({
  weight: ['400', '400'],
  subsets: ['devanagari'],
});

export const metadata: Metadata = {
  title: "Fabric Report",
  description: "Manage details of Fabric, Amount, Customers etc.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log('inside Layout');
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
