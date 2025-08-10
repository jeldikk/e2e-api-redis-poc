import { redisServer } from "./global-setup";

export default async function globalTeardown() {
  // Here we will write logic to write metrics about redis queue operations
  console.log("Stopping Redis Memory Server...");
  await redisServer.stop();
}
