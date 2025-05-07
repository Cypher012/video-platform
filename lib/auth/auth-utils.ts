import { sendEmail } from "../mail";

export const sendOTPEmail = async ({ email, otp, type }: { email: string; otp: string; type: string }) => {
    console.log(
      `Sending OTP to ${email} with OTP: ${otp} for type: ${type}`
    );
  
    const subjectMap = {
      'sign-in': 'Sign in to your account',
      'email-verification': 'Verify your email address',
      'forget-password': 'Reset your password',
    };
  
    if (type === 'email-verification') {
      sendEmail({
        to: email,
        subject: subjectMap[type] || 'Your verification code',
        templateName: 'verification',
        variables: {
          VERIFICATION_CODE: otp,
        },
      });
    }
  
    if (type === 'forget-password') {
      sendEmail({
        to: email,
        subject: subjectMap[type],
        templateName: 'reset',
        variables: {
          VERIFICATION_CODE: otp,
        },
      });
    }
  };