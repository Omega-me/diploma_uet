import { SIDEBAR_MENU } from '@/constants/menu';
import usePaths from '@/hooks/use-navs';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

const Items = () => {
  const { page } = usePaths();

  return SIDEBAR_MENU.map((item) => {
    const isActive = page === item.label;

    return (
      <Link
        key={item.id}
        href={`/dashboard/${item.label === 'home' ? '' : item.label}`}
        className={cn(
          'capitalize flex mb-2 gap-x-2 rounded-full p-3 transition-colors duration-300 ease-in-out',
          isActive ? 'bg-[#1f1f1f] text-white' : 'text-[#9B9CA0] hover:bg-[#0f0f0f] hover:text-white'
        )}
      >
        {item.icon}
        {item.label}
      </Link>
    );
  });
};

export default Items;
