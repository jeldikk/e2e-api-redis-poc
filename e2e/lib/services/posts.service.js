import { faker } from "@faker-js/faker";

export class PostsService {
  constructor(apiContext) {
    this.apiContext = apiContext;
  }

  static createPostData() {
    return {
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(3),
    };
  }

  async getAllPosts() {
    const response = await this.apiContext.get("/api/posts");
    return response;
  }

  async createPost(data) {
    const response = await this.apiContext.post("/api/posts", data);
    return response;
  }

  async updatePost(id, data) {
    const response = await this.apiContext.put(`/api/posts/${id}`, data);
    return response;
  }

  async deletePost(id) {
    const response = await this.apiContext.delete(`/api/posts/${id}`);
    return response;
  }
}
