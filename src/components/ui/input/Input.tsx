import ErrorDisplay from '@components/ErrorDisplay';
import { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  register?: Partial<UseFormRegisterReturn>;
  error?: string;
  type?: HTMLInputTypeAttribute;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  inputClassName?: string;
  placeholder?: string;
  containerClassName?: string;
}

const Input = ({
  name,
  label,
  register,
  error,
  type = 'text',
  leftIcon,
  rightIcon,
  inputClassName,
  placeholder,
  containerClassName,
  ...props
}: IInputProps) => {
  return (
    <div className={twMerge('flex w-full flex-col gap-2', containerClassName)}>
      {label && (
        <label htmlFor={name} className='body-small-regular text-gray600'>
          {label}
        </label>
      )}

      {rightIcon || leftIcon ? (
        <div
          className={twMerge(
            'body-small-regular border-gray100 text-gray900 placeholder:text-gray400 hover:border-gray200 focus:border-brand500 active:border-gray300 disabled:bg-gray50 disabled:placeholder:text-gray200 disabled:hover:border-gray100 rounded-lg border-[1px] bg-white p-[10px] outline-none disabled:cursor-not-allowed',
            error && 'border-red600',
            inputClassName
          )}
        >
          {leftIcon && leftIcon}

          <input
            id={name}
            type={type}
            {...register}
            {...props}
            aria-invalid={!!error}
            className={twMerge('w-full outline-none', inputClassName)}
            placeholder={placeholder ? placeholder : label}
            aria-autocomplete='none'
            autoComplete='off'
            onWheel={(e) => e.currentTarget.blur()}
          />

          {rightIcon && rightIcon}
        </div>
      ) : (
        <input
          id={name}
          type={type}
          {...register}
          {...props}
          aria-invalid={!!error}
          className={twMerge(
            'body-small-regular border-gray100 text-gray900 placeholder:text-gray400 hover:border-gray200 focus:border-brand500 active:border-gray300 disabled:bg-gray50 disabled:placeholder:text-gray200 disabled:hover:border-gray100 rounded-lg border-[1px] bg-white p-[10px] outline-none disabled:cursor-not-allowed',
            error && 'border-red600',
            inputClassName
          )}
          placeholder={placeholder ? placeholder : label}
          aria-autocomplete='none'
          autoComplete='off'
          onWheel={(e) => e.currentTarget.blur()}
        />
      )}
      {error && <ErrorDisplay error={error} />}
    </div>
  );
};

export default Input;
