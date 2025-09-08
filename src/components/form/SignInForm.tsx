'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have than 8 characters'),
});

const SignInForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn('credentials',{
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (signInData?.error){
      toast.error("Oops Something went wrong!!");
      console.log(signInData.error);
    } else {
      router.refresh();
      router.push('/admin');
      toast.success("Signed In successfully");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-pink-600'>Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder='mail@example.com' 
                    {...field} 
                    className='border-pink-400 focus:border-pink-500 focus:ring-pink-500'
                  />
                </FormControl>
                <FormMessage className='text-pink-600'/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-pink-600'>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Enter your password'
                    {...field}
                    className='border-pink-400 focus:border-pink-500 focus:ring-pink-500'
                  />
                </FormControl>
                <FormMessage className='text-pink-600'/>
              </FormItem>
            )}
          />
        </div>
        <Button className='w-full mt-6 bg-pink-500 hover:bg-pink-600 text-white' type='submit'>
          Sign in
        </Button>
      </form>
      <p className='text-center text-sm text-pink-600 mt-4'>
        If you don&apos;t have an account, please&nbsp;
        <Link className='text-pink-500 hover:underline' href='/sign-up'>
          Sign up
        </Link>
      </p>
    </Form>
  );
};

export default SignInForm;
