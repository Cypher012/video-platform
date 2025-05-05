import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from './prisma';
import { nextCookies } from 'better-auth/next-js';
import { sendEmail } from './mail';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql', // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    requireEmailVerification: true, // block login until email is verified
  },
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  user: {
    additionalFields: {
      accountType: {
        type: 'string',
        required: true,
      },
    },
  },
  emailVerification: {
    sendOnSignUp: true, // auto-send email on sign up
    autoSignInAfterVerification: true, // auto sign-in after email is verified
    sendVerificationEmail: async ({ user, url, token }, req) => {
      await sendEmail({
        to: user.email,
        subject: 'Verify your email address',
        templateName: 'verification',
        variables: {
          VERIFICATION_LINK: url,
        },
      });
    },
  },

  plugins: [nextCookies()],
});
