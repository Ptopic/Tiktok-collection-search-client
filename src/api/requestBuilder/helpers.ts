import { refreshAdminAccessToken } from '@api/admin/auth/nativeRequests';
import { refreshAccessToken } from '@api/auth/nativeRequests';

import {
  ADMIN_LOGIN,
  LOGIN,
  readRefreshTokenForCurrentAdmin,
  readRefreshTokenForCurrentUser,
  removeAccessTokenForCurrentAdmin,
  removeAccessTokenForCurrentUser,
  removeRefreshTokenForCurrentAdmin,
  removeRefreshTokenForCurrentUser,
  saveAccessTokenForCurrentAdmin,
  saveAccessTokenForCurrentUser,
  saveRefreshTokenForCurrentAdmin,
  saveRefreshTokenForCurrentUser,
} from '@shared/utils';

import {
  ADMIN_ENDPOINT,
  ADMIN_LOGIN_ENDPOINT,
  LOGIN_ENDPOINT,
} from './constants';

export const isLoginUrl = (url: string) => {
  return url.includes(ADMIN_LOGIN_ENDPOINT) || url.includes(LOGIN_ENDPOINT);
};

export const handleClientSideUnauthorizedRefreshTokenRequest = (
  url: string
) => {
  const isAdminUrl = url.includes(ADMIN_ENDPOINT);
  if (isAdminUrl) {
    removeAccessTokenForCurrentAdmin();
    removeRefreshTokenForCurrentAdmin();
    window.location.href = ADMIN_LOGIN;
    return;
  } else {
    removeAccessTokenForCurrentUser();
    removeRefreshTokenForCurrentUser();
    window.location.href = LOGIN;
  }
};

export const readRefreshTokenByRole = (url: string) => {
  const isAdminUrl = url.includes(ADMIN_ENDPOINT);

  return isAdminUrl
    ? readRefreshTokenForCurrentAdmin()
    : readRefreshTokenForCurrentUser();
};

export const getRefreshTokenRequestFunction = (url: string) => {
  const isAdminUrl = url.includes(ADMIN_ENDPOINT);

  return isAdminUrl ? refreshAdminAccessToken : refreshAccessToken;
};

export const saveAuthTokensByRole = (
  url: string,
  accessToken: string,
  refreshToken: string
) => {
  const isAdminUrl = url.includes(ADMIN_ENDPOINT);

  return isAdminUrl
    ? saveAuthTokensForCurrentAdmin(refreshToken, accessToken)
    : saveAuthTokensForCurrentUser(refreshToken, accessToken);
};

export const saveAuthTokensForCurrentAdmin = (
  refreshToken: string,
  accessToken: string
) => {
  saveRefreshTokenForCurrentAdmin(refreshToken);
  saveAccessTokenForCurrentAdmin(accessToken);
};

export const saveAuthTokensForCurrentUser = (
  refreshToken: string,
  accessToken: string
) => {
  saveRefreshTokenForCurrentUser(refreshToken);
  saveAccessTokenForCurrentUser(accessToken);
};
