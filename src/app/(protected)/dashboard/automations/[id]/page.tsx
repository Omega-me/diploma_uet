import { onGetAutomationInfo } from '@/actions/automation';
import AutomationTrigger from '@/components/global/automation/automation-trigger';
import AutomationBreadCrumb from '@/components/global/bread-crumbs/automation-bread-crumb';
import { PrefetchUserAutomation } from '@/react-query/prefetch';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { CircleAlert } from 'lucide-react';
import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const info = await onGetAutomationInfo(id);
  return {
    title: info.data.name,
  };
}

const Page = async (props: Props) => {
  const { id } = await props.params;
  const query = new QueryClient();
  await PrefetchUserAutomation(query, id);

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="w-full flex flex-col items-center gap-y-2">
        <AutomationBreadCrumb id={id} />
        <div className="mt-5 w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1d1d1d] gap-y-3">
          <div className="flex gap-x-2">
            <CircleAlert color="#3352cc" />
            When...
          </div>
          <AutomationTrigger id={id} />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default Page;
