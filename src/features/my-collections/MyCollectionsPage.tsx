'use client';
import useGetMyCollections from '@api/scraper/hooks/useGetMyCollections';
import MyCollectionItem from './MyCollectionItem';

const MyCollectionsPage = () => {
  const { data, isLoading } = useGetMyCollections();

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className='flex flex-col justify-center gap-2 p-4'>
      <p className='text-2xl font-bold'>My collections:</p>
      {data && data.length === 0 ? (
        <p className='text-gray-500 text-lg'>No collections found.</p>
      ) : (
        data?.map((collection) => (
          <MyCollectionItem key={collection.id} {...collection} />
        ))
      )}
    </div>
  );
};

export default MyCollectionsPage;
