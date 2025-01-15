"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { addOrder } from "@/actions/orderHandlers";
import { useOrderContext } from "@/contexts/OrderContext";


export function AddRow() {
  const {customerId} = useParams();

  const {setOrders} = useOrderContext();

  const addOrderRow = async()=>{
    try{
      const {error, message, result} = await addOrder({customerId: customerId as string});
      if(error){
        throw new Error(error.toString());
      }
      if(message){
        setOrders(prev=>[...prev,result]);
        toast.success(message);
      }
    } catch(err){
      toast.error(String(err));
    }
  }

  return (
    <Button className="flex gap-1" onClick={addOrderRow}>
      <Plus />Add new Details
    </Button>
  )
}