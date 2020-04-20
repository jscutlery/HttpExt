import { EMPTY } from 'rxjs';

import { CacheHandler } from './cache-handler';
import {
  createCachePlugin,
  isGetMethodAndJsonResponseType,
} from './create-cache-plugin';
import { MemoryStorage } from './storages/memory-storage';

jest.mock('./cache-handler');

describe('CachePlugin', () => {
  const mockCacheHandler = CacheHandler as jest.Mock;

  it('should create the cache handler with default options', () => {
    const plugin = createCachePlugin();

    mockCacheHandler.mockReturnValue(EMPTY);

    expect(plugin.shouldHandleRequest).toBe(isGetMethodAndJsonResponseType);
    expect(CacheHandler).toHaveBeenCalledWith({
      addCacheMetadata: false,
      storage: new MemoryStorage({ maxSize: 100 }),
    });
  });
});