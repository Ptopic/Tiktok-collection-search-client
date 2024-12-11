import { ClientRequestBuilder } from '../clientRequestBuilder';
import { ICallableRequestBuilder } from '../types';

export const withAuthenticatedAdminClientRequest = <TArgs extends unknown[], T>(
  callback: (
    request: ICallableRequestBuilder<T>
  ) => (...args: TArgs) => Promise<T>
): ((...args: TArgs) => Promise<T>) => {
  return async (...args: TArgs) => {
    const request = new ClientRequestBuilder<T>();
    await request.authenticateAdmin();
    return callback(request)(...args);
  };
};
