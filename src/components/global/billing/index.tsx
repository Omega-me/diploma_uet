import React from 'react';
import PaymentCard from './payment-card';

const Billing = () => {
  // TODO: fetch billing info for the customer
  return (
    <>
      <div className="flex lg:flex-row flex-col gap-5 w-full lg:w-10/12 xl:w-8/12 container">
        <PaymentCard label={'FREE'} current={'PRO'} />
        <PaymentCard label={'PRO'} current={'PRO'} />
      </div>

      <br />
      <p>Pricing plan meant to be used on landing page </p>
      <br />
      <div className="flex lg:flex-row flex-col gap-5 w-full lg:w-10/12 xl:w-8/12 container">
        <PaymentCard landing label={'FREE'} current={'PRO'} />
        <PaymentCard landing label={'PRO'} current={'PRO'} />
      </div>
    </>
  );
};

export default Billing;
