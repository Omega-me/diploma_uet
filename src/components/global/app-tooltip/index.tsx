import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  text: string;
}

const AppTooltip = (props: Props) => {
  return (
    <TooltipProvider delayDuration={1}>
      <Tooltip>
        <TooltipTrigger asChild>{props.children}</TooltipTrigger>
        <TooltipContent side="bottom" className="bg-muted text-white">
          <p>{props.text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AppTooltip;
