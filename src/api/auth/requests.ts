import {
  IAuthCurrentUser,
  IAuthResponse,
  ICheckReferralCodeData,
  ICheckReferralCodeResponse,
  IForgotPasswordData,
  IGoogleLoginData,
  ILoginData,
  IRefreshTokenData,
  IResetPasswordData,
  ISignUpData,
} from '@types';

import { ICallableRequestBuilder } from '@api/requestBuilder/types';

import config from '@shared/config';

export const authCurrentUser =
  (request: ICallableRequestBuilder<IAuthCurrentUser>) => async () =>
    request.call(`${config.apiUrl}api/auth/me`);

export const signUpWithPassword =
  (request: ICallableRequestBuilder<IAuthResponse>) =>
  (signUpData: ISignUpData) =>
    request.call(`${config.apiUrl}api/auth/signup`, (init) => ({
      ...init,
      method: 'POST',
      headers: {
        ...init.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signUpData),
    }));

export const logout = (request: ICallableRequestBuilder<IAuthResponse>) => () =>
  request.call(`${config.apiUrl}api/auth/logout`, (init) => ({
    ...init,
    method: 'POST',
    headers: {
      ...init.headers,
      'Content-Type': 'application/json',
    },
  }));

export const loginWithPassword =
  (request: ICallableRequestBuilder<IAuthResponse>) =>
  (loginData: ILoginData) =>
    request.call(`${config.apiUrl}api/auth/login`, (init) => ({
      ...init,
      method: 'POST',
      headers: {
        ...init.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    }));

export const loginWithGoogle =
  (request: ICallableRequestBuilder<IAuthResponse>) =>
  (googleLoginData: IGoogleLoginData) =>
    request.call(`${config.apiUrl}api/auth/google`, (init) => ({
      ...init,
      method: 'POST',
      headers: {
        ...init.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(googleLoginData),
    }));

export const forgotPassword =
  (request: ICallableRequestBuilder<IAuthResponse>) =>
  (forgotPasswordData: IForgotPasswordData) =>
    request.call(`${config.apiUrl}api/users/forgot-password`, (init) => ({
      ...init,
      method: 'POST',
      headers: {
        ...init.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(forgotPasswordData),
    }));

export const adminForgotPassword =
  (request: ICallableRequestBuilder<IAuthResponse>) =>
  (forgotPasswordData: IForgotPasswordData) =>
    request.call(`${config.apiUrl}api/admin/auth/forgot-password`, (init) => ({
      ...init,
      method: 'POST',
      headers: {
        ...init.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(forgotPasswordData),
    }));

export const resetPassword =
  (request: ICallableRequestBuilder<IAuthResponse>) =>
  (resetPasswordData: IResetPasswordData) =>
    request.call(`${config.apiUrl}api/users/reset-password`, (init) => ({
      ...init,
      method: 'POST',
      headers: {
        ...init.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resetPasswordData),
    }));

export const adminResetPassword =
  (request: ICallableRequestBuilder<IAuthResponse>) =>
  (resetPasswordData: IResetPasswordData) =>
    request.call(`${config.apiUrl}api/admin/auth/reset-password`, (init) => ({
      ...init,
      method: 'POST',
      headers: {
        ...init.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resetPasswordData),
    }));

export const refreshAccessToken =
  (request: ICallableRequestBuilder<IAuthResponse>) =>
  (refreshTokenData: IRefreshTokenData) =>
    request.call(`${config.apiUrl}api/auth/refresh`, (init) => ({
      ...init,
      method: 'POST',
      headers: {
        ...init.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(refreshTokenData),
      cache: 'no-store',
    }));

export const checkReferralCode =
  (request: ICallableRequestBuilder<ICheckReferralCodeResponse>) =>
  (checkReferralCodeData: ICheckReferralCodeData) =>
    request.call(`${config.apiUrl}api/users/check-referral-code`, (init) => ({
      ...init,
      method: 'POST',
      headers: {
        ...init.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkReferralCodeData),
    }));
