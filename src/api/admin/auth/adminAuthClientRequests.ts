import { withAuthenticatedAdminClientRequest } from '@api/requestBuilder/admin/withAuthenticatedAdminClientRequest';
import { withClientRequest } from '@api/requestBuilder/withClientRequest';

import {
  adminChangePassword,
  adminLoginWithPassword,
  adminLogout,
  authCurrentAdmin,
  refreshAdminAccessToken,
} from './requests';

const adminAuthClientRequests = {
  authCurrentAdmin: withAuthenticatedAdminClientRequest(authCurrentAdmin),
  adminLoginWithPassword: withClientRequest(adminLoginWithPassword),
  refreshAdminAccessToken: withClientRequest(refreshAdminAccessToken),
  adminLogout: withAuthenticatedAdminClientRequest(adminLogout),
  adminChangePassword: withAuthenticatedAdminClientRequest(adminChangePassword),
};

export default adminAuthClientRequests;
