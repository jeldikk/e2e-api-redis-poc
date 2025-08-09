import { test, expect } from "@playwright/test";
import { ApiContext } from "../lib/core/api.context";
import { CommentsService } from "../lib/services/comments.service";
import { PostsService } from "../lib/services/posts.service";
import { UsersService } from "../lib/services/users.service";

test.describe("Comments API Tests Suite", () => {
  let allComments = [];
  let commentsService, postsService, usersService;
  let newCommentData, newPostData, newUserData;

  test.beforeAll(async ({ request }) => {
    const apiContext = new ApiContext(request);

    commentsService = new CommentsService(apiContext);

    const mockUserPayload = UsersService.createUserData();
    usersService = new UsersService(apiContext);
    const userResponse = await usersService.createUser(mockUserPayload);
    expect(userResponse.status()).toBe(201);
    newUserData = await userResponse.json();

    const mockPostPayload = PostsService.createPostData();
    mockPostPayload.userId = newUserData._id;
    console.log("mockPostPayload", mockPostPayload);
    postsService = new PostsService(apiContext);
    const postResponse = await postsService.createPost(mockPostPayload);
    expect(postResponse.status()).toBe(201);
    newPostData = await postResponse.json();

    const mockCommentPayload = CommentsService.createCommentData();
    mockCommentPayload.postId = newPostData._id;
    const commentResponse = await commentsService.createComment(
      mockCommentPayload
    );
    expect(commentResponse.status()).toBe(201);
    newCommentData = await commentResponse.json();
  });

  test("List Comments", async () => {
    const response = await commentsService.getAllComments();
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toBeInstanceOf(Array);
  });

  test("Create Comment", async () => {
    const response = await commentsService.createComment(newCommentData);
    expect(response.status()).toBe(201);
  });

  test.skip("should able to update comment body property ", async () => {
    const updatedCommentData = {
      ...newCommentData,
      body: "Updated comment body",
    };
    const response = await commentsService.updateComment(
      newCommentData._id,
      updatedCommentData
    );
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.body).toBe(updatedCommentData.body);
  });

  test.skip("should able to update comment email property ", async () => {
    const updatedCommentData = {
      ...newCommentData,
      email: "updated.email@example.com",
    };
    const response = await commentsService.updateComment(
      newCommentData._id,
      updatedCommentData
    );
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.email).toBe(updatedCommentData.email);
  });

  test.skip("Delete Comment", async () => {
    const response = await commentsService.deleteComment(newCommentData._id);
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.message).toBe("Comment deleted successfully");
  });
});
