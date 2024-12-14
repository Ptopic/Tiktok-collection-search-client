import { ButtonHTMLAttributes } from 'react';

import { twMerge } from 'tailwind-merge';
import {
  BUTTON_SIZE,
  BUTTON_SIZE_CLASSNAME,
  BUTTON_VARIANT,
  BUTTON_VARIANT_CLASSNAME,
} from '@components/ui/button/buttonStyles';
import Link from 'next/link';

export interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href: string;
  size?: BUTTON_SIZE;
  disabled?: boolean;
  className?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  leftIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconClassName?: string;
}

const ButtonLink = ({
  href,
  children,
  size = BUTTON_SIZE.BIG,
  className,
  icon: Icon,
  leftIcon: LeftIcon,
  iconClassName,
}: IProps) => {
  return (
    <Link
      href={href}
      className={twMerge(
        'body-small-bold transitionColor flex items-center justify-center whitespace-nowrap rounded-lg outline-none focus:outline-none disabled:pointer-events-none disabled:cursor-none disabled:transition-none',
        BUTTON_VARIANT_CLASSNAME[BUTTON_VARIANT.LINK],
        BUTTON_SIZE_CLASSNAME[size],
        className
      )}
    >
      {LeftIcon && (
        <LeftIcon className={twMerge('mr-2 size-[14px]', iconClassName)} />
      )}{' '}
      {children}
      {Icon && !LeftIcon && (
        <Icon className={twMerge('size-[14px]', iconClassName)} />
      )}
    </Link>
  );
};

export default ButtonLink;
