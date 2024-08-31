const express = require('express');
const pool = require('../db');
const router = express.Router();

// Create a student
router.post('/', async (req, res) => {
    const { name, age, major } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO students (name, age, major) VALUES ($1, $2, $3) RETURNING *',
            [name, age, major]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
});

// Get all students
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM students');
        res.json(result.rows);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
});

// Get a student by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM students WHERE id = $1', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a student
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age, major } = req.body;
    try {
        const result = await pool.query(
            'UPDATE students SET name = $1, age = $2, major = $3 WHERE id = $4 RETURNING *',
            [name, age, major, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a student
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM students WHERE id = $1', [id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
