'use client';

import useGetCollectionHashtags from '@api/scraper/hooks/useGetCollectionHashtags';
import useGetCollectionVideos from '@api/scraper/hooks/useGetCollectionVideos';
import { useState } from 'react';
import CollectionHashtags from './CollectionHashtags';
import CollectionVideos from './CollectionVideos';

interface IProps {
  id: number;
}

const CollectionDetailsPage = ({ id }: IProps) => {
  const [currentHashtags, setCurrentHashtags] = useState<string[]>([]);

  const collectionId = id.toString();
  const { data: collectionHashtags, isLoading: isHashtagsLoading } =
    useGetCollectionHashtags(collectionId);
  const { data: collectionVideos, isLoading: isLoadingVideos } =
    useGetCollectionVideos(
      collectionId,
      currentHashtags ? currentHashtags : []
    );

  return (
    <div className='flex flex-col gap-4 lg:px-20 lg:py-10'>
      <div className='flex flex-col px-4 pt-4'>
        <h1 className='text-2xl font-bold text-black'>Collection Title:</h1>
        <p className='text-lg text-black'>
          Total videos:{' '}
          <span className='text-xl font-bold text-black'>
            {collectionVideos?.total}
          </span>
        </p>
      </div>
      {collectionHashtags && (
        <CollectionHashtags
          hashtags={collectionHashtags}
          currentHashtags={currentHashtags || []}
          setCurrentHashtags={setCurrentHashtags}
        />
      )}
      {collectionVideos && (
        <CollectionVideos videos={collectionVideos.videos} />
      )}
    </div>
  );
};

export default CollectionDetailsPage;
