import { ICallableRequestBuilder } from '@api/requestBuilder/types';

export const getTikTokOembed =
  (request: ICallableRequestBuilder<any>) => async (videoUrl: string) => {
    return request.call(`https://www.tiktok.com/oembed?url=${videoUrl}`);
  };
