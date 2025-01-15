"use client";

import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Edit2, Plus } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addOrderData, getOrder } from "@/actions/orderHandlers";
import { FabricCount, FabricData } from "@/interface";
import { toast } from "sonner";
import { useOrderContext } from "@/contexts/OrderContext";

const invoiceFormSchema = z.object({
  price: z.coerce.number().nonnegative("validateNumberMsg"),
  debit: z.coerce.number().nonnegative("validateNumberMsg"),
  // credit: z.record(z.string(), z.coerce.number().nonnegative("validateNumberMsg")),
  assignerName: z.string().optional(),
});

interface Proptype {
  title: string;
  invoiceKey: "price" | "debit" | "assignerName" | "credit";
  customerId: string;
  orderId: string;
  type: string;
}
interface FormType {
  price?: number;
  credit?: number;
  debit?: number;
  assignerName?: string;
}

const InvoiceContent = ({
  type,
  title,
  invoiceKey,
  customerId,
  orderId,
}: Proptype) => {
  const [open, setOpen] = useState(false);
  const {orders, setOrders} = useOrderContext();
  const [value, setValue] = useState<string | number>("");
  const invoiceForm = useForm<FormType>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: async () => {
      const data = orders?.filter(
        (item: FabricData) => item._id === orderId
      )[0];
      setValue(data?.[invoiceKey]||0);
      return { [invoiceKey]: data?.[invoiceKey]||0};
    },
  });

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

  const addInvoiceContent = async (data: string | number | FormType) => {
    const {message, result, error} = await addOrderData(customerId, orderId, invoiceKey, data);
    if(error){
      toast.error(error?.toString());
    }
    if(result?.modifiedCount !== 0){
      toast.success(message);
      await fetchOrder();
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={`flex gap-2 p-2 rounded-md hover:cursour-pointer hover:bg-slate-100 place-content-center ${type === "Edit" && "text-cyan-700"}`}
      >
        {type === "Edit" ? <Edit2 size="17" /> : <Plus />} <span>{type} </span>
      </DialogTrigger>
      <DialogContent aria-describedby={orderId}>
        <DialogHeader>
          <DialogTitle className="border-b pb-1">
            {type} {title}
          </DialogTitle>
        </DialogHeader>
        <Form {...invoiceForm}>
          <form
            className="space-y-4"
            onSubmit={invoiceForm.handleSubmit((v) => addInvoiceContent(v))}
          >
            <FormField
              control={invoiceForm.control}
              name={invoiceKey}
              render={({ field }) => (
                <FormItem className="m-1">
                  <FormLabel>{title}</FormLabel>
                  <FormControl>
                    {title === "Assigner Name" ? (
                      <Input
                        placeholder={title}
                        {...field}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                      />
                    ) : (
                      <Input
                        type="number"
                        min={0}
                        placeholder={`${title} (INR)`}
                        {...field}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="sm:justify-between">
              <Button type="submit" onClick={() => addInvoiceContent(value)}>
                {invoiceForm.formState.isSubmitting ? "Submitting...." : "Submit"}
              </Button>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => invoiceForm.reset()}
                >
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceContent;
