import { COLLECTIONS, MY_COLLECTIONS } from '@shared/queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IError } from 'interfaces/error';
import scraperClientRequests from '../scraperClientRequests';

const useDeleteCollection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (collectionId: string) =>
      scraperClientRequests.deleteCollection(collectionId),
    onSuccess: async (data: any) => {
      console.log('Toast success');
      await queryClient.invalidateQueries({
        queryKey: [COLLECTIONS, MY_COLLECTIONS],
      });
    },
    onError: (error: IError) => {
      console.log(error);
      console.log('Toast error');
    },
  });
};

export default useDeleteCollection;
