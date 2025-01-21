"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogClose, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useCustomerContext } from "@/contexts/CustomerContext"

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
});

export function CustomerForm() {
  const [open, setOpen] = useState(false);
  const {setCustomers} = useCustomerContext();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try { 
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      });
      console.log(res);
      let {message, result} = await res.json();
      console.log({message, result});
      if(res.status === 200){
        toast.success(message, {
          description: `${result?.name} Added to List`
        });
        setCustomers(prev=>[...prev,result]);
        form.reset();
        setOpen(false);
      }else{
        toast.error(message, {
          description: result?.toString()
        })
      }
    } catch (error) {
      toast.error('Some Error Occurred!!', {
        description: error?.toString()
      });
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="flex gap-2 p-2 rounded-md hover:cursour-pointer hover:bg-slate-100">
          <Plus />Add new Customer
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="border-b pb-1">Add Customer/Party</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Name" {...field} />
                </FormControl>
                <FormDescription>
                  Name of Customer (Party).
                </FormDescription>
                <FormMessage />
                </FormItem>
              )} 
              />
              <DialogFooter className="sm:justify-between">
                <Button type="submit">
                  {form.formState.isSubmitting ? "Adding Customer...." : "Add Customer"}
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant="secondary" onClick={()=>form.reset()}>Close</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>

        </DialogContent>
      </Dialog>
    </>
  )
}
