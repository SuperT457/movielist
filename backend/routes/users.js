// routes/users.js
const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT *, username FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore nel recupero utenti' });
  }
});

module.exports = router;

