import { AlertTriangle } from '@shared/svgs';
import { twMerge } from 'tailwind-merge';

interface IProps {
  error: string;
  className?: string;
}

const ErrorDisplay = ({ error, className }: IProps) => {
  return (
    <div className={twMerge('flex items-center gap-2', className)}>
      <AlertTriangle className='text-red600 size-[14px]' />
      <span className='body-small-regular text-red600'>{error}</span>
    </div>
  );
};

export default ErrorDisplay;
