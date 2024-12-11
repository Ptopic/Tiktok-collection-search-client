import { ServerRequestBuilder } from './serverRequestBuilder';
import { ICallableRequestBuilder } from './types';

export const withServerRequest = <TArgs extends unknown[], T>(
  callback: (
    request: ICallableRequestBuilder<T>
  ) => (...args: TArgs) => Promise<T>
): ((...args: TArgs) => Promise<T>) => {
  return async (...args: TArgs) => {
    const request = new ServerRequestBuilder<T>();
    return callback(request)(...args);
  };
};
