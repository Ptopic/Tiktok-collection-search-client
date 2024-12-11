import { cache } from 'react';

import { fetchApi } from '..';
import { readRefreshTokenByRole } from './helpers';
import RefreshTokenManager from './refreshTokenManager';
import { ICallableRequestBuilder } from './types';

export abstract class RequestBuilder<T> implements ICallableRequestBuilder<T> {
  constructor(
    arg: string | ((requestInit: RequestInit) => Promise<T>) | undefined
  ) {
    if (typeof arg === 'function') {
      this.callback = cache(arg);
    } else if (typeof arg === 'string') {
      this.url = arg;
    }
    this.requestInit = {};
  }

  public url?: string;
  public requestInit: RequestInit;
  public callback?: (requestInit: RequestInit) => Promise<T>;

  public async call(
    url?: string,
    updateRequestInit?: (init: RequestInit) => RequestInit
  ) {
    const updatedRequestInit = updateRequestInit
      ? updateRequestInit(this.requestInit)
      : this.requestInit;

    const calculatedUrl = url ? url : this.url;
    if (this.callback) {
      return await this.callback(updatedRequestInit);
    } else if (calculatedUrl) {
      return await this.getResponse(calculatedUrl, updatedRequestInit);
    } else {
      throw Error('Wrong ServerRequestBuilder call');
    }
  }

  private async getResponse(
    calculatedUrl: string,
    updatedRequestInit: RequestInit
  ) {
    const isServerSide = typeof window === 'undefined';

    try {
      const response = await fetchApi(calculatedUrl, updatedRequestInit);
      return await this.getDataFromFetchApiResponse(response);
    } catch (error) {
      if (error instanceof Error) {
        const errorCause = (error as Error).cause as { status: number };
        if (errorCause?.status === 401 && !isServerSide) {
          const refreshToken = await readRefreshTokenByRole(calculatedUrl);
          if (refreshToken) {
            return await this.repeatRequestWithNewToken(
              calculatedUrl,
              updatedRequestInit
            );
          }
        }
      }
      throw error;
    }
  }

  private async repeatRequestWithNewToken(
    calcualatedUrl: string,
    updatedRequestInit: RequestInit
  ) {
    const authResponse =
      await RefreshTokenManager.getInstance().refreshTokens(calcualatedUrl);

    this.requestInit = {
      ...updatedRequestInit,
      headers: {
        ...updatedRequestInit.headers,
        Authorization: `Bearer ${authResponse?.access_token}`,
      },
    };

    const response = await fetchApi(calcualatedUrl, this.requestInit);

    return await this.getDataFromFetchApiResponse(response);
  }

  private async getDataFromFetchApiResponse(response: Response) {
    const contentType = response.headers.get('Content-Type');

    if (contentType?.includes('application/json'))
      return (await response.json()) as T;

    return (await response.text()) as T;
  }
}
