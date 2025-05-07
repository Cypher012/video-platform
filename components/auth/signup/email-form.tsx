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
import { Checkbox } from '@/components/ui/checkbox';
import { useSignupStore } from '@/store/signup-store';
import { ErrorAlert } from '@/components/alert-modal';

interface EmailFormProps {
  closeEmailForm: (success: boolean) => void;
  closeModal: () => void;
}

export function EmailForm({ closeEmailForm, closeModal }: EmailFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | undefined>(undefined);
  const { setVerificationModal, verificationModal, setEmail, setPassword } = useSignupStore();


  const [isPending, setIsPending] = useState(false);
  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      isAdult: false,
      agreeTerms: false,
    },
  });

  const onSubmit = async (data: SignupInput) => {
    setIsPending(true);
    try {
      const { success, errorMessage } = await signUp(data);
      console.log("signup form", {success, errorMessage})
      if (success) {
        setEmail(data.email);
        setPassword(data.password);
        closeEmailForm(true);
        closeModal();
        setVerificationModal(true);
      } else {
        form.setError('email', {
          type: 'server',
          message: errorMessage,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  const errorPriority = ['email', 'password', 'name'] as const;

  useEffect(() => {
    const errors = form.formState.errors;

    for (const field of errorPriority) {
      const error = errors[field];
      if (error) {
        setLocalError(error.message);
        return;
      }
    }

    setLocalError(''); // No errors
  }, [form.formState.errors]);

  const disabled =
    !form.watch('agreeTerms') ||
    !form.watch('isAdult') ||
    !form.watch('name') ||
    isPending ||
    !form.watch('email') ||
    !form.watch('password');
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
        {localError && (
          <ErrorAlert message={localError} onClose={() => setLocalError('')} />
        )}
        {/* Display Name */}
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
            </FormItem>
          )}
        />
        {/* Email */}
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
            </FormItem>
          )}
        />

        {/* Password */}
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
            </FormItem>
          )}
        />

        {/* IsAdult */}
        <FormField
          control={form.control}
          name="isAdult"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
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
                id={'adult'}
                value={field.value ? 'true' : ''}
              />
            </FormItem>
          )}
        />
        {/* Agreed Terms */}
        <FormField
          control={form.control}
          name="agreeTerms"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
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
                id={'terms'}
                name="agreeTerms"
                value={field.value ? 'true' : ''}
              />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-rose-600 hover:bg-rose-700 text-white"
          disabled={disabled}
        >
          {isPending ? 'Creating account...' : 'Create account'}
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
