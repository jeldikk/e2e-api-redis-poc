import { request } from "@playwright/test";
export class ApiContext {
  constructor() {}

  async initialize() {
    this._context = await request.newContext({
      baseURL: "http://localhost:5000",
      extraHTTPHeaders: {
        "Content-Type": "application/json",
      },
    });
  }

  async get(url) {
    const response = await this._context.get(url);
    return response;
  }

  async post(url, data) {
    const response = await this._context.post(url, {
      data: data,
    });
    return response;
  }

  async put(url, data) {
    const response = await this._context.put(url, {
      data: data,
    });
    return response;
  }

  async delete(url) {
    const response = await this._context.delete(url);
    return response;
  }
}
