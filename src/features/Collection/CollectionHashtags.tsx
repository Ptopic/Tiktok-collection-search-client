import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import HashTagButton from './HashTags/HashTagButton';

interface IProps {
  hashtags: string[];
  currentHashtags: string[];
  setCurrentHashtags: (hashtags: string[]) => void;
}

const CollectionHashtags = ({
  hashtags = [],
  currentHashtags,
  setCurrentHashtags,
}: IProps) => {
  const [isHashtagsSectionVisible, setIsHashtagsSectionVisible] =
    useState(true);

  const hashtagsWithoutHashtag = hashtags?.map((hashtag) =>
    hashtag.replace('#', '')
  );

  const groupedHashtags = hashtagsWithoutHashtag.reduce(
    (acc, hashtag) => {
      const firstLetter = hashtag[0].toLowerCase();

      if (!isNaN(Number(firstLetter))) {
        return acc;
      }

      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push('#' + hashtag);
      return acc;
    },
    {} as Record<string, string[]>
  );

  const sortedHashtags = Object.keys(groupedHashtags)
    .sort()
    .reduce(
      (obj, key) => {
        obj[key] = groupedHashtags[key].sort((a, b) => a.localeCompare(b));
        return obj;
      },
      {} as Record<string, string[]>
    );

  const [collapsedSections, setCollapsedSections] = useState<
    Record<string, boolean>
  >(
    Object.keys(sortedHashtags).reduce(
      (acc, letter) => {
        acc[letter] = true;
        return acc;
      },
      {} as Record<string, boolean>
    )
  );

  const collapseAllDropdowns = () => {
    setCollapsedSections(
      Object.keys(sortedHashtags).reduce(
        (acc, letter) => {
          acc[letter] = true;
          return acc;
        },
        {} as Record<string, boolean>
      )
    );
  };

  const toggleHashtagsVisibility = () => {
    if (isHashtagsSectionVisible) {
      collapseAllDropdowns();
    }

    setIsHashtagsSectionVisible(!isHashtagsSectionVisible);
  };

  const toggleSection = (letter: string) => {
    setCollapsedSections((prevState) => ({
      ...prevState,
      [letter]: !prevState[letter],
    }));
  };

  const selectHashtag = (hashtag: string) => {
    if (currentHashtags.includes(hashtag)) {
      setCurrentHashtags(currentHashtags.filter((h) => h !== hashtag));
    } else {
      setCurrentHashtags([...currentHashtags, hashtag]);
    }
    // setIsHashtagsSectionVisible(false);
  };

  const hideAllHashtags = () => {
    setIsHashtagsSectionVisible(false);
  };

  return (
    <div
      className={twMerge(
        'flex w-full bg-white',
        isHashtagsSectionVisible ? 'h-[calc(100vh-60px)]' : 'h-[56px]'
      )}
    >
      <div className='relative flex h-full w-full flex-col gap-2 overflow-y-auto bg-white px-4'>
        <div className='sticky top-0 z-10 flex flex-col gap-2 bg-white pb-2'>
          <button
            onClick={toggleHashtagsVisibility}
            className='rounded-md bg-turquoise100 p-4 font-bold text-turquoise800'
          >
            {isHashtagsSectionVisible
              ? 'Collapse All Hashtags'
              : 'Expand All Hashtags'}
          </button>

          {isHashtagsSectionVisible && (
            <div className='flex flex-row items-center justify-center gap-2'>
              <button
                onClick={() => setCurrentHashtags([])}
                className='h-full w-fit cursor-pointer rounded-md bg-turquoise100 p-4 text-start text-lg font-bold text-turquoise800'
              >
                Clear selected hashtags
              </button>

              <button
                onClick={() => collapseAllDropdowns()}
                className='h-full w-fit cursor-pointer rounded-md bg-turquoise100 p-4 text-start text-lg font-bold text-turquoise800'
              >
                Collapse open dropdowns
              </button>
            </div>
          )}
        </div>

        {isHashtagsSectionVisible && (
          <div className='flex flex-col gap-2 pb-20'>
            {Object.entries(sortedHashtags).map(([letter, tags]) => (
              <div key={letter} className='flex flex-col gap-2'>
                <strong
                  onClick={() => toggleSection(letter)}
                  className='cursor-pointer rounded-md bg-turquoise100 p-4 text-lg font-bold text-turquoise800'
                >
                  {letter.toUpperCase()}:
                </strong>
                {!collapsedSections[letter] && (
                  <div className='flex flex-wrap gap-2'>
                    {tags.map((tag) => (
                      <HashTagButton
                        key={tag}
                        hashtag={tag}
                        onClick={() => selectHashtag(tag)}
                        selected={currentHashtags.includes(tag)}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionHashtags;
