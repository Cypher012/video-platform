'use server';

import { APIError } from 'better-auth/api';
import { auth } from '../auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

interface State {
  errorMessage: string | null;
}

export async function signUp(prevState: State, formData: FormData) {
  const { name, email, password } = Object.fromEntries(formData) as {
    name: string;
    email: string;
    password: string;
  };

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      switch (error.status) {
        case 'UNPROCESSABLE_ENTITY':
          return { errorMessage: 'User already exists' };
        case 'BAD_REQUEST':
          return { errorMessage: 'Invalid email or password' };
        default:
          return { errorMessage: 'An unknown error occurred' };
      }
    }
    console.error('Error signing up', error);
  }
  redirect('/dashboard');
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
