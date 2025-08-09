export class ApiContext {
  constructor(req) {
    this._req = req;
  }

  async get(url) {
    const response = await this._req.get(url);
    return response;
  }

  async post(url, data) {
    const response = await this._req.post(url, {
      data: data,
    });
    return response;
  }

  async put(url, data) {
    const response = await this._req.put(url, {
      data: data,
    });
    return response;
  }

  async delete(url) {
    const response = await this._req.delete(url);
    return response;
  }
}
