'use client';

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Edit2, Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { addOrderData, getOrder } from "@/actions/orderHandlers";
import { FabricCount } from "@/interface";
import { toast } from "sonner";
import { useState } from "react";
import { useOrderContext } from "@/contexts/OrderContext";


const formSchema = z.object({
  date: z.date(),
  nag: z.coerce.number().nonnegative("validateNumberMsg").optional(),
  faad: z.coerce.number().nonnegative("validateNumberMsg").optional(),
  thaan: z.coerce.number().nonnegative("validateNumberMsg").optional(),
  note: z.string().optional(),
  name: z.string().optional(),
  workType: z.string().optional(),
  printType: z.string().optional(),
  tp: z.string().optional()
});

type PropType = {
  type:string, 
  title: string, 
  customerId: string, 
  orderId: string
}

const FabricForm = ({type, title, customerId, orderId}:PropType)=>{

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const {setOrders, orders} = useOrderContext();
  const key = title?.toLowerCase()+'Fabric';

  const fetchOrder = async()=>{
    const {result, message, error} = await getOrder({customerId});
    if(result){
      setOrders(result);
      toast.success(message);
    }
    if(error){
      toast.error(error?.toString());
    }
  }

  const fabricForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: async()=>{
      const data = (orders as any)?.filter((item:FabricCount)=>item._id===orderId)[0]?.[key];
      const date = data?.date ? new Date(data?.date) : new Date();
      return {...data, date };
    }
  });

  const addFabricData = async(data:FabricCount)=>{
    const {result, message, error} = await addOrderData(customerId, orderId, key, data);

    if(result?.modifiedCount){
      fabricForm.reset();
      setOpen(false);
      await fetchOrder();
      toast(message);
    } else if(error){
      toast.error(error?.toString());
    }
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={`flex gap-2 py-2 hover:px-2 rounded-md hover:cursour-pointer hover:bg-slate-100 place-content-center ${type==="Edit" && 'text-cyan-700' }`}>
        {type==="Edit" ? <Edit2 size="18"/> :<Plus />} <span>{type} {title} Data</span>
      </DialogTrigger>
      <DialogContent aria-describedby={orderId}>
        <DialogHeader>
          <DialogTitle className="border-b pb-1">{type} Details</DialogTitle>
        </DialogHeader>
        <Form {...fabricForm}>
          <form onSubmit={fabricForm.handleSubmit(addFabricData)} className="space-y-4">
            <ScrollArea className="h-[68vh] rounded-md border p-4">
              <FormLabel className="font-bold">{title} Fabric</FormLabel>
              <FormField
                control={fabricForm.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel>Date *</FormLabel>
                    <br />
                    <Popover>
                      <PopoverTrigger asChild >
                        <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] justify-start text-left font-normal w-full",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon />
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={fabricForm.control}
                name="nag"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel>Nag</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} placeholder="Nag (Count)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={fabricForm.control}
                name="faad"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel>Faad</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} placeholder="Faad (Pieces)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={fabricForm.control}
                name="thaan"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel>Thaan</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} placeholder="Thaan (Bundle)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={fabricForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name of worker" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={fabricForm.control}
                name="workType"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel>Work Type</FormLabel>
                    <FormControl>
                      <Input placeholder="Work Type (Dying, Print, etc)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={fabricForm.control}
                name="printType"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel>Print Type</FormLabel>
                    <FormControl>
                      <Input placeholder="Print Type" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={fabricForm.control}
                name="note"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel>Note</FormLabel>
                    <FormControl>
                      <Input placeholder="Note" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />              
            </ScrollArea>
            <DialogFooter className="sm:justify-between">
              <Button type="submit">
                {fabricForm.formState.isSubmitting ? "Submitting...." : "Submit"}
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary" onClick={()=>fabricForm.reset()}> Cancel </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default FabricForm;