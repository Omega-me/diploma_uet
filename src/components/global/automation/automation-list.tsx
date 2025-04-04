'use client';
import usePaths from '@/hooks/use-navs';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import GradientButton from '../gradient-button';
import { CircleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQueryAutomations } from '@/hooks/use-queries';
import CreateAutomation from './create-automation';
import moment from 'moment';

const AutomationList = () => {
  const { pathname } = usePaths();
  const { data: automations } = useQueryAutomations();

  // const { latestVariables } = useMutationDataState(['create-automation']);

  if (automations?.status !== 200 || automations?.data.length <= 0) {
    return (
      <div className="h-[70vh] flex justify-center items-center flex-col gap-y-3">
        <h3 className="text-lg text-gray-400">No Automations</h3>
        <CreateAutomation />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-3">
      {automations?.data?.map(automation => (
        <Link
          key={automation?.id}
          href={`${pathname}/${automation?.id}`}
          className="bg-[#1d1d1d] hover:opacity-80 hover:border-[#545454] transition duration-100 rounded-xl p-5 border-[1px] flex">
          <div className="flex flex-col flex-1 items-start">
            <h2 className="text-xl font-semibold">{automation?.name}</h2>
            <p className=" text-muted-foreground text-sm font-light  mb-2">
              This is from the comment
            </p>
            {/* TODO: Automate keywords*/}
            {automation?.keywords?.length > 0 ? (
              <div className="flex gap-x-2 flex-wrap mt-3">
                <div
                  className={cn(
                    'rounded-full px-4 py-1 capitalize border-2',
                    (0 + 1) % 2 === 0 && 'bg-green-500/15 border-green-700',
                    (0 + 2) % 2 === 0 && 'bg-purple-500/15 border-purple-700',
                    (0 + 3) % 2 === 0 && 'bg-yellow-500/15  border-yellow-700',
                    (0 + 4) % 2 === 0 && 'bg-red-500/15 border-red-700',
                  )}>
                  getstarted
                </div>
              </div>
            ) : (
              <div className="rounded-full border-2 mt-3 border-dashed border-white/60 px-3 py-1">
                <p className="text-sm text-[#bfc0c3]">No Keywords</p>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between">
            <p className="capitalize text-sm font-light text-[#9b9ca0]">
              {moment(automation?.updatedAt).format('MMM Do YY')}
            </p>

            {automation?.listener?.listener === 'SMARTAI' ? (
              <GradientButton
                type="BUTTON"
                className="w-full bg-muted text-white hover:bg-muted">
                <CircleAlert className="text-purple-500" />{' '}
                <span className="text-purple-500">Smart AI</span>
              </GradientButton>
            ) : (
              <Button className="bg-muted hover:bg-muted">
                <CircleAlert className="text-white" />{' '}
                <span className="text-white">Standard</span>
              </Button>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AutomationList;
