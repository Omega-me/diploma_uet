import { SignInButton, UserButton } from '@clerk/nextjs';
import React from 'react';

const Page = async () => {
  // TODO: server action onBoard user
  return (
    <div>
      <SignInButton>
        <UserButton />
      </SignInButton>
    </div>
  );
};

export default Page;
