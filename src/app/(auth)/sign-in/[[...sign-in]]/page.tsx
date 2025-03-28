import { SignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

export default async function Page() {
  // Manually redirecting to dashboard if user is already signed in
  // This is a workaround for the issue with the SignIn component not redirecting properly
  const { userId } = await auth();
  if (userId) return redirect('/dashboard');
  return <SignIn />;
}
