import { COLLECTIONS, MY_COLLECTIONS } from '@shared/queryKeys';
import { useQuery } from '@tanstack/react-query';
import scraperClientRequests from '../scraperClientRequests';

const useGetMyCollections = () => {
  return useQuery({
    queryKey: [COLLECTIONS, MY_COLLECTIONS],
    queryFn: () => scraperClientRequests.getMyCollections(),
  });
};

export default useGetMyCollections;
