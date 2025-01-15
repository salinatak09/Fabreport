'use client';

import { useEffect, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Plus } from "lucide-react";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { addOrderData } from "@/actions/orderHandlers";
import { NextResponse } from "next/server";

interface Proptype{
  customerId: string,
  orderId: string,
  amount: string
}

const creditFormSchema = z.record(z.string());

const CreditContent = (props: Proptype) => {
  const {customerId, orderId, amount} = props;

  const [installmentCount, setInstallmentCount] = useState([0]);

  const creditForm = useForm({
    resolver: zodResolver(creditFormSchema),
  });

  const addCredit=async(data : {[key:string]: string}, orderId: string)=>{
    const res = await addOrderData(customerId, orderId, 'credit', data?.credit);
    // setOpenFabricForm(false);
    if(res ){
      creditForm.reset();
    //   toast.success(res?.message);
    //   router.refresh();
    // } else{
    //   toast.error(res?.error)
    }
  }

  const submitFun = (value:FieldValues)=>{
    setInstallmentCount([...installmentCount, installmentCount?.length+1])
    // console.log(value);
  }
  return (
    <div key={orderId}>
      {installmentCount.map(count=>(
        <div key={count}>
          Installment {count+1} : {amount}
        </div>
      ))}
      <Dialog>
        <DialogTrigger className="flex gap-2 p-2 rounded-md hover:cursour-pointer hover:bg-slate-100 items-end">
          <Plus /> <span>Add Credit Installment</span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="border-b pb-1">Add Credit</DialogTitle>
          </DialogHeader>
          <Form {...creditForm}>
            <form onSubmit={creditForm.handleSubmit((value)=>submitFun(value))} className="space-y-4">
                <FormField
                  control={creditForm.control}
                  name="credit"
                  render={({ field }) => (
                    <FormItem className="m-1">
                      <FormLabel>Credit</FormLabel>
                      <FormControl>
                        <Input type="number" min={0} placeholder='Credit (INR)' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <DialogFooter className="sm:justify-between">
                <Button type="submit">
                  {creditForm.formState.isSubmitting ? "Submitting...." : "Submit"}
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant="secondary" onClick={()=>creditForm.reset()}> Cancel </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreditContent