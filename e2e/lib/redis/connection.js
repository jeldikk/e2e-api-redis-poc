import Redis from "ioredis";
import { RedisMemoryServer } from "redis-memory-server";
import path from "node:path";

export const connection = new Redis(process.env.MOCK_REDIS_PORT);

export const redisServer = new RedisMemoryServer({
  instance: {
    port: 54345, // Specify the port you want to use
  },
  binary: {
    debug: true,
    systemBinary: path.join(
      __dirname,
      "../../.cache/redis-server/7.0.0/bin/redis-server.exe"
    ),
    autoStart: false,
  },
});
