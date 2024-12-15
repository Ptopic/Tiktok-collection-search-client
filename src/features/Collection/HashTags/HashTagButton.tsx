import { twMerge } from 'tailwind-merge';

interface IProps {
  hashtag: string;
  onClick: () => void;
  selected: boolean;
}

const HashTagButton = ({ hashtag, onClick, selected }: IProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={twMerge(
        'rounded-md bg-turquoise100 px-2 py-1 text-turquoise800',
        selected && 'bg-turquoise300'
      )}
    >
      {hashtag}
    </button>
  );
};

export default HashTagButton;
