'use client';
import { Separator } from '@/components/ui/separator';
import { useQueryAutomation } from '@/hooks/use-queries';
import { CircleAlert } from 'lucide-react';
import { Warning } from 'postcss';
import React from 'react';

interface Props {
  id: string;
}
const ThenNode = (props: Props) => {
  const { data: automation } = useQueryAutomation(props.id);
  const commentTrigger = automation?.data?.triggers.find((t) => t.type === 'COMMENT');

  return !automation?.data?.listener ? (
    <></>
  ) : (
    <>
      <div className="flex flex-col justify-between items-center relative !-top-3 m-0">
        <span className="w-2 h-2 rounded-full bg-muted"></span>
        <Separator orientation="vertical" className="h-20 m-0" />
        <span className="w-2 h-2 rounded-full bg-muted"></span>
      </div>
      <div className="-mt-6 w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1d1d1d] gap-y-3">
        <div className="flex gap-x-2">
          <CircleAlert color="#3352cc" />
          Then...
        </div>
      </div>
    </>
  );
};

export default ThenNode;
