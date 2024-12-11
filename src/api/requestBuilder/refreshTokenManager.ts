import { IAuthResponse } from '@types';

import {
  getRefreshTokenRequestFunction,
  handleClientSideUnauthorizedRefreshTokenRequest,
  readRefreshTokenByRole,
  saveAuthTokensByRole,
} from './helpers';

class RefreshTokenManager {
  private static instance: RefreshTokenManager;
  private refreshRequest?: Promise<IAuthResponse | undefined>;

  static getInstance() {
    if (!this.instance) {
      this.instance = new RefreshTokenManager();
    }
    return this.instance;
  }

  async refreshTokens(calcualatedUrl: string) {
    if (!this.refreshRequest) {
      this.refreshRequest = this.executeRefreshTokensRequest(calcualatedUrl);
    }

    return this.refreshRequest;
  }

  private async executeRefreshTokensRequest(calcualatedUrl: string) {
    const refreshTokenRequestFunction =
      getRefreshTokenRequestFunction(calcualatedUrl);
    const refreshToken = await readRefreshTokenByRole(calcualatedUrl);

    if (!refreshToken) return;

    try {
      const response = await refreshTokenRequestFunction({
        refresh_token: refreshToken,
      });

      saveAuthTokensByRole(
        calcualatedUrl,
        response.access_token,
        response.refresh_token
      );

      return response;
    } catch (e) {
      handleClientSideUnauthorizedRefreshTokenRequest(calcualatedUrl);
      throw e;
    } finally {
      this.refreshRequest = undefined;
    }
  }
}

export default RefreshTokenManager;
