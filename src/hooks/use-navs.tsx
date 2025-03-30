import { usePathname } from 'next/navigation';

export const usePaths = () => {
  const pathname = usePathname();
  const path = pathname.split('/');
  let page = 'home';
  if (path.length > 2) {
    page = path[path.length - 1];
  }
  return { page, path, pathname };
};

export default usePaths;
