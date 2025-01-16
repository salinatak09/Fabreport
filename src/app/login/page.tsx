"use client";

import { Form, FormField, FormItem, FormControl, FormDescription, FormLabel, FormMessage } from '@/components/ui/form';
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast, Toaster } from 'sonner';
import { useRouter } from 'next/navigation';
import {signIn, useSession} from 'next-auth/react';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email({
    message: "Enter valid email!!",
  }),
  password: z.string().min(6, {
    message: "Password should be atleast 6 Characters!!"
  }).max(20, {
    message: "Password Can't be more than 20 characters!!"
  })
});

const Login = ()=>{
  const router = useRouter();
  const {data:session} = useSession();
  if(session){
    router.replace('/dashboard');
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    },
  });

  const onSubmit = async(values: z.infer<typeof formSchema>)=>{
    const { email, password } = values;
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password
    });

    if (res?.error) {
      toast.error("Invalid email or password", {
        description: res?.error
      });
    } else {
      router.push("/dashboard"); // Redirect to a protected page
      toast.success("Login Successful!");
    }
  }

  return (
    <div className='h-screen flex justify-center items-center'>
      <Toaster closeButton/>
      <Card className='w-[500px]'>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <Separator/>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 my-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input type='email' placeholder="Enter Email" {...field} />
                    </FormControl>
                    <FormDescription>
                      example: abc123@gmail.com
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )} 
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password *</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder="Enter Password" {...field} />
                    </FormControl>
                    <FormDescription>
                      Password should be minimum 6 characters and maximum 20 characters long
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )} 
              />
              <Button type="submit">Login</Button>
              <br /> <br />
              <Link href={'/register'} className='text-sm hover:text-blue-500'>Do not have an account? Register</Link>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login;