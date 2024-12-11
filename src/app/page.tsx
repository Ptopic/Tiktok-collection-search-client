import HomePage from '@features/Home/HomePage';
import { getSSRQueryClient } from '@shared/queryClient';
import { EARNING, getMetadataTitle } from '@shared/utils';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { openGraphImage } from 'metadata/openGraphImage';
import { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
  {},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const parentOpengraphUrl = (await parent).openGraph?.url;

  return {
    title: getMetadataTitle('Home'),
    openGraph: {
      title: getMetadataTitle('Home'),
      url: `${parentOpengraphUrl}${EARNING}`,
      ...openGraphImage,
    },
  };
}

const Home = () => {
  const queryClient = getSSRQueryClient();

  // await Promise.all([
  //   queryClient.prefetchQuery({
  //     queryKey: instancesQueryKey,
  //     queryFn: () =>
  //       instancesServerRequests.getInstances({
  //         page,
  //         pageSize,
  //         search,
  //         gpu,
  //         region,
  //         sortField: sortField,
  //         sortDirection: sortDirection,
  //       }),
  //   }),
  //   queryClient.prefetchQuery({
  //     queryKey: [GPU_NAMES],
  //     queryFn: () => instancesServerRequests.getMachinesGpuName(),
  //   }),
  //   queryClient.prefetchQuery({
  //     queryKey: [CURRENT_USER],
  //     queryFn: () => authServerRequests.authCurrentUser(),
  //   }),
  // ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <HomePage />
    </HydrationBoundary>
  );
};

export default Home;
