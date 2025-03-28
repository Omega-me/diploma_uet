import { Workflow, ContactRound, Blocks, Bolt, House } from 'lucide-react';

export const PAGE_BREAD_CRUMBS: string[] = [
  'contacts',
  'automations',
  'integrations',
  'settings',
];

type PageIcon = {
  [page in string]: React.ReactNode;
};

export const PAGE_ICON: PageIcon = {
  AUTOMATIONS: <Workflow color="#3352cc" size={30} />,
  CONTACTS: <ContactRound color="#3352cc" size={30} />,
  INTEGRATIONS: <Blocks color="#3352cc" size={30} />,
  SETTINGS: <Bolt color="#3352cc" size={30} />,
  HOME: <House color="#3352cc" size={30} />,
};
