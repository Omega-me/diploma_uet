import Navbar from '@/components/global/navbar';
import Sidebar from '@/components/global/sidebar';
import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  params: Promise<{ slug: string }>;
}

const Layout = async (props: Props) => {
  const { slug } = await props.params;
  // TODO: Query fetch tha client data
  return (
    <div className="p-3">
      <Sidebar slug={slug} />
      <div className="lg:ml-[250px] lg:pl-10 lg:py-5 flex flex-col overflow-auto">
        <Navbar slug={slug} />
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
