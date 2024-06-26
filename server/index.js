// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors') 
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const userRoutes = require('./routes/auth')
const reviewRoutes = require('./routes/review');
const componentCardRoutes = require('./routes/componentCard');
const ComponentStoreRoutes = require("./routes/ComponentStoreRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const commentsRoutes = require("./routes/comments");
const modifyRoutes=require("./routes/modify");
const notificationsRoutes = require("./routes/notification");
const issuesRoutes = require('./routes/issuesRoutes');
const userInfoRoutes=require('./routes/userRoutes')
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const http = require('http');
const socketIo = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
      origin: '*',
      
  }
});

let usersMap = new Map(); // Use Map instead of array

const addNewUser = (email, socketId) => {
  if (!usersMap.has(email)) { // Check if email already exists in Map
    usersMap.set(email, socketId); // Set email as key and socketId as value
  }
};

const removeUser = (socketId) => {
  for (let [email, id] of usersMap.entries()) {
    if (id === socketId) {
      usersMap.delete(email); // Remove user entry from Map
      break; // Exit loop since we found and removed the user
    }
  }
};

const getUser = (email) => {
  return usersMap.get(email); // Retrieve socketId using email key
};

io.on("connection", (socket) => {
  console.log("New user connected " + socket.id);
  
  socket.on("newUser", ({ email, socketId }) => {
    addNewUser(email, socketId);
    console.log(usersMap);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log(usersMap);
  });
});

//console.log(usersMap + " new user connected")

//const http = require('http');
require('dotenv').config();

app.use(express.json());
app.use(cors());


app.use('/api/user',userRoutes);
app.use('/api/userinfo',userInfoRoutes);

app.use('/api/review',reviewRoutes);

app.use('/api/componentCard',componentCardRoutes);
app.use('/api/modify',modifyRoutes);
app.use('/api/comments',commentsRoutes);

app.use('/api/ComponentStore',ComponentStoreRoutes);

app.use('/api/upload',uploadRoutes);  
app.use('/api/notification',notificationsRoutes);  
app.use('/api/issues',issuesRoutes);  
app.get('/', (req, res) => {
    res.send('Hello, Component Store!');
});

global.io = io;
global.getUser = getUser;
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
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

 
