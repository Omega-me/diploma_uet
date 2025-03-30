'use client';
import LogoSmall from '@/svgs/logo-small';
import React from 'react';
import Items from './items';
import { Separator } from '@/components/ui/separator';
import ClerkAuthState from '../clerk-auth-state';
import { BadgeHelp } from 'lucide-react';
import SubscriptionPlan from '../subscription-plan';
import UpgardeCard from './upgarde-card';

const SidebarContent = () => {
  return (
    <>
      <div className="flex flex-col gap-y-5 w-full h-full p-3 bg-[#0e0e0e] bg-opacity-90 bg-clip-padding backdrop-filter backdrop-blur-3xl">
        <div className="flex gap-x-2 items-center justify-center">
          <LogoSmall />
        </div>

        <div className="flex flex-col py-3">
          <Items />
        </div>
        <div className="px-16 flex justify-center">
          <Separator orientation="horizontal" className="bg-[#333336] w-40" />
        </div>
        <div className="px-3 flex flex-col gap-y-5">
          <div className="flex items-center gap-x-2">
            <ClerkAuthState />
            <p className="text-[#9b9ca0]">Profile</p>
          </div>
          <div className="flex gap-x-3">
            <BadgeHelp className="text-[#9b9ca0]" />
            <p className="text-[#9b9ca0]">Help</p>
          </div>
        </div>
        <SubscriptionPlan type="FREE">
          <div className="flex flex-1 flex-col justify-end">
            <UpgardeCard />
          </div>
        </SubscriptionPlan>
      </div>
    </>
  );
};

export default SidebarContent;
