import { Button } from '@/components/ui/button';
import React from 'react';
import Loader from '../loader';
import { Zap, ZapOff } from 'lucide-react';
import AppTooltip from '../app-tooltip';
import { useQueryAutomation } from '@/hooks/use-queries';
import { useActivateAutomation } from '@/hooks/use-mutations';

interface Props {
  id: string;
}

const ActivateAutomationButton = (props: Props) => {
  const { data: automation } = useQueryAutomation(props.id);
  const { mutate, isPending } = useActivateAutomation(props.id);

  return (
    <AppTooltip
      text={
        automation?.data?.active ? 'Disable Automation' : 'Activate automation'
      }>
      <Button
        onClick={() =>
          mutate({
            state: !automation?.data?.active,
          } as unknown as any)
        }
        className="lg:px-10 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3352cc] font-medium to-[#1c2d70]">
        <Loader state={isPending}>
          {automation?.data?.active ? <Zap /> : <ZapOff />}
          <p className="lg:inline hidden">
            {automation?.data?.active ? 'Disable' : 'Activate'}
          </p>
        </Loader>
      </Button>
    </AppTooltip>
  );
};

export default ActivateAutomationButton;
