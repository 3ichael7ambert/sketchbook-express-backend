const request = require('supertest');
const app = require('./app');
const { db } = require('./db');

describe('Express App', () => {
  beforeAll(async () => {
    // Perform any setup before running the tests
    await db.query('INSERT INTO canvas_data (data) VALUES ($1) RETURNING *', ['<svg>Test SVG</svg>']);
  });

  afterAll(async () => {
    // Perform cleanup after running the tests
    await db.query('DELETE FROM canvas_data');
  });

  it('should respond with 404 for unknown routes', async () => {
    const response = await request(app).get('/nonexistent-route');
    expect(response.status).toBe(404);
  });

  it('should handle errors with a JSON response', async () => {
    const response = await request(app).get('/canvas/nonexistent-id/svg');
    expect(response.status).toBe(404);
    expect(response.body.error).toBeDefined();
  });

  it('should respond with a list of canvases for GET /canvas', async () => {
    const response = await request(app).get('/canvas');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should create a new canvas for POST /canvas', async () => {
    const canvasData = '<svg>New SVG</svg>';
    const response = await request(app).post('/canvas').send({ canvasData });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBe(canvasData);
  });

  it('should respond with a specific canvas for GET /canvas/:id', async () => {
    const canvasId = 1; // Assuming the ID of the created canvas
    const response = await request(app).get(`/canvas/${canvasId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Object);
  });

  it('should respond with SVG content for GET /canvas/:id/svg', async () => {
    const canvasId = 1; // Assuming the ID of the created canvas
    const response = await request(app).get(`/canvas/${canvasId}/svg`);
    expect(response.status).toBe(200);
    expect(response.header['content-type']).toBe('image/svg+xml');
    expect(response.text).toContain('<svg>Test SVG</svg>');
  });

  it('should handle validation errors for invalid SVG content on POST /canvas', async () => {
    const invalidCanvasData = 'Invalid SVG';
    const response = await request(app).post('/canvas').send({ canvasData: invalidCanvasData });
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it('should handle database errors for GET /canvas/:id', async () => {
    // Assuming an invalid canvas ID (nonexistent in the database)
    const invalidCanvasId = 999;
    const response = await request(app).get(`/canvas/${invalidCanvasId}`);
    expect(response.status).toBe(500); 
    expect(response.body.error).toBeDefined();
  });
});
