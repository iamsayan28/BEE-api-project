# 🎬 FlickTicket API

FlickTicket is a simple **movie ticket booking API** built using **Node.js and Express.js**.  
It allows users to **manage movie listings, book tickets, and cancel bookings** while ensuring seat limitations.  

---

## 🚀 Features  

### 🎥 **Movie Management**  
- View all movies  
- View a movie by ID  
- Update movie details (title & showtime)  

### 👤 **User Management**  
- View all users  
- View a user by ID  
- Add a user  
- Update a user  
- Delete a user  

### 🎟 **Booking Management**  
- View all bookings  
- View a booking by ID  
- Book movie tickets (with seat availability check)  
- Cancel bookings (seats are automatically refunded)  

---

## 📌 Setup Instructions  

### **1️⃣ Clone the Repository**  

git clone https://github.com/shivam67890/backend-api.git
cd backend-api

### 2️⃣ Initialize Node.js

If package.json is not included, initialize Node.js manually:

npm init -y

### 3️⃣ Install Dependencies

npm install express

### 4️⃣ Run the Server

node index.js

The API will be running at: http://localhost:3000 🚀

🔹 Postman Collection

You can test all API requests using this Postman collection:
https://app.getpostman.com/join-team?invite_code=95e61c588a0b83074be98579250b0d3811ae202930ba8aedfcdf5f4cfe3b8e18

**Note-** To run the above postman collection you need to download Postman Desktop Agent:     
https://www.postman.com/downloads/postman-agent/

🔗 FlickTicket Postman Collection

💡 Note: To run the above Postman collection, you need to download the Postman Desktop Agent:
🔗 Download Postman Agent
📌 API Endpoints
🎬 Movies API (/movies)

    GET /movies → Get all movies
    GET /movies/:id → Get movie by ID
    PUT /movies/:id?title=UpdatedTitle&showtime=9PM → Update movie details

👤 Users API (/users)

    GET /users → Get all users
    GET /users/:id → Get user by ID
    POST /users?id=101&name=Shivam → Add a user
    PUT /users/:id?name=UpdatedName → Update a user
    DELETE /users/:id → Delete a user

🎟 Bookings API (/bookings)

    GET /bookings → Get all bookings
    GET /bookings/:id → Get booking by ID
    POST /bookings?userId=101&movieId=1&seats=2 → Book a ticket
    DELETE /bookings/:id → Cancel booking and refund seats

📜 About

FlickTicket API is a RESTful API for managing movie ticket bookings. It ensures seat limitations (50 seats per movie) and refunds seats upon cancellation.
