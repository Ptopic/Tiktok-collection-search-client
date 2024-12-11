import { IAuthResponse, IRefreshTokenData } from '@types';

import config from '@shared/config';

export const refreshAccessToken = async (
  refreshTokenData: IRefreshTokenData
): Promise<IAuthResponse> => {
  const result = await fetch(`${config.apiUrl}api/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(refreshTokenData),
    cache: 'no-store',
  });

  if (result.status >= 400) {
    const { detail } = await result.json();
    throw Error(detail);
  }

  return result.json();
};
