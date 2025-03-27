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
  AUTOMATIONS: <Workflow />,
  CONTACTS: <ContactRound />,
  INTEGARTIONS: <Blocks />,
  SETTINGS: <Bolt />,
  HOME: <House />,
};
