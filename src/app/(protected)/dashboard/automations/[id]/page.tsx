import AutomationTrigger from '@/components/global/automation/automation-trigger';
import AutomationBreadCrumb from '@/components/global/bread-crumbs/automation-bread-crumb';
import { CircleAlert } from 'lucide-react';
import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  params: Promise<{ id: string }>;
}

// TODO: set some metadata
const Page = async (props: Props) => {
  const { id } = await props.params;
  // TODO: prefetch user automations data
  return (
    <div className="w-full flex flex-col items-center gap-y-2">
      <AutomationBreadCrumb id={id} />
      <div className="w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1d1d1d] gap-y-3">
        <div className="flex gap-x-2">
          <CircleAlert color="#3352cc" />
          When...
        </div>
        <AutomationTrigger id={id} />
      </div>
    </div>
  );
};

export default Page;
