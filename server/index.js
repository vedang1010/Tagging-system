// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
console.log("Welcome");
const userRoutes = require('./routes/auth')
const reviewRoutes = require('./routes/review');
const componentCardRoutes = require('./routes/componentCard');
const ComponentStoreRoutes = require("./routes/ComponentStoreRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const commentsRoutes = require("./routes/comments");
const modifyRoutes=require("./routes/modify")
const app = express();
const http = require('http');
//const { Server } = require('socket.io');

require('dotenv').config();

app.use(express.json());
app.use(cors());


app.use('/api/user',userRoutes);

app.use('/api/review',reviewRoutes);

app.use('/api/componentCard',componentCardRoutes);
app.use('/api/modify',modifyRoutes);
app.use('/api/comments',commentsRoutes);

app.use('/api/ComponentStore',ComponentStoreRoutes);

app.use('/api/upload',uploadRoutes);    
app.get('/', (req, res) => {
    res.send('Hello, Component Store!');
});

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Create HTTP server
// const server = http.createServer(app);

// const io = new Server(server, {
//     cors: {
//       origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
//       methods: ["GET", "POST"],
//     },
//   });
  

app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
