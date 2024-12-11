import { withAuthenticatedAdminServerRequest } from '@api/requestBuilder/admin/withAuthenticatedAdminServerRequest';
import { withServerRequest } from '@api/requestBuilder/withServerRequest';

import { authCurrentAdmin, refreshAdminAccessToken } from './requests';

const adminAuthServerRequests = {
  authCurrentAdmin: async () => {
    try {
      const response =
        await withAuthenticatedAdminServerRequest(authCurrentAdmin)();
      return response;
    } catch (e) {
      return null;
    }
  },
  refreshAdminAccessToken: withServerRequest(refreshAdminAccessToken),
};

export default adminAuthServerRequests;
