import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  trigger: React.ReactNode;
  className?: string;
}
const AppSheet = (props: Props) => {
  return (
    <Sheet>
      <SheetTrigger className={props.className}>{props.trigger}</SheetTrigger>
      <SheetContent side="left" className="p-0 w-[250px]">
        {props.children}
      </SheetContent>
    </Sheet>
  );
};

export default AppSheet;
