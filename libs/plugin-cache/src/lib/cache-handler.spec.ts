import { ConvoyrRequest, ConvoyrResponse, createRequest, createResponse } from '@convoyr/core';
import { createPluginTester } from '@convoyr/core/testing';
import { advanceTo, clear } from 'jest-date-mock';
import { concat } from 'rxjs';
import { marbles } from 'rxjs-marbles/jest';
import { CacheHandler } from './cache-handler';
import { WithCacheMetadata } from './cache-response';
import { MemoryStorage } from './storages/memory-storage';


function createMemoryStorageSpy() {
  const spyStorage = new MemoryStorage();
  spyStorage.get = jest.fn(spyStorage.get);
  spyStorage.set = jest.fn(spyStorage.set);
  spyStorage.delete = jest.fn(spyStorage.delete);

  return spyStorage;
}

describe('CachePlugin', () => {
  let request: ConvoyrRequest;
  let response: ConvoyrResponse;

  beforeEach(() => {
    request = createRequest({ url: 'https://ultimate-answer.com' });
    response = createResponse({ body: { answer: 42 } });
  });

  afterEach(() => clear());

  it(
    'should serve cache with metadata when hydrated',
    marbles((m) => {
      const pluginTester = createPluginTester({
        handler: new CacheHandler({
          addCacheMetadata: true,
          storage: new MemoryStorage(),
        }),
      });

      /* Mock date. */
      advanceTo(new Date('2019-01-01T00:00:00.000Z'));

      /* Simulate final handler. */
<<<<<<< HEAD:libs/plugin-cache/src/lib/create-cache-plugin.spec.ts
      const next = { handle: () => m.cold('-r|', { r: response }) };
=======
      const response$ = m.cold('-r|', { r: response });
>>>>>>> wip: 🚧 refactor tester plugin:libs/plugin-cache/src/lib/cache-handler.spec.ts

      /* Run two requests with the same URL to fire cache response. */
      const requestA$ = pluginTester.handle({ request, response: response$ });
      const requestB$ = pluginTester.handle({ request, response: response$ });

      /* Execute requests in order. */
      const responses$ = concat(requestA$, requestB$);

      const networkResponse = createResponse({
        body: {
          data: { answer: 42 },
          cacheMetadata: {
            isFromCache: false,
          },
        } as WithCacheMetadata,
      });

      const cacheResponse = createResponse({
        body: {
          data: { answer: 42 },
          cacheMetadata: {
            createdAt: new Date('2019-01-01T00:00:00.000Z'),
            isFromCache: true,
          },
        } as WithCacheMetadata,
      });

      const values = { n: networkResponse, c: cacheResponse };

      /*                         👇 Second time cache is served first */
      const expected$ = m.cold('-ncn|', values);

      m.expect(responses$).toBeObservable(expected$);
    })
  );

<<<<<<< HEAD:libs/plugin-cache/src/lib/create-cache-plugin.spec.ts
  it('should not apply metadata to response by default', () => {
    const cachePlugin = createCachePlugin();
    const cacheResponse = cachePlugin.handler.handle({
      request,
      next: {
        handle: () => of(response),
      },
=======
  it('should not apply metadata to response body', () => {
    const pluginTester = createPluginTester({
      handler: new CacheHandler({
        addCacheMetadata: false,
        storage: new MemoryStorage(),
      }),
>>>>>>> wip: 🚧 refactor tester plugin:libs/plugin-cache/src/lib/cache-handler.spec.ts
    });

    const observer = jest.fn();

    pluginTester.handle({ request, response }).subscribe(observer);

    expect(pluginTester.next).toBeCalledTimes(1);
    expect(observer).toBeCalledWith(
      expect.objectContaining({ body: { answer: 42 } })
    );
  });

  it('should use given storage implementation to store cache', async () => {
    const storage = createMemoryStorageSpy() as any;
<<<<<<< HEAD:libs/plugin-cache/src/lib/create-cache-plugin.spec.ts
    const cachePlugin = createCachePlugin({ storage });
    const next = { handle: () => of(response) };
=======
    const pluginTester = createPluginTester({
      handler: new CacheHandler({
        addCacheMetadata: false,
        storage,
      }),
    });
>>>>>>> wip: 🚧 refactor tester plugin:libs/plugin-cache/src/lib/cache-handler.spec.ts

    const handler$ = pluginTester.handle({ request, response });

    advanceTo(new Date('2019-01-01T00:00:00.000Z'));

    await handler$.toPromise();

    const cacheKey = storage.set.mock.calls[0][0];
    const cachedData = storage.set.mock.calls[0][1];

    expect(storage.set).toBeCalledTimes(1);
    expect(cacheKey).toBe('{"u":"https://ultimate-answer.com"}');
    expect(JSON.parse(cachedData)).toEqual(
      expect.objectContaining({
        createdAt: '2019-01-01T00:00:00.000Z',
        response: expect.objectContaining({
          body: { answer: 42 },
        }),
      })
    );
  });

  it(
    'should handle query string in store key',
    marbles((m) => {
<<<<<<< HEAD:libs/plugin-cache/src/lib/create-cache-plugin.spec.ts
      const cachePlugin = createCachePlugin();
      const nextHandler = {
        handle: jest.fn().mockImplementation(({ request: _request }) => {
          return {
            a: m.cold('-n|', { n: createResponse({ body: { answer: 'A' } }) }),
            b: m.cold('-n|', { n: createResponse({ body: { answer: 'B' } }) }),
          }[_request.params.q];
        }),
      };
=======
      const pluginTester = createPluginTester({
        handler: new CacheHandler({
          addCacheMetadata: false,
          storage: new MemoryStorage(),
        }),
      });
<<<<<<< HEAD
>>>>>>> wip: 🚧 refactor tester plugin:libs/plugin-cache/src/lib/cache-handler.spec.ts

=======
>>>>>>> wip: 🚧 refactor tester plugin
      const requestA = createRequest({
        url: 'https://ultimate-answer.com',
        params: { q: 'a' },
      });
      const requestB = createRequest({
        url: 'https://ultimate-answer.com',
        params: { q: 'b' },
      });

      const responseA$ = m.cold('-n|', {
        n: createResponse({ body: { answer: 'A' } }),
      });
      const responseB$ = m.cold('-n|', {
        n: createResponse({ body: { answer: 'B' } }),
      });

      const response1$ = pluginTester.handle({
        request: requestA,
<<<<<<< HEAD
<<<<<<< HEAD:libs/plugin-cache/src/lib/create-cache-plugin.spec.ts
        next: nextHandler,
      });
      const response2$ = cachePlugin.handler.handle({
        request: requestB,
        next: nextHandler,
      });
      const response3$ = cachePlugin.handler.handle({
        request: requestA,
        next: nextHandler,
=======
        response: responses[requestA.params.q as string],
=======
        response: responseA$,
>>>>>>> wip: 🚧 refactor tester plugin
      });
      const response2$ = pluginTester.handle({
        request: requestB,
        response: responseB$,
      });
      const response3$ = pluginTester.handle({
<<<<<<< HEAD
        request: responses[requestA.params.q as string],
>>>>>>> wip: 🚧 refactor tester plugin:libs/plugin-cache/src/lib/cache-handler.spec.ts
=======
        request: requestA,
        response: responseA$,
>>>>>>> wip: 🚧 refactor tester plugin
      });

      const stream$ = concat(response1$, response2$, response3$);
      /*                           👇 Cache is fired here */
      const expected$ = m.cold('-a-baa|', {
        a: createResponse({ body: { answer: 'A' } }),
        b: createResponse({ body: { answer: 'B' } }),
      });
      m.expect(stream$).toBeObservable(expected$);
    })
  );
});
