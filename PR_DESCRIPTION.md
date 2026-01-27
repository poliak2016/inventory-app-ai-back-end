# Pull Request: Add Redis Integration

## Summary
Adds Redis integration and configuration to the inventory-app-ai-back-end for caching and session store capabilities, along with rate limiting functionality.

## Description of Changes

### Files Added
1. **src/config/redis.js** - Redis client configuration and initialization module
   - Supports graceful degradation when Redis is unavailable
   - Implements noop Redis client for when Redis is disabled
   - Error handling and logging

2. **src/services/rateLimitCounter.js** - Rate limiting service using Redis counters
   - Sliding window rate limiting implementation
   - Handles Redis failures gracefully

3. **src/middleware/rateLimitMiddleware.js** - Express middleware for rate limiting
   - Applies rate limits per IP address
   - Configurable through environment variables

### Files Modified
1. **package.json** - Added `redis@^5.10.0` dependency
2. **src/config/env.js** - Added Redis environment variables:
   - `REDIS_URL` - Connection URL for Redis
   - `REDIS_ENABLE` - Boolean flag to enable/disable Redis
   - `RATE_LIMIT_WINDOW_SEC` - Rate limit window in seconds
   - `RATE_LIMIT_MAX` - Maximum requests per window
3. **src/server.js** - Added Redis initialization on server startup
4. **docker-compose.yml** - Added Redis service (redis:7-alpine)
5. **docker-compose.dev.yml** - Added Redis service for development
6. **.env.example** - Documented Redis configuration variables

## Environment Variables Required

Add the following to your environment files (`.env.dev`, `.env.test`, `.env.prod`):

```bash
# Redis Configuration
REDIS_URL=redis://localhost:6379      # Use redis://redis:6379 in Docker
REDIS_ENABLE=true                      # Set to false to disable Redis
RATE_LIMIT_WINDOW_SEC=60              # 60 seconds window
RATE_LIMIT_MAX=100                     # 100 requests per window
```

## Testing Instructions

### Local Testing (with Docker)

1. **Start Redis with Docker:**
   ```bash
   docker run -d -p 6379:6379 redis:7-alpine
   ```

2. **Update your .env.dev file:**
   ```bash
   REDIS_URL=redis://localhost:6379
   REDIS_ENABLE=true
   RATE_LIMIT_WINDOW_SEC=60
   RATE_LIMIT_MAX=100
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run the application:**
   ```bash
   npm run dev
   ```

5. **Verify Redis connection:**
   - Check the logs for "Redis connected" message
   - If Redis is unavailable, you should see "Redis unavailable, continuing without cache"

### Using Docker Compose

```bash
npm run docker:dev
```

This will start all services including Redis automatically.

### Manual Verification Steps

1. **Test rate limiting:**
   ```bash
   # Make multiple rapid requests to test rate limiting
   for i in {1..10}; do curl http://localhost:3000/api/health; done
   ```

2. **Verify Redis is working:**
   ```bash
   # Connect to Redis CLI (if running locally)
   redis-cli
   > KEYS *
   > GET rl:127.0.0.1
   ```

3. **Test graceful degradation:**
   - Set `REDIS_ENABLE=false` in your environment
   - Application should start successfully without Redis
   - Rate limiting should allow all requests (degraded mode)

## Checklist

- [x] Redis package dependency added
- [x] Redis configuration module created
- [x] Environment configuration updated
- [x] Rate limiting service implemented
- [x] Rate limiting middleware created
- [x] Docker Compose files updated
- [x] Environment example file updated
- [x] Server initialization updated
- [x] Code passes linting checks
- [ ] Unit tests run successfully
- [x] No breaking API changes
- [x] Documentation updated

## Migration/Deployment Notes

1. **No database migrations required** - This is a pure infrastructure addition
2. **Backward compatible** - Application works with or without Redis
3. **Default behavior** - Redis is disabled by default (`REDIS_ENABLE=false`)
4. **Production deployment:**
   - Ensure Redis service is available
   - Update environment variables before deployment
   - Monitor Redis connection status in logs
   - Consider Redis persistence configuration for production use

## Additional Notes

- Redis integration is optional and the application will continue to work without it
- The noop Redis client ensures no code changes are needed elsewhere
- Rate limiting is currently per-IP but can be extended to per-user or per-API-key
- Redis can be used for additional features like caching, session storage, or pub/sub in the future

## Suggested Reviewers
@maintainers - Please review the Redis integration approach and environment configuration
