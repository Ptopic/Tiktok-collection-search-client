import { COLLECTION_DETAILS, COLLECTIONS } from '@shared/queryKeys';
import { useQuery } from '@tanstack/react-query';
import scraperClientRequests from '../scraperClientRequests';

const useGetCollectionById = (collectionId: string) => {
  return useQuery({
    queryKey: [COLLECTIONS, COLLECTION_DETAILS, collectionId],
    queryFn: () => scraperClientRequests.getCollectionById(collectionId),
  });
};

export default useGetCollectionById;
