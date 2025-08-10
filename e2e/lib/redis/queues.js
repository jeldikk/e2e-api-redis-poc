import { Queue, QueueEvents } from "bullmq";
import { connection } from "./connection.js";

export const QUEUE_NAME = "e2e-queue";

export const playwrightQueue = new Queue(QUEUE_NAME, { connection });

export const playwrightQueueEvents = new QueueEvents(QUEUE_NAME, {
  connection,
});

playwrightQueueEvents.on("completed", (job) => {
  console.log(`Job completed: ${job.id}`);
});

playwrightQueueEvents.on("failed", (job) => {
  console.error(`Job failed: ${job.id}, Reason: ${job.failedReason}`);
});
