"use client";

import { Toaster } from "sonner";
import Dashboard from "./dashboard/page";
import Login from "./login/page";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton"
import { Suspense } from "react";

function SkeletonCard() {
  return (
    <div className="flex justify-self-center mt-8">
      <Skeleton className="h-[200px] w-[90vw] rounded-xl" />
    </div>
  )
}


export default function Home() {
  const { data:session, status } = useSession();
  if(status === 'loading'){
    return <SkeletonCard/>
  }
  return (
    <main className="h-lvh">
      <Suspense fallback={<>Loading...</>}>
        <Toaster closeButton/>
        {session ? <Dashboard/>: <Login/>}
      </Suspense>
    </main>
  );
}
