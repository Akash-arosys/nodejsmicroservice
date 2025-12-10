import { createClient } from 'redis';

let client: ReturnType<typeof createClient> | null = null;

export const initializeRedis = async () => {
  try {
    client = createClient({
      url: `redis://${process.env.REDIS_HOST || '127.0.0.1'}:${process.env.REDIS_PORT || 6379}`,
    });

    client.on('error', (err) => {
      console.warn('⚠️ Redis client error (ignored):', err?.message || err);
    });

    await client.connect();
    console.log('✅ Redis connected');
  } catch (err: any) {
    console.warn('⚠️ Redis not available, running without cache:', err?.message || err);
    client = null; // cache पूरी तरह disable
  }
};

export const cacheGetJSON = async <T>(key: string): Promise<T | null> => {
  if (!client) return null;
  try {
    const raw = await client.get(key);           // type: string | Buffer | null

    if (!raw) return null;

    const data = typeof raw === 'string' ? raw : raw.toString('utf8');
    return JSON.parse(data) as T;
  } catch {
    return null;
  }
};

export const cacheSetJSON = async (key: string, data: any, ttl = 3600) => {
  if (!client) return;
  try {
    await client.setEx(key, ttl, JSON.stringify(data));
  } catch {
    // ignore
  }
};

export const cacheDelete = async (key: string) => {
  if (!client) return;
  try {
    await client.del(key);
  } catch {
    // ignore
  }
};
