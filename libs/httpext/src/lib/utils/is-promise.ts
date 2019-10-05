export function isPromise<T>(value: any): value is Promise<T> {
  return typeof value.then === 'function';
}
