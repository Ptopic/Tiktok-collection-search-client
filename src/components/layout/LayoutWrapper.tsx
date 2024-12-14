import Navigation from '@components/navigation/Navigation';

interface IProps {
  children: React.ReactNode;
}

const LayoutWrapper = ({ children }: IProps) => {
  return (
    <div className='bg-gray25 relative flex h-dvh w-full flex-col'>
      <Navigation />
      <div className='mt-16 flex-1'>{children}</div>
    </div>
  );
};

export default LayoutWrapper;
