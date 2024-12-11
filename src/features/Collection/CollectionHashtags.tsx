import { useState } from 'react';
import HashTagButton from './HashTags/HashTagButton';

interface IProps {
  hashtags: string[];
  currentHashtags: string[];
  setCurrentHashtags: (hashtags: string[]) => void;
}

const CollectionHashtags = ({
  hashtags,
  currentHashtags,
  setCurrentHashtags,
}: IProps) => {
  const [isHashtagsSectionVisible, setIsHashtagsSectionVisible] =
    useState(true);

  const hashtagsWithoutHashtag = hashtags.map((hashtag) =>
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
    <div className='flex flex-col gap-2'>
      <button
        onClick={toggleHashtagsVisibility}
        style={{ cursor: 'pointer', marginBottom: '10px' }}
      >
        {isHashtagsSectionVisible
          ? 'Collapse All Hashtags'
          : 'Expand All Hashtags'}
      </button>
      <button
        onClick={() => collapseAllDropdowns()}
        className='text-turquoise800 bg-turquoise300 fixed right-2 top-2 h-fit w-fit cursor-pointer rounded-md p-4 text-start text-lg font-bold'
      >
        Collapse all hashtags
      </button>
      {isHashtagsSectionVisible && (
        <>
          <div className='flex flex-row gap-2'>
            <button
              onClick={() => setCurrentHashtags([])}
              className='text-turquoise800 bg-turquoise100 h-full w-fit cursor-pointer rounded-md p-4 text-start text-lg font-bold'
            >
              View all videos
            </button>
          </div>
          <div className='flex flex-col gap-2'>
            {Object.entries(sortedHashtags).map(([letter, tags]) => (
              <div key={letter} className='flex flex-col gap-2'>
                <strong
                  onClick={() => toggleSection(letter)}
                  className='text-turquoise800 bg-turquoise100 h-full w-full cursor-pointer rounded-md p-4 text-lg font-bold'
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
        </>
      )}
    </div>
  );
};

export default CollectionHashtags;
