// components/signup/EmailForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { signupSchema, SignupInput } from '@/lib/validations/auth';
import { useState, Dispatch, SetStateAction } from 'react';

interface EmailFormProps {
  setVerificationSent: Dispatch<SetStateAction<boolean>>;
  closeEmailForm: () => void;
}

export function EmailForm({
  setVerificationSent,
  closeEmailForm,
}: EmailFormProps) {
  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: SignupInput) => {
    setLoading(true);
    try {
      // TODO: handle signup logic (API call, etc.)
      console.log('Signup data:', data);
    } catch (error) {
      console.error('Signup error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="name">Name</Label>
              <FormControl>
                <Input id="name" placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="email">Email</Label>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="password">Password</Label>
              <FormControl>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Signing up...' : 'Create account'}
        </Button>
      </form>
    </Form>
  );
}
