import { COLLECTIONS } from '@shared/queryKeys';
import { useQuery } from '@tanstack/react-query';
import scraperClientRequests from '../scraperClientRequests';

const useGetCollectionHashtags = (collectionId: string) => {
  return useQuery({
    queryKey: [COLLECTIONS, collectionId],
    queryFn: () => scraperClientRequests.getCollectionHashtags(collectionId),
  });
};

export default useGetCollectionHashtags;
