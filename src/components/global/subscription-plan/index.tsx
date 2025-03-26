import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  type: 'FREE' | 'PRO';
}
const SubscriptionPlan = (props: Props) => {
  // TODO: return subscription of the user
  return props.children;
};

export default SubscriptionPlan;
