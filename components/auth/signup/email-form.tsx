'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useState,
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
} from 'react';
import { signupSchema, SignupInput } from '@/lib/validations/auth';
import { signUp } from '@/lib/actions/auth-action';
import type { State } from '@/lib/actions/auth-action';
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
import { Mail, User, Eye, EyeOff } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useSignupStore } from '@/store/signup-store';

interface EmailFormProps {
  closeEmailForm: (success: boolean) => void;
  closeModal: () => void;
}

export function EmailForm({ closeEmailForm, closeModal }: EmailFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { setVerificationModal, verificationModal, setEmail } =
    useSignupStore();
  const initialState: State = {
    errorMessage: '',
    validationErrors: {},
    success: false,
  };

  const [state, formAction, isPending] = useActionState(signUp, initialState);

  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      accountType: undefined,
      isAdult: false,
      agreeTerms: false,
    },
  });

  // Optional: Handle server error display (if returned from server action)
  useEffect(() => {
    console.log(state);
    if (state?.errorMessage) {
      form.setError('email', {
        type: 'server',
        message: state.errorMessage,
      });
    }
  }, [state, form]);

  useEffect(() => {
    console.log('verificationModal', verificationModal);
    if (state.success) {
      setEmail(form.getValues('email'));
      closeEmailForm(true);
      closeModal();
      setVerificationModal(true);
    }
  }, [state.success, closeEmailForm, setVerificationModal]);

  useEffect(() => {
    console.log('Dialog should open:', verificationModal);
  }, [verificationModal]);

  const disabled =
    !form.watch('agreeTerms') ||
    !form.watch('isAdult') ||
    isPending ||
    !form.watch('accountType') ||
    !form.watch('name') ||
    !form.watch('email') ||
    !form.watch('password');
  return (
    <Form {...form}>
      <form action={formAction} className="space-y-4 pt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <Label
                htmlFor="name"
                className="text-sm font-medium text-rose-100"
              >
                Display Name
              </Label>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-rose-500" />
                  <Input
                    id="name"
                    placeholder="HotUser69"
                    {...field}
                    className="pl-10 bg-rose-950/20 border-rose-500/30 text-white focus-visible:ring-rose-500 focus-visible:border-rose-500"
                  />
                </div>
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
              <Label
                htmlFor="email"
                className="text-sm font-medium text-rose-100"
              >
                Email
              </Label>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-rose-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    {...field}
                    className="pl-10 bg-rose-950/20 border-rose-500/30 text-white focus-visible:ring-rose-500 focus-visible:border-rose-500"
                  />
                </div>
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
              <Label
                htmlFor="password"
                className="text-sm font-medium text-rose-100"
              >
                Password
              </Label>
              <FormControl>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...field}
                    className="bg-rose-950/20 border-rose-500/30 text-white focus-visible:ring-rose-500 focus-visible:border-rose-500"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 text-rose-400 hover:text-rose-300"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {showPassword ? 'Hide password' : 'Show password'}
                    </span>
                  </Button>
                </div>
              </FormControl>
              <p className="text-xs text-rose-100/50">
                Password must be at least 8 characters with a number and special
                character
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accountType"
          render={({ field }) => (
            <FormItem>
              <Label
                htmlFor="accountType"
                className="text-sm font-medium text-rose-100"
              >
                Account Type
              </Label>
              <Input
                type="hidden"
                name="accountType"
                value={field.value ?? ''}
              />
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-rose-950/20 border-rose-500/30 text-white focus:ring-rose-500">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-black border border-rose-500/30">
                  <SelectItem value="client" className="text-rose-100">
                    Client - I want to book sessions
                  </SelectItem>
                  <SelectItem value="performer" className="text-rose-100">
                    Performer - I want to offer services
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isAdult"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                  className="mt-1 border-rose-500/30 data-[state=checked]:bg-rose-600 data-[state=checked]:border-rose-600"
                />
              </FormControl>
              <Label
                htmlFor="adult"
                className="text-sm font-normal text-rose-100"
              >
                I confirm that I am at least 18 years old
              </Label>
              <input
                type="hidden"
                name="isAdult"
                value={field.value ? 'true' : ''}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="agreeTerms"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                  className="mt-1 border-rose-500/30 data-[state=checked]:bg-rose-600 data-[state=checked]:border-rose-600"
                />
              </FormControl>
              <Label
                htmlFor="terms"
                className="text-sm font-normal text-rose-100"
              >
                I agree to the{' '}
                <Button
                  variant="link"
                  className="h-auto p-0 text-rose-500 hover:text-rose-400"
                  type="button"
                >
                  Terms of Service
                </Button>{' '}
                and{' '}
                <Button
                  variant="link"
                  className="h-auto p-0 text-rose-500 hover:text-rose-400"
                  type="button"
                >
                  Privacy Policy
                </Button>
              </Label>
              <input
                type="hidden"
                name="agreeTerms"
                value={field.value ? 'true' : ''}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-2.5 shadow-glow-sm"
          disabled={disabled}
        >
          {isPending ? 'Creating account...' : 'Create Account'}
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="w-full text-rose-400 hover:text-rose-300"
          onClick={() => closeEmailForm(false)}
        >
          Go Back
        </Button>
      </form>
    </Form>
  );
}
