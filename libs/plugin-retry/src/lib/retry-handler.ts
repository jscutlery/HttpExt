import {
  HttpExtResponse,
  PluginHandler,
  PluginHandlerArgs
} from '@http-ext/core';
import { retryBackoff } from 'backoff-rxjs';
import { Observable } from 'rxjs';

export interface HandlerOptions {
  initialIntervalMs: number;
  maxIntervalMs: number;
  maxRetries: number;
  shouldRetry: RetryPredicate;
}

export type RetryPredicate = (response: HttpExtResponse) => boolean;

export class RetryHandler implements PluginHandler {
  private _initialIntervalMs: number;
  private _maxIntervalMs: number;
  private _maxRetries: number;
  private _shouldRetry: RetryPredicate;

  constructor({
    initialIntervalMs,
    maxIntervalMs,
    maxRetries,
    shouldRetry
  }: HandlerOptions) {
    this._initialIntervalMs = initialIntervalMs;
    this._maxIntervalMs = maxIntervalMs;
    this._maxRetries = maxRetries;
    this._shouldRetry = shouldRetry;
  }

  handle({ request, next }: PluginHandlerArgs): Observable<HttpExtResponse> {
    return next({ request }).pipe(
      retryBackoff({
        initialInterval: this._initialIntervalMs,
        maxInterval: this._maxIntervalMs,
        maxRetries: this._maxRetries,
        shouldRetry: this._shouldRetry
      })
    );
  }
}