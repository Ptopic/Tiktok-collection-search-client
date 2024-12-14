'use client';

import useGetCollectionById from '@api/scraper/hooks/useGetCollectionById';
import useGetCollectionHashtags from '@api/scraper/hooks/useGetCollectionHashtags';
import useGetCollectionVideos from '@api/scraper/hooks/useGetCollectionVideos';
import BackButton from '@components/backButton';
import { useState } from 'react';
import CollectionHashtags from './CollectionHashtags';
import CollectionVideos from './CollectionVideos';

interface IProps {
  id: number;
}

const CollectionDetailsPage = ({ id }: IProps) => {
  const [currentHashtags, setCurrentHashtags] = useState<string[]>([]);

  const collectionId = id.toString();
  const { data: collectionDetails, isLoading: isCollectionDetailsLoading } =
    useGetCollectionById(collectionId);
  const { data: collectionHashtags, isLoading: isHashtagsLoading } =
    useGetCollectionHashtags(collectionId);
  const { data: collectionVideos, isLoading: isLoadingVideos } =
    useGetCollectionVideos(
      collectionId,
      currentHashtags ? currentHashtags : []
    );

  return isCollectionDetailsLoading || isHashtagsLoading || isLoadingVideos ? (
    <div>Loading...</div>
  ) : (
    <div className='flex flex-col gap-4 lg:px-20 lg:py-10'>
      <div className='flex flex-col px-4 pt-4'>
        <BackButton href='/' />
        <h1 className='text-2xl font-bold text-black'>
          {collectionDetails?.name || 'Untitled Collection'}
        </h1>
        <p className='text-lg text-black'>
          Total videos:{' '}
          <span className='text-xl font-bold text-black'>
            {collectionVideos?.total}
          </span>
        </p>
      </div>
      {collectionHashtags && collectionHashtags.length > 0 && (
        <CollectionHashtags
          hashtags={collectionHashtags}
          currentHashtags={currentHashtags || []}
          setCurrentHashtags={setCurrentHashtags}
        />
      )}
      {collectionVideos && collectionVideos.videos.length > 0 && (
        <CollectionVideos videos={collectionVideos.videos} />
      )}
    </div>
  );
};

export default CollectionDetailsPage;
