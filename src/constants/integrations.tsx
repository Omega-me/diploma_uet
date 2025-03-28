import { FaInstagram } from 'react-icons/fa';
import { LiaSalesforce } from 'react-icons/lia';

interface Props {
  title: string;
  descriptions: string;
  icon: React.ReactNode;
  strategy: 'INSTAGRAM' | 'CRM';
}

export const INTEGRATIONS_CARDS: Props[] = [
  {
    title: 'Connect Instagram',
    descriptions: '',
    icon: <FaInstagram />,
    strategy: 'INSTAGRAM',
  },
  {
    title: 'Connect Salesforce',
    descriptions: '',
    icon: <LiaSalesforce />,
    strategy: 'CRM',
  },
];
