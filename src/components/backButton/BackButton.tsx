import Button from '@components/ui/button';
import { BUTTON_VARIANT } from '@components/ui/button/buttonStyles';
import { ChevronLeftRoundedIcon } from '@shared/svgs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface IProps {
  href?: string;
}

const BackButton = ({ href }: IProps) => {
  const router = useRouter();
  return href ? (
    <Link href={href || ''} className='flex items-center gap-1'>
      <ChevronLeftRoundedIcon className='size-[14px] text-black' />
      <p className='body-small-bold text-black'>Back</p>
    </Link>
  ) : (
    <Button
      variant={BUTTON_VARIANT.LINK}
      className='flex w-fit items-center gap-1'
      onClick={() => router.back()}
    >
      <ChevronLeftRoundedIcon className='size-[14px] text-black' /> Back
    </Button>
  );
};

export default BackButton;
