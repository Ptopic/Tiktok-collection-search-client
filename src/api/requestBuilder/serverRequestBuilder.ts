import {
  readAccessTokenForCurrentAdmin,
  readAccessTokenForCurrentUser,
} from '@shared/utils';

import { RequestBuilder } from './requestBuilder';

export class ServerRequestBuilder<T> extends RequestBuilder<T> {
  constructor(url?: string);
  constructor(callback: (requestInit: RequestInit) => Promise<T>);

  constructor(
    arg: string | ((requestInit: RequestInit) => Promise<T>) | undefined
  ) {
    super(arg);
  }

  public async authenticate() {
    const accessToken = await readAccessTokenForCurrentUser();

    this.requestInit = {
      ...this.requestInit,
      headers: {
        ...this.requestInit?.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return this;
  }

  public async authenticateAdmin() {
    const accessToken = await readAccessTokenForCurrentAdmin();

    this.requestInit = {
      ...this.requestInit,
      headers: {
        ...this.requestInit?.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return this;
  }

  public override async call(
    url?: string,
    updateRequestInit?: (init: RequestInit) => RequestInit
  ) {
    return super.call(url, updateRequestInit);
  }
}
