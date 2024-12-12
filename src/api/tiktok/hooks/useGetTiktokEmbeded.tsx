import { TIKTOK_OEMBED } from '@shared/queryKeys';
import { useQuery } from '@tanstack/react-query';
import tiktokClientRequests from '../tiktokClientRequests';

const useGetTiktokEmbeded = (videoUrl: string) => {
  return useQuery({
    queryKey: [TIKTOK_OEMBED, videoUrl],
    queryFn: () => tiktokClientRequests.getTikTokOembed(videoUrl),
  });
};

export default useGetTiktokEmbeded;
