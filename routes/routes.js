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
router.get('/canvas/random', async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM canvas_data ORDER BY RANDOM() LIMIT 1');
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'No canvases available' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
