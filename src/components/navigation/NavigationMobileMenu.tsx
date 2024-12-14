import MobileNavigationItemsWrapper from './mobileMenu/MobileNavigationItemsWrapper';
import { ICollectionSidebarItem } from './types';

interface IProps {
  items: ICollectionSidebarItem[];
  segment: string | null;
}

const NavigationMobileMenu = ({ items, segment }: IProps) => {
  return (
    <div className='fixed top-0 z-20 flex h-16 w-full items-center justify-end bg-white shadow-md lg:hidden'>
      <MobileNavigationItemsWrapper items={items} segment={segment} />
    </div>
  );
};

export default NavigationMobileMenu;
