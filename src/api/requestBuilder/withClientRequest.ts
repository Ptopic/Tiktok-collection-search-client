import { ClientRequestBuilder } from './clientRequestBuilder';
import { ICallableRequestBuilder } from './types';

export const withClientRequest = <TArgs extends unknown[], T>(
  callback: (
    request: ICallableRequestBuilder<T>
  ) => (...args: TArgs) => Promise<T>
): ((...args: TArgs) => Promise<T>) => {
  return async (...args: TArgs) => {
    const request = new ClientRequestBuilder<T>();
    return callback(request)(...args);
  };
};
