import { ButtonHTMLAttributes } from 'react';

import { twMerge } from 'tailwind-merge';
import {
  BUTTON_SIZE,
  BUTTON_SIZE_CLASSNAME,
  BUTTON_VARIANT,
  BUTTON_VARIANT_CLASSNAME,
} from '@components/ui/button/buttonStyles';

export interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: BUTTON_VARIANT;
  size?: BUTTON_SIZE;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  leftIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconClassName?: string;
}

const Button = ({
  children,
  variant = BUTTON_VARIANT.PRIMARY,
  size = BUTTON_SIZE.REGULAR,
  disabled,
  isLoading,
  className,
  icon: Icon,
  leftIcon: LeftIcon,
  iconClassName,
  ...rest
}: IProps) => {
  return (
    <button
      className={twMerge(
        'body-small-bold transitionColor flex items-center justify-center whitespace-nowrap rounded-lg outline-none focus:outline-none disabled:pointer-events-none disabled:cursor-none disabled:border-0 disabled:bg-gray200 disabled:text-gray400 disabled:transition-none',
        BUTTON_VARIANT_CLASSNAME[variant],
        BUTTON_SIZE_CLASSNAME[size],
        className
      )}
      disabled={disabled || isLoading}
      {...rest}
    >
      {LeftIcon && (
        <LeftIcon className={twMerge('size-[14px]', iconClassName)} />
      )}{' '}
      {children}
      {Icon && !LeftIcon && (
        <Icon className={twMerge('size-[14px]', iconClassName)} />
      )}
    </button>
  );
};

export default Button;
