"use client";

import { connectToDataBase } from "@/lib/db";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

// Client Component for session handling
export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
