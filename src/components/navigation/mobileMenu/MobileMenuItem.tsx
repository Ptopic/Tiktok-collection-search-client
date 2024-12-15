import { Route } from 'next';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

import { twMerge } from 'tailwind-merge';
import { ICollectionSidebarItem } from '../types';

interface IProps {
  menuItem: ICollectionSidebarItem;
  segment: string | null;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  disabled?: boolean;
}

const MobileMenuItem = ({ menuItem, segment, setIsOpen, disabled }: IProps) => {
  const isLinkActive =
    (segment && menuItem.route.includes(segment)) ||
    (!segment && menuItem.route === '/');

  return (
    <Link
      className={twMerge(
        'text-gray500 hover:bg-gray50 group flex h-full cursor-pointer items-center gap-3 px-4 font-medium transition-all duration-300 ease-in-out',
        isLinkActive && 'bg-brand50 text-brand600 hover:bg-brand50',
        disabled && 'text-gray-500 pointer-events-none'
      )}
      href={menuItem.route as Route}
      onClick={() => setIsOpen(false)}
    >
      {menuItem.icon && (
        <div className={twMerge('size-4', isLinkActive && 'text-brand600')}>
          {menuItem.icon}
        </div>
      )}
      <p
        className={twMerge(
          'whitespace-nowrap py-2 text-lg',
          isLinkActive && 'text-brand600'
        )}
      >
        {menuItem.label}
      </p>
    </Link>
  );
};

export default MobileMenuItem;
