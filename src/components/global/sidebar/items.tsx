import { SIDEBAR_MENU } from '@/constants/menu';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

interface Props {
  page: string;
  slug: string;
}

const Items = (props: Props) => {
  return SIDEBAR_MENU.map(item => (
    <Link
      key={item.id}
      href={`/dashboard/${props.slug}/${
        item.label === 'home' ? '/' : item.label
      }`}
      className={cn(
        'capitalize flex gap-x-2 rounded-full p-3',
        props.page === item.label && 'bg-[#0f0f0f0]',
        props.page === props.slug && item.label === 'home'
          ? 'bg-[#0f0f0f]'
          : 'text-[#9B9CA0]',
      )}>
      {item.icon}
      {item.label}
    </Link>
  ));
};

export default Items;
