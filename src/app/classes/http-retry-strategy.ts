import { Observable, throwError, timer } from 'rxjs';
import { mergeMap, finalize } from 'rxjs/operators';

export const httpRetryStrategy = ({
  maxRetryAttempts = 3,
  scalingDuration = 2000,
  excludedStatusCodes = [] // should be able to use 401 etc later in an actual app
}: {
  maxRetryAttempts?: number,
  scalingDuration?: number,
  excludedStatusCodes?: number[]
} = {}) => (attempts: Observable<any>) => {
  return attempts.pipe(
    mergeMap((error, i) => {
      const retryAttempt = i + 1;
      if (
        retryAttempt > maxRetryAttempts ||
        excludedStatusCodes.find(e => e === error.status)
      ) {
        return throwError(error);
      }
      const retryAfter = scalingDuration;
      return timer(retryAfter);
    }),
    finalize(() => {})
  );
};
