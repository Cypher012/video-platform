'use server';

import { APIError, error } from 'better-auth/api';
import { auth } from '../auth/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { SignupInput, LoginInput } from '@/lib/validations/auth';

export interface State {
  success: boolean;
  errorMessage: string;
  validationErrors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    isAdult?: string[];
    agreeTerms?: string[];
  };
}

export async function signUp({
  name,
  email,
  password,
  isAdult,
  agreeTerms,
}: SignupInput) {
  console.log("signUp function called");
  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        accountType: 'client',
        onboarded: false,
      },
    });
    console.log({name, email, password})
  } catch (error) {
    if (error instanceof APIError) {
      console.log("Error signing up", error)
      switch (error.status) {
        case 'UNPROCESSABLE_ENTITY':
          return { errorMessage: 'User already exists', success: false };
        case 'BAD_REQUEST':
          return { errorMessage: 'User already exists', success: false };
        default:
          return { errorMessage: 'An unknown error occurred', success: false };
      }
    }
    console.error('Error signing up', error);
    return { errorMessage: 'An error occurred', success: false };
  }

  const verify =  await auth.api.sendVerificationOTP({
    body: {
      email: email,
      type: 'email-verification',
    },
  });


  return { success: true, errorMessage: '' };
}

export async function signIn({ email, password }: LoginInput) {
  console.log("function signIn called");
  try {
    const res = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    console.log("res:", res)
    console.log("user signed in, redirecting to dashboard");
    return { success: true, errorMessage: '' };
  } catch (error) {
    if (error instanceof APIError) {
      console.error('Error signing in', error);
      switch (error.status) {
        case 'UNAUTHORIZED':
          return { success: false, errorMessage: 'Invalid email or password' };
        case 'BAD_REQUEST':
          return { success: false, errorMessage: 'Invalid email or password' };
        default:
          return { success: false, errorMessage: 'An unknown error occurred' };
      }
    }
    return { success: false, errorMessage: 'An unknown error occurred' };
  }
}

export async function findUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
}

export async function verifyUserAccount({
  email,
  otp,
  password,
}: {
  email: string;
  otp: string;
  password: string;
}) {
      
  const verify = await auth.api.verifyEmailOTP({
    body: {
      email,
      otp,
    },
  });

  console.log("verify:", verify)

  if (verify.status === false) {
    return { errorMessage: 'Invalid OTP' };
  }

  const res = await auth.api.signInEmail({
    body: {
      email,
      password,
    },  
  });

 

  return { success: true, errorMessage: '' };
}
