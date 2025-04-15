'use client';
import { Separator } from '@/components/ui/separator';
import { useQueryAutomation } from '@/hooks/use-queries';
import { CircleAlert } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface Props {
  id: string;
}

const PostNode = (props: Props) => {
  const { data: automation } = useQueryAutomation(props.id);
  return (
    automation?.data &&
    automation?.data?.posts?.length > 0 && (
      <div className="w-10/12 lg:w-8/12 relative xl:w-4/12 rounded-xl flex flex-col bg-[#1d1d1d] gap-y-3">
        <div className="absolute h-20 left-1/2 bottom-full flex flex-col items-center z-50">
          {/* TODO: work on connector styling */}
          <span className="h-[9px] w-[9px] bg-white rounded-full"></span>
          <Separator
            orientation="vertical"
            className="bottom-full flex-1 border-[1px] border-white"
          />
          <span className="h-[9px] w-[9px] bg-white rounded-full"></span>
        </div>
        <div className="flex gap-x-2">
          <CircleAlert />
          If they comment on...
        </div>
        <div className="bg-muted-foreground p-3 rounded-xl flex flex-col gap-y-2">
          <div className="flex gap-x-2 items-center">
            {/* TODO: Replace with instagram icon */}
            <CircleAlert />
            <p className="font-bold text-lg">These posts</p>
          </div>
          <div className="flex gap-x-2 flex-wrap mt-3">
            {automation?.data?.posts?.map(post => (
              <div
                key={post.id}
                className="relative w-4/12 aspect-square rounded-lg cursor-pointer overflow-hidden">
                <Image fill sizes="100vw" src={post.media} alt="image" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default PostNode;
