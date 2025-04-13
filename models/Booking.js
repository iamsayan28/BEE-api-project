const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true 
    },
    userId: String,
    movieId: String,
    seats: Number
});

module.exports = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

