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
import { useRouter } from 'next/navigation';
import { toast } from "sonner";

const FormSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password
      })
    });

    const data = await response.json();

    if (response.ok) {
      router.push('/sign-in');
      toast.success("Signed Up Successfully 🎉");
    } else {
      toast.error( data.error || "Oops! Something went wrong.");
      console.error('Registration failed');

          if (data.error?.toLowerCase().includes("email")) {
      form.setError("email", { message: data.error });
    }
    if (data.error?.toLowerCase().includes("username")) {
      form.setError("username", { message: data.error });
    }
    }
  };


  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="w-full space-y-4 bg-pink-50 p-6 rounded-xl shadow-md"
      >
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-pink-700">Username</FormLabel>
                <FormControl>
                  <Input className="border-pink-300 focus:border-pink-500 focus:ring-pink-500" placeholder="johndoe" {...field} />
                </FormControl>
                <FormMessage className="text-pink-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-pink-700">Email</FormLabel>
                <FormControl>
                  <Input className="border-pink-300 focus:border-pink-500 focus:ring-pink-500" placeholder="mail@example.com" {...field} />
                </FormControl>
                <FormMessage className="text-pink-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-pink-700">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    className="border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-pink-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-pink-700">Re-enter Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Re-enter your password"
                    type="password"
                    className="border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-pink-600" />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white" type="submit">
          Sign up
        </Button>
      </form>
      <p className="text-center text-sm text-pink-700 mt-3">
        Already have an account?&nbsp;
        <Link className="text-pink-600 hover:underline" href="/sign-in">
          Sign in
        </Link>
      </p>
    </Form>
  );
};

export default SignUpForm;
