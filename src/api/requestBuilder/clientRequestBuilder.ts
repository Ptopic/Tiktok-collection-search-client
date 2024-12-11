import { refreshAdminAccessToken } from '@api/admin/auth/nativeRequests';
import { refreshAccessToken } from '@api/auth/nativeRequests';

import {
  readAccessTokenForCurrentAdmin,
  readAccessTokenForCurrentUser,
  readRefreshTokenForCurrentAdmin,
  readRefreshTokenForCurrentUser,
  saveAccessTokenForCurrentAdmin,
  saveAccessTokenForCurrentUser,
  saveRefreshTokenForCurrentAdmin,
  saveRefreshTokenForCurrentUser,
} from '@shared/utils';

import { RequestBuilder } from './requestBuilder';

export class ClientRequestBuilder<T> extends RequestBuilder<T> {
  constructor(url?: string);
  constructor(callback: (requestInit: RequestInit) => Promise<T>);

  constructor(
    arg: string | ((requestInit: RequestInit) => Promise<T>) | undefined
  ) {
    super(arg);
  }

  public async authenticate() {
    const accessToken = await readAccessTokenForCurrentUser();
    const refreshToken = await readRefreshTokenForCurrentUser();
    let token = accessToken;

    if (!accessToken && refreshToken) {
      const refreshTokenResponse = await refreshAccessToken({
        refresh_token: refreshToken,
      });
      saveAccessTokenForCurrentUser(refreshTokenResponse.access_token);
      saveRefreshTokenForCurrentUser(refreshTokenResponse.refresh_token);
      token = refreshTokenResponse.access_token;
    }

    this.requestInit = {
      ...this.requestInit,
      headers: {
        ...this.requestInit?.headers,
        Authorization: `Bearer ${token}`,
      },
    };

    return this;
  }

  public async authenticateAdmin() {
    const accessToken = await readAccessTokenForCurrentAdmin();
    const refreshToken = await readRefreshTokenForCurrentAdmin();

    let token = accessToken;

    if (!accessToken && refreshToken) {
      const refreshTokenResponse = await refreshAdminAccessToken({
        refresh_token: refreshToken,
      });
      saveAccessTokenForCurrentAdmin(refreshTokenResponse.access_token);
      saveRefreshTokenForCurrentAdmin(refreshTokenResponse.refresh_token);
      token = refreshTokenResponse.access_token;
    }

    this.requestInit = {
      ...this.requestInit,
      headers: {
        ...this.requestInit?.headers,
        Authorization: `Bearer ${token}`,
      },
    };

    return this;
  }
}
