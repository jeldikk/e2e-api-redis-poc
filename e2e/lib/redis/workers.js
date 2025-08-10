import { Worker } from "bullmq";
import { QUEUE_NAME } from "./queues";

let apiContext;

export const worker = new Worker(
  QUEUE_NAME,
  async (job) => {
    if (!apiContext) {
      const { ApiContext } = await import("../core/api.context.js");
      apiContext = new ApiContext();
      await apiContext.initialize();
    }
    const { type, action, url, body } = job.data;
    const response = await apiContext[action](url, body);
    return response.json();
    // return `processed job ${job.id} with data: ${JSON.stringify(job.data)}`;
  },
  { connection }
);
