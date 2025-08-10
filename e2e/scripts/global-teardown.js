import { playwrightQueue } from "../lib/redis/queues";
import { worker } from "../lib/redis/workers";
import { redisServer } from "./global-setup";

export default async function globalTeardown() {
  // Here we will write logic to write metrics about redis queue operations
  console.log("Stopping Redis Memory Server...");
  await playwrightQueue.close();
  await worker.close();
  await redisServer.stop();
}
