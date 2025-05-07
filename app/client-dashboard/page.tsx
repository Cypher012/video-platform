import { auth } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });


  if (!session) {
    return redirect('/');
  }
  if (session.user.accountType === 'client' && !session.user.onboarded) {
    return redirect('/onboarding/client');
  }

  return <div>Welcome to dashboard</div>;
}
