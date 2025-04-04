import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import React from 'react';
import AppTooltip from '../app-tooltip';

const Notifications = () => {
  return (
    <AppTooltip text="Notifications">
      <Button className="bg-white rounded-full py-6">
        <Bell color="#3352cc" fill="#3352cc" />
      </Button>
    </AppTooltip>
  );
};

export default Notifications;
