'use client';
import { ChevronRight, Pencil } from 'lucide-react';
import React from 'react';
import ActivateAutomationButton from './activate-automation-button';
import { useRouter } from 'next/navigation';
import { useQueryAutomation } from '@/hooks/use-queries';
import { useEditAutomation } from '@/hooks/use-mutations';
import { Input } from '@/components/ui/input';
import AppTooltip from '../app-tooltip';

interface Props {
  id: string;
}

const AutomationBreadCrumb = (props: Props) => {
  const router = useRouter();
  const { data: automationInfo } = useQueryAutomation(props.id);

  const { edit, enableEdit, inputRef, handleUpdate, isPending, variables } = useEditAutomation(props.id);

  return (
    <div className="w-full mt-5 lg:mt-0 p-5 bg-[#18181b1a] rounded-xl border-[1px] flex justify-between items-center">
      <div className="flex justify-between items-center">
        <p onClick={router.back} className="text-[#bec0c5] cursor-pointer">
          Automation
        </p>
        <ChevronRight color="#9b9ca0" />
        <span className="flex justify-between items-center gap-x-2">
          {edit ? (
            <Input ref={inputRef} placeholder={isPending ? variables?.name : 'Add new name'} onBlur={handleUpdate} />
          ) : (
            <AppTooltip text="Double click to edit">
              <p onDoubleClick={enableEdit} className="text-[#9b9ca0] cursor-pointer">
                {variables?.name || automationInfo?.data.name}
              </p>
            </AppTooltip>
          )}
          {edit ? (
            <></>
          ) : (
            <span onClick={enableEdit} className="cursor-pointer hover:opacity-75 duration-100 transition">
              <Pencil color="#9b9ca0" size={15} />
            </span>
          )}
        </span>
      </div>
      <ActivateAutomationButton />
    </div>
  );
};

export default AutomationBreadCrumb;
