import LayoutWrapper from '@components/layout/LayoutWrapper';

interface IProps {
  children: React.ReactNode;
}

const layout = ({ children }: IProps) => {
  return <LayoutWrapper>{children}</LayoutWrapper>;
};

export default layout;
