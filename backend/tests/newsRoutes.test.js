const request = require("supertest");
const app = require("../app");

describe("GET /api/news Integration Tests", () => {
  test("should return 401 when accessing /api/news without authorization header", async () => {
    const response = await request(app).get("/api/news");

    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({ message: "No token provided" });
  });

  test("should return 401 when accessing /api/news with an invalid token", async () => {
    const response = await request(app)
      .get("/api/news")
      .set("Authorization", "Bearer invalid.token.value");

    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({ message: "Invalid token" });
  });
});
