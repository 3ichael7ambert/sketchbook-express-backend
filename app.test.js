const request = require("supertest");
const app = require("./app");

const db = require("./db");

const testCanvasData = {};

beforeAll(async () => {
  await db.query("INSERT INTO canvas_data (data) VALUES ($1) RETURNING id", [
    testCanvasData,
  ]);
});

afterAll(async () => {
  await db.query("DELETE FROM canvas_data");
});

describe("GET /canvas", () => {
  test("should return a list of canvases", async () => {
    const response = await request(app).get("/canvas");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("POST /canvas", () => {
  test("should create a new canvas", async () => {
    const response = await request(app)
      .post("/canvas")
      .send({ canvasData: testCanvasData });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });
});

describe("GET /canvas/:id", () => {
  test("should return a specific canvas by ID", async () => {
    const response = await request(app).get("/canvas/1"); // Assuming 1 is a valid canvas ID

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  test("should return a 404 status for a non-existent canvas ID", async () => {
    const response = await request(app).get("/canvas/999"); // Assuming 999 is a non-existent canvas ID

    expect(response.status).toBe(404);
  });
});
