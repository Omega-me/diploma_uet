import { onBoardUser } from '@/actions/user';
import Navbar from '@/components/global/navbar';
import Sidebar from '@/components/global/sidebar';
import React, { PropsWithChildren } from 'react';
import { redirect } from 'next/navigation';

interface Props extends PropsWithChildren {}

const Layout = async (props: Props) => {
  const user = (await onBoardUser()) as {
    status: number;
    data: {
      firstname?: string;
      lastname?: string;
    };
  };

  if (user.status === 500) return redirect('/sign-in');

  const userName = `${user.data?.firstname} ${user.data?.lastname}`;
  return (
    <div className="p-3">
      <Sidebar />
      <div className="lg:ml-[250px] lg:pl-10 lg:py-5 flex flex-col overflow-auto">
        <Navbar userName={userName} />
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
