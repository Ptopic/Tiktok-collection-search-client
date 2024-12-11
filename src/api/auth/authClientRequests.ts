import { withAuthenticatedClientRequest } from '@api/requestBuilder/user/withAuthenticatedClientRequest';
import { withClientRequest } from '@api/requestBuilder/withClientRequest';

import {
  adminForgotPassword,
  adminResetPassword,
  authCurrentUser,
  checkReferralCode,
  forgotPassword,
  loginWithGoogle,
  loginWithPassword,
  logout,
  refreshAccessToken,
  resetPassword,
  signUpWithPassword,
} from './requests';

const authClientRequests = {
  authCurrentUser: withAuthenticatedClientRequest(authCurrentUser),
  loginWithPassword: withClientRequest(loginWithPassword),
  loginWithGoogle: withClientRequest(loginWithGoogle),
  forgotPassword: withClientRequest(forgotPassword),
  signUpWithPassword: withClientRequest(signUpWithPassword),
  refreshAccessToken: withClientRequest(refreshAccessToken),
  resetPassword: withClientRequest(resetPassword),
  adminForgotPassword: withClientRequest(adminForgotPassword),
  adminResetPassword: withClientRequest(adminResetPassword),
  logout: withAuthenticatedClientRequest(logout),
  checkReferralCode: withAuthenticatedClientRequest(checkReferralCode),
};

export default authClientRequests;
