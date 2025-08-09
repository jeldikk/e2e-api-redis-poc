import { faker } from "@faker-js/faker";

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

  async createComment(data) {
    const response = await this.apiContext.post("/api/comments", data);
    return response;
  }

  async updateComment(id, data) {
    const response = await this.apiContext.put(`/api/comments/${id}`, data);
    return response;
  }

  async deleteComment(id) {
    const response = await this.apiContext.delete(`/api/comments/${id}`);
    return response;
  }
}
