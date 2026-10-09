import Redis from 'ioredis'

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'

// In-memory fallback cache for development or when Redis is unreachable
const memoryCache = new Map<string, { value: any; expiry: number }>()

let redisClient: Redis | null = null
let isRedisAvailable = false
let redisWarningLogged = false

try {
  redisClient = new Redis(redisUrl, {
    lazyConnect: true,
    maxRetriesPerRequest: 1,
    connectTimeout: 1500,
    enableOfflineQueue: false,
    retryStrategy: (times) => {
      if (times > 3) {
        return null // Stop retrying
      }
      return Math.min(times * 100, 1000)
    },
  })

  redisClient.on('connect', () => {
    isRedisAvailable = true
    console.log('[Redis] Connected successfully to', redisUrl)
  })

  redisClient.on('error', (err) => {
    isRedisAvailable = false
    if (!redisWarningLogged) {
      console.warn(`[Redis] Connection notice: ${err.message}. Falling back to in-memory caching.`)
      redisWarningLogged = true
    }
  })
} catch (e: any) {
  isRedisAvailable = false
  if (!redisWarningLogged) {
    console.warn(`[Redis] Initialization notice: ${e.message}. Using in-memory cache.`)
    redisWarningLogged = true
  }
}

/**
 * Retrieve cached item by key
 */
export async function cacheGet<T>(key: string): Promise<T | null> {
  if (isRedisAvailable && redisClient) {
    try {
      const data = await redisClient.get(key)
      if (data) return JSON.parse(data) as T
    } catch {
      // Fall through to memory cache
    }
  }

  // Memory fallback check
  const memItem = memoryCache.get(key)
  if (memItem) {
    if (Date.now() < memItem.expiry) {
      return memItem.value as T
    }
    memoryCache.delete(key)
  }
  return null
}

/**
 * Store item in cache with TTL in seconds
 */
export async function cacheSet(key: string, value: any, ttlSeconds: number = 300): Promise<void> {
  const serialized = JSON.stringify(value)

  if (isRedisAvailable && redisClient) {
    try {
      await redisClient.set(key, serialized, 'EX', ttlSeconds)
    } catch {
      // Ignore Redis set failure, continue to memory cache
    }
  }

  // Always store in memory fallback as well
  memoryCache.set(key, {
    value,
    expiry: Date.now() + ttlSeconds * 1000,
  })
}

/**
 * Invalidate cache key or pattern
 */
export async function cacheDel(key: string): Promise<void> {
  if (isRedisAvailable && redisClient) {
    try {
      await redisClient.del(key)
    } catch {
      // Ignore
    }
  }
  memoryCache.delete(key)
}

/**
 * Cached query helper wrapper
 */
export async function cached<T>(key: string, ttlSeconds: number, fetcher: () => Promise<T>): Promise<T> {
  const cachedData = await cacheGet<T>(key)
  if (cachedData !== null) {
    return cachedData
  }

  const freshData = await fetcher()
  await cacheSet(key, freshData, ttlSeconds)
  return freshData
}
