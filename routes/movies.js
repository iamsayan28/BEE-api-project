const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// GET all movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch {
        res.status(500).json({ message: "Unable to fetch movies." });
    }
});

// GET movie by custom id
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findOne({ id: req.params.id });
        movie ? res.json(movie) : res.status(404).json({ message: "Movie not found." });
    } catch {
        res.status(500).json({ message: "Unable to fetch movie." });
    }
});

// POST create new movie
router.post('/', async (req, res) => {
    const { id, title, showtime } = req.query;

    if (!id || !title || !showtime) {
        return res.status(400).json({ message: 'ID, title, and showtime are required.' });
    }

    try {
        const exists = await Movie.findOne({ id });
        if (exists) return res.status(400).json({ message: 'Movie already exists.' });

        const newMovie = new Movie({ id, title, showtime });
        await newMovie.save();
        res.status(201).json({ message: 'Movie created.' });
    } catch {
        res.status(500).json({ message: 'Failed to create movie.' });
    }
});

// PUT update movie
router.put('/:id', async (req, res) => {
    const { title, showtime } = req.query;

    try {
        const updated = await Movie.findOneAndUpdate({ id: req.params.id }, { title, showtime }, { new: true });
        if (!updated) return res.status(404).json({ message: "Movie not found." });
        res.json({ message: "Movie updated." });
    } catch {
        res.status(500).json({ message: "Failed to update movie." });
    }
});

// DELETE movie
router.delete('/', async (req, res) => {
    const { id } = req.query;

    if (!id) return res.status(400).json({ message: "Movie ID is required." });

    try {
        const deleted = await Movie.findOneAndDelete({ id });
        if (!deleted) return res.status(404).json({ message: "Movie not found." });
        res.json({ message: "Movie deleted." });
    } catch {
        res.status(500).json({ message: "Failed to delete movie." });
    }
});

module.exports = router;
