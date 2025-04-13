const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// POST create booking
router.post('/', async (req, res) => {
    const { id, userId, movieId, seats } = req.query;

    if (!id || !userId || !movieId || !seats) {
        return res.status(400).json({ message: 'ID, userId, movieId, and seats are required.' });
    }

    try {
        const newBooking = new Booking({ id, userId, movieId, seats });
        await newBooking.save();
        res.status(201).json({ message: 'Booking created.' });
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ message: "Booking ID already exists." });
        } else {
            res.status(500).json({ message: "Failed to create booking." });
        }
    }
});

// GET all bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch {
        res.status(500).json({ message: 'Unable to fetch bookings.' });
    }
});

// GET booking by custom id
router.get('/:id', async (req, res) => {
    try {
        const booking = await Booking.findOne({ id: req.params.id });
        booking ? res.json(booking) : res.status(404).json({ message: "Booking not found." });
    } catch {
        res.status(500).json({ message: "Unable to fetch booking." });
    }
});

// DELETE booking by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Booking.findOneAndDelete({ id: req.params.id });
        if (!deleted) return res.status(404).json({ message: "Booking not found." });
        res.json({ message: "Booking deleted." });
    } catch {
        res.status(500).json({ message: "Failed to delete booking." });
    }
});

module.exports = router;
