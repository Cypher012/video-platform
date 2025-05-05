'use server';

import { APIError } from 'better-auth/api';
import { auth } from '../auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { signupSchema } from '@/lib/validations/auth';

export interface State {
  success: boolean;
  errorMessage: string;
  validationErrors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    accountType?: string[];
    isAdult?: string[];
    agreeTerms?: string[];
  };
}

export async function signUp(prevState: State, formData: FormData) {
  const { name, email, password } = Object.fromEntries(formData) as unknown as {
    name: string;
    email: string;
    password: string;
  };

  const accountType = formData.get('accountType')?.toString();
  const isAdult = formData.get('isAdult') === 'true'; // checkbox
  const agreeTerms = formData.get('agreeTerms') === 'true'; // checkbox
  console.log({ name, email, password, accountType, isAdult, agreeTerms });

  const validatedFields = signupSchema.safeParse({
    name,
    email,
    password,
    accountType,
    isAdult,
    agreeTerms,
  });

  if (!validatedFields.success) {
    return {
      errorMessage: 'Validation failed',
      validationErrors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  try {
    if (!accountType) {
      return { errorMessage: 'Account type is required', success: false };
    }
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        accountType,
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      switch (error.status) {
        case 'UNPROCESSABLE_ENTITY':
          return { errorMessage: 'User already exists', success: false };
        case 'BAD_REQUEST':
          return { errorMessage: 'Invalid email or password', success: false };
        default:
          return { errorMessage: 'An unknown error occurred', success: false };
      }
    }
    console.error('Error signing up', error);
    return { errorMessage: 'An error occurred', success: false };
  }
  return { success: true, errorMessage: '' };
}

export async function signIn(prevState: State, formData: FormData) {
  const { email, password } = Object.fromEntries(formData) as {
    email: string;
    password: string;
  };

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      console.error('Error signing in', error);
      switch (error.status) {
        case 'UNAUTHORIZED':
          return { errorMessage: 'Invalid email or password' };
        case 'BAD_REQUEST':
          return { errorMessage: 'Invalid email or password' };
        default:
          return { errorMessage: 'An unknown error occurred' };
      }
    }
  }
  redirect('/dashboard');
}

export async function findUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
}
