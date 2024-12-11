import { ServerRequestBuilder } from '../serverRequestBuilder';
import { ICallableRequestBuilder } from '../types';

export const withAuthenticatedServerRequest = <TArgs extends unknown[], T>(
  callback: (
    request: ICallableRequestBuilder<T>
  ) => (...args: TArgs) => Promise<T>
): ((...args: TArgs) => Promise<T>) => {
  return async (...args: TArgs) => {
    const request = new ServerRequestBuilder<T>();
    await request.authenticate();
    return callback(request)(...args);
  };
};
