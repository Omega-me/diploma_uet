'use client';

import { PAGE_BREAD_CRUMBS } from '@/constants/pages';
import usePaths from '@/hooks/use-navs';
import React from 'react';
import AppSheet from '../app-sheet';
import { Menu } from 'lucide-react';
import SidebarContent from '../sidebar/sidebar-content';
import CreateAutomation from '../automation/create-automation';
import Search from '../search';
import Notifications from '../notifications';
import MainBreadCrumb from '../bread-crumbs/main-bread-crumb';

interface Props {
  userName: string;
}

const Navbar = ({ userName }: Props) => {
  const { page } = usePaths();

  const isCurrentPage = PAGE_BREAD_CRUMBS.includes(page) || page === 'home';

  return (
    <div className="flex flex-col">
      <div className="flex gap-x-3 lg:gap-x-5 justify-start">
        <span className="lg:hidden flex items-center flex-0 gap-x-2">
          <AppSheet trigger={<Menu />} className="lg:hidden">
            <SidebarContent />
          </AppSheet>
        </span>
        {isCurrentPage ? (
          <div className="flex justify-end gap-x-3 flex-1">
            <Search />
            <CreateAutomation hideLabelOnSmallScreen />
            <Notifications />
          </div>
        ) : null}
      </div>
      {isCurrentPage && <MainBreadCrumb userName={userName} page={page === 'home' ? 'Home' : page} />}
    </div>
  );
};

export default Navbar;
