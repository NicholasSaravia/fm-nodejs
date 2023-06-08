import app from "../server";
import supertest from "supertest";

describe("GET /", () => {
  try {
    it("should send back some data", async () => {
      const result = await supertest(app).get("/");
      expect(result.body.message).toBe("hello");
    });
  } catch (err) {
    console.log(err);
  }
});
