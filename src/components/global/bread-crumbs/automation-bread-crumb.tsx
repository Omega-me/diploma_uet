import { ChevronRight, Pencil } from 'lucide-react';
import React from 'react';
import ActivateAutomationButton from './activate-automation-button';

interface Props {
  id: string;
}

const AutomationBreadCrumb = (props: Props) => {
  // TODO: get the automations data
  // User mutation to update the automation
  return (
    <div className="w-full p-5 bg-[#18181b1a] flex justify-between items-center">
      <div className="flex justify-between items-center">
        <p className="text-[#9b9ca0]">Automation</p>
        <ChevronRight color="#9b9ca0" />
        <span className="flex justify-between items-center gap-x-2">
          <p className="text-[#9b9ca0]">Automation title</p>
          <span className="cursor-pointer hover:opacity-75 duration-100 transition">
            <Pencil color="#9b9ca0" size={15} />
          </span>
        </span>
      </div>
      <ActivateAutomationButton />
    </div>
  );
};

export default AutomationBreadCrumb;
