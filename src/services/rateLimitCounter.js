export async function rateLimitCounter({
  redis,
  key,
  windowSec,
  max,
}) {
  try {
    const count = await redis.incr(key);

    if (count === 1) {
      await redis.expire(key, windowSec);
    }

    if (count > max) {
      return {
        allowed: false,
        count,
      };
    }

    return {
      allowed: true,
      count,
    };
  } catch (err) {
    return {
      allowed: true,
      degraded: true,
      error: err.message,
    };
  }
}
