import {
  IAuthCurrentAdmin,
  IAuthResponse,
  ILoginData,
  IRefreshTokenData,
} from '@types';

import { ICallableRequestBuilder } from '@api/requestBuilder/types';

import config from '@shared/config';

import { AdminChangePasswordFormData } from './../../../components/profileActionsDropdown/forms/adminChangePasswordFormSchema';

export const authCurrentAdmin =
  (request: ICallableRequestBuilder<IAuthCurrentAdmin>) => async () =>
    request.call(`${config.apiUrl}api/admin/auth/me`);

export const adminLoginWithPassword =
  (request: ICallableRequestBuilder<IAuthResponse>) =>
  (loginData: ILoginData) =>
    request.call(`${config.apiUrl}api/admin/auth/login`, (init) => ({
      ...init,
      method: 'POST',
      headers: {
        ...init.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    }));

export const refreshAdminAccessToken =
  (request: ICallableRequestBuilder<IAuthResponse>) =>
  (refreshTokenData: IRefreshTokenData) =>
    request.call(`${config.apiUrl}api/admin/auth/refresh`, (init) => ({
      ...init,
      method: 'POST',
      headers: {
        ...init.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(refreshTokenData),
    }));

export const adminLogout =
  (request: ICallableRequestBuilder<IAuthResponse>) => () =>
    request.call(`${config.apiUrl}api/admin/auth/logout`, (init) => ({
      ...init,
      method: 'POST',
      headers: {
        ...init.headers,
        'Content-Type': 'application/json',
      },
    }));

export const adminChangePassword =
  (request: ICallableRequestBuilder<IAuthResponse>) =>
  (passwords: AdminChangePasswordFormData) =>
    request.call(`${config.apiUrl}api/admin/auth/change-password`, (init) => ({
      ...init,
      method: 'POST',
      headers: {
        ...init.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(passwords),
    }));
