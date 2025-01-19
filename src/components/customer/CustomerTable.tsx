'use client';

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { CustomerType } from "@/interface";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useCustomerContext } from "@/contexts/CustomerContext";

export function CustomerTable () {

  const [loading, setLoading] = useState(true);
  const {customers, setCustomers} = useCustomerContext();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const getCustomers = async ()=>{
    try{
      const res = await fetch(`${BASE_URL}/api/customers`);
      const {result, message, error} = await res.json();
      if(res.status === 200){
        setCustomers(result);
        setLoading(false);
      }
      else{
        toast.error(message, {
          description: error
        });
      }
    } catch(err){
      toast.error("Some Error Occurred!!", {
        description: err?.toString()
      });
    }
  }

  const removeCustomer = async(customer:CustomerType)=>{
    try{
      const res = await fetch(`${BASE_URL}/api/customers`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer)
      });
      const {message} = await res.json();
      if(res.status === 200){
        toast.success(message);
        await getCustomers();
      }
      else{
        toast.error('Some Error Occurred', {
          description: message
        });
      }
    } catch(err){
      toast.error('Some Error Occurred', {
        description: err?.toString()
      });
    }
  }

  useEffect(()=>{
    getCustomers();
  },[]);

  return (
    <div className="space-y-8">
      <Table>
        <TableBody>
          {loading ?
          <TableRow className="p-2 m-2 flex justify-between">
            <TableCell>
              <Skeleton className="w-[400px] h-[20px] rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[150px] h-[20px] rounded-full" />
            </TableCell>
          </TableRow>
           : customers?.map(customer=>(
            <TableRow className="p-2 m-2 cursor-pointer" key={customer?._id}>
              <TableCell className="font-medium active:bg-slate-200">
                <Link href={`/dashboard/${customer?._id}`} className="flex items-center px-4">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>{customer?.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{customer?.name}</p>
                  </div>
                </Link>
              </TableCell>
              <TableCell className="text-right font-medium">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                  <Button variant="outline" className="border-red-200 hover:bg-red-100">Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        You want to delete <b>{customer?.name}</b> !!
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={()=>removeCustomer({_id:customer?._id, name:customer?.name})} className="hover:bg-red-600">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default CustomerTable;
