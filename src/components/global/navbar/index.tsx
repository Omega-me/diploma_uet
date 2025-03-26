'use client';
import { PAGE_BREAD_CRUMBS } from '@/constants/pages';
import usePaths from '@/hooks/use-navs';
import React from 'react';
import AppSheet from '../app-sheet';
import { Menu } from 'lucide-react';
import SidebarContent from '../sidebar/sidebar-content';

interface Props {
  slug: string;
}
const Navbar = (props: Props) => {
  const { page } = usePaths();
  const currentPage = PAGE_BREAD_CRUMBS.includes(page) || page == props.slug;
  return (
    currentPage && (
      <div className="flex flex-col">
        <div className="flex gap-c-3 lg:gap-x-5 justify-end">
          <span className="lg:hidden flex items-center flex-1 gap-x-2">
            <AppSheet trigger={<Menu />} className="lg:hidden">
              <SidebarContent slug={props.slug} />
            </AppSheet>
          </span>
        </div>
      </div>
    )
  );
};

export default Navbar;
