import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icon';
import { Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function OAuthOptions({ onEmailClick }: { onEmailClick: () => void }) {
  return (
    <div className="space-y-4 pt-4">
      <Button
        variant="outline"
        className="w-full border border-rose-500/30 hover:bg-rose-950/30 hover:text-rose-500 text-gray-800 py-6"
        onClick={() => console.log('Google signup')}
      >
        <Icons.google className="mr-2 h-5 w-5" />
        Continue with Google
      </Button>

      <Button
        variant="outline"
        className="w-full border border-rose-500/30 hover:bg-rose-950/30 hover:text-rose-500 text-gray-800 py-6"
        onClick={() => console.log('Apple signup')}
      >
        <Icons.apple className="mr-2 h-5 w-5" />
        Continue with Apple
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="bg-rose-900/30" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-black px-2 text-rose-100/50">Or</span>
        </div>
      </div>

      <Button
        className="w-full bg-rose-950/30 hover:bg-rose-950/50 text-rose-100 border border-rose-500/30 py-6"
        onClick={onEmailClick}
      >
        <Mail className="mr-2 h-5 w-5 text-rose-500" />
        Sign up with Email
      </Button>

      <div className="text-center text-sm text-rose-100/70">
        By continuing, you confirm that you are at least 18 years old and agree
        to our{' '}
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
      </div>

      <div className="text-center text-sm text-rose-100">
        Already have an account?{' '}
        <Button
          variant="link"
          className="px-0 text-rose-500 hover:text-rose-400"
          type="button"
        >
          Login
        </Button>
      </div>
    </div>
  );
}
