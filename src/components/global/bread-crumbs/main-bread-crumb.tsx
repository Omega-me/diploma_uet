import { PAGE_ICON } from '@/constants/pages';
import React from 'react';

interface Props {
  page: string;
  userName: string;
}

const MainBreadCrumb = (props: Props) => {
  return (
    <div className="flex flex-col items-start">
      {props.page === 'Home' && (
        <div className="flex justify-center w-full">
          <div className="radial--gradient w-4/12 py-5 lg:py-10 flex flex-col items-center">
            <p className="text-muted-foreground text-lg whitespace-nowrap">Welcome back</p>
            <h2 className="capitalize text-2xl lg:text-4xl whitespace-nowrap font-medium">{props.userName}!</h2>
          </div>
        </div>
      )}
      <span className="radial--gradient inline-flex py-5 lg:py-10 pr-16 gap-x-2 items-center">
        {PAGE_ICON[props.page.toUpperCase()]}
        <h2 className="font-semibold text-3xl capitalize">{props.page}</h2>
      </span>
    </div>
  );
};

export default MainBreadCrumb;
