const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch {
        res.status(500).json({ message: "Error fetching users" });
    }
});

// GET user by custom ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.id });
        user ? res.json(user) : res.status(404).json({ message: "User not found!" });
    } catch {
        res.status(500).json({ message: "Error fetching user" });
    }
});

// POST request to create a new user
router.post('/', async (req, res) => {
    const { id, name } = req.query;

    if (!id || !name) {
        return res.status(400).json({ message: 'Missing required fields!' });
    }

    try {
        const newUser = new User({ id, name });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'User with this ID already exists!' });
        }
        res.status(500).json({ message: 'Error creating user' });
    }
});

// PUT update user by custom id
router.put('/:id', async (req, res) => {
    const { name } = req.query;
    const customId = req.params.id;

    if (!name) {
        return res.status(400).json({ message: "Missing name field!" });
    }

    try {
        const user = await User.findOneAndUpdate(
            { id: customId },
            { name },
            { new: true }
        );

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ message: "User updated successfully" });
    } catch {
        res.status(500).json({ message: "Error updating user" });
    }
});

// DELETE user by custom id
router.delete('/', async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ message: "User id is required!" });
    }

    try {
        const deletedUser = await User.findOneAndDelete({ id });

        if (!deletedUser) return res.status(404).json({ message: "User not found" });

        res.json({ message: "User deleted successfully" });
    } catch {
        res.status(500).json({ message: "Error deleting user" });
    }
});

module.exports = router;
