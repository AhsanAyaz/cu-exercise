import { Observable, throwError, timer } from 'rxjs';
import { mergeMap, finalize } from 'rxjs/operators';

export const httpRetryStrategy = ({
  maxRetryAttempts = 3,
  scalingDuration = 2000,
  excludedStatusCodes = []
}: {
  maxRetryAttempts?: number,
  scalingDuration?: number,
  excludedStatusCodes?: number[]
} = {}) => (attempts: Observable<any>) => {
  return attempts.pipe(
    mergeMap((error, i) => {
      const retryAttempt = i + 1;
      // if maximum number of retries have been met
      // or response is a status code we don't wish to retry, throw error
      if (
        retryAttempt > maxRetryAttempts ||
        excludedStatusCodes.find(e => e === error.status)
      ) {
        return throwError(error);
      }
      const retryAfter = scalingDuration;
      console.log(
        `Attempt ${retryAttempt}: retrying in ${retryAfter}ms`
      );
      return timer(retryAfter);
    }),
    finalize(() => {})
  );
};
