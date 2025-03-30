import { v4 as uuid } from 'uuid';
import { FaInstagram } from 'react-icons/fa';
import { LiaSalesforce } from 'react-icons/lia';

export interface IntegrationCardProps {
  id: string;
  title: string;
  descriptions: string;
  icon: React.ReactNode;
  strategy: 'INSTAGRAM' | 'CRM';
}

export const INTEGRATIONS_CARDS: IntegrationCardProps[] = [
  {
    id: uuid(),
    title: 'Connect Instagram',
    descriptions: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam voluptatem',
    icon: <FaInstagram color="#3352cc" size={35} />,
    strategy: 'INSTAGRAM',
  },
  {
    id: uuid(),
    title: 'Connect Salesforce',
    descriptions: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam voluptatem molestiae reiciendis',
    icon: <LiaSalesforce color="#3352cc" size={35} />,
    strategy: 'CRM',
  },
];
