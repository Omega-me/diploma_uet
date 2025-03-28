import { Button } from '@/components/ui/button';
import React from 'react';
import Loader from '../loader';
import { CirclePlus, Workflow } from 'lucide-react';

const CreateAutomation = () => {
  // TODO: create the automations in the db using mutate
  return (
    <Button className="lg:px-10 py-6 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3352cc] font-medium to-[#1c2d70]">
      <Loader state={false}>
        <Workflow />
        <p className="lg:inline hidden">Create automation</p>
      </Loader>
    </Button>
  );
};

export default CreateAutomation;
