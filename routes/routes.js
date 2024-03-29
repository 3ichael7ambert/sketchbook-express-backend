  const express = require('express');
  const router = express.Router();
  const db = require('../db'); 

  // GET all canvases
  router.get('/canvas', async (req, res, next) => {
    try {
      const result = await db.query('SELECT * FROM canvas_data');
      res.json(result.rows);
    } catch (error) {
      next(error);
    }
  });

  // POST a new canvas
  router.post('/canvas', async (req, res, next) => {
    const { canvasData } = req.body;

    try {
      const result = await db.query('INSERT INTO canvas_data (data) VALUES ($1) RETURNING *', [canvasData]);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  });

  // GET a specific canvas by ID
  router.get('/canvas/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
      const result = await db.query('SELECT * FROM canvas_data WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Canvas not found' });
      } else {
        res.json(result.rows[0]);
      }
    } catch (error) {
      next(error);
    }
  });

  // GET a random canvas
  router.get('/random', async (req, res, next) => {
    try {
      const result = await db.query('SELECT * FROM canvas_data OFFSET floor(random() * (SELECT count(*) FROM canvas_data)) LIMIT 1');

      if (result.rows.length === 0) {
        res.status(404).json({ error: 'No canvases available' });
      } else {
        res.json(result.rows[0]);
      }
    } catch (error) {
      next(error);
    }
  });


  router.get('/canvas/:id/svg', async (req, res, next) => {
    const { id } = req.params;

    try {
      const result = await db.query('SELECT * FROM canvas_data WHERE id = $1', [id]);

      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Canvas not found' });
      } else {
        const svgContent = result.rows[0].data.canvasData;

        // Set the content type to SVG
        res.header('Content-Type', 'image/svg+xml');

        // Send the SVG content directly
        res.send(svgContent);
      }
    } catch (error) {
      next(error);
    }
  });



  module.exports = router;
