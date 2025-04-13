const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

// Load environment variables from the .env file
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
const movieRoutes = require('./routes/movies');
const userRoutes = require('./routes/user');
const bookingRoutes = require('./routes/bookings');

app.use('/movies', movieRoutes);
app.use('/users', userRoutes);
app.use('/bookings', bookingRoutes);

app.get('/', (req, res) => {
    res.send("FlickTicket API is running!");
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
