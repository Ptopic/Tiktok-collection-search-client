'use server';

import { COOKIE_NAME } from '@shared/constants';

import { getCookie, removeCookie, setCookie } from './cookie';
import { decodeJwt } from './jwt';

export const readAccessTokenForCurrentAdmin = () => {
  return getCookie(COOKIE_NAME.ADMIN_ACCESS_TOKEN);
};

export const readRefreshTokenForCurrentAdmin = () => {
  return getCookie(COOKIE_NAME.ADMIN_REFRESH_TOKEN);
};

export const saveAccessTokenForCurrentAdmin = async (jwt: string) => {
  const decodedJwt = decodeJwt(jwt);

  setCookie({
    name: COOKIE_NAME.ADMIN_ACCESS_TOKEN,
    value: jwt,
    expires: decodedJwt.exp * 1000,
  });
};

export const saveRefreshTokenForCurrentAdmin = async (jwt: string) => {
  const decodedJwt = decodeJwt(jwt);

  setCookie({
    name: COOKIE_NAME.ADMIN_REFRESH_TOKEN,
    value: jwt,
    expires: decodedJwt.exp * 1000,
  });
};

export const removeAccessTokenForCurrentAdmin = () => {
  removeCookie(COOKIE_NAME.ADMIN_ACCESS_TOKEN);
};

export const removeRefreshTokenForCurrentAdmin = () => {
  removeCookie(COOKIE_NAME.ADMIN_REFRESH_TOKEN);
};
