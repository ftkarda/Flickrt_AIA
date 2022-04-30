const request = require("supertest");
const app = require("../app");

describe("GET /", () => {
  describe("GET / - success test", () => {
    it("should return all feeds from everyone", async () => {
      const res = await request(app).get("/feeds/?tags=");
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("title", expect.any(String));
      expect(res.body).toHaveProperty("link", expect.any(String));
      expect(res.body).toHaveProperty("description", expect.any(String));
      expect(res.body).toHaveProperty("modified", expect.any(String));
      expect(res.body).toHaveProperty("generator", expect.any(String));
      expect(res.body).toHaveProperty("items");
    });
  });

  describe("GET / - success test", () => {
    it("should return feeds with query tags", async () => {
      const res = await request(app).get("/feeds/?tags=cats");
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("title", expect.any(String));
      expect(res.body).toHaveProperty("link", expect.any(String));
      expect(res.body).toHaveProperty("description", expect.any(String));
      expect(res.body).toHaveProperty("modified", expect.any(String));
      expect(res.body).toHaveProperty("generator", expect.any(String));
      expect(res.body).toHaveProperty("items");
    });
  });
});
