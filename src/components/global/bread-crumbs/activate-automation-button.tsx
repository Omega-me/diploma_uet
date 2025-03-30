import { Button } from '@/components/ui/button';
import React from 'react';
import Loader from '../loader';
import { Zap, ZapOff } from 'lucide-react';
import AppTooltip from '../app-tooltip';

const ActivateAutomationButton = () => {
  // TODO: setup optimistic UI
  // TODO: Get some automation data
  return (
    <AppTooltip text="Activate automation">
      <Button className="lg:px-10 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3352cc] font-medium to-[#1c2d70]">
        <Loader state={false}>
          <Zap />
          {/* <ZapOff /> */}
          <p className="lg:inline hidden">Activate</p>
        </Loader>
      </Button>
    </AppTooltip>
  );
};

export default ActivateAutomationButton;
