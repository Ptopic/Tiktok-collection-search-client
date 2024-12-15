import authServerRequests from '@api/auth/authServerRequests';
import scraperServerRequests from '@api/scraper/scraperServerRequests';
import MyCollectionsPage from '@features/my-collections/MyCollectionsPage';
import { getSSRQueryClient } from '@shared/queryClient';
import { COLLECTIONS, CURRENT_USER, MY_COLLECTIONS } from '@shared/queryKeys';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const MyCollections = async () => {
  const queryClient = getSSRQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: [CURRENT_USER],
      queryFn: () => authServerRequests.getCurrentUser(),
    }),
    queryClient.prefetchQuery({
      queryKey: [COLLECTIONS, MY_COLLECTIONS],
      queryFn: () => scraperServerRequests.getMyCollections(),
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <MyCollectionsPage />
    </HydrationBoundary>
  );
};

export default MyCollections;
