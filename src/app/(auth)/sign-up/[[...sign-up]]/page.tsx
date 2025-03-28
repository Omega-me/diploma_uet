import { SignUp } from '@clerk/nextjs';
import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Page() {
  // Manually redirecting to dashboard if user is already signed in
  // This is a workaround for the issue with the SignIn component not redirecting properly
  const { userId } = await auth();
  if (userId) return redirect('/dashboard');
  return <SignUp />;
}
