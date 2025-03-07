const request = require("supertest");
const { app, validateUser, validateBook, validateReview } = require("../index");
const http = require("http");

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpoints", () => {
  it("should add a new user with valid input", async () => {
    const res = await request(server)
      .post("/api/users")
      .send({ name: "Alice", email: "alice@example.com" });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      name: "Alice",
      email: "alice@example.com",
    });
  });

  it("should return 400 for invalid user input", async () => {
    const res = await request(server).post("/api/users").send({ name: "123" });
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Email is required and should be a string.");
  });

  it("should add a new book with valid input", async () => {
    const res = await request(server)
      .post("/api/books")
      .send({ title: "The Great Gatsby", author: "F.Scott Fitzgerald" });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      title: "The Great Gatsby",
      author: "F.Scott Fitzgerald",
    });
  });

  it("should return 400 for invalid book input", async () => {
    const res = await request(server).post("/api/books").send({ title: "123" });
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Author is required and should be a string.");
  });

  it("should add a new review with valid input", async () => {
    const res = await request(server)
      .post("/api/reviews")
      .send({ content: "Great book!", userId: 1 });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      content: "Great book!",
      userId: 1,
    });
  });

  it("should return 400 for invalid review input", async () => {
    const res = await request(server)
      .post("/api/reviews")
      .send({ content: "Great book!", userId: "invalid" });
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("User ID is required and should be a number.");
  });
});

describe("Validation Functions", () => {
  it("should validate user input correctly", () => {
    expect(
      validateUser({ name: "Alice", email: "alice@example.com" }),
    ).toBeNull();
    expect(validateUser({ name: "Alice" })).toEqual(
      "Email is required and should be a string.",
    );
    expect(validateUser({ email: "alice@example.com" })).toEqual(
      "Name is required and should be a string.",
    );
  });

  it("should validate book input correctly", () => {
    expect(
      validateBook({ title: "Moby Dick", author: "Herman Melville" }),
    ).toBeNull();
    expect(validateBook({ title: "Moby Dick" })).toEqual(
      "Author is required and should be a string.",
    );
    expect(validateBook({ author: "Herman Melville" })).toEqual(
      "Title is required and should be a string.",
    );
  });

  it("should validate review input correctly", () => {
    expect(validateReview({ content: "Great book!", userId: 1 })).toBeNull();
    expect(validateReview({ content: "Great book!" })).toEqual(
      "User ID is required and should be a number.",
    );
    expect(validateReview({ userId: 1 })).toEqual(
      "Content is required and should be a string.",
    );
  });
});
