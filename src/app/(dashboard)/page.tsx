"use client";

import { CustomerTable } from '../../components/customer/CustomerTable';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomerForm } from '../../components/customer/CustomerForm';
import { CustomerProvider } from '@/contexts/CustomerContext';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


const Dashboard = ()=>{
  const router = useRouter();
  const {data:session, status} = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Redirect to login if unauthenticated
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>; // Show loading spinner if session is loading
  }

  return(
    <>
      <div className='m-4'>
        <div className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight px-3 mb-3 first:mt-0 flex justify-between'>
          <h1>Dashboard</h1>
          <Button onClick={()=>{signOut(); router.replace('/login')}}>Logout {session?.user?.name}</Button>
        </div>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Customer List</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomerProvider>
              <CustomerTable/>
              <CustomerForm/>
            </CustomerProvider>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default Dashboard;