const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true 
    },
    title: String,
    showtime: String,
    availableSeats: { type: Number, default: 100 }
});

module.exports = mongoose.models.Movie || mongoose.model('Movie', movieSchema);
