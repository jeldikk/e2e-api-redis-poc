import { faker } from "@faker-js/faker";
import { playwrightQueue } from "../redis/queues";
import crypto from "node:crypto";

export class CommentsService {
  constructor(apiContext) {
    this.apiContext = apiContext;
  }

  static createCommentData() {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      body: faker.lorem.sentence(),
    };
  }

  async getAllComments() {
    const response = await this.apiContext.get("/api/comments");
    return response;
  }

  async processJob(jobDetails) {
    const bytes = crypto.randomBytes(8);
    const randomString = bytes.toString("hex");
    const { type, action, url, body } = jobDetails;
    const job = await playwrightQueue.add(
      `comments-job-${randomString}`,
      jobDetails
    );
    const response = await job.waitUntilFinished();
    return response;
  }

  async createComment(data) {
    // const response = await this.apiContext.post("/api/comments", data);
    const payload = {
      type: "create",
      action: "post",
      url: "/api/comments",
      body: data,
    };
    const job = await playwrightQueue.add("createComment", payload);
    const response = await job.waitUntilFinished();
    return response;
  }

  async updateComment(id, data) {
    // const response = await this.apiContext.put(`/api/comments/${id}`, data);
    const payload = {
      type: "update",
      action: "put",
      url: `/api/comments/${id}`,
      body: data,
    };
    const job = await playwrightQueue.add("updateComment", payload);
    const response = await job.waitUntilFinished();
    return response;
  }

  async deleteComment(id) {
    const response = await this.apiContext.delete(`/api/comments/${id}`);
    return response;
  }
}
