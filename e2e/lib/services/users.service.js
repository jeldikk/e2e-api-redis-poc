import { faker } from "@faker-js/faker";
export class UsersService {
  constructor(apiContext) {
    this.apiContext = apiContext;
  }

  static createUserData() {
    return {
      name: faker.person.firstName(),
      username: faker.internet.username(),
      email: faker.internet.email(),
      address: {
        street: faker.location.street(),
        suite: faker.location.secondaryAddress(),
        city: faker.location.city(),
        zipcode: faker.location.zipCode(),
        geo: {
          lat: faker.location.latitude(),
          lng: faker.location.longitude(),
        },
      },
      phone: faker.phone.number(),
      website: faker.internet.url(),
      company: {
        name: faker.company.name(),
        catchPhrase: faker.company.catchPhrase(),
        bs: faker.company.buzzPhrase(),
      },
    };
  }

  async getAllUsers() {
    const response = await this.apiContext.get("/api/users");
    return response;
  }

  async createUser(data) {
    const response = await this.apiContext.post("/api/users", data);
    return response;
  }

  async updateUser(id, data) {
    const response = await this.apiContext.put(`/api/users/${id}`, data);
    return response;
  }

  async deleteUser(id) {
    const response = await this.apiContext.delete(`/api/users/${id}`);
    return response;
  }
}
