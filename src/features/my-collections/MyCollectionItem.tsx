import useDeleteCollection from '@api/scraper/hooks/useDeleteCollection';
import Button from '@components/ui/button';
import { BUTTON_VARIANT } from '@components/ui/button/buttonStyles';
import { formatDate } from '@shared/utils/date';
import Link from 'next/link';

interface IProps {
  id: string;
  name: string;
  createdAt: string;
}

const MyCollectionItem = ({ id, name, createdAt }: IProps) => {
  const { mutate: deleteCollection } = useDeleteCollection();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    deleteCollection(id);
  };

  return (
    <Link
      href={`/collection/${id}`}
      className='border-gray-200 relative z-10 flex flex-col justify-between gap-2 rounded-lg border p-4 md:flex-row'
    >
      <div>
        <p className='text-lg font-bold'>{name}</p>
        <p className='text-gray-500 text-sm'>
          Created at: {formatDate(createdAt)}
        </p>
      </div>
      <Button
        variant={BUTTON_VARIANT.DESTRUCTIVE}
        onClick={handleDelete}
        className='relative z-50 cursor-pointer'
      >
        Delete
      </Button>
    </Link>
  );
};

export default MyCollectionItem;
