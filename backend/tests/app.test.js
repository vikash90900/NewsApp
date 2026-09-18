const request = require("supertest");
const app = require("../app");

describe("GET /", () => {
  test("should return API is running", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("API is running...");
  });
});

describe("GET /health", () => {
  test("should return status OK with 200 status code", async () => {
    const response = await request(app).get("/health");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ status: "OK" });
  });
});