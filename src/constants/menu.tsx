import { Blocks, Bolt, House, Workflow } from 'lucide-react';
import { v4 as uuid } from 'uuid';

interface FieldProps {
  label: string;
  id: string;
}

interface SidebarProps extends FieldProps {
  icon: React.ReactNode;
}
export const SIDEBAR_MENU: SidebarProps[] = [
  {
    id: uuid(),
    label: 'home',
    icon: <House />,
  },
  {
    id: uuid(),
    label: 'automations',
    icon: <Workflow />,
  },
  {
    id: uuid(),
    label: 'integrations',
    icon: <Blocks />,
  },
  {
    id: uuid(),
    label: 'settings',
    icon: <Bolt />,
  },
];
