import { test, expect } from "@playwright/test";
import { ApiContext } from "../lib/core/api.context";
import { UsersService } from "../lib/services/users.service";

test.describe("Users API Tests Suite", () => {
  let apiContext;
  let usersService;
  let newUserData;

  test.beforeAll(async () => {
    apiContext = new ApiContext();
    await apiContext.initialize();

    usersService = new UsersService(apiContext);

    // Create a mock user
    const mockUserPayload = UsersService.createUserData();
    const userResponse = await usersService.createUser(mockUserPayload);
    expect(userResponse.status()).toBe(201);
    newUserData = await userResponse.json();
  });

  test("List Users", async () => {
    const response = await usersService.getAllUsers();
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toBeInstanceOf(Array);
  });

  test("should able to update user name property", async () => {
    const updatedUserData = {
      ...newUserData,
      name: "Updated User Name",
    };
    const response = await usersService.updateUser(
      newUserData._id,
      updatedUserData
    );
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.name).toBe(updatedUserData.name);
  });

  test.skip("should able to update user email property", async () => {
    const updatedUserData = {
      ...newUserData,
      email: "updated.email@example.com",
    };
    const response = await usersService.updateUser(
      newUserData._id,
      updatedUserData
    );
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.email).toBe(updatedUserData.email);
  });

  test("should able to update address property", async () => {
    const updatedUserData = {
      ...newUserData,
      address: {
        street: "Updated Street",
        city: "Updated City",
        suite: "Updated Suite",
        zipcode: "12345",
        geo: {
          lat: "0.0000",
          lng: "0.0000",
        },
      },
    };
    const response = await usersService.updateUser(
      newUserData._id,
      updatedUserData
    );
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.address.street).toBe(updatedUserData.address.street);
  });

  test("should able to update phone property", async () => {
    const updatedUserData = {
      ...newUserData,
      phone: "123-456-7890",
    };
    const response = await usersService.updateUser(
      newUserData._id,
      updatedUserData
    );
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.phone).toBe(updatedUserData.phone);
  });

  test("should able to update website property", async () => {
    const updatedUserData = {
      ...newUserData,
      website: "updated.website.com",
    };
    const response = await usersService.updateUser(
      newUserData._id,
      updatedUserData
    );
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.website).toBe(updatedUserData.website);
  });

  test("should able to update company property", async () => {
    const updatedUserData = {
      ...newUserData,
      company: {
        name: "Updated Company",
        catchPhrase: "Updated Catchphrase",
        bs: "Updated BS",
      },
    };
    const response = await usersService.updateUser(
      newUserData._id,
      updatedUserData
    );
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.company.name).toBe(updatedUserData.company.name);
  });
});
