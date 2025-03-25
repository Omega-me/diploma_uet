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
    </div>
  );
};

export default Layout;
