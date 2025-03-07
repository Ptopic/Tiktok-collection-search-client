import { ICallableRequestBuilder } from '@api/requestBuilder/types';
import { config } from '@shared/config/config';
import { ICollection, ICollectionResponse } from 'interfaces/collection';
import { IScrapeCollectionRequest } from 'interfaces/scraper';

export const getMyCollections =
  (request: ICallableRequestBuilder<ICollection[]>) => async () => {
    return request.call(`${config.apiUrl}/scraper/my-collections`);
  };

export const getCollectionById =
  (request: ICallableRequestBuilder<ICollectionResponse>) =>
  async (collectionId: string) => {
    return request.call(`${config.apiUrl}/scraper/${collectionId}`);
  };

export const getCollectionHashtags =
  (request: ICallableRequestBuilder<string[]>) =>
  async (collectionId: string) => {
    return request.call(`${config.apiUrl}/scraper/${collectionId}/hashtags`);
  };

export const getCollectionVideos =
  (request: ICallableRequestBuilder<ICollectionResponse>) =>
  async (collectionId: string, hashtags?: string[]) => {
    const params = new URLSearchParams();

    if (hashtags) {
      hashtags.forEach((hashtag) => {
        params.append('hashtags', hashtag);
      });
    }
    return request.call(
      `${config.apiUrl}/scraper/${collectionId}/videos?${params.toString()}`
    );
  };

export const scrapeCollection =
  (request: ICallableRequestBuilder<string>) =>
  async (data: IScrapeCollectionRequest) => {
    const url = `${config.apiUrl}/scraper`;

    return request.call(url, (init) => ({
      ...init,
      method: 'POST',
      headers: {
        ...init.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }));
  };

export const deleteCollection =
  (request: ICallableRequestBuilder<string>) =>
  async (collectionId: string) => {
    return request.call(`${config.apiUrl}/scraper/${collectionId}`, (init) => ({
      ...init,
      method: 'DELETE',
    }));
  };
