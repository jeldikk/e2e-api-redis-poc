import { RedisMemoryServer } from "redis-memory-server";

export const redisServer = new RedisMemoryServer({
  instance: {
    port: 54345, // Specify the port you want to use
  },
});

export default async function globalSetup() {
  console.log("Starting Redis Memory Server...");
  await redisServer.start();
  const host = await redisServer.getHost();
  const port = await redisServer.getPort();
  console.log(`Redis Memory Server started at ${host}:${port}`);
  process.env.MOCK_REDIS_HOST = host;
  process.env.MOCK_REDIS_PORT = port;
  console.log("End of global setup phase");
}
