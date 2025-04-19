import { onIntegrate } from '@/actions/integrations';
import { onSubscribe } from '@/actions/user';
import { redirect } from 'next/navigation';
import React from 'react';

interface Props {
  searchParams: Promise<{
    code: string;
  }>;
}

const Page = async (props: Props) => {
  const { code } = await props.searchParams;

  if (code) {
    console.log(code);
    const user = await onIntegrate(code.split('#_')[0]);

    if (user.status === 200) {
      return redirect('/dashboard/integrations');
    }
  }

  return redirect('/sign-up');
};

export default Page;
