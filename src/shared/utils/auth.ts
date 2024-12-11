'use server';

import { COOKIE_NAME } from '@shared/constants';

import { getCookie, removeCookie, setCookie } from './cookie';
import { decodeJwt } from './jwt';

export const readAccessTokenForCurrentUser = () => {
  return getCookie(COOKIE_NAME.ACCESS_TOKEN);
};

export const readRefreshTokenForCurrentUser = () => {
  return getCookie(COOKIE_NAME.REFRESH_TOKEN);
};

export const saveAccessTokenForCurrentUser = async (jwt: string) => {
  const decodedJwt = decodeJwt(jwt);

  setCookie({
    name: COOKIE_NAME.ACCESS_TOKEN,
    value: jwt,
    expires: decodedJwt.exp * 1000,
  });
};

export const saveRefreshTokenForCurrentUser = async (jwt: string) => {
  const decodedJwt = decodeJwt(jwt);

  setCookie({
    name: COOKIE_NAME.REFRESH_TOKEN,
    value: jwt,
    expires: decodedJwt.exp * 1000,
  });
};

export const removeAccessTokenForCurrentUser = () => {
  removeCookie(COOKIE_NAME.ACCESS_TOKEN);
};

export const removeRefreshTokenForCurrentUser = () => {
  removeCookie(COOKIE_NAME.REFRESH_TOKEN);
};
