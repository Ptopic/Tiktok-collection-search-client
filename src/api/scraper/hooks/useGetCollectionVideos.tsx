import { COLLECTION_VIDEOS, COLLECTIONS } from '@shared/queryKeys';
import { useQuery } from '@tanstack/react-query';
import scraperClientRequests from '../scraperClientRequests';

const useGetCollectionVideos = (collectionId: string, hashtags?: string[]) => {
  return useQuery({
    queryKey: [COLLECTIONS, COLLECTION_VIDEOS, collectionId, hashtags],
    queryFn: () =>
      scraperClientRequests.getCollectionVideos(collectionId, hashtags),
  });
};

export default useGetCollectionVideos;
