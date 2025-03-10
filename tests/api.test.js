const request = require("supertest");

describe("Recipe API", () => {
  jest.setTimeout(10000); // Increase timeout to 10 seconds

  // Base URL for the backend server
  const baseUrl = "http://localhost:9000";

  it("should return recipes for valid parameters", async () => {
    const res = await request(baseUrl).get(
      "/api/recipes/complexSearch?query=pasta&diet=vegetarian&includeIngredients=cheese&maxReadyTime=30"
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should return an error for missing parameters", async () => {
    const res = await request(baseUrl).get("/api/recipes/complexSearch");
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Query, diet, and ingredients are required");
  });
});