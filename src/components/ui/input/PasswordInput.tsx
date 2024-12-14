'use client';
import ErrorDisplay from '@components/ErrorDisplay';
import { EyeOffIcon, EyeOnIcon } from '@shared/svgs';
import { InputHTMLAttributes, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  register?: Partial<UseFormRegisterReturn>;
  error?: string;
  inputClassName?: string;
  topRightElement?: React.ReactNode;
}

const PasswordInput = ({
  name,
  label,
  register,
  error,
  inputClassName,
  topRightElement,
  ...props
}: IInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <div className='flex w-full flex-col gap-2'>
      {(label || topRightElement) && (
        <div className='flex items-center justify-between'>
          <label htmlFor={name} className='body-small-regular text-gray600'>
            {label}
          </label>
          {topRightElement && topRightElement}
        </div>
      )}

      <div
        className={twMerge(
          'body-small-regular border-gray100 text-gray900 placeholder:text-gray400 focus-within:border-brand500 hover:border-gray200 hover:focus-within:border-brand500 relative flex h-fit flex-col rounded-lg border-[1px] bg-white p-[10px] outline-none',
          error && 'border-red600',
          props.disabled &&
            'bg-gray50 placeholder:text-gray200 hover:border-gray100 cursor-not-allowed'
        )}
      >
        <div className='flex w-[90%] items-center justify-between'>
          <input
            {...register}
            {...props}
            id={name}
            type={isPasswordVisible ? 'text' : 'password'}
            aria-invalid={!!error}
            className={twMerge(
              'active:border-gray300 disabled:bg-gray50 disabled:placeholder:text-gray200 disabled:hover:border-gray100 w-full outline-none disabled:cursor-not-allowed',
              inputClassName
            )}
            placeholder={label || props.placeholder}
            aria-autocomplete='none'
            autoComplete='off'
          />
        </div>
        <div>
          <button
            type='button'
            className={twMerge(
              'absolute right-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer opacity-100',
              !isPasswordVisible &&
                'opacity-0 transition-all duration-300 ease-out'
            )}
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            aria-label='Show password'
          >
            <EyeOffIcon className='text-gray400 flex size-[14px] items-center justify-center' />
          </button>

          <button
            type='button'
            className={twMerge(
              'absolute right-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer opacity-100',
              isPasswordVisible &&
                'opacity-0 transition-all duration-300 ease-out'
            )}
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            aria-label='Hide password'
          >
            <EyeOnIcon className='text-gray400 flex size-[14px] items-center justify-center' />
          </button>
        </div>
      </div>
      {error && <ErrorDisplay error={error} />}
    </div>
  );
};

export default PasswordInput;
