import scraperServerRequests from '@api/scraper/scraperServerRequests';
import CollectionDetailsPage from '@features/Collection/CollectionDetailsPage';
import { getSSRQueryClient } from '@shared/queryClient';
import { COLLECTIONS } from '@shared/queryKeys';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

interface IProps {
  params: {
    id: string;
  };
}

const page = async ({ params }: IProps) => {
  const queryClient = getSSRQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [COLLECTIONS],
    queryFn: () => scraperServerRequests.getCollectionById(params.id),
  });

  const collectionId = params.id;

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <CollectionDetailsPage id={collectionId} />
    </HydrationBoundary>
  );
};

export default page;
