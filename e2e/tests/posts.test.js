import { test, expect } from "@playwright/test";
import { ApiContext } from "../lib/core/api.context";
import { PostsService } from "../lib/services/posts.service";
import { UsersService } from "../lib/services/users.service";

test.describe("Posts API Tests Suite", () => {
  let apiContext;
  let postsService, usersService;
  let newPostData, newUserData;

  test.beforeAll(async () => {
    apiContext = new ApiContext();
    await apiContext.initialize();

    // Initialize services if needed
    postsService = new PostsService(apiContext);
    usersService = new UsersService(apiContext);

    // Create a mock user
    const mockUserPayload = UsersService.createUserData();
    const userResponse = await usersService.createUser(mockUserPayload);
    expect(userResponse.status()).toBe(201);
    newUserData = await userResponse.json();

    // Create a mock post
    const mockPostPayload = PostsService.createPostData();
    mockPostPayload.userId = newUserData._id;
    const postResponse = await postsService.createPost(mockPostPayload);
    expect(postResponse.status()).toBe(201);
    newPostData = await postResponse.json();
  });

  test("List Posts", async () => {
    const response = await postsService.getAllPosts();
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toBeInstanceOf(Array);
  });

  test("should able to update post title property", async () => {
    const updatedPostData = {
      ...newPostData,
      title: "Updated post title",
    };
    const response = await postsService.updatePost(
      newPostData._id,
      updatedPostData
    );
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.title).toBe(updatedPostData.title);
  });

  test("should able to update post body property", async () => {
    const updatedPostData = {
      ...newPostData,
      body: "Updated post body",
    };
    const response = await postsService.updatePost(
      newPostData._id,
      updatedPostData
    );
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.body).toBe(updatedPostData.body);
  });
});
