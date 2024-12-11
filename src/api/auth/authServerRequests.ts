import { withAuthenticatedServerRequest } from '@api/requestBuilder/user/withAuthenticatedServerRequest';

import { authCurrentUser, refreshAccessToken } from './requests';

const authServerRequests = {
  authCurrentUser: async () => {
    try {
      const response = await withAuthenticatedServerRequest(authCurrentUser)();
      return response;
    } catch (e) {
      return null;
    }
  },
  refreshAccessToken: withAuthenticatedServerRequest(refreshAccessToken),
};

export default authServerRequests;
