"use client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast, Toaster } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useSession } from "next-auth/react";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email( {
    message: "Email must be Valid.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }).max(20, {
    message: "Password is too long!"
  }),
});

type FormData = z.infer<typeof FormSchema>;

export default function Register() {
  const {data:session} = useSession();
  const router = useRouter();
  if(session){
    router.replace('/dashboard');
  }
  
 const form = useForm({
   resolver: zodResolver(FormSchema),
   defaultValues: {
     name: "",
     email:"",
     password: "",
   },
 });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const {result, message, error} = await response.json();
      if(error) {
        toast.error(message);
      } else {
        router.push('/login');
        toast.success("Registration Successful", {
          description: `${result?.name} Registered Successful!`
        });
      }
    } catch (error: any) {
      console.error("Registration Failed:", error);
      toast.error("Registration Failed", {description: error?.toString() });
    }
  };

  return (
    <div className='h-screen flex justify-center items-center'>
      <Toaster closeButton/>
      <Card className='w-[500px]'>
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <Separator/>
        <CardContent>
          <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 my-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" {...field} type="password" />
                    </FormControl>
                    <FormDescription>
                      Password should be minimum 6 characters and maximum 20 characters long
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
              <br /> <br />
              <Link href={'/login'} className='text-sm hover:text-blue-500'>Already have an account? Login</Link>
            </form>
          </Form>
        </CardContent>
        </Card>
    </div>
  );
}