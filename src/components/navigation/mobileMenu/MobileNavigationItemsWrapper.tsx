'use client';

import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import Button from '@components/ui/button';
import { CloseIcon, HamburgerIcon } from '@shared/svgs';
import { removeAuthTokens } from '@shared/utils';
import { useRouter } from 'next/navigation';
import { ICollectionSidebarItem } from '../types';
import MobileMenuItem from './MobileMenuItem';

interface IProps {
  items: ICollectionSidebarItem[];
  segment: string | null;
}

const MobileNavigationItemsWrapper = ({ items, segment }: IProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleLogout = async () => {
    await removeAuthTokens();
    router.push('/login');
  };

  return (
    <div className='flex items-center bg-white'>
      <button
        aria-label='Menu'
        className='flex h-16 w-16 items-center justify-center'
        onClick={() => setIsOpen(true)}
      >
        <HamburgerIcon className='text-brand600' />
      </button>
      <div
        className={twMerge(
          'fixed top-0 z-20 h-screen w-screen overflow-y-auto bg-white transition-all duration-300',
          isOpen ? 'left-0' : 'left-full'
        )}
      >
        <div className='flex w-full justify-end shadow-md'>
          <div className='flex h-16 w-16 items-center justify-center'>
            <CloseIcon
              onClick={() => setIsOpen(false)}
              className='text-brand600 size-8'
            />
          </div>
        </div>
        <div className='mb-10 py-4'>
          {items.map((item) => (
            <MobileMenuItem
              key={item.label}
              segment={segment}
              menuItem={item}
              setIsOpen={setIsOpen}
            />
          ))}
        </div>
        <div className='fixed bottom-0 w-full px-2 pb-2'>
          <Button className='w-full' onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigationItemsWrapper;
