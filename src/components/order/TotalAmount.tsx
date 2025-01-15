'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";  
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormEvent, useState } from "react";

const FormSchema = z.object({
  option: z.string({
    required_error: "Please select an Option to calculate total amount.",
  }),
});

interface Proptype{
  price: string,
  unit: {
    nag?:string,
    faad?:string,
    thaan?:string
  },
  // orderId:string, 
  // customerId:string
};
type CountType = 'nag' | 'faad' | 'thaan';

const TotalAmount = (props:Proptype) => {
  const {price, unit} = props;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [option, setOption] = useState<CountType>('thaan');

  const onSubmit=(data:FormEvent)=>{
    const value = (data.target as HTMLInputElement)?.value as CountType;
    console.log('submit', value);
    setOption(value);
  }

  return (
    <div>
      {/* <Form {...form}>
        <form onChange={onSubmit} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="option"
            render={({ field }) => (
              <FormItem>
                <Select key={orderId} onValueChange={field.onChange} defaultValue={field.value}>
                // <Select key={orderId} onValueChange={(value:CountType)=>setOption(value)} defaultValue={option}> 
                  <FormControl>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Options" className="text-slate-50" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="nag">Nag</SelectItem>
                    <SelectItem value="faad">Faad</SelectItem>
                    <SelectItem value="thaan">Thaan</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </form>
      </Form> */}
      <div className="mt-4">
        Amount : {Number(unit[option])*Number(price)}
      </div>
      <span className="text-xs text-slate-500">(According to Thaan)</span>
    </div>
  )
}

export default TotalAmount;