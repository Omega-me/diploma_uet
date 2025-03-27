'use client';
import { PAGE_BREAD_CRUMBS } from '@/constants/pages';
import usePaths from '@/hooks/use-navs';
import React from 'react';
import AppSheet from '../app-sheet';
import { Menu } from 'lucide-react';
import SidebarContent from '../sidebar/sidebar-content';
import CreateAutomation from '../create-automation';
import Search from '../search';
import Notifications from '../notifications';
import MainBreadCrumb from '../main-bread-crumb';

interface Props {
  slug: string;
}
const Navbar = (props: Props) => {
  const { page } = usePaths();
  const currentPage = PAGE_BREAD_CRUMBS.includes(page) || page == props.slug;
  return (
    currentPage && (
      <div className="flex flex-col">
        <div className="flex gap-x-3 lg:gap-x-5 justify-end">
          <span className="lg:hidden flex items-center flex-0 gap-x-2">
            <AppSheet trigger={<Menu />} className="lg:hidden">
              <SidebarContent slug={props.slug} />
            </AppSheet>
          </span>
          <div className="flex justify-end gap-x-3 flex-1">
            <Search />
            <CreateAutomation />
            <Notifications />
          </div>
        </div>
        <MainBreadCrumb
          page={page === props.slug ? 'Home' : page}
          slug={props.slug}
        />
      </div>
    )
  );
};

export default Navbar;
