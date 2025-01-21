"use client";

import { Toaster } from "sonner";
import Dashboard from "./dashboard/page";
import Login from "./login/page";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton"
import { Suspense } from "react";
import { connectToDataBase } from "@/lib/db";

function SkeletonCard() {
  return (
    <div className="flex justify-self-center mt-8">
      <Skeleton className="h-[200px] w-[90vw] rounded-xl" />
    </div>
  )
}


export default function Home() {
  const { data:session, status } = useSession();
  if(!process.env.NEXT_PUBLIC_BASE_API_URL){
    console.log(process.env.NEXT_PUBLIC_BASE_API_URL);
    return null;
  }
  if(status === 'loading'){
    return <SkeletonCard/>
  }
  console.log('Added connection function');
  connectToDataBase();
  return (
    <main className="h-lvh">
      <Suspense fallback={<>Loading...</>}>
        <Toaster closeButton/>
        {session ? <Dashboard/>: <Login/>}
      </Suspense>
    </main>
  );
}
