import { twMerge } from 'tailwind-merge';

interface IProps {
  hashtag: string;
  onClick: () => void;
  selected: boolean;
}

const HashTagButton = ({ hashtag, onClick, selected }: IProps) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        'bg-turquoise100 text-turquoise800 rounded-md px-2 py-1',
        selected && 'bg-turquoise300'
      )}
    >
      {hashtag}
    </button>
  );
};

export default HashTagButton;
