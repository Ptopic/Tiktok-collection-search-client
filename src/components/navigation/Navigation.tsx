'use client';

import useGetCurrentUser from '@api/auth/hooks/useGetCurrentUser';
import { useSelectedLayoutSegment } from 'next/navigation';
import NavigationMobileMenu from './NavigationMobileMenu';
import { getSidebarItems } from './constants';

const Navigation = () => {
  const segment = useSelectedLayoutSegment();

  const { data: user } = useGetCurrentUser();

  const navigationItems = getSidebarItems(user);

  return (
    <>
      <NavigationMobileMenu items={navigationItems} segment={segment} />
    </>
  );
};

export default Navigation;
