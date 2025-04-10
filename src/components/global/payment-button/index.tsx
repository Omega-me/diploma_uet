import { Button } from '@/components/ui/button';

interface Props {}
const PaymentButton = (props: Props) => {
  // TODO: get the subscription details
  //   TODO: Add loading state
  return (
    <Button className="bg-gradient-to-br text-white rounded-md from-[#9685db] via-[#9434e6] to-[#cc3bd4]  hover:bg-gradient-to-bl font-bold">
      Upgrade
    </Button>
  );
};

export default PaymentButton;
